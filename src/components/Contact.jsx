import React, { useState } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Button, Typography, TextField, Snackbar } from "@mui/material";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import { Link } from "react-router-dom";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import { Close } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup"; // Import Yup for validation

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

const ContactSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4, 6),
  display: "flex",
  flexWrap: "wrap",
  flexDirection: "row",
}));

const ContactForm = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(4),
  padding: theme.spacing(5, 10),
  flexDirection: "column",
  width: "30%",
}));

const Contactdetails = styled(Box)(({ theme }) => ({
  width: "35%",
  paddingTop: theme.spacing(5),
  paddingLeft: theme.spacing(20),
}));

const StyledField = styled(TextField)(({ theme }) => ({
  margin: 1,
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#ccbe66", // Default border color
    },
    "&:hover fieldset": {
      borderColor: "#ad8544", // Border color on hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "#ad8544", // Border color when focused
    },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#ad8544",
  borderRadius: "5px",
  width: "50%",
  height: "50px",
  marginLeft: "1px",
  "&:hover": {
    backgroundColor: "#ad8544",
  },
}));

function Contact() {
  const theme = createTheme();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      message: Yup.string().required("Message is required"),
    }),
    onSubmit: (values) => {
      // Handle successful form submission
      console.log(values); // You can send values to your API here
      setSnackbarOpen(true);
      formik.resetForm(); // Reset the form after submission
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <HeroSection>
        <Box>
          <img src="mainlogo.png" alt="logo" />
          <Typography variant="h4" fontWeight="bold">
            Contact
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
              Contact
            </Typography>
          </Typography>
        </Box>
      </HeroSection>
      <Box
        sx={{
          maxWidth: 500,
          margin: "0 auto",
          padding: theme.spacing(4, 10),
          display: "flex",
          flexWrap: "wrap",
          alignContent: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
          Get In Touch With us
        </Typography>
        <Typography variant="body2" gutterBottom>
          For more information about our product & service, please feel free to
          drop us an email. Our staff is always there to help you out, don’t
          hesitate.
        </Typography>
      </Box>

      <ContactSection>
        <Contactdetails>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Contact Details
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", marginY: 3 }}>
            <LocationOnIcon />
            <Box sx={{ marginLeft: 1 }}>
              <Typography variant="h6" fontWeight="bold">
                Address
              </Typography>
              <Typography variant="body2">
                236 5th SE Avenue, New York
                <br /> NY10000, United States
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", marginY: 6 }}>
            <LocalPhoneIcon />
            <Box sx={{ marginLeft: 1 }}>
              <Typography variant="h6" fontWeight="bold">
                Phone
              </Typography>
              <Typography variant="body2">
                Mobile: +(84) 546-6789
                <br />
                Hotline: +(84) 546-6788
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", marginY: 1 }}>
            <WatchLaterIcon />
            <Box sx={{ marginLeft: 1 }}>
              <Typography variant="h6" fontWeight="bold">
                Working Time
              </Typography>
              <Typography variant="body2">
                Monday-Friday: 9:00 - 22:00
                <br />
                Saturday-Sunday: 9:00 - 21:00
              </Typography>
            </Box>
          </Box>
        </Contactdetails>
        <ContactForm component="form" onSubmit={formik.handleSubmit}>
          <Typography variant="h6" fontWeight="bold">
            Contact Form
          </Typography>
          <StyledField
            label="Name"
            fullWidth
            placeholder="Abc"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <StyledField
            label="Email"
            type="email"
            fullWidth
            placeholder="abc@gmail.com"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <StyledField
            label="Subject"
            fullWidth
            placeholder="This is optional"
            name="subject"
            onChange={formik.handleChange}
            value={formik.values.subject}
          />
          <StyledField
            label="Message"
            multiline
            rows={5}
            placeholder="Type your message here"
            fullWidth
            name="message"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.message}
            error={formik.touched.message && Boolean(formik.errors.message)}
            helperText={formik.touched.message && formik.errors.message}
          />
          <StyledButton type="submit" variant="contained">
            Submit
          </StyledButton>
        </ContactForm>
      </ContactSection>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Your message has been sent!"
        action={
          <Button color="inherit" onClick={handleCloseSnackbar}>
            <Close />
          </Button>
        }
      />
    </ThemeProvider>
  );
}

export default Contact;
