import React, { useState } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import {
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  Snackbar,
  Alert,
  Tooltip,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  removeItemFromCart,
  selectCartItems,
  updateQuantity,
} from "../redux/cartSlice";
import { Delete } from "@mui/icons-material";

const HeroSection = styled(Box)(({ theme }) => ({
  backgroundImage: `url(./shop.png)`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "70vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.common.black,
  textAlign: "center",
}));

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: theme.spacing(20),
  padding: theme.spacing(5),
  margin: theme.spacing(1, 10),
  backgroundColor: "#e6d6bc",
  width: "50%",
  height: "10%",
}));

const StyledTotalBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(5),
  padding: theme.spacing(5),
  margin: theme.spacing(1, 10),
  backgroundColor: "#e6d6bc",
  width: "20%",
  height: "30%",
  flexDirection: "column",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginLeft: "30px",
  borderRadius: "5px",
  borderColor: "#ad8544",
  color: "#ad8544",
  "&:hover": {
    backgroundColor: "#ad8544",
    color: "white",
  },
  textTransform: "none",
}));

function Cart() {
  const theme = createTheme();
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [quantities, setQuantities] = useState(
    cartItems.reduce((acc, item) => ({ ...acc, [item.id]: 1 }), {})
  );

  const handleRemoveItem = (itemId) => {
    dispatch(removeItemFromCart(itemId));
    setSnackbarMessage("Item deleted from cart");
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.discountPrice * item.quantity,
    0
  );

  return (
    <ThemeProvider theme={theme}>
      <HeroSection>
        <Box>
          <img src="mainlogo.png" alt="logo" />
          <Typography variant="h4" fontWeight="bold">
            Cart
          </Typography>
          <Typography
            variant="h5"
            component="div"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Link
              to="/"
              style={{
                textDecoration: "none",
                fontWeight: "bold",
                color: "#000",
                marginRight: "8px",
              }}
            >
              Home
            </Link>
            <NavigateNextOutlinedIcon />
            <Typography
              variant="h5"
              component="span"
              sx={{ marginLeft: "8px" }}
            >
              Cart
            </Typography>
          </Typography>
        </Box>
      </HeroSection>

      <Box
        sx={{
          display: "flex",
        }}
      >
        <StyledBox>
          <Typography variant="h6" fontWeight="bold">
            Product
          </Typography>
          <Typography variant="h6" fontWeight="bold">
            Price
          </Typography>
          <Typography variant="h6" fontWeight="bold">
            Quantity
          </Typography>
        </StyledBox>

        <StyledTotalBox>
          <Typography variant="h4" fontWeight="bold">
            Total Bill
          </Typography>
          <Typography variant="h6" align="center">
            SubTotal: ${totalPrice.toFixed(2)}
          </Typography>
          <Link to="/checkout" style={{ textDecoration: "none" }}>
            <StyledButton variant="outlined">CheckOut now</StyledButton>
          </Link>
        </StyledTotalBox>
      </Box>

      {cartItems.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            height: "50vh",
            margin: theme.spacing(1, 15),
            width: "50%",
          }}
        >
          <img
            src="./cart.jpeg"
            alt="empty cart"
            width="500px"
            style={{ borderRadius: "8px" }}
          />
        </Box>
      ) : (
        cartItems.map((item) => (
          <Box
            key={item.id}
            sx={{
              display: "flex",
              padding: theme.spacing(2),
              justifyContent: "space-between",
              alignItems: "center",
              margin: theme.spacing(2, 20),
              width: "45%",
              borderBottom: "1px solid #ccc",
              borderRadius: "8px",
            }}
          >
            {/* Product Image and Name */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: theme.spacing(2),
                width: "40%",
              }}
            >
              <Box
                component="img"
                src={item.imgSrc}
                alt={item.name}
                sx={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "8px",
                  objectFit: "cover",
                }}
              />
              <Typography variant="h6">{item.name}</Typography>
            </Box>

            {/* Price */}
            <Typography variant="h6" sx={{ minWidth: "80px" }}>
              ${item.discountPrice.toFixed(2)}
            </Typography>

            {/* Quantity TextField */}
            <TextField
              type="number"
              value={item.quantity}
              InputProps={{ inputProps: { min: 1 } }}
              onChange={(e) =>
                dispatch(
                  updateQuantity({
                    id: item.id,
                    quantity: Number(e.target.value),
                  })
                )
              }
              sx={{ width: "60px" }}
            />

            {/* Remove Button */}
            <Tooltip title="Delete">
              <IconButton onClick={() => handleRemoveItem(item.id)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        ))
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          variant="filled"
          sx={{ width: "300px" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

export default Cart;
