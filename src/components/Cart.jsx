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

const theme = createTheme();

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

// Parent Wrapper that organizes StyledBox and StyledTotalBox in a row
const Wrapper = styled(Box)({
  display: "flex",
  flexDirection: "row",
  width: "100%", // Full width for layout flexibility
  gap: "140px", // Adjust spacing between StyledBox and StyledTotalBox
});

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: theme.spacing(10),
  padding: theme.spacing(5),
  margin: theme.spacing(1, 5),
  backgroundColor: "#e6d6bc",
  width: "90%", // 60% of the parent's width
  height: "auto", // Adjust height for content as needed
}));

const StyledTotalBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(5),
  padding: theme.spacing(5),
  margin: theme.spacing(1, 5),
  backgroundColor: "#e6d6bc",
  width: "20%", // 20% of the parent's width
  height: "10%",
  flexDirection: "column",
}));

const ItemContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  padding: theme.spacing(2),
  justifyContent: "space-between",
  alignItems: "center",
  gap: "2px",
  margin: theme.spacing(1, 5),
  width: "100%", // Full width inside StyledBox
  borderBottom: "1px solid #ccc",
  borderRadius: "8px",
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

const ImageBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "200px",
  height: "100px",
  borderRadius: "8px",
  overflow: "hidden",
  position: "relative",
  textAlign: "center",
}));

const StyledImage = styled("img")({
  width: "50%", // Use full width of the box
  height: "100%", // Use full height of the box
  objectFit: "cover", // Cover to maintain aspect ratio
});

const TitleTypography = styled(Typography)({
  width: "50%",
});
const ColumnContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width: "60%",
});

function Cart() {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

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
      <Wrapper>
        <ColumnContainer>
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
            <Typography variant="h6" fontWeight="bold">
              Subtotal
            </Typography>
          </StyledBox>

          {cartItems.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                height: "50vh",
                margin: theme.spacing(1, 15),
                width: "100%",
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
              <ItemContainer key={item.id}>
                <ImageBox>
                  <StyledImage src={item.thumbnail} alt={item.title} />
                  <TitleTypography variant="body2">
                    {item.title}
                  </TitleTypography>
                </ImageBox>
                <Typography variant="body" sx={{ minWidth: "80px" }}>
                  Rs: {item.discountPrice.toFixed(2)}
                </Typography>
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
                <Typography variant="body" sx={{ minWidth: "80px" }}>
                  SubTotal: {item.discountPrice * item.quantity}
                </Typography>
                <Tooltip title="Delete">
                  <IconButton onClick={() => handleRemoveItem(item.id)}>
                    <Delete sx={{ color: "#e6d6bc" }} />
                  </IconButton>
                </Tooltip>
              </ItemContainer>
            ))
          )}
        </ColumnContainer>

        <StyledTotalBox>
          <Typography variant="h4" fontWeight="bold">
            Cart Totals
          </Typography>
          <Typography variant="h6" align="center">
            Subtotal:
            <Typography
              variant="body1"
              component="span"
              fontWeight="bold"
              sx={{ paddingLeft: "15px", color: "text.secondary" }}
            >
              {totalPrice.toFixed(2)}
            </Typography>
          </Typography>

          <Typography variant="h6" align="center">
            Total:
            <Typography
              variant="h6"
              component="span"
              fontWeight="bold"
              sx={{ paddingLeft: "15px", color: "#ad8544" }}
            >
              {totalPrice.toFixed(2)}
            </Typography>
          </Typography>
          <Link to="/checkout" style={{ textDecoration: "none" }}>
            <StyledButton variant="outlined">CheckOut now</StyledButton>
          </Link>
        </StyledTotalBox>
      </Wrapper>
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
