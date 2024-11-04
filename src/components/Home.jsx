import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, selectDisplayedProducts } from "../redux/productSlice"; // Adjust the import path as necessary
import {
  Box,
  Typography,
  Button,
  Grid,
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
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"; // Outlined icon for hollow like
import { selectCartItems, addItemToCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import Masonry from "@mui/lab/Masonry";

// Styled components definitions...

const HeroContainer = styled(Box)(({ theme }) => ({
  backgroundImage: "url(./home3.png)",
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "90vh", // Full height of the viewport
  display: "flex",
  alignItems: "center", // Center the content vertically
  justifyContent: "flex-end", // Align content to the right horizontally
  [theme.breakpoints.down("md")]: {
    // Adjustments for medium and below
    height: "70vh", // Reduce height on smaller screens
  },
  [theme.breakpoints.down("sm")]: {
    // Adjustments for small and below
    height: "60vh", // Further reduce height on very small screens
    justifyContent: "center", // Center content horizontally on small screens
  },
}));

const HeroSection = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column", // Stack content vertically
  padding: theme.spacing(3), // Add padding for spacing inside the box
  backgroundColor: "rgb(249, 241, 231)",
  color: theme.palette.common.black,
  width: "30%", // Set the width of the HeroSection
  maxWidth: "500px", // Ensure it doesn't exceed 500px
  height: "auto", // Automatically adjust height based on content
  marginRight: theme.spacing(6), // Space from the right side
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Optional box-shadow for effect
  borderRadius: "10px", // Rounded corners
  [theme.breakpoints.down("md")]: {
    // Adjustments for medium and below
    width: "50%", // Adjust width for medium screens
    marginRight: theme.spacing(4), // Less margin on medium screens
  },
  [theme.breakpoints.down("sm")]: {
    // Adjustments for small and below
    width: "80%", // Full width on small screens
    marginRight: 0, // Remove right margin
    alignItems: "center", // Center content on small screens
  },
}));
const ProductBox = styled(Box)(({ theme }) => ({
  margin: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(5, 3), // Adjust padding for smaller screens
  gap: theme.spacing(2),
  [theme.breakpoints.up("md")]: {
    // Adjustments for medium and above
    padding: theme.spacing(5, 20), // Larger padding on medium and larger screens
  },
}));
const StyledImageCategory = styled("img")({
  width: "100%",
  maxWidth: "400px",
  height: "auto",
  display: "block",
  margin: "0 auto",
});
const ProductItems = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(2),
  padding: theme.spacing(10),
  flexDirection: "column",
}));
const StyledCard = styled("div")({
  position: "relative",
  overflow: "hidden",
  borderRadius: "10px",
  width: "200px",
  "&:hover .hover-content": {
    opacity: 1, // Show overlay on hover for full card
  },
});

const StyledImageContainer = styled("div")({
  position: "relative",
  overflow: "hidden",
  width: "100%",
  height: "200px",
});

const HoverContentBox = styled("div")({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  opacity: 0, // Hidden initially
  transition: "opacity 0.3s ease-in-out",
  color: "white",
});

const AddToCartButton = styled(Button)({
  backgroundColor: "white",
  color: "#a37821",
  marginBottom: "8px", // Adjust as needed for spacing from icons
});

// Updated IconRow and IconButton styling
const IconRow = styled(Box)({
  display: "flex",
  justifyContent: "center",
  gap: "4px", // Reduced space between icons and text
  color: "white",
});

const SmallIconButton = styled(IconButton)({
  padding: "4px", // Smaller padding for icons
  fontSize: "0.75rem", // Smaller font size for text
  "& .MuiSvgIcon-root": {
    fontSize: "1rem", // Smaller icon size
  },
});

const StyledImage = styled("img")({
  width: "100%",
  height: "100%",
  display: "block",
});

