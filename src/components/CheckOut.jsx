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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItems } from "../redux/cartSlice";
import Select from "react-select";
import countryList from "react-select-country-list";
import { Close } from "@mui/icons-material";
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
  border: `1px solid ${theme.palette.common.black}`, // Set a border with color
  marginTop: 10,
  color: theme.palette.common.black,
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
function CheckOut() {
  const theme = createTheme();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [dialogOpen, setDialogOpen] = useState(false);
  const initialFormValues = {
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
  };
  const [formValues, setFormValues] = useState(initialFormValues);
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
    for (const [key, value] of Object.entries(formValues)) {
      if (
        !value &&
        key !== "companyName" &&
        key !== "additionalInfo" &&
        key !== "cardNumber"
      ) {
        newErrors[key] = "This field is required";
      }
    }
    if (paymentMethod === "bank_transfer" && !formValues.cardNumber) {
      newErrors.cardNumber = "Card number is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePaymentMethodChange = (e) => {
    const selectedMethod = e.target.value;
    setPaymentMethod(selectedMethod);
    if (selectedMethod === "cod") {
      setFormValues((prevValues) => ({ ...prevValues, cardNumber: "" }));
      setErrors((prevErrors) => ({ ...prevErrors, cardNumber: undefined }));
    }
  };

  const handlePlaceOrderClick = () => {
    if (validateForm()) {
      setDialogOpen(true);
    }
  };

  const handleConfirmOrder = (event) => {
    event.preventDefault();
    setDialogOpen(false);
    setSnackbarOpen(true);
    setFormValues(initialFormValues);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
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

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          padding: 4,
        }}
      >
        <Box
          component="form"
          sx={{
            marginBottom: 4,
            width: { xs: "100%", md: "40%", sm: "30%" },
            padding: 2,
          }}
        >
          <Typography variant="h4" gutterBottom align="center">
            Billing Details
          </Typography>
          <Grid container spacing={2}>
            {Object.keys(initialFormValues).map(
              (key) =>
                key !== "country" &&
                key !== "cardNumber" && (
                  // Exclude "country" from being rendered twice
                  <Grid
                    item
                    xs={12}
                    md={key === "firstName" || key === "lastName" ? 6 : 12}
                    key={key}
                  >
                    <InputLabel>
                      {key.charAt(0).toUpperCase() +
                        key.slice(1).replace(/([A-Z])/g, " $1")}
                    </InputLabel>
                    <OutlinedInput
                      fullWidth
                      value={formValues[key]}
                      onChange={(e) => {
                        const { value } = e.target;
                        setFormValues((prevValues) => ({
                          ...prevValues,
                          [key]: value,
                        }));
                        if (errors[key]) {
                          setErrors((prevErrors) => ({
                            ...prevErrors,
                            [key]: undefined,
                          }));
                        }
                      }}
                      error={!!errors[key]}
                      multiline={key === "additionalInfo"}
                      rows={key === "additionalInfo" ? 4 : 1}
                    />
                    {errors[key] && (
                      <Typography color="error">{errors[key]}</Typography>
                    )}
                  </Grid>
                )
            )}
            <Grid item xs={12}>
              <InputLabel>Country</InputLabel>
              <Select
                options={options}
                value={formValues.country}
                onChange={(selectedOption) => {
                  setFormValues({ ...formValues, country: selectedOption });
                  if (errors.country) {
                    setErrors((prevErrors) => ({
                      ...prevErrors,
                      country: undefined,
                    }));
                  }
                }}
                placeholder="Select Country"
              />
              {errors.country && (
                <Typography color="error">{errors.country}</Typography>
              )}
            </Grid>
          </Grid>
        </Box>

        <Box
          sx={{
            marginBottom: 4,
            width: { xs: "100%", md: "50%", sm: "30%" },
            padding: 2,
            marginLeft: { xs: 0, md: 5, sm: 0 },
          }}
        >
          <Typography variant="h4" textAlign="center" gutterBottom>
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 2,
              flexDirection: "column",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
              }}
            >
              Make your payment directly into our bank account. Please use your
              Order ID as the payment reference. Your order will not be shipped
              until the funds have cleared in our account.
            </Typography>
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
                <>
                  <OutlinedInput
                    fullWidth
                    required
                    placeholder="Card Number"
                    value={formValues.cardNumber}
                    onChange={(e) => {
                      const { value } = e.target;
                      setFormValues((prevValues) => ({
                        ...prevValues,
                        cardNumber: value,
                      }));
                      if (errors.cardNumber) {
                        setErrors((prevErrors) => ({
                          ...prevErrors,
                          cardNumber: undefined,
                        }));
                      }
                    }}
                    error={!!errors.cardNumber}
                  />
                  <Typography variant="body1">
                    Your personal data will be used to support your experience
                    throughout this website, to manage access to your account,
                    and for other purposes described in our{" "}
                    <span
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      privacy policy
                    </span>{" "}
                    .
                  </Typography>
                </>
              )}
            </FormControl>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <StyledButton
              onClick={handlePlaceOrderClick}
              disabled={cartItems.length === 0}
            >
              Place Order
            </StyledButton>
          </Box>
        </Box>
      </Box>
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
        onClose={handleCloseSnackbar}
        message="Order placed successfully!"
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        action={
          <Button color="inherit" onClick={handleCloseSnackbar}>
            <Close />
          </Button>
        }
      />
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Order"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to place this order?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmOrder} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}

export default CheckOut;
