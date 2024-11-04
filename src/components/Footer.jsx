import React from "react";
import {
  Box,
  Typography,
  Link,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const FooterContainer = styled(Box)(({ theme }) => ({
  color: theme.palette.common.black,
  padding: theme.spacing(4, 10),
  display: "flex",
  justifyContent: "space-between",
  flexWrap: "wrap",
  backgroundColor: "#f5f5f5", // Light background to contrast with the grey divider
  minHeight: "250px", // Set a minimum height for the footer
}));

const Section = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  flex: "1",
  padding: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    flex: "1 1 100%",
  },
}));

const FooterTitle = styled(Typography)(({ theme }) => ({
  fontSize: "17px",
  marginBottom: theme.spacing(2),
  color: theme.palette.text.secondary, // Use the theme's color for text
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: theme.palette.common.black,
  marginBottom: theme.spacing(1),
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline",
  },
  fontFamily: "poppins",
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left",
  fontWeight: "bold",
}));

const NewsletterInput = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  marginLeft: theme.spacing(1),
  width: "70%",
  "&.MuiOutlinedInput-root.MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.common.black, // Set the outline color initially
  },
}));

const FooterButton = styled(Button)(({ theme }) => ({
  paddingTop: "3rem",
  paddingRight: "5rem",
  marginLeft: "1px",
  textDecoration: "underline",
  "&:hover": {
    textDecoration: "underline",
  },
  fontFamily: "poppins",
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left",
  fontWeight: "bold",
}));

function Footer() {
  return (
    <>
      <FooterContainer>
        {/* Furniro Section */}
        <Section>
          <Typography
            variant="h6"
            fontWeight="bold"
            fontFamily="poppins"
            gutterBottom
          >
            Funiro.
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
            }}
          >
            400 University Drive Suite 200 Coral Gables,
            <br /> FL 33134 USA
          </Typography>
        </Section>
        {/* Links Section */}
        <Section>
          <FooterTitle>Links</FooterTitle>
          <FooterLink href="#">Home</FooterLink>
          <FooterLink href="#">About</FooterLink>
          <FooterLink href="#">Shop</FooterLink>
          <FooterLink href="#">Contact</FooterLink>
        </Section>
        {/* Helps Section */}
        <Section>
          <FooterTitle>Helps</FooterTitle>
          <FooterLink href="#">FAQs</FooterLink>
          <FooterLink href="#">Shipping</FooterLink>
          <FooterLink href="#">Returns</FooterLink>
          <FooterLink href="#">Support</FooterLink>
        </Section>
        {/* Newsletter Section */}
        <Section>
          <FooterTitle>Newsletter</FooterTitle>
          <NewsletterInput
            variant="standard"
            size="small"
            placeholder="Enter your email"
          />
        </Section>
        <Section>
          <FooterButton
            variant="standard"
            size="large"
            disabled={NewsletterInput === ""} // Disable if NewsletterInput is empty
          >
            Subscribe
          </FooterButton>
        </Section>
        {/* Divider */}
        <Divider sx={{ width: "100%", my: 2 }} />
        <Typography
          variant="body2"
          align="center"
          sx={{ color: "text.secondary", mt: 2 }}
        >
          © 2024 Furniro. All rights reserved.
        </Typography>
      </FooterContainer>
    </>
  );
}

export default Footer;
