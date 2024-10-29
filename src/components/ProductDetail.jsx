import React, { useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeItemFromCart } from "../redux/cartSlice";
import { Box, Grid, Typography, Button, styled } from "@mui/material";
// Styled components
const StyledContainer = styled(Box)(({ theme }) => ({
  margin: theme.spacing(5, 7),
  padding: theme.spacing(5),
}));

const StyledImage = styled("img")({
  height: "350px",
  objectFit: "cover", // Keep the aspect ratio
  width: "350px",
  borderRadius: "10px",
});
const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "5px",
  width: "100%",
  height: "40px",
  marginLeft: "1px",
  borderColor: "#ad8544",
  marginTop: 10,
  "&:hover": {
    backgroundColor: "#ad8544",
    color: "white",
  },
  color: "black",
  textTransform: "none",
}));

const ProductDetail = () => {
  const [cartBtn, setCartBtn] = useState("Add to Cart");

  const dispatch = useDispatch();
  const { id } = useParams();

  // Fetch products from Redux state
  const products = useSelector((state) => state.products.products);
  const product = products.find((x) => x.id.toString() === id);

  // Return a message if the product is not found
  if (!product) {
    return <div>Product not found</div>;
  }

  // Handle cart actions
  const handleCart = (product) => {
    if (cartBtn === "Add to Cart") {
      dispatch(addItemToCart({ ...product, quantity: 1 }));
      setCartBtn("Remove from Cart");
    } else {
      dispatch(removeItemFromCart(product));
      setCartBtn("Add to Cart");
    }
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
  return (
    <StyledContainer>
      <Grid container spacing={2}>
        <Grid item md={6} container justifyContent="center">
          {/* Use imgSrc field for the product image */}
          <StyledImage src={product.thumbnail} alt={product.title} />
        </Grid>
        <Grid item md={6} container direction="column" justifyContent="center">
          <Typography variant="h2" component="h1" gutterBottom>
            {product.title}
          </Typography>
          <Typography variant="h5" color="text.secondary" my={2}>
            {/* Display price if it exists, otherwise show discount price */}
            {product.discountPrice
              ? `Price: ${product.discountPrice} rs`
              : `Price: ${product.price} rs`}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Likes: {product.likes}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Rating: {renderStars(product.stars)} {/* Render the stars here */}
          </Typography>
          <Typography variant="body">{product.description}</Typography>
          <StyledButton onClick={() => handleCart(product)} variant="outlined">
            {cartBtn}
          </StyledButton>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default ProductDetail;
