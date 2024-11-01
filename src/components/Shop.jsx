import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import { fetchProducts, selectDisplayedProducts } from "../redux/productSlice"; // Adjust the import path as necessary
import { addItemToCart, selectCartItems } from "../redux/cartSlice";
import { useNavigate, Link } from "react-router-dom";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import ShareIcon from "@mui/icons-material/Share";
import { Search } from "@mui/icons-material";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"; // Outlined icon for hollow like
import GridViewIcon from "@mui/icons-material/GridView";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewListIcon from "@mui/icons-material/ViewList";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Grid,
  Grid2,
  CardContent,
  TextField,
  InputAdornment,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Snackbar,
  Badge,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const itemsPerPage = 8; // Fixed number of items per page

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
  margin: 0, // Ensure there's no margin around this section
  padding: 0, // Ensure there's no padding around this section
}));

const SearchSection = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between", // Adjusted for better spacing on small screens
  alignItems: "center",
  backgroundColor: "#f2edda",
  flexDirection: "row",
  gap: theme.spacing(2), // Reduced gap for better fitting on smaller screens
  padding: theme.spacing(2), // Default padding for smaller screens
  height: "15vh",
  marginTop: 0, // Ensure there's no margin around this section

  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(0, 5), // Adjust padding for small screens
  },
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(0, 10), // Padding for medium screens
  },
  [theme.breakpoints.up("lg")]: {
    padding: theme.spacing(0, 15), // Padding for large screens
  },
  [theme.breakpoints.up("xl")]: {
    padding: theme.spacing(0, 20), // Padding for extra-large screens
  },
}));

const StyledImage = styled("img")({
  width: "100%",
  maxWidth: "250px",
  height: "200px",
  display: "block",
});

const StyledCard = styled("div")({
  position: "relative",
  "&:hover .add-to-cart-btn, &:hover .icon-row, &:hover .overlay": {
    opacity: 1, // Show on hover
  },
  width: "250px",
});

const StyledImageContainer = styled("div")({
  position: "relative",
  overflow: "hidden",
});

const Overlay = styled("div")({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.6)", // Black overlay with slight transparency
  backdropFilter: "blur(5px)", // Apply blur effect
  opacity: 0, // Hidden initially
  transition: "opacity 0.3s ease-in-out",
});

const AddToCartButton = styled(Button)(({ theme }) => ({
  position: "absolute",
  bottom: "200px",
  left: "50%",
  right: "1%",
  transform: "translateX(-50%)",
  opacity: 0, // Hidden initially
  transition: "opacity 0.3s ease-in-out",
  backgroundColor: theme.palette.common.white,
  color: theme.palette.warning.main, // Yellow text
}));

const IconRow = styled(Box)({
  position: "absolute",
  bottom: "150px",
  left: "50%",
  right: "10%",
  transform: "translateX(-50%)",
  opacity: 0, // Hidden initially
  transition: "opacity 0.3s ease-in-out",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "1px",
  color: "white", // Set icon and text color to white
});

const ProductItems = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(3),
  padding: theme.spacing(10),
  flexDirection: "column",
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: theme.spacing(2),
  gap: theme.spacing(2),
}));

