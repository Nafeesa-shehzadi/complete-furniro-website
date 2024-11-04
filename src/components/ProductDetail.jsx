import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  removeItemFromCart,
  selectCartItems,
} from "../redux/cartSlice";
import { fetchProducts, selectDisplayedProducts } from "../redux/productSlice";
import {
  Box,
  Grid,
  Typography,
  Button,
  styled,
  Divider,
  Snackbar,
  IconButton,
  TextField,
  Avatar,
  CircularProgress,
} from "@mui/material";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import CloseIcon from "@mui/icons-material/Close";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import Masonry from "@mui/lab/Masonry";
// Styled components
const StyledContainer = styled(Box)(({ theme }) => ({
  maxWidth: "100%",
  padding: theme.spacing(5),
}));

const HeroSection = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  backgroundColor: "#f2edda",
  flexDirection: "row",
  height: "15vh",
  width: "100%",
  padding: theme.spacing(2, 0),
  paddingLeft: theme.spacing(3), // Add padding on the left
  gap: theme.spacing(1),
  boxSizing: "border-box", // Ensure padding does not create overflow
}));

const StyledImage = styled("img")(({ theme }) => ({
  width: "100%",
  maxHeight: "350px",
  objectFit: "cover",
  borderRadius: "10px",
  [theme.breakpoints.up("sm")]: {
    width: "70%",
  },
  [theme.breakpoints.up("md")]: {
    width: "350px",
    height: "350px",
  },
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(1),
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "5px",
  width: "100%",
  height: "40px",
  marginLeft: "1px",
  borderColor: "black",
  marginTop: 10,
  color: "black",
  textTransform: "none",
}));

