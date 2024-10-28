import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Select,
  MenuItem,
  Snackbar,
} from "@mui/material";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import { Link } from "react-router-dom";
import { Close } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { selectCartItems, removeItemFromCart } from "../redux/cartSlice";
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
const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "5px",
  width: "50%",
  height: "50px",
  marginLeft: "1px",
  borderColor: "#ad8544",
  marginTop: 4,
  "&:hover": {
    backgroundColor: "#ad8544",
    color: theme.palette.common.white,
  },
  color: theme.palette.common.black,
}));
function CheckOut() {
  const theme = createTheme();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod"); // Default payment method
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  // Calculate total price
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
            CheckOut
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
              CheckOut
            </Typography>
          </Typography>
        </Box>
      </HeroSection>
      {/*  checkout page components */}
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ marginBottom: 4, padding: 4, width: "40%" }}
        >
          <Typography variant="h4" gutterBottom align="center">
            Billing Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField label="First Name" fullWidth required />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Last Name" fullWidth required />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Company Name (optional)" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <Select fullWidth defaultValue="">
                <MenuItem value="" disabled>
                  Select Country
                </MenuItem>
                <MenuItem value="USA">USA</MenuItem>
                <MenuItem value="Canada">Canada</MenuItem>
                {/* Add more countries as needed */}
              </Select>
            </Grid>
            <Grid item xs={12}>
              <TextField label="Street Address" fullWidth required />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Town/City" fullWidth required />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Province" fullWidth required />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Zip Code" required />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Email" type="email" required />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Additional Information"
                multiline
                rows={4}
                fullWidth
              />
            </Grid>
          </Grid>
        </Box>

        <Box
          sx={{
            padding: 2,
            width: "40%",
            marginBottom: 4,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            sx={{ marginTop: 4 }}
          >
            Order Summary
          </Typography>
          {cartItems.map((item) => (
            <Grid
              container
              spacing={2}
              alignItems="center"
              key={item.id}
              sx={{ marginBottom: 2 }}
            >
              <Grid item xs={3}>
                <img src={item.imgSrc} alt={item.name} width="100%" />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">{item.name}</Typography>
                <Typography variant="body2">
                  Price: ${item.discountPrice.toFixed(2)}
                </Typography>
                <Typography variant="body2">
                  Quantity: {item.quantity}
                </Typography>
              </Grid>
            </Grid>
          ))}
          <Typography variant="h6" fontWeight="bold" align="center">
            Total Bill: ${totalPrice.toFixed(2)}
          </Typography>
          <FormControl component="fieldset" sx={{ marginTop: 4 }}>
            <RadioGroup
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <FormControlLabel
                value="cod"
                control={<Radio />}
                label="Cash on Delivery"
              />
              <FormControlLabel
                value="bank_transfer"
                control={<Radio />}
                label="Bank Transfer"
              />
            </RadioGroup>
            {paymentMethod === "bank_transfer" && (
              <TextField
                label="Card Number"
                type="text"
                fullWidth
                sx={{ marginTop: 2 }}
                required
              />
            )}
          </FormControl>

          <StyledButton type="submit" variant="outlined" color="primary">
            Place Order
          </StyledButton>
        </Box>
      </Box>
      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbarOpen}
        onClose={handleCloseSnackbar}
        message="Order placed successfully!"
        autoHideDuration={6000}
        action={<Close onClick={handleCloseSnackbar} />}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      />
    </ThemeProvider>
  );
}

export default CheckOut;
