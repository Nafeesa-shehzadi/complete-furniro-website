import React, { useState, useMemo } from "react";
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
  Snackbar,
} from "@mui/material";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import { Link } from "react-router-dom";
import { Close } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { selectCartItems } from "../redux/cartSlice";
import Select from "react-select";
import countryList from "react-select-country-list";

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
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    country: null,
    address: "",
    city: "",
    province: "",
    zipCode: "",
    email: "",
    additionalInfo: "",
    cardNumber: "",
  });
  const [errors, setErrors] = useState({});
  const cartItems = useSelector(selectCartItems);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.discountPrice * item.quantity,
    0
  );

  const options = useMemo(() => countryList().getData(), []);

  const validateForm = () => {
    const newErrors = {};

    // Validate required fields
    for (const [key, value] of Object.entries(formValues)) {
      if (!value && key !== "companyName" && key !== "additionalInfo") {
        newErrors[key] = "This field is required";
      }
    }

    // Validate card number only if payment method is bank transfer
    if (paymentMethod === "bank_transfer" && !formValues.cardNumber) {
      newErrors.cardNumber = "Card number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Clear card number and errors on payment method change if switching to COD
  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
    if (e.target.value === "cod") {
      setFormValues({ ...formValues, cardNumber: "" });
      setErrors((prevErrors) => ({ ...prevErrors, cardNumber: undefined }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted"); // Debugging line
    console.log("Payment Method:", paymentMethod); // Log payment method
    console.log("Form Values:", formValues); // Log form values
    if (validateForm()) {
      // Assuming validation passed
      setSnackbarOpen(true);
      console.log("Order placed"); // This should show in the console
    } else {
      console.log("Validation failed", errors); // Log errors if validation fails
    }
  };

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

      {/* Checkout page components */}
      <Box sx={{ display: "flex" }}>
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
              <TextField
                label="First Name"
                fullWidth
                required
                value={formValues.firstName}
                onChange={(e) =>
                  setFormValues({ ...formValues, firstName: e.target.value })
                }
                error={!!errors.firstName}
                helperText={errors.firstName}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Last Name"
                fullWidth
                required
                value={formValues.lastName}
                onChange={(e) =>
                  setFormValues({ ...formValues, lastName: e.target.value })
                }
                error={!!errors.lastName}
                helperText={errors.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Company Name (optional)"
                fullWidth
                value={formValues.companyName}
                onChange={(e) =>
                  setFormValues({ ...formValues, companyName: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Select
                options={options}
                value={formValues.country}
                onChange={(selectedOption) =>
                  setFormValues({ ...formValues, country: selectedOption })
                }
                placeholder="Select Country"
              />
              {errors.country && (
                <Typography color="error">{errors.country}</Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Street Address"
                fullWidth
                required
                value={formValues.address}
                onChange={(e) =>
                  setFormValues({ ...formValues, address: e.target.value })
                }
                error={!!errors.address}
                helperText={errors.address}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Town/City"
                fullWidth
                required
                value={formValues.city}
                onChange={(e) =>
                  setFormValues({ ...formValues, city: e.target.value })
                }
                error={!!errors.city}
                helperText={errors.city}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Province"
                fullWidth
                required
                value={formValues.province}
                onChange={(e) =>
                  setFormValues({ ...formValues, province: e.target.value })
                }
                error={!!errors.province}
                helperText={errors.province}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Zip Code"
                required
                value={formValues.zipCode}
                onChange={(e) =>
                  setFormValues({ ...formValues, zipCode: e.target.value })
                }
                error={!!errors.zipCode}
                helperText={errors.zipCode}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Email"
                type="email"
                required
                value={formValues.email}
                onChange={(e) =>
                  setFormValues({ ...formValues, email: e.target.value })
                }
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Additional Information"
                multiline
                rows={4}
                fullWidth
                value={formValues.additionalInfo}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    additionalInfo: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" gutterBottom>
                Payment Details
              </Typography>
            </Grid>
          </Grid>

          <FormControl component="fieldset" sx={{ marginTop: 4 }}>
            <RadioGroup
              value={paymentMethod}
              onChange={handlePaymentMethodChange}
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
                value={formValues.cardNumber}
                onChange={(e) =>
                  setFormValues({ ...formValues, cardNumber: e.target.value })
                }
                error={!!errors.cardNumber}
                helperText={errors.cardNumber}
              />
            )}
          </FormControl>
          <Box sx={{ marginTop: 4 }}>
            <StyledButton
              type="submit"
              variant="outlined"
              color="primary"
              sx={{ marginTop: 4 }}
              disabled={cartItems.length === 0}
            >
              Place Order
            </StyledButton>
          </Box>
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
                <img
                  src={item.thumbnail}
                  alt={item.name}
                  style={{
                    width: "100%",
                    height: "150px", // Set a fixed height
                    borderRadius: "8px",
                    objectFit: "cover", // Ensures the image fills the area while maintaining aspect ratio
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <Typography variant="body1">{item.title}</Typography>
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
        </Box>
      </Box>

      <Snackbar
        open={snackbarOpen}
        onClose={handleCloseSnackbar}
        message="Order placed successfully!"
        action={
          <Button color="inherit" onClick={handleCloseSnackbar}>
            <Close />
          </Button>
        }
      />
    </ThemeProvider>
  );
}

export default CheckOut;
