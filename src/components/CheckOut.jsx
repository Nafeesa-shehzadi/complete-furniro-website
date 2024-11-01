import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Snackbar,
  OutlinedInput,
  InputLabel,
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

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
    if (e.target.value === "cod") {
      setFormValues({ ...formValues, cardNumber: "" });
      setErrors((prevErrors) => ({ ...prevErrors, cardNumber: undefined }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      setSnackbarOpen(true);
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
              <InputLabel>First Name:</InputLabel>
              <OutlinedInput
                fullWidth
                value={formValues.firstName}
                onChange={(e) => {
                  const { value } = e.target;
                  setFormValues((prevValues) => ({
                    ...prevValues,
                    firstName: value,
                  }));

                  // Remove the error for 'firstName' when the input changes
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    firstName: value ? undefined : prevErrors.firstName,
                  }));
                }}
                error={!!errors.firstName}
              />
            </Grid>

            <Grid item xs={6}>
              <InputLabel>Last Name</InputLabel>
              <OutlinedInput
                fullWidth
                value={formValues.lastName}
                onChange={(e) => {
                  const { value } = e.target;
                  setFormValues((prevValues) => ({
                    ...prevValues,
                    lastName: value,
                  }));

                  // Remove the error for 'lastName' when the input changes
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    lastName: value ? undefined : prevErrors.lastName,
                  }));
                }}
                error={!!errors.lastName}
              />
            </Grid>

            <Grid item xs={12}>
              <InputLabel>Company Name (optional)</InputLabel>
              <OutlinedInput
                fullWidth
                value={formValues.companyName}
                onChange={(e) =>
                  setFormValues({ ...formValues, companyName: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel>Country</InputLabel>
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
              <InputLabel>Street Address</InputLabel>
              <OutlinedInput
                fullWidth
                value={formValues.address}
                onChange={(e) => {
                  const { value } = e.target;
                  setFormValues((prevValues) => ({
                    ...prevValues,
                    address: value,
                  }));

                  // Clear the error for 'address' if the input has a value
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    address: value ? undefined : prevErrors.address,
                  }));
                }}
                error={!!errors.address}
              />
            </Grid>

            <Grid item xs={6}>
              <InputLabel>Town/City</InputLabel>
              <OutlinedInput
                fullWidth
                value={formValues.city}
                onChange={(e) => {
                  const { value } = e.target;
                  setFormValues((prevValues) => ({
                    ...prevValues,
                    city: value,
                  }));

                  // Clear the error for 'city' if the input has a value
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    city: value ? undefined : prevErrors.city,
                  }));
                }}
                error={!!errors.city}
              />
            </Grid>

            <Grid item xs={6}>
              <InputLabel>Province</InputLabel>
              <OutlinedInput
                fullWidth
                value={formValues.province}
                onChange={(e) => {
                  const { value } = e.target;
                  setFormValues((prevValues) => ({
                    ...prevValues,
                    province: value,
                  }));

                  // Clear the error for 'province' if the input has a value
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    province: value ? undefined : prevErrors.province,
                  }));
                }}
                error={!!errors.province}
              />
            </Grid>

            <Grid item xs={6}>
              <InputLabel>Zip Code</InputLabel>
              <OutlinedInput
                fullWidth
                value={formValues.zipCode}
                type="Number"
                onChange={(e) => {
                  const { value } = e.target;
                  setFormValues((prevValues) => ({
                    ...prevValues,
                    zipCode: value,
                  }));

                  // Clear the error for 'zipCode' if the input has a value
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    zipCode: value ? undefined : prevErrors.zipCode,
                  }));
                }}
                error={!!errors.zipCode}
              />
            </Grid>

            <Grid item xs={6}>
              <InputLabel>Email</InputLabel>
              <OutlinedInput
                fullWidth
                type="email"
                value={formValues.email}
                onChange={(e) => {
                  const { value } = e.target;
                  setFormValues((prevValues) => ({
                    ...prevValues,
                    email: value,
                  }));

                  // Clear the error for 'email' if the input has a value
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    email: value ? undefined : prevErrors.email,
                  }));
                }}
                error={!!errors.email}
              />
            </Grid>

            <Grid item xs={12}>
              <InputLabel>Additional Information</InputLabel>
              <OutlinedInput
                fullWidth
                multiline
                rows={4}
                value={formValues.additionalInfo}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    additionalInfo: e.target.value,
                  })
                }
              />
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
              <OutlinedInput
                fullWidth
                placeholder="Card Number"
                type="text"
                sx={{ marginTop: 2 }}
                value={formValues.cardNumber}
                onChange={(e) =>
                  setFormValues({ ...formValues, cardNumber: e.target.value })
                }
                error={!!errors.cardNumber}
              />
            )}
          </FormControl>
          <Box sx={{ marginTop: 4 }}>
            <StyledButton
              type="submit"
              variant="outlined"
              onClick={handleSubmit}
              disabled={cartItems.length === 0}
            >
              Place Order
            </StyledButton>
          </Box>
        </Box>

        <Box
          sx={{
            marginTop: 4,
            marginLeft: 3,
            padding: 4,
            width: "50%",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Your Order
          </Typography>
          {cartItems.map((item) => (
            <Box
              key={item.id}
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography>{item.title}</Typography>
              <Typography>
                {item.discountPrice} x {item.quantity}
              </Typography>
            </Box>
          ))}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Typography variant="h6">Total:</Typography>
            <Typography variant="h6" color="#ad8544" fontWeight="bold">
              {totalPrice.toFixed(2)}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Snackbar
        open={snackbarOpen}
        onClose={handleCloseSnackbar}
        autoHideDuration={3000}
        message="Order placed successfully!"
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        action={
          <Button color="inherit" size="small" onClick={handleCloseSnackbar}>
            <Close />
          </Button>
        }
      />
    </ThemeProvider>
  );
}

export default CheckOut;
