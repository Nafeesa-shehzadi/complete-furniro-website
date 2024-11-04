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
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  removeItemFromCart,
  selectCartItems,
  updateQuantity,
} from "../redux/cartSlice";
import { Delete } from "@mui/icons-material";
import { useMediaQuery } from "@mui/material"; // Import useMediaQuery

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
  [theme.breakpoints.down("sm")]: {
    height: "50vh", // Adjust height for smaller screens
  },
}));

const Wrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  width: "100%",
  gap: "20px",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center",
  },
}));

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  gap: theme.spacing(15),
  padding: theme.spacing(3, 5),
  paddingRight: theme.spacing(15),
  backgroundColor: "#e6d6bc",
  margin: theme.spacing(0, 5),
  width: "70%",
  height: "auto",

  [theme.breakpoints.down("md")]: {
    width: "100%", // Full width on medium and smaller screens
    alignItems: "center",
  },
  [theme.breakpoints.down("sm")]: {
    display: "none",
    alignItems: "flex-start",
    gap: theme.spacing(1),
    paddingRight: theme.spacing(0),
    padding: theme.spacing(3, 0),
  },
}));

const StyledTotalBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(3),
  padding: theme.spacing(3),
  backgroundColor: "#e6d6bc",
  width: "30%",
  height: "20%",
  marginLeft: "5px",
  flexDirection: "column",
  [theme.breakpoints.down("md")]: {
    width: "100%", // Full width on medium and smaller screens
    marginTop: theme.spacing(3),
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%", // Full width on medium and smaller screens
    gap: theme.spacing(0),
    padding: theme.spacing(3, 0),
  },
}));

const ItemContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  margin: theme.spacing(2, 5),
  width: "88%",
  borderBottom: "1px solid #ccc",
  borderRadius: "8px",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "row",
    alignItems: "flex-start",
    margin: theme.spacing(2),
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(2),
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
  width: "150px",
  height: "100px",
  borderRadius: "8px",
  overflow: "hidden",
  position: "relative",
  gap: "3px",
  [theme.breakpoints.down("sm")]: {
    width: "100px",
    height: "60px",
    flexDirection: "column",
  },
}));

const StyledImage = styled("img")({
  width: "50%",
  height: "100%",
  objectFit: "cover",
});

const TitleTypography = styled(Typography)({
  width: "50%",
});

const ColumnContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    alignItems: "center",
  },
}));
const ServiceBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap", // Allow items to wrap onto the next line
  alignItems: "flex-start", // Align items at the start
  backgroundColor: "#e6d6bc",
  padding: theme.spacing(10, 2), // Reduce padding to prevent overflow
  height: "auto",
  gap: theme.spacing(1), // Space between items
  overflow: "hidden", // Prevent overflow
}));

const ServiceImage = styled("img")(({ theme }) => ({
  width: 60,
  height: 60,
  paddingLeft: theme.spacing(5),
}));

const ServiceTextContainer = styled(Box)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "flex-start",
  paddingTop: theme.spacing(2),
}));

const ServiceTitle = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  variant: "h6",
}));

const ServiceDescription = styled(Typography)(({ theme }) => ({
  variant: "body2",
  color: theme.palette.text.secondary,
}));
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
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

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
                margin: theme.spacing(1, 2),
                width: "100%",
              }}
            >
              <img
                src="./cart.jpeg"
                alt="empty cart"
                style={{ borderRadius: "8px" }}
                width="500px"
              />
            </Box>
          ) : (
            cartItems.map((item) => (
              <ItemContainer key={item.id}>
                <ImageBox>
                  <StyledImage src={item.thumbnail} alt={item.title} />
                  {!isSmallScreen && ( // Only show title if not on small screen
                    <TitleTypography variant="body2">
                      {item.title}
                    </TitleTypography>
                  )}
                </ImageBox>
                <Typography variant="body">
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
                  sx={{ ml: "30px", width: "60px" }}
                />
                <Typography
                  variant="body"
                  sx={{ ml: "40px", minWidth: "80px" }}
                >
                  {item.discountPrice * item.quantity}
                </Typography>
                <Tooltip title="Delete">
                  <IconButton onClick={() => handleRemoveItem(item.id)}>
                    <Delete sx={{ color: "#e6d6bc", paddingLeft: "0px" }} />
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
            <StyledButton variant="outlined">Check Out </StyledButton>
          </Link>
        </StyledTotalBox>
      </Wrapper>
      <Grid item xs={12}>
        <ServiceBox>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Grid container alignItems="center">
                <ServiceImage src="quality.png" alt="Quality" />
                <ServiceTextContainer>
                  <ServiceTitle>High Quality</ServiceTitle>
                  <ServiceDescription>
                    crafted from top materials
                  </ServiceDescription>
                </ServiceTextContainer>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Grid container alignItems="center">
                <ServiceImage src="wrnty.png" alt="Warranty" />
                <ServiceTextContainer>
                  <ServiceTitle>Warranty Protection</ServiceTitle>
                  <ServiceDescription>over 2 years</ServiceDescription>
                </ServiceTextContainer>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Grid container alignItems="center">
                <ServiceImage src="shiping.png" alt="Free Shipping" />
                <ServiceTextContainer>
                  <ServiceTitle>Free Shipping</ServiceTitle>
                  <ServiceDescription>order over $150</ServiceDescription>
                </ServiceTextContainer>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Grid container alignItems="center">
                <ServiceImage src="support.png" alt="Support" />
                <ServiceTextContainer>
                  <ServiceTitle>24/7 Support</ServiceTitle>
                  <ServiceDescription>Dedicated support</ServiceDescription>
                </ServiceTextContainer>
              </Grid>
            </Grid>
          </Grid>
        </ServiceBox>
      </Grid>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="info"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

export default Cart;
