import React, { useState } from "react";
import { useSelector } from "react-redux";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import { selectProducts } from "../redux/productSlice";
import { useDispatch } from "react-redux";
import { addItemToCart, selectCartItems } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom"; // Import useNavigate
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
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import { Search } from "@mui/icons-material";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"; // Outlined icon for hollow like
import { Link } from "react-router-dom";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewListIcon from "@mui/icons-material/ViewList";
import CloseIcon from "@mui/icons-material/Close";

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

const SearchSection = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#f2edda",
  flexDirection: "row",
  gap: theme.spacing(2),
  padding: theme.spacing(0, 30),
  height: "15vh",
}));
const StyledCard = styled("div")({
  position: "relative",
  overflow: "hidden",
  "&:hover .add-to-cart-btn, &:hover .icon-row, &:hover .overlay": {
    opacity: 1, // Show on hover
  },
  borderRadius: "10px",
});

const StyledImageContainer = styled("div")({
  position: "relative",
  overflow: "hidden",
});

const StyledImage = styled("img")({
  width: "100%",
  maxWidth: "400px",
  height: "auto",
  display: "block",
  margin: "0 auto",
});

const Overlay = styled("div")({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)", // Black overlay with slight transparency
  backdropFilter: "blur(5px)", // Apply blur effect
  opacity: 0, // Hidden initially
  transition: "opacity 0.3s ease-in-out",
});

const AddToCartButton = styled(Button)(({ theme }) => ({
  position: "absolute",
  bottom: "140px",
  left: "50%",
  transform: "translateX(-50%)",
  opacity: 0, // Hidden initially
  transition: "opacity 0.3s ease-in-out",
  backgroundColor: theme.palette.common.white,
  color: theme.palette.warning.main, // Yellow text
  "&:hover": {
    color: theme.palette.warning.main, // Keep yellow text on hover
  },
}));

const IconRow = styled(Box)({
  position: "absolute",
  bottom: "100px",
  left: "50%",
  transform: "translateX(-50%)",
  opacity: 0, // Hidden initially
  transition: "opacity 0.3s ease-in-out",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "20px",
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
  justifyContent: "center", // Center the buttons horizontally
  alignItems: "center",
  marginBottom: theme.spacing(2), // Space above the buttons
  width: "100%", // Use full width of the parent container
  gap: theme.spacing(2), // Space between buttons
}));

const NextButtons = styled(Button)(({ theme, active }) => ({
  fontSize: 20,
  backgroundColor: active ? "#ad8544" : "#e6d6bc", // Change color based on active state
  color: active ? theme.palette.common.white : theme.palette.common.black,
  borderRadius: "7px",
  "&:hover": {
    backgroundColor: "#ad8544",
  },
}));
const ServiceBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap", // Allow items to wrap onto the next line
  alignItems: "flex-start", // Align items at the start
  backgroundColor: "#e6d6bc",
  padding: theme.spacing(10, 2), // Reduce padding to prevent overflow
  height: "auto",
  gap: theme.spacing(2), // Space between items
  overflow: "hidden", // Prevent overflow
}));

