import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  selectDisplayedProducts,
  loadMoreProducts,
} from "../redux/productSlice"; // Adjust the import path as necessary
import {
  Box,
  Typography,
  Button,
  Grid,
  CardContent,
  IconButton,
  CircularProgress,
  Snackbar,
  Badge,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { styled } from "@mui/material/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"; // Import the arrow icon
import ShareIcon from "@mui/icons-material/Share";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { selectProducts } from "../redux/productSlice";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"; // Outlined icon for hollow like
import { selectCartItems, addItemToCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
// Styled components definitions...
const Item = styled(Box)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  overflow: "hidden",
  boxShadow: theme.shadows[2], // Adds a shadow for depth
  transition: "transform 0.2s", // Animation for hover effect
}));

const Image = styled("img")({
  width: "100%", // Makes image responsive
  height: "500px", // Maintains aspect ratio
});
const HeroContainer = styled(Box)(({ theme }) => ({
  backgroundImage: "url(./hero.jpg)",
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "90vh", // Full height of the viewport
  display: "flex",
  alignItems: "center", // Center the content vertically
  justifyContent: "flex-end", // Align content to the right horizontally
}));

const HeroSection = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column", // Stack content vertically
  padding: theme.spacing(3), // Add padding for spacing inside the box
  backgroundColor: "#ede6ca",
  color: theme.palette.common.black,
  width: "35%", // Set the width of the HeroSection
  maxWidth: "500px", // Ensure it doesn't exceed 400px
  height: "auto", // Automatically adjust height based on content
  marginRight: theme.spacing(6), // Space from the right side
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Optional box-shadow for effect
  borderRadius: "10px", // Rounded corners
}));

const ProductBox = styled(Box)(({ theme }) => ({
  margin: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(5, 20),
  gap: theme.spacing(2),
}));
// Styled components

const StyledCard = styled("div")({
  position: "relative",
  overflow: "hidden",
  "&:hover .add-to-cart-btn, &:hover .icon-row, &:hover .overlay": {
    opacity: 1, // Show on hover
  },
  borderRadius: "10px",
  width: "200px",
});

const StyledImageContainer = styled("div")({
  position: "relative",
  overflow: "hidden",
});

const StyledImage = styled("img")({
  width: "100%",
  maxWidth: "200px",
  height: "300px",
  display: "block",
});
const StyledImageCategory = styled("img")({
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
  bottom: "90px",
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
  bottom: "60px",
  left: "50%",
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

const StyledButton = styled(Button)(({ theme }) => ({
  border: "2px solid #ccbe66", // Use the specified hex color for the border
  color: "#ccbe66", // Optional: Set text color to the same hex color
  backgroundColor: "transparent", // Transparent background for visibility of the border
  "&:hover": {
    backgroundColor: "#ccbe66", // Change background color on hover
    color: "white", // Change text color on hover
  },
  width: "10rem",
  marginTop: theme.spacing(3),
  textTransform: "none",
}));

const StyledDesignSection = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  backgroundColor: "#faf5d2",
  height: "75vh",
  maxWidth: "100%",
  overflow: "hidden",
}));
const StyledImageroom = styled("img")(({ theme }) => ({
  width: "400px",
  height: "400px",
  objectFit: "contain",
}));
const StyledImageroom2 = styled("img")(({ theme }) => ({
  width: "400px",
  height: "350px",
  objectFit: "cover",
  marginLeft: theme.spacing(0.1), // Align right to fit next to the design section
}));
// Styled component for the dots
const DotContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "left",
  alignItems: "flex-start",
  marginTop: theme.spacing(1),
  gap: theme.spacing(1),
  paddingLeft: theme.spacing(5),
  cursor: "pointer",
}));

