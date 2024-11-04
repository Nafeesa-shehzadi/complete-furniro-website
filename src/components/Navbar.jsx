import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Badge,
  MenuItem,
  Menu,
  ListItemText,
  Divider,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MenuIcon from "@mui/icons-material/Menu"; // Import the Hamburger Menu Icon
import CloseIcon from "@mui/icons-material/Close"; // Import Close Icon
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  removeItemFromCart,
  clearCart,
} from "../redux/cartSlice";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(1),
  maxWidth: "100%",
}));

const Logo = styled("img")({
  height: 80,
  width: "auto",
  maxWidth: "100%",
  cursor: "pointer",
});

const CenterNav = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(3),
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    display: "none", // Hide navigation links on smaller screens
  },
}));

const RightIcons = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(3),
  paddingRight: theme.spacing(10), // Adjusted padding
  marginRight: theme.spacing(3),

  alignItems: "center",
  // Show icons on larger screens and hide them on smaller screens
  [theme.breakpoints.down("md")]: {
    display: "none", // Hide icons on smaller screens
  },
}));

const MobileIcons = styled(Box)(({ theme }) => ({
  display: "none",
  gap: theme.spacing(1),
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    display: "flex", // Show icons on smaller screens
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "30px",
  borderColor: "#ad8544",
  color: "#ad8544",
  "&:hover": {
    backgroundColor: "#ad8544",
    color: "white",
  },
  textTransform: "none",
}));

const CustomMenuItem = styled(MenuItem)(({ theme }) => ({
  display: "flex", // Use flexbox for layout
  justifyContent: "center", // Center the items horizontally
  alignItems: "center", // Center the items vertically
  padding: "15px", // Add padding
  maxWidth: "400px", //
  "&:hover": {
    backgroundColor: "transparent", // Keep the background transparent on hover
  },
  [theme.breakpoints.down("md")]: {
    fontSize: 18, // Adjust font size for smaller screens
    padding: theme.spacing(1),
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: 14, // Adjust font size for smaller screens
  },
}));

