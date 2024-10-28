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
  ListItemAvatar,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  removeItemFromCart,
  clearCart,
} from "../redux/cartSlice";
import { Delete } from "@mui/icons-material";
const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(1),
  maxWidth: "100%",
  overflowX: "hidden", // Ensure no horizontal scroll
}));

const Logo = styled("img")({
  height: 80,
  width: "auto",
  maxWidth: "100%",
  cursor: "pointer",
});

const CenterNav = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(4),
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    display: "none", // Hide navigation links on smaller screens
  },
  overflowX: "hidden", // Hide horizontal overflow
}));

const RightIcons = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(4), // Adjusted gap
  alignItems: "center",
  paddingRight: theme.spacing(10), // Adjusted padding
  marginRight: theme.spacing(3),
}));
const StyledButton = styled(Button)(({ theme }) => ({
  marginLeft: "30px",
  borderRadius: "30px",
  borderColor: "#ad8544", // Set the border color
  color: "#ad8544", // Set the text color
  "&:hover": {
    backgroundColor: "#ad8544", // Background color on hover
    color: "white", // Text color on hover
  },
  textTransform: "none",
}));
const CustomMenuItem = styled(MenuItem)({
  "&.MuiMenuItem-root": {
    "&:hover": {
      backgroundColor: "transparent", // Remove gray hover color
    },
    "&.Mui-selected": {
      backgroundColor: "transparent", // Remove gray background on click/focus
      "&:hover": {
        backgroundColor: "transparent", // Prevent background on hover when selected
      },
    },
    "&:active": {
      backgroundColor: "transparent", // Remove background on active/click state
    },
  },
});
export default function Navbar() {
  const location = useLocation(); // Get current route
  const [anchorEl, setAnchorEl] = useState(null);
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  // Function to apply styles for active and inactive links
  const getLinkStyle = (path) => ({
    textDecoration: "none",
    color: location.pathname === path ? "#ad8544" : "#000", // Active link color
    fontWeight: location.pathname === path ? "bold" : "normal", // Bold active link
  });

  const handleCartClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCartClose = () => {
    setAnchorEl(null);
  };
  const handleRemoveItem = (itemId) => {
    dispatch(removeItemFromCart(itemId));
  };
  // Calculate total price
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.discountPrice,
    0
  );
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <StyledToolbar>
        {/* Left - Logo */}
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

        {/* Right - Icons */}
        <RightIcons>
          <IconButton color="inherit">
            <PersonOutlineOutlinedIcon />
          </IconButton>
          <IconButton color="inherit">
            <SearchOutlinedIcon />
          </IconButton>
          <IconButton color="inherit">
            <FavoriteBorderOutlinedIcon />
          </IconButton>
          <IconButton color="inherit" onClick={handleCartClick}>
            <Badge badgeContent={cartItems.length} color="error">
              <ShoppingCartOutlinedIcon />
            </Badge>
          </IconButton>
        </RightIcons>
        {/* Cart Dropdown */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCartClose}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            align="center"
            sx={{ m: 2 }}
          >
            Shopping Cart
          </Typography>
          {cartItems.length === 0 ? (
            <MenuItem>
              <ListItemText primary="Cart is empty" />
            </MenuItem>
          ) : (
            cartItems.map((item) => (
              <CustomMenuItem key={item.id}>
                <ListItemText primary={item.name} />
                <Typography>${item.discountPrice}</Typography>
                <IconButton
                  edge="end"
                  color="inherit"
                  onClick={() => handleRemoveItem(item.id)}
                  style={{ marginLeft: "30px" }}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </CustomMenuItem>
            ))
          )}

          {/* Divider for visual separation */}
          <Divider />

          {/* Total Price */}
          {cartItems.length > 0 && (
            <>
              <CustomMenuItem>
                <ListItemText primary="Total" />
                <Typography fontWeight="bold">
                  ${totalPrice.toFixed(2)}
                </Typography>
              </CustomMenuItem>
              {/* Checkout Button */}
              <CustomMenuItem>
                <Link to="/cart" style={{ textDecoration: "none" }}>
                  <StyledButton variant="outlined">Cart details</StyledButton>
                </Link>
                <Link to="/checkout" style={{ textDecoration: "none" }}>
                  <StyledButton variant="outlined">Checkout now</StyledButton>
                </Link>
                <StyledButton
                  variant="outlined"
                  color="#ad8544"
                  onClick={handleClearCart}
                  style={{ marginLeft: "8px" }} // Optional: Add some space between buttons
                >
                  Clear cart
                </StyledButton>
              </CustomMenuItem>
            </>
          )}
        </Menu>
      </StyledToolbar>
    </AppBar>
  );
}
