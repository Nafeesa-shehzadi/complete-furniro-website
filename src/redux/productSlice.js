import { createSlice } from "@reduxjs/toolkit";

// Initial state with updated products
const initialState = {
  products: [
    {
      id: 1,
      name: "Sleek Armchair",
      description: "Comfortable chair for any space.",
      price: 4500,
      discountPrice: 3500,
      imgSrc: "/p1.png",
    },
    {
      id: 2,
      name: "Modern Sofa",
      description: "Elegant and stylish sofa for your living room.",
      price: 5500,
      discountPrice: 4500,
      imgSrc: "/p2.png",
    },
    {
      id: 3,
      name: "Classic Recliner",
      description: "Perfect for relaxation with reclining feature.",
      discountPrice: 2800,
      imgSrc: "/p3.png",
    },
    {
      id: 4,
      name: "Minimalist Coffee Table",
      description: "Stylish coffee table to complete your living space.",
      price: 1500,
      discountPrice: 1200,
      imgSrc: "/p4.png",
    },
    {
      id: 5,
      name: "Vintage Dining Chair",
      description: "Chic dining chair for a rustic look.",
      price: 2000,
      discountPrice: 1800,
      imgSrc: "/p5.png",
    },
    {
      id: 6,
      name: "Contemporary Bookshelf",
      description: "Stylish bookshelf for your favorite books.",
      price: 3500,
      discountPrice: 3000,
      imgSrc: "/p6.png",
    },
    {
      id: 7,
      name: "Cozy Bean Bag",
      description: "Perfect for lounging and relaxing.",
      discountPrice: 800,
      imgSrc: "/p7.png",
    },
    {
      id: 8,
      name: "Elegant Desk Lamp",
      description: "Stylish desk lamp for better lighting.",
      price: 800,
      discountPrice: 600,
      imgSrc: "/p8.png",
    },
    {
      id: 9,
      name: "Outdoor Lounge Chair",
      description: "Comfortable chair for your patio.",
      price: 2500,
      discountPrice: 2200,
      imgSrc: "/p9.webp",
    },
    {
      id: 10,
      name: "Stylish Ottoman",
      description: "Versatile ottoman for seating or footrest.",
      price: 1500,
      discountPrice: 1200,
      imgSrc: "/p10.webp",
    },
    {
      id: 11,
      name: "Rustic Side Table",
      description: "Perfect for placing drinks or books.",
      discountPrice: 1500,
      imgSrc: "/p11.webp",
    },
    {
      id: 12,
      name: "Luxurious Bed Frame",
      description: "Elegant bed frame for your bedroom.",
      price: 6000,
      discountPrice: 5000,
      imgSrc: "/p12.webp",
    },
    {
      id: 13,
      name: "Artistic Wall Clock",
      description: "Beautiful clock to adorn your wall.",
      price: 700,
      discountPrice: 600,
      imgSrc: "/p1.png",
    },
    {
      id: 14,
      name: "Comfortable Mattress",
      description: "High-quality mattress for restful sleep.",
      price: 4000,
      discountPrice: 3500,
      imgSrc: "/p2.png",
    },
    {
      id: 15,
      name: "Stylish Floor Lamp",
      description: "Elegant lamp to brighten up any room.",
      discountPrice: 1000,
      imgSrc: "/p3.png",
    },
    {
      id: 16,
      name: "Classic Nightstand",
      description: "Essential nightstand for your bedroom.",
      price: 1000,
      discountPrice: 800,
      imgSrc: "/p4.png",
    },
    {
      id: 17,
      name: "Elegant Dining Table",
      description: "Perfect dining table for family gatherings.",
      price: 5000,
      discountPrice: 4500,
      imgSrc: "/p17.webp",
    },
    {
      id: 18,
      name: "Stylish Wardrobe",
      description: "Spacious wardrobe for all your clothes.",
      price: 4500,
      discountPrice: 4000,
      imgSrc: "/p18.webp",
    },
    {
      id: 19,
      name: "Chic Vanity Table",
      description: "Beautiful vanity table for your beauty essentials.",
      discountPrice: 2500,
      imgSrc: "/p19.webp",
    },
    {
      id: 20,
      name: "Comfortable Loveseat",
      description: "Perfect for cuddling and relaxation.",
      price: 4200,
      discountPrice: 3800,
      imgSrc: "/p20.webp",
    },
    {
      id: 21,
      name: "Elegant Console Table",
      description: "Stylish console table for your entryway.",
      price: 2500,
      discountPrice: 2200,
      imgSrc: "/p21.webp",
    },
    {
      id: 22,
      name: "Modern Storage Bench",
      description: "Versatile storage bench for extra space.",
      discountPrice: 2500,
      imgSrc: "/p22.webp",
    },
  ],
};

// Create a slice for product management
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // You can add more reducers here (e.g., addProduct, removeProduct)
  },
});

// Export the products state selector
export const selectProducts = (state) => state.products.products;

// Export the reducer to be added to the Redux store
export default productSlice.reducer;