const NextButtons = styled(Button)(({ theme, active }) => ({
  fontSize: 15,
  backgroundColor: active ? "#ad8544" : "#e6d6bc",
  color: active ? theme.palette.common.white : theme.palette.common.black,
  borderRadius: "7px",
  "&:hover": {
    backgroundColor: "#ad8544",
  },
}));
const ProductDetail = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const status = useSelector((state) => state.products.status); // Accessing the status
  const error = useSelector((state) => state.products.error); // Accessing the error if needed
  const dispatch = useDispatch();
  const { id } = useParams();
  const cartItems = useSelector(selectCartItems); // Access cart items using the selector
  const products = useSelector(selectDisplayedProducts);
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

  const product = products.find((x) => x.id.toString() === id.toString());

  if (!product) {
    return <div>Product not found</div>;
  }
  // Check if the product is in the cart
  const isProductInCart = (productId) => {
    return cartItems.some((item) => item.id === productId);
  };

  // Handle cart actions
  const handleCart = (product) => {
    if (isProductInCart(product.id)) {
      dispatch(removeItemFromCart(product.id));
      setSnackbarMessage(`Removed ${product.title} from the cart!`);
    } else {
      dispatch(addItemToCart({ ...product, quantity: 1 }));
      setSnackbarMessage(`Added ${product.title} to the cart!`);
    }
    setSnackbarOpen(true); // Open snackbar after action
  };

  const renderStars = (numStars) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        style={{ color: index < numStars ? "gold" : "lightgray" }}
      >
        ★
      </span>
    ));
  };
  const handleSnackbarClose = () => setSnackbarOpen(false);
  const images = [
    { src: "/p2.png", title: "Bedroom" },
    { src: "/p3.png", title: "Living Room" },
    { src: "/p4.png", title: "Kitchen" },
    { src: "/p6.png", title: "Living" },
  ];
  const reviews = [
    {
      id: 1,
      avatar: "A",
      name: "Ali",
      summary: "Product was amazing ",
    },
    {
      id: 2,
      avatar: "B",
      name: "Bella",
      summary: "Loved it,amazing product ",
    },
    {
      id: 3,
      avatar: "C",
      name: "Carlos",
      summary: "Good, but could be better ",
    },
    {
      id: 4,
      avatar: "D",
      name: "Dana",
      summary: "Exceeded expectations ",
    },
    {
      id: 5,
      avatar: "E",
      name: "Ella",
      summary: "Not satisfied, expected better",
    },
  ];

  return (
    <>
      <HeroSection>
        <Typography
          variant="body"
          sx={{ color: "text.secondary" }}
          gutterBottom
        >
          Home{" "}
        </Typography>
        <NavigateNextOutlinedIcon />

        <Typography
          variant="body"
          sx={{ color: "text.secondary" }}
          gutterBottom
        >
          Shop
        </Typography>
        <NavigateNextOutlinedIcon />
        <Divider orientation="vertical" flexItem sx={{ marginY: 2 }} />

        <Typography variant="body" fontWeight="bold" gutterBottom>
          {product ? product.title : "Product Not Found"}
        </Typography>
      </HeroSection>

      <StyledContainer>
        {status === "loading" && <p>Loading products...</p>}
        {status === "failed" && <p>Error: {error}</p>}
        {status === "succeeded" && (
          <Grid container spacing={2}>
            <Grid item md={6} container justifyContent="center">
              {/* Use imgSrc field for the product image */}
              <StyledImage src={product.thumbnail} alt={product.title} />
            </Grid>
            <Grid
              item
              md={6}
              container
              direction="column"
              justifyContent="center"
            >
              <Typography variant="h5" fontWeight="bold">
                {product.title}
              </Typography>
              <Typography variant="h5" color="text.secondary">
                {/* Display price if it exists, otherwise show discount price */}
                {product.discountPrice
                  ? `Rs. ${product.discountPrice} `
                  : `Rs. ${product.price} `}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Likes: {product.likes}
              </Typography>
              <Box
                display="flex"
                alignItems="center"
                height="40px"
                sx={{ gap: "4px" }}
              >
                <Typography variant="h6" color="text.secondary">
                  Rating: {renderStars(product.stars)}
                </Typography>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ height: "30px", my: 1 }}
                />
                <Typography variant="body2" color="text.secondary">
                  {product.stars} Customer Reviews
                </Typography>
              </Box>

              <Typography variant="body2" gutterBottom>
                {product.description} {/* Use optional chaining here */}
              </Typography>
              <Typography
                variant="body"
                sx={{ color: "text.secondary", margin: "10px" }}
              >
                Size
              </Typography>
              <ButtonContainer>
                <NextButtons active>L</NextButtons>
                <NextButtons>XL</NextButtons>
                <NextButtons>XS</NextButtons>
              </ButtonContainer>
              <ButtonContainer>
                <TextField
                  type="number"
                  InputProps={{ inputProps: { min: 1 } }}
                  sx={{ height: "40px" }}
                />
                <StyledButton
                  onClick={() => handleCart(product)}
                  variant="outlined"
                >
                  {isProductInCart(product.id)
                    ? "Remove from Cart"
                    : "Add to Cart"}
                </StyledButton>
                <StyledButton variant="outlined">+ Compare</StyledButton>
              </ButtonContainer>
              <Divider flexItem sx={{ height: "30px", my: 1 }} />

              <Typography
                variant="body2"
                sx={{ color: "text.secondary" }}
                gutterBottom
              >
                SKU:&nbsp;<span style={{ marginLeft: "10px" }}>SS001</span>
                <br />
                Category:&nbsp;<span>sofas</span>
                <br />
                Tags:&nbsp;<span>sofa, chair, home, shop</span>
                <br />
                Share:&nbsp;
                <IconButton color="inherit" aria-label="share on Facebook">
                  <FacebookIcon />
                </IconButton>
                <IconButton color="inherit" aria-label="share on LinkedIn">
                  <LinkedInIcon />
                </IconButton>
                <IconButton color="inherit" aria-label="share on Twitter">
                  <TwitterIcon />
                </IconButton>
              </Typography>
            </Grid>
          </Grid>
        )}
      </StyledContainer>

      <Divider
        flexItem
        sx={{ height: "30px", mx: 5 }} // Set a height if needed
      />
      <Box display="flex" justifyContent="center" alignItems="center" gap={4}>
        <Typography
          variant="subtitle1"
          onClick={() => setActiveTab("description")}
          sx={{
            cursor: "pointer",
            color:
              activeTab === "description" ? "primary.black" : "text.secondary",
            fontWeight: activeTab === "description" ? "bold" : "normal",
          }}
        >
          Description
        </Typography>
        <Typography
          variant="subtitle1"
          onClick={() => setActiveTab("additionalInfo")}
          sx={{
            cursor: "pointer",
            color:
              activeTab === "additionalInfo"
                ? "primary.black"
                : "text.secondary",
            fontWeight: activeTab === "additionalInfo" ? "bold" : "normal",
          }}
        >
          Additional Information
        </Typography>
        <Typography
          variant="subtitle1"
          onClick={() => setActiveTab("review")}
          sx={{
            cursor: "pointer",
            color: activeTab === "review" ? "primary.black" : "text.secondary",
            fontWeight: activeTab === "review" ? "bold" : "normal",
          }}
        >
          Review (5)
        </Typography>
      </Box>

      {/* Render data based on the selected tab */}
      <Box
        sx={{
          maxWidth: "80%",
          margin: "0 auto",
          padding: "20px",
          gap: "20px",
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {activeTab === "description" && (
          <Typography align="center">{product.description}</Typography>
        )}
        {activeTab === "additionalInfo" && (
          <Typography align="center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
            cum dolor nobis deserunt iste aut fugit explicabo, repellat odit
            adipisci, assumenda aliquam neque labore sapiente? Debitis dolore
            optio modi voluptates.
          </Typography>
        )}
        {activeTab === "review" && (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            maxWidth="80%"
            mx="auto"
            p={3}
          >
            {reviews.map((review) => (
              <Box
                key={review.id}
                display="flex"
                flexDirection="column"
                alignItems="center"
                maxWidth="1000px"
                width="100%"
                p={3}
                mb={2}
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  boxShadow: 1,
                }}
              >
                {/* Reviewer Info */}
                <Box display="flex" alignItems="center" gap={2} mb={2}>
                  <Avatar sx={{ bgcolor: "primary.main" }}>
                    {review.avatar}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {review.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {review.summary}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        )}
        <Grid container spacing={2} justifyContent="center">
          {/* First Item */}
          <Grid item xs={12} sm={6} md={3} lg={2}>
            <img
              src="/sofa.png"
              alt="sofas"
              style={{ width: "100%", height: "auto" }} // Set a fixed width
            />
          </Grid>

          {/* Second Item */}
          <Grid item xs={12} sm={6} md={3} lg={2}>
            <img
              src="/sofa.png"
              alt="sofas"
              style={{ width: "100%", height: "auto" }} // Set a fixed width
            />
          </Grid>
        </Grid>
      </Box>

      <Divider
        flexItem
        sx={{ height: "30px", mx: 5 }} // Set a height if needed
      />

      {/* Render related products */}
      <Box>
        <Typography align="center" variant="h6" fontWeight="bold" gutterBottom>
          Related Products
        </Typography>
        <Masonry columns={4} spacing={2}>
          {images.map((image) => (
            <Box
              key={image.id}
              sx={{ position: "relative", overflow: "hidden" }}
            >
              <img
                src={image.src}
                alt={image.title}
                style={{
                  width: "100%",
                  height: "auto",
                }}
              />
            </Box>
          ))}
        </Masonry>
      </Box>

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
    </>
  );
};

export default ProductDetail;