const NextButtons = styled(Button)(({ theme, active }) => ({
  fontSize: 20,
  backgroundColor: active ? "#ad8544" : "#e6d6bc",
  color: active ? theme.palette.common.white : theme.palette.common.black,
  borderRadius: "7px",
  "&:hover": {
    backgroundColor: "#ad8544",
  },
}));
const StyledButton = styled(Button)(({ theme }) => ({
  position: "absolute",
  bottom: "110px",
  left: "45%",
  transform: "translateX(-50%)",
  opacity: 0, // Hidden initially
  transition: "opacity 0.3s ease-in-out",
  borderColor: theme.palette.common.white,
  color: theme.palette.common.white,
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
const TitleContainer = styled("div")(({ expanded }) => ({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  WebkitLineClamp: expanded ? "none" : 1, // Show full title if expanded, otherwise limit to 2 lines
  cursor: "pointer", // Pointer cursor for title
  transition: "font-size 0.2s", // Transition for font size
}));
const StyledBadge = styled(Badge)(({ theme, isNew }) => ({
  position: "absolute",
  top: "10px",
  right: "12px",
  padding: "15px 10px",
  color: "white",
  backgroundColor: isNew ? "#30c4ac" : "#ec8484", // Green for new, red for discount
  borderRadius: "50%",
  fontWeight: "bold",
  fontSize: "0.8rem",
}));
function Shop() {
  const theme = createTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("az");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalDisplayCount, setTotalDisplayCount] = useState(8); // Total items to display
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const products = useSelector(selectDisplayedProducts);
  const cartItems = useSelector(selectCartItems);
  const status = useSelector((state) => state.products.status);
  const [likedItems, setLikedItems] = useState({});
  const [itemsPerRow, setItemsPerRow] = useState(3); // Initially 4 items per row
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  // Combined search and sort
  const filteredAndSortedProducts = products
    .filter((product) => product.title.toLowerCase().includes(searchQuery))
    .sort((a, b) => {
      switch (sortOption) {
        case "expensive":
          return b.discountPrice - a.discountPrice;
        case "cheaper":
          return a.discountPrice - b.discountPrice;
        case "az":
          return a.title.localeCompare(b.title);
        case "za":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

  const totalItemsToDisplay = Math.min(
    totalDisplayCount,
    filteredAndSortedProducts.length
  ); // Limit to available products
  const totalPages = Math.ceil(totalItemsToDisplay / itemsPerPage);
  const displayedProducts = filteredAndSortedProducts
    .slice(0, totalItemsToDisplay)
    .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage); // Control displayed items based on pagination

  const handleSearchChange = (e) =>
    setSearchQuery(e.target.value.toLowerCase());
  const handleSortChange = (e) => setSortOption(e.target.value);

  const handleDisplayCountChange = (e) => {
    setTotalDisplayCount(e.target.value);
    setCurrentPage(0); // Reset to first page when display count changes
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) setCurrentPage(newPage);
  };

  const handleAddToCart = (product) => {
    const isInCart = cartItems.some((item) => item.id === product.id);
    if (!isInCart) {
      dispatch(addItemToCart({ ...product, quantity: 1 }));
      setSnackbarOpen(true);
      setSnackbarMessage(`${product.title} added in Cart`);
    } else {
      setSnackbarOpen(true);
      setSnackbarMessage("Product already in cart");
    }
  };

  const handleSnackbarClose = () => setSnackbarOpen(false);
  // Function to handle like toggle
  const handleLikeToggle = (productId) => {
    setLikedItems((prevLikedItems) => ({
      ...prevLikedItems,
      [productId]: !prevLikedItems[productId], // Toggle the liked state
    }));
  };
  // Function to handle navigation when button is clicked
  const handleExploreMore = (product) => {
    navigate(`/product/${product.id}`);
  };
  const handleGridChange = (size) => {
    setItemsPerRow(size);
  };
  const [expandedProductId, setExpandedProductId] = useState(null); // State for expanded card

  // ... existing useEffect and functions remain the same

  const handleTitleClick = (id) => {
    if (expandedProductId === id) {
      setExpandedProductId(null); // Collapse if already expanded
    } else {
      setExpandedProductId(id); // Expand to show full title
    }
  };
  const totalButtons = Math.ceil(products.length / itemsPerPage); // Total buttons based on products

  return (
    <ThemeProvider theme={theme}>
      <HeroSection>
        <Box>
          <img src="mainlogo.png" alt="logo" />
          <Typography variant="h4" fontWeight="bold">
            Shop
          </Typography>
          <Typography
            variant="h5"
            component="div"
            sx={{ display: "flex", alignItems: "center" }}
          >
            {/* Link to Home */}
            <Link
              to="/"
              style={{
                textDecoration: "none", // Remove underline from link
                fontWeight: "bold", // Always bold
                color: "#000", // Color for Home link
                marginRight: "8px", // Space between text and icon
              }}
            >
              Home
            </Link>

            {/* Navigate icon and Shop text */}
            <NavigateNextOutlinedIcon />
            <Typography
              variant="h5"
              component="span"
              sx={{ marginLeft: "8px" }}
            >
              Shop
            </Typography>
          </Typography>
        </Box>
      </HeroSection>
      <SearchSection>
        <TextField
          label="Search products..."
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <FormControl variant="outlined" sx={{ minWidth: 60 }}>
          <InputLabel>Sort by</InputLabel>
          <Select
            value={sortOption}
            onChange={handleSortChange}
            label="Sort by"
          >
            <MenuItem value="expensive">Expensive</MenuItem>
            <MenuItem value="cheaper">Cheaper</MenuItem>
            <MenuItem value="az">A-Z</MenuItem>
            <MenuItem value="za">Z-A</MenuItem>
          </Select>
        </FormControl>
        <GridViewIcon
          onClick={() => handleGridChange(6)}
          sx={{ display: { xs: "none", sm: "block" } }} // Hide on small screens
        />
        <ViewModuleIcon
          onClick={() => handleGridChange(3)}
          sx={{ display: { xs: "none", sm: "block" } }} // Hide on small screens
        />
        <ViewListIcon
          onClick={() => handleGridChange(12)}
          sx={{ display: { xs: "none", sm: "block" } }} // Hide on small screens
        />
        <FormControl variant="outlined" sx={{ minWidth: 60 }}>
          <InputLabel>Show</InputLabel>
          <Select
            value={totalDisplayCount}
            onChange={handleDisplayCountChange}
            label="Display Count"
          >
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={12}>12</MenuItem>
            <MenuItem value={24}>24</MenuItem>
            <MenuItem value={30}>All</MenuItem>
          </Select>
        </FormControl>
        <Typography variant="body2">
          Showing {totalDisplayCount} of {filteredAndSortedProducts.length}{" "}
          items.
        </Typography>
      </SearchSection>

      <ProductItems>
        <Grid container spacing={2} justifyContent="center">
          {displayedProducts.map((product) => (
            <Grid
              item
              xs={12} // 1 item per row on extra-small screens
              sm={itemsPerRow === 12 ? 12 : 6} // 2 items per row for '12' layout; 4 otherwise on small screens
              md={itemsPerRow === 3 ? 3 : itemsPerRow === 6 ? 6 : 12} // 4, 2, or 1 items per row on medium
              lg={itemsPerRow} // Full control over the grid size for large screens
              key={product.id}
            >
              {" "}
              <StyledCard>
                <StyledImageContainer>
                  <StyledBadge isNew={product.isNew}>
                    {product.isNew ? "New" : "-10%"}
                  </StyledBadge>
                  <StyledImage src={product.thumbnail} alt={product.title} />
                  <Overlay className="overlay" />{" "}
                  {/* Black overlay with blur effect */}
                  <AddToCartButton
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </AddToCartButton>
                  <IconRow className="icon-row">
                    <IconButton sx={{ m: "2px" }}>
                      <ShareIcon style={{ color: "white" }} />
                      <Typography variant="body2" style={{ color: "white" }}>
                        {" "}
                        Share
                      </Typography>
                    </IconButton>

                    <IconButton>
                      <CompareArrowsIcon style={{ color: "white" }} />
                      <Typography variant="body2" style={{ color: "white" }}>
                        {" "}
                        Compare
                      </Typography>
                    </IconButton>

                    <IconButton
                      sx={{ mr: "2px" }}
                      onClick={() => handleLikeToggle(product.id)}
                    >
                      {likedItems[product.id] ? (
                        <>
                          <FavoriteIcon style={{ color: "red" }} />
                          <Typography
                            variant="body2"
                            style={{ color: "white" }}
                          >
                            {" "}
                            Liked
                          </Typography>
                        </>
                      ) : (
                        <>
                          <FavoriteBorderIcon style={{ color: "white" }} />
                          <Typography
                            variant="body2"
                            style={{ color: "white" }}
                          >
                            {" "}
                            Like
                          </Typography>
                        </>
                      )}
                    </IconButton>
                  </IconRow>
                  <StyledButton
                    className="add-to-cart-btn"
                    onClick={() => handleExploreMore(product)} // Navigate on click
                  >
                    Explore More
                  </StyledButton>
                  <CardContent sx={{ backgroundColor: "#edf0f2" }}>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      onClick={() => handleTitleClick(product.id)} // Click handler to expand/collapse
                      style={{
                        cursor: "pointer",
                        transition: "font-size 0.2s",
                      }} // Pointer cursor for title
                    >
                      <TitleContainer
                        expanded={expandedProductId === product.id}
                      >
                        {product.title}
                      </TitleContainer>
                    </Typography>

                    <Typography
                      variant="body2"
                      fontWeight="bold"
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Box component="span">
                        Rs: {product.discountPrice}{" "}
                        {/* Discount price at the start */}
                      </Box>
                      <Box
                        component="span"
                        sx={{
                          ml: 2,
                          color: "text.secondary",
                          fontWeight: "normal",
                        }} // Left margin and secondary color for original price
                      >
                        <del> Rs:{product.price}</del>{" "}
                        {/* Original price with strikethrough at the end */}
                      </Box>
                    </Typography>
                  </CardContent>
                </StyledImageContainer>
              </StyledCard>
            </Grid>
          ))}
        </Grid>

        {/* Pagination Buttons */}
        <ButtonContainer>
          {Array.from({ length: totalButtons }, (_, index) => (
            <NextButtons
              key={index}
              onClick={() => handlePageChange(index)}
              active={index === currentPage && index < totalPages} // Only active within totalPages
              disabled={index >= totalPages} // Disable buttons beyond totalPages
            >
              {index + 1}
            </NextButtons>
          ))}
        </ButtonContainer>
      </ProductItems>
      <Grid2 item xs={12} sm={6}>
        <ServiceBox>
          <ServiceImage src="quality.png" alt="logo" />
          <ServiceTextContainer>
            <ServiceTitle>High Quality</ServiceTitle>
            <ServiceDescription>crafted from top materials</ServiceDescription>
          </ServiceTextContainer>
          <ServiceImage src="wrnty.png" alt="logo" />
          <ServiceTextContainer>
            <ServiceTitle>Warranty Protection</ServiceTitle>
            <ServiceDescription>over 2 years</ServiceDescription>
          </ServiceTextContainer>

          <ServiceImage src="shiping.png" alt="logo" />
          <ServiceTextContainer>
            <ServiceTitle>Free Shipping</ServiceTitle>
            <ServiceDescription>order over 150 $</ServiceDescription>
          </ServiceTextContainer>
          <ServiceImage src="support.png" alt="logo" />
          <ServiceTextContainer>
            <ServiceTitle>24 / 7 Support</ServiceTitle>
            <ServiceDescription>Dedicated support</ServiceDescription>
          </ServiceTextContainer>
        </ServiceBox>
      </Grid2>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        action={
          <IconButton
            size="small"
            color="inherit"
            onClick={handleSnackbarClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </ThemeProvider>
  );
}

export default Shop;
