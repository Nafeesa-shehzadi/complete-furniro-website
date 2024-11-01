import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Helper function to generate a random price
const generateRandomPrice = (min = 500, max = 5000) => {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2)); // Generates a price between $50 and $500
};
// Helper function to check if a date is within the last n months
const isDateWithinDays = (dateString, days) => {
  const date = new Date(dateString);
  const now = new Date();
  const pastDate = new Date(now.setDate(now.getDate() - days)); // Calculate the date 10 days ago
  return date >= pastDate; // Return true if the date is within the last 10 days
};
// Function to calculate stars based on likes
const calculateStars = (likes) => {
  const stars = Math.min(Math.floor(likes / 1000), 5); // Cap stars at 5
  return stars;
};

// Create an async thunk for fetching furniture products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch(
      "https://api.unsplash.com/search/photos?query=furniture&per_page=30&page=1&client_id=2ZmHyYZrGCDGUkqODTUIf9RHePSibj9DxqHEDCkzL3g" // Replace with your actual access key
    );
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();
    return data.results.map((item) => {
      const price = generateRandomPrice();
      const discountPrice = parseFloat((price * 0.9).toFixed(2)); // Calculate a 10% discount price
      // Determine if the product is new based on updated_at date (within the last 6 months)
      const isNew = isDateWithinDays(item.updated_at, 2); // Change 6 to 10 for 10 months
      return {
        id: item.id,
        title: item.alt_description || "No description available",
        thumbnail: item.urls.small, // You can change this to 'regular' or 'full' if needed
        description: item.description || "No description available",
        price: price, // Original price
        discountPrice: discountPrice, // 10% discounted price
        isNew: isNew,
        likes: item.likes || 0,
        stars: calculateStars(item.likes), // Calculate the number of stars based on likes
      };
    });
  }
);

// Initial state
const initialState = {
  products: [],
  displayedProducts: 100, // Show 10 products initially
  status: "idle", // "idle" | "loading" | "succeeded" | "failed"
  error: null,
};

// Create a slice for product management
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    loadMoreProducts: (state) => {
      state.displayedProducts += 5; // Increase the number of displayed products by 5
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Export actions
export const { loadMoreProducts } = productSlice.actions;

// Export the products state selectors
export const selectProducts = (state) => state.products.products;
export const selectDisplayedProducts = (state) =>
  state.products.products.slice(0, state.products.displayedProducts);

// Export the reducer to be added to the Redux store
export default productSlice.reducer;