export default function Navbar() {
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const cartItems = useSelector(selectCartItems);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const getLinkStyle = (path) => ({
    textDecoration: "none",
    color: location.pathname === path ? "#ad8544" : "#000",
    fontWeight: location.pathname === path ? "bold" : "normal",
  });

  const handleCartClick = (event) => {
    setAnchorEl(event.currentTarget);
    setMobileMenuOpen(false); // Close the mobile menu when the cart icon is clicked
  };

  const handleCartClose = () => {
    setAnchorEl(null);
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeItemFromCart(itemId));
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.discountPrice,
    0
  );

  const handleClearCart = () => {
    dispatch(clearCart());
    setAnchorEl(null);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <StyledToolbar>
        <Logo src="/logo.jpg" alt="Logo" />

        <CenterNav>
          <Typography variant="h6">
            <Link to="/" style={getLinkStyle("/")}>
              Home
            </Link>
          </Typography>
          <Typography variant="h6">
            <Link to="/about" style={getLinkStyle("/about")}>
              About
            </Link>
          </Typography>
          <Typography variant="h6">
            <Link to="/shop" style={getLinkStyle("/shop")}>
              Shop
            </Link>
          </Typography>
          <Typography variant="h6">
            <Link to="/contact" style={getLinkStyle("/contact")}>
              Contact
            </Link>
          </Typography>
        </CenterNav>

        {/* Icons that are always displayed on larger screens */}
        <RightIcons>
          <Link to="/blog" style={{ color: "inherit" }}>
            <IconButton color="inherit">
              <PersonOutlineOutlinedIcon />
            </IconButton>
          </Link>
          <Link to="/shop" style={{ color: "inherit" }}>
            <IconButton color="inherit">
              <SearchOutlinedIcon />
            </IconButton>
          </Link>
          <IconButton color="inherit">
            <FavoriteBorderOutlinedIcon />
          </IconButton>
          <IconButton color="inherit" onClick={handleCartClick}>
            <Badge badgeContent={cartItems.length} color="error">
              <ShoppingCartOutlinedIcon />
            </Badge>
          </IconButton>
        </RightIcons>

        {/* Mobile Icons - shown only on smaller screens */}
        <MobileIcons>
          <IconButton onClick={toggleMobileMenu} color="inherit">
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </MobileIcons>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <Box
            sx={{
              display: { xs: "block", md: "none" }, // Display on mobile only
              position: "absolute",
              top: "64px", // Adjust according to your AppBar height
              left: 0,
              right: 0,
              bgcolor: "background.paper",
              boxShadow: 2,
              zIndex: 1000,
            }}
          >
            <MenuItem onClick={toggleMobileMenu}>
              <Link to="/" style={getLinkStyle("/")}>
                Home
              </Link>
            </MenuItem>
            <MenuItem onClick={toggleMobileMenu}>
              <Link to="/about" style={getLinkStyle("/about")}>
                About
              </Link>
            </MenuItem>
            <MenuItem onClick={toggleMobileMenu}>
              <Link to="/shop" style={getLinkStyle("/shop")}>
                Shop
              </Link>
            </MenuItem>
            <MenuItem onClick={toggleMobileMenu}>
              <Link to="/contact" style={getLinkStyle("/contact")}>
                Contact
              </Link>
            </MenuItem>

            <MenuItem>
              <IconButton color="inherit" onClick={handleCartClick}>
                <Badge badgeContent={cartItems.length} color="error">
                  <ShoppingCartOutlinedIcon />
                </Badge>
              </IconButton>
            </MenuItem>
          </Box>
        )}

        {/* Shopping Cart Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCartClose}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{ padding: 1 }} // Adjust padding as needed
          >
            <Typography variant="h6" fontWeight="bold" sx={{ m: 1 }}>
              Shopping Cart
            </Typography>
            <ShoppingBasketOutlinedIcon />
          </Box>
          {cartItems.length === 0 ? (
            <MenuItem>
              <ListItemText primary="Cart is empty" />
            </MenuItem>
          ) : (
            cartItems.map((item) => (
              <CustomMenuItem
                key={item.id}
                disableRipple
                justifyContent="center"
              >
                <ListItemText
                  sx={{
                    whiteSpace: "wrap",
                    textTransform: "capitalize",
                    width: "200px",
                  }}
                  primary={item.title}
                />
                <Typography marginLeft="6px">{item.discountPrice}</Typography>
                <IconButton
                  edge="end"
                  color="inherit"
                  onClick={() => handleRemoveItem(item.id)}
                  style={{ marginLeft: "30px" }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </CustomMenuItem>
            ))
          )}
          <Divider />
          {cartItems.length > 0 && (
            <CustomMenuItem>
              <ListItemText primary="Total" />
              <Typography fontWeight="bold">
                ${totalPrice.toFixed(2)}
              </Typography>
            </CustomMenuItem>
          )}
          {cartItems.length > 0 && (
            <CustomMenuItem disableRipple justifyContent="center">
              <Link
                to="/cart"
                style={{ textDecoration: "none" }}
                onClick={handleCartClose}
              >
                <StyledButton variant="outlined">Cart details</StyledButton>
              </Link>
              <Link
                to="/checkout"
                style={{ textDecoration: "none" }}
                onClick={handleCartClose}
              >
                <StyledButton
                  variant="outlined"
                  style={{ marginLeft: "8px" }} // Optional: Add some space between buttons
                >
                  Checkout now
                </StyledButton>
              </Link>
              <StyledButton
                variant="outlined"
                onClick={handleClearCart}
                style={{ marginLeft: "8px" }} // Optional: Add some space between buttons
              >
                Clear cart
              </StyledButton>
            </CustomMenuItem>
          )}
        </Menu>
      </StyledToolbar>
    </AppBar>
  );
}