const Dot = styled("span")(({ active }) => ({
  display: "inline-block",
  width: "10px",
  height: "10px",
  borderRadius: "50%",
  backgroundColor: active ? "#ccbe66" : "#d3d3d3",
  border: "2px solid",
  borderColor: active ? "#ccbe66" : "#d3d3d3",
  position: "relative",
  transition: "all 0.3s ease",

  "&::after": {
    content: '""',
    position: "absolute",
    top: "50%",
    left: "50%",
    width: active ? "6px" : "0px",
    height: active ? "6px" : "0px",
    borderRadius: "50%",
    backgroundColor: "#ccbe66",
    transform: "translate(-50%, -50%)",
    transition: "all 0.3s ease",
  },
}));

const OverlayBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 250,
  left: 70,
  right: "auto", // Keep right auto to allow the button to fit next to it
  bottom: 60,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start", // Align items to the left
  backgroundColor: "rgba(255, 255, 255, 0.4)", // Transparent white background
  color: "black",
  padding: theme.spacing(1),
  textAlign: "left",
}));
// Text styling inside the overlay
const OverlayTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.2rem",
  display: "flex",
}));

const OverlaySubtitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.5rem",
  fontWeight: "bold",
  marginTop: theme.spacing(1),
}));
// Styled horizontal line to replace dashes
const Line = styled("hr")(({ theme }) => ({
  width: "50px", // Width of the line
  height: "2px", // Height of the line (this determines how thick the line appears)
  backgroundColor: "#000", // Yellow color for the line
  marginTop: theme.spacing(1.5), // Space between content and line
}));
const OverlayButton = styled(Button)(({ theme }) => ({
  position: "absolute",
  top: 350,
  left: 220,
  right: "auto", // Keep right auto to allow the button to fit next to it
  bottom: 20,
  backgroundColor: "#ccbe66", // Yellow background for the button
  color: "white",
  "&:hover": {
    backgroundColor: "#b0a054", // Darker shade of yellow on hover
  },
}));
const SetupSection = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(2),
  flexDirection: "column",
  margin: theme.spacing(5, 0),
}));
// Define your badge with circle shape, background color, and centered text
const StyledBadge = styled(Badge)(({ theme, isNew }) => ({
  position: "absolute",
  top: "10px",
  right: "10px",
  padding: "15px 10px",
  color: "white",
  backgroundColor: isNew ? "green" : "red", // Green for new, red for discount
  borderRadius: "50%",
  fontWeight: "bold",
  fontSize: "0.8rem",
}));

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectDisplayedProducts);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);
  const [visibleCount, setVisibleCount] = useState(10);
  const [likedItems, setLikedItems] = useState({}); // Move useState here
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const cartItems = useSelector(selectCartItems); // Access cart items using the selector
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <CircularProgress />;
  }

  if (status === "failed") {
    return <Typography color="error">Error: {error}</Typography>;
  }

  // Sample image data (could be fetched from Redux store)
  const images = [
    { id: 1, src: "/set9.png", title: "Image 1" },
    { id: 2, src: "/set2.png", title: "Image 2" },
    { id: 3, src: "/set3.png", title: "Image 3" },
    { id: 4, src: "/set4.png", title: "Image 4" },
    { id: 5, src: "/set5.png", title: "Image 5" },
    { id: 6, src: "/set6.png", title: "Image 6" },
    { id: 7, src: "/set7.png", title: "Image 7" },
  ];

  const roomImages = [
    { src: "/room1.png", title: "Bedroom", subtitle: "Inner Peace" },
    { src: "/room2.png", title: "Living Room", subtitle: "Cozy Vibes" },
    { src: "/set5.png", title: "Kitchen", subtitle: "Modern Style" },
    { src: "/set3.png", title: "Living", subtitle: "Modern Style" },
  ];

  const handleLikeToggle = (productId) => {
    setLikedItems((prevLikedItems) => ({
      ...prevLikedItems,
      [productId]: !prevLikedItems[productId], // Toggle the liked state
    }));
  };

  const loadMore = () => {
    setVisibleCount((prevCount) => Math.min(prevCount + 5, products.length)); // Show 4 more products or max available
  };

  const handleNextImage = () => {
    if (currentImageIndex < roomImages.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    } else {
      // Wrap around to the first image
      setCurrentImageIndex(0);
    }
  };

  const handleDotClick = (index) => {
    setCurrentImageIndex(index);
  };
  const handleAddToCart = (product) => {
    try {
      // Check if product is already in cart
      const isInCart = cartItems.some((item) => item.id === product.id);

      if (isInCart) {
        setSnackbarMessage(`Item is already in the cart!`);
      } else {
        dispatch(addItemToCart({ ...product, quantity: 1 }));

        setSnackbarMessage(`${product.title} added to cart!`);
      }
      setSnackbarOpen(true); // Show snackbar
    } catch (error) {
      setSnackbarMessage("Failed to add item to cart.");
      setSnackbarOpen(true);
    }
  };
  const handleSnackbarClose = () => setSnackbarOpen(false);

  const handleShopNowClick = () => {
    navigate("/shop");
  };
  return (
    <div>
      <HeroContainer>
        <HeroSection>
          <Typography variant="h6" gutterBottom>
            New Arrival
          </Typography>
          <Typography
            variant="h4"
            gutterBottom
            color="#a37821"
            fontWeight="bold"
          >
            Discover Our New Collection
          </Typography>
          <Typography variant="body1" gutterBottom>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac
            velit vitae lectus lobortis scelerisque.
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#a37821",
              color: "#fff",
              borderRadius: "none",
              width: "200px",
              height: "50px",
              "&:hover": {
                backgroundColor: "#906622",
              },
            }}
            onClick={handleShopNowClick}
          >
            Shop Now
          </Button>
        </HeroSection>
      </HeroContainer>

      <ProductBox>
        <Typography variant="h4" fontWeight="bold">
          Browse the range
        </Typography>
        <Typography variant="h6">Discover amazing range!</Typography>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={4}>
            <StyledImageCategory src="/dining.png" alt="Dining" />
            <Typography variant="h6" fontWeight="bold" align="center">
              Dining
            </Typography>{" "}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StyledImageCategory src="/living.png" alt="Living" />
            <Typography variant="h6" fontWeight="bold" align="center">
              Living
            </Typography>{" "}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StyledImageCategory src="/bedroom2.png" alt="Bedroom" />
            <Typography variant="h6" fontWeight="bold" align="center">
              Bedroom
            </Typography>{" "}
          </Grid>
        </Grid>
      </ProductBox>
      <ProductItems>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Our Products
        </Typography>
        {products?.length > 0 ? (
          <Grid container spacing={1}>
            {products.slice(0, visibleCount).map((product) => {
              return (
                <Grid item xs={12} sm={6} md={2.4} key={product.id}>
                  {" "}
                  {/* Changed to md={2.4} for 5 items in one row */}
                  <StyledCard>
                    <StyledImageContainer>
                      <StyledBadge isNew={product.isNew}>
                        {product.isNew ? "New" : "-10%"}
                      </StyledBadge>
                      <StyledImage
                        src={product.thumbnail}
                        alt={product.title}
                      />
                      <Overlay className="overlay" />
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
                            Share
                          </Typography>
                        </IconButton>
                        <IconButton>
                          <CompareArrowsIcon style={{ color: "white" }} />
                          <Typography
                            variant="body2"
                            style={{ color: "white", marginLeft: "8px" }}
                          >
                            Compare
                          </Typography>
                        </IconButton>
                        <IconButton
                          onClick={() => handleLikeToggle(product.id)}
                        >
                          {likedItems[product.id] ? (
                            <FavoriteIcon style={{ color: "red" }} />
                          ) : (
                            <FavoriteBorderIcon style={{ color: "white" }} />
                          )}
                          <Typography
                            variant="body2"
                            style={{ color: "white", marginLeft: "8px" }}
                          >
                            {likedItems[product.id] ? "Liked" : "Like"}
                          </Typography>
                        </IconButton>
                      </IconRow>
                    </StyledImageContainer>
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold">
                        {product.title}
                      </Typography>
                      <Typography variant="h6">
                        {product.isNew ? (
                          `Rs: ${product.price}` // Show only the price if the product is new
                        ) : (
                          <>
                            Rs: {product.discountPrice}{" "}
                            <span>
                              Rs: <del>{product.price}</del>
                            </span>
                          </>
                        )}
                      </Typography>
                    </CardContent>
                  </StyledCard>
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <Typography>No products found.</Typography>
        )}
        <StyledButton onClick={loadMore} variant="contained" sx={{ mt: 2 }}>
          Show More
        </StyledButton>
      </ProductItems>
      <StyledDesignSection>
        <Grid
          container
          spacing={4}
          justifyContent="center"
          alignItems="center"
          ml="50px"
        >
          {/* First Column: Text and Button */}
          <Grid item xs={12} md={6}>
            <Typography variant="h2" fontWeight="bold" gutterBottom>
              50+ Beautiful Rooms Inspiration
            </Typography>
            <Typography variant="body1" paragraph>
              Our designer already made a lot of beautiful prototypes of rooms
              that inspire you.
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#ccbe66",
                color: "white",
                "&:hover": {
                  backgroundColor: "#ccbe66",
                  color: "white",
                },
                width: "15rem",
              }}
            >
              Explore More
            </Button>
          </Grid>

          {/* Second Column: Images with Overlays */}
          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "1px" }}>
              {/* First Image with Overlay */}
              <Box sx={{ position: "relative", width: "100%" }}>
                <StyledImageroom
                  src={roomImages[currentImageIndex].src}
                  alt={`Room ${currentImageIndex + 1}`} // Fixed template literal
                />
                <OverlayBox>
                  <OverlayTitle sx={{ display: "flex", alignItems: "center" }}>
                    <span style={{ marginRight: "8px" }}>
                      0{currentImageIndex + 1}
                    </span>
                    <Line style={{ marginRight: "8px" }} />
                    {roomImages[currentImageIndex].title}
                  </OverlayTitle>
                  <OverlaySubtitle>
                    {roomImages[currentImageIndex].subtitle}
                  </OverlaySubtitle>
                </OverlayBox>

                <OverlayButton
                  variant="contained"
                  endIcon={<ArrowForwardIcon />} // Arrow icon on the right
                  onClick={handleNextImage}
                />
              </Box>

              {/* Second Image with Overlay */}
              <Box sx={{ position: "relative", width: "100%" }}>
                <StyledImageroom2
                  src={
                    roomImages[(currentImageIndex + 1) % roomImages.length].src
                  }
                  alt={`Room ${
                    ((currentImageIndex + 1) % roomImages.length) + 1
                  }`} // Fixed template literal
                />

                <DotContainer>
                  {roomImages.map((_, index) => (
                    <Dot
                      key={index}
                      active={currentImageIndex === index}
                      onClick={() => handleDotClick(index)}
                    />
                  ))}
                </DotContainer>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </StyledDesignSection>
      <SetupSection>
        <Typography variant="h5" fontWeight="bold">
          Share your setup with
        </Typography>
        <Typography variant="h4" fontWeight="bold">
          #FuniroFurniture
        </Typography>

        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {/* First Row */}
            <Grid item xs={8}>
              <Item>
                <Image src={images[0].src} alt={images[0].alt} />
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item>
                <Image src={images[1].src} alt={images[1].alt} />
              </Item>
            </Grid>

            {/* Second Row - Three equal width images */}
            <Grid item xs={4}>
              <Item>
                <Image src={images[2].src} alt={images[2].alt} />
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item>
                <Image src={images[3].src} alt={images[3].alt} />
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item>
                <Image src={images[4].src} alt={images[4].alt} />
              </Item>
            </Grid>

            {/* Third Row - Two equal width images */}
            <Grid item xs={6}>
              <Item>
                <Image src={images[5].src} alt={images[5].alt} />
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <Image src={images[6].src} alt={images[6].alt} />
              </Item>
            </Grid>
          </Grid>
        </Box>
      </SetupSection>
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
    </div>
  );
};

export default Home;
