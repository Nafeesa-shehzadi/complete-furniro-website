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
  height: "400px",
  objectFit: "cover", // Keep the aspect ratio
});

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
      dispatch(addItemToCart(product));
      setCartBtn("Remove from Cart");
    } else {
      dispatch(removeItemFromCart(product));
      setCartBtn("Add to Cart");
    }
  };

  return (
    <StyledContainer>
      <Grid container spacing={2}>
        <Grid item md={6} container justifyContent="center">
          {/* Use imgSrc field for the product image */}
          <StyledImage src={product.imgSrc} alt={product.name} />
        </Grid>
        <Grid item md={6} container direction="column" justifyContent="center">
          <Typography variant="h2" component="h1" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h5" color="text.secondary" my={2}>
            {/* Display price if it exists, otherwise show discount price */}
            {product.discountPrice
              ? `$${product.discountPrice}`
              : `$${product.price}`}
          </Typography>
          <Typography variant="body">{product.description}</Typography>
          <Button
            onClick={() => handleCart(product)}
            variant="outlined"
            color="primary"
            sx={{ mt: 3 }} // margin-top for spacing
          >
            {cartBtn}
          </Button>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default ProductDetail;