const ServiceImage = styled("img")(({ theme }) => ({
  width: 60,
  height: 60,
  paddingLeft: theme.spacing(15),
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
const StyledButton = styled(Button)(({ theme }) => ({
  position: "absolute",
  bottom: "50px",
  left: "50%",
  transform: "translateX(-50%)",
  opacity: 0, // Hidden initially
  transition: "opacity 0.3s ease-in-out",
  borderColor: theme.palette.common.white,
  "&:hover": {
    backgroundColor: "#ad8544",
  },
  color: theme.palette.common.white,
}));

function Shop() {
  const theme = createTheme();
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Create navigate function
  const [searchQuery, setSearchQuery] = useState(""); // State to store the search input
  const [sortOption, setSortOption] = useState("az"); // Default sort is A-Z
  const [displayCount, setDisplayCount] = useState(8); // Default display count
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const cartItems = useSelector(selectCartItems); // Access cart items using the selector

  // Handle display count change
  const handleDisplayCountChange = (event) => {
    setDisplayCount(event.target.value); // Update display count
  };

  // Like state for each product
  const [likedItems, setLikedItems] = useState({});
  // Function to handle like toggle
  const handleLikeToggle = (productId) => {
    setLikedItems((prevLikedItems) => ({
      ...prevLikedItems,
      [productId]: !prevLikedItems[productId], // Toggle the liked state
    }));
  };
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery)
  );

  const [itemsPerRow, setItemsPerRow] = useState(3); // Initially 4 items per row

  const handleGridChange = (size) => {
    setItemsPerRow(size);
  };
  const [currentPage, setCurrentPage] = useState(0); // State for current page
  const itemsPerPage = 8; // Number of items to display per page

  // Function to handle button click and change page
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate items to show based on current page
  const displayedProducts = searchQuery
    ? filteredProducts
    : products.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
      );

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };
  const sortedProducts = displayedProducts.sort((a, b) => {
    switch (sortOption) {
      case "expensive":
        return b.discountPrice - a.discountPrice; // Sort by price descending (expensive first)
      case "cheaper":
        return a.discountPrice - b.discountPrice; // Sort by price ascending (cheaper first)
      case "az":
        return a.name.localeCompare(b.name); // Sort by name ascending (A-Z)
      case "za":
        return b.name.localeCompare(a.name); // Sort by name descending (Z-A)
      default:
        return 0; // Default is no sort
    }
  });

  const showdisplayedProducts = sortedProducts.slice(0, displayCount);
  console.log(showdisplayedProducts);
  const handleSnackbarClose = () => setSnackbarOpen(false);
  const handleAddToCart = (product) => {
    try {
      // Check if product is already in cart
      const isInCart = cartItems.some((item) => item.id === product.id);

      if (isInCart) {
        setSnackbarMessage(`${product.name} is already in the cart!`);
      } else {
        dispatch(addItemToCart({ ...product, quantity: 1 }));

        setSnackbarMessage(`${product.name} added to cart!`);
      }
      setSnackbarOpen(true); // Show snackbar
    } catch (error) {
      setSnackbarMessage("Failed to add item to cart.");
      setSnackbarOpen(true);
    }
  };

  // Function to handle navigation when button is clicked
  const handleExploreMore = (product) => {
    navigate(`/product/${product.id}`);
  };
  return (
    <>
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
          {/* Search input and button */}
          <TextField
            label="Search products..."
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={handleSearchChange} // Update state on input change
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          <FormControl fullWidth variant="outlined">
            <InputLabel id="sort-label">Sort by</InputLabel>
            <Select
              labelId="sort-label"
              id="sort-select"
              value={sortOption} // Current selected option
              onChange={handleSortChange} // Handler for sort change
              label="Sort by"
            >
              <MenuItem value="expensive">Expensive</MenuItem>
              <MenuItem value="cheaper">Cheaper</MenuItem>
              <MenuItem value="az">A-Z</MenuItem>
              <MenuItem value="za">Z-A</MenuItem>
            </Select>
          </FormControl>
          <GridViewIcon onClick={() => handleGridChange(6)} />{" "}
          {/* 2 items per row */}
          <ViewModuleIcon onClick={() => handleGridChange(3)} />{" "}
          {/* 4 items per row */}
          <ViewListIcon onClick={() => handleGridChange(12)} />{" "}
          {/* 1 item per row */}
          <FormControl fullWidth variant="outlined">
            <InputLabel id="display-count-label">Show</InputLabel>
            <Select
              labelId="display-count-label"
              id="display-count-select"
              value={displayCount}
              onChange={handleDisplayCountChange}
              label="Show"
            >
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={12}>12</MenuItem>
              <MenuItem value={16}>16</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={24}>All</MenuItem>
            </Select>
          </FormControl>
          <Typography>
            Showing {displayCount} of {filteredProducts.length} products.
          </Typography>
        </SearchSection>

        <ProductItems>
          <Grid container spacing={2}>
            {showdisplayedProducts.map((product) => (
              <Grid item xs={itemsPerRow} key={product.id}>
                <StyledCard>
                  <StyledImageContainer>
                    <StyledImage src={product.imgSrc} alt={product.name} />
                    <Overlay className="overlay" />{" "}
                    {/* Black overlay with blur effect */}
                    <AddToCartButton
                      className="add-to-cart-btn"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </AddToCartButton>
                    <IconRow className="icon-row">
                      <IconButton>
                        <ShareIcon style={{ color: "white" }} />
                        <Typography
                          variant="body2"
                          style={{ color: "white", marginLeft: "8px" }}
                        >
                          {" "}
                          Share
                        </Typography>
                      </IconButton>

                      <IconButton>
                        <CompareArrowsIcon style={{ color: "white" }} />
                        <Typography
                          variant="body2"
                          style={{ color: "white", marginLeft: "8px" }}
                        >
                          {" "}
                          Compare
                        </Typography>
                      </IconButton>

                      <IconButton onClick={() => handleLikeToggle(product.id)}>
                        {likedItems[product.id] ? (
                          <>
                            <FavoriteIcon style={{ color: "red" }} />
                            <Typography
                              variant="body2"
                              style={{ color: "white", marginLeft: "8px" }}
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
                              style={{ color: "white", marginLeft: "8px" }}
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
                  </StyledImageContainer>

                  <CardContent
                    sx={{
                      backgroundColor: "#c6cccf",
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold">
                      {product.name}
                    </Typography>
                    <Typography variant="body2">
                      {product.description}
                    </Typography>
                    <Typography variant="body1">
                      Rs: {product.discountPrice}{" "}
                      <span style={{ marginLeft: "50px" }}>
                        Rs: <del>{product.price}</del>
                      </span>
                    </Typography>
                  </CardContent>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        </ProductItems>
        {/* Button Container for pagination */}
        <ButtonContainer>
          {[...Array(Math.ceil(products.length / itemsPerPage)).keys()].map(
            (page) => (
              <NextButtons
                key={page}
                onClick={() => handlePageChange(page)}
                active={currentPage === page} // Pass active state to styled button
              >
                {page + 1}
              </NextButtons>
            )
          )}
        </ButtonContainer>
        <Grid2 item xs={12} sm={6}>
          <ServiceBox>
            <ServiceImage src="quality.png" alt="logo" />
            <ServiceTextContainer>
              <ServiceTitle>High Quality</ServiceTitle>
              <ServiceDescription>
                crafted from top materials
              </ServiceDescription>
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
    </>
  );
}

export default Shop;