const CardContentBox = styled(Box)({
  padding: "16px",
  "&:hover .hover-content ": {
    opacity: 1, // Ensure hover works on CardContent as well
  },
  backgroundColor: "#edf0f2",
});

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
  borderRadius: "0px",
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
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column", // Stack elements vertically on small screens
    height: "auto", // Allow height to be auto on smaller screens
  },
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
  right: "auto",
  bottom: 60,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  backgroundColor: "rgba(255, 255, 255, 0.4)",
  color: "black",
  padding: theme.spacing(1),
  textAlign: "left",
  [theme.breakpoints.down("sm")]: {
    top: "50%", // Adjust position for smaller screens
    left: "25%", // Adjust left position for smaller screens
  },
}));

const OverlayTitle = styled("div")(({ theme }) => ({
  fontSize: "1.2rem",
  display: "flex",
}));

const OverlaySubtitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.5rem",
  fontWeight: "bold",
  marginTop: theme.spacing(1),
}));

const Line = styled("hr")(({ theme }) => ({
  width: "50px",
  height: "2px",
  backgroundColor: "#000",
  marginTop: theme.spacing(1.5),
}));

const OverlayButton = styled(Button)(({ theme }) => ({
  position: "absolute",
  top: 350,
  left: 220,
  right: "auto",
  bottom: 20,
  backgroundColor: "#ccbe66",
  color: "white",
  "&:hover": {
    backgroundColor: "#b0a054",
  },
  [theme.breakpoints.down("sm")]: {
    top: "83%", // Adjust button position for smaller screens
    left: "70%", // Center button on smaller screens
    transform: "translateX(-50%)", // Center horizontally
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
const StyledBadge = styled(({ isNew, ...props }) => <Badge {...props} />)(
  ({ isNew }) => ({
    position: "absolute",
    top: "10px",
    right: "10px",
    padding: "15px 10px",
    color: "white",
    backgroundColor: isNew ? "#30c4ac" : "#ec8484", // Green for new, red for discount
    borderRadius: "50%",
    fontWeight: "bold",
    fontSize: "0.8rem",
  })
);
const TitleContainer = styled("div")(({ expanded }) => ({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  WebkitLineClamp: expanded ? "none" : 1, // Show full title if expanded, otherwise limit to 2 lines
  cursor: "pointer", // Pointer cursor for title
  transition: "font-size 0.2s", // Transition for font size
}));
const TruncatedDescription = styled(Typography)({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap", // Ensures it stays on one line
  maxWidth: "200px", // Adjust this to fit the width of your container
});
const StyledExploreBtn = styled(Button)(({ theme }) => ({
  position: "absolute",
  bottom: "60px",
  left: "45%",
  transform: "translateX(-50%)",
  opacity: 0, // Hidden initially
  transition: "opacity 0.3s ease-in-out",
  borderColor: theme.palette.common.white,
  color: theme.palette.common.white,
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
  const [expandedProductId, setExpandedProductId] = useState(null); // State for expanded card

  // ... existing useEffect and functions remain the same

  const handleTitleClick = (id) => {
    if (expandedProductId === id) {
      setExpandedProductId(null); // Collapse if already expanded
    } else {
      setExpandedProductId(id); // Expand to show full title
    }
  };
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

  const roomImages = [
    { src: "/room1.png", title: "Bedroom", subtitle: "Inner Peace" },
    { src: "/room2.png", title: "Living Room", subtitle: "Cozy Vibes" },
    { src: "/set4.png", title: "Kitchen", subtitle: "Modern Style" },
    { src: "/set3.png", title: "Living", subtitle: "Modern Style" },
  ];
  const imagess = Array.from({ length: 16 }, (_, index) => {
    // Define a pattern of heights to repeat
    const heightPattern = [400, 350, 250, 150];

    return {
      id: index + 1,
      src: `/s${index + 1}.avif`,
      title: `Image ${index + 1}`,
      width: Math.floor(Math.random() * (400 - 150 + 1)) + 150, // Random width between 150 and 400
      height: heightPattern[index % heightPattern.length], // Cycle through height pattern
      marginTop: index % 2 === 0 ? 0 : Math.floor(Math.random() * 10), // Random marginTop for alternate images
    };
  });

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

  const handleExploreClick = (productId) => {
    navigate(`/product/${productId}`);
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
            fontFamily="poppins"
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
              width: "50%",
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
                  <StyledCard>
                    <StyledImageContainer>
                      <StyledBadge isNew={product.isNew}>
                        {product.isNew ? "New" : "-10%"}
                      </StyledBadge>
                      <StyledImage
                        src={product.thumbnail}
                        alt={product.title}
                      />
                      <HoverContentBox className="hover-content">
                        <AddToCartButton
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent card click from triggering
                            handleAddToCart(product);
                          }}
                        >
                          Add to Cart
                        </AddToCartButton>
                        <IconRow className="icon-row">
                          <SmallIconButton>
                            <ShareIcon style={{ color: "white" }} />
                            <Typography
                              variant="caption"
                              style={{ color: "white" }}
                            >
                              Share
                            </Typography>
                          </SmallIconButton>
                          <SmallIconButton>
                            <CompareArrowsIcon style={{ color: "white" }} />
                            <Typography
                              variant="caption"
                              style={{ color: "white" }}
                            >
                              Compare
                            </Typography>
                          </SmallIconButton>
                          <SmallIconButton
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent card click from triggering
                              handleLikeToggle(product.id);
                            }}
                          >
                            {likedItems[product.id] ? (
                              <FavoriteIcon style={{ color: "red" }} />
                            ) : (
                              <FavoriteBorderIcon style={{ color: "white" }} />
                            )}
                            <Typography
                              variant="caption"
                              style={{ color: "white" }}
                            >
                              {likedItems[product.id] ? "Liked" : "Like"}
                            </Typography>
                          </SmallIconButton>
                        </IconRow>
                        <StyledExploreBtn
                          onClick={() => {
                            handleExploreClick(product.id);
                          }}
                        >
                          explore more
                        </StyledExploreBtn>
                      </HoverContentBox>
                    </StyledImageContainer>
                    <CardContentBox>
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
                      <TruncatedDescription
                        variant="body2"
                        color="text.secondary"
                      >
                        {product.description}
                      </TruncatedDescription>
                      <Typography
                        variant="body2"
                        fontWeight="bold"
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        {product.isNew ? (
                          // If the product is new, show the original price only
                          <Box component="span">
                            Rs: {product.price} {/* Original price only */}
                          </Box>
                        ) : (
                          // If the product is not new, show the discount price and the original price
                          <>
                            <Box component="span">
                              Rs: {product.discountPrice} {/* Discount price */}
                            </Box>
                            <Box
                              component="span"
                              sx={{
                                ml: 2,
                                color: "text.secondary",
                                fontWeight: "normal",
                              }}
                            >
                              <del>Rs: {product.price}</del>{" "}
                              {/* Original price with strikethrough */}
                            </Box>
                          </>
                        )}
                      </Typography>
                    </CardContentBox>
                  </StyledCard>
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <Typography>No products found.</Typography>
        )}
        {visibleCount < products.length && (
          <StyledButton onClick={loadMore} variant="contained" sx={{ mt: 2 }}>
            Show More
          </StyledButton>
        )}
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

        <Masonry columns={{ xs: 2, sm: 3, md: 6 }} spacing={1}>
          {imagess.map((image) => (
            <Box
              key={image.id}
              sx={{ position: "relative", overflow: "hidden" }}
            >
              <img
                src={image.src}
                alt={image.title}
                style={{
                  width: "100%",
                  height: image.height,
                  borderRadius: "5px",
                  marginTop: image.marginTop,
                }}
              />
            </Box>
          ))}
        </Masonry>
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
