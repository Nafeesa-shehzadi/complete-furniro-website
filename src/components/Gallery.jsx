import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  selectDisplayedProducts,
  loadMoreProducts,
} from "../redux/productSlice"; // Adjust the import path as necessary
import {
  Grid,
  Card,
  CardMedia,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";

const Gallery = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectDisplayedProducts);
  const allProducts = useSelector((state) => state.products.products); // Fetch all products
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const handleLoadMore = () => {
    dispatch(loadMoreProducts());
  };

  if (status === "loading") {
    return <CircularProgress />;
  }

  if (status === "failed") {
    return <Typography color="error">Error: {error}</Typography>;
  }

  return (
    <div>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={product.thumbnail}
                alt={product.title}
              />
              <Typography variant="h6">{product.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {product.description}
              </Typography>
              <Typography variant="h6">
                Original Price: {product.price}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
      {products.length < allProducts.length && ( // Check if there are more products to load
        <Button
          variant="outlined"
          onClick={handleLoadMore}
          style={{ marginTop: "20px" }}
        >
          View More
        </Button>
      )}
    </div>
  );
};

export default Gallery;
