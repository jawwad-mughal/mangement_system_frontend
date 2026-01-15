import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// -------------------- Async Thunks --------------------

// Create Product
export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/products/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Edit Product
export const editProduct = createAsyncThunk(
  "product/editProduct",
  async ({ id, formData }, { rejectWithValue }) => {
    
    try {
      const response = await axios.put(
        `http://localhost:5000/products/update/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Fetch All Products
export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5000/products", {
        withCredentials: true, // 👈 ye ensure karega cookies sath bheji jaaye
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Delete Product
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/products/delete/${id}`,
        { withCredentials: true }
      );
      return { message: response.data.message, id };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// -------------------- Slice --------------------
const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    loading: false,
    message: null,
    error: null,
    singleProducts: null
  },
  reducers: {
    getSingleProducts: (state,action) => {
      state.singleProducts = action.payload
    }
  },
  extraReducers: (builder) => {
    // Create Product
    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
      });

    // Fetch Products
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload || [];
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
      });

        // Edit Product
    builder
      .addCase(editProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
        state.singleProducts = action.payload?.product;
        // Optionally update the product in products list
        const index = state.products.findIndex(
          (p) => p._id === action.payload?.product?._id
        );
        if (index !== -1) state.products[index] = action.payload.product;
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
      });

       // Delete Product
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;

        // Remove deleted product from products list
        state.products = state.products.filter(
          (product) => product._id !== action.payload.id
        );

        // If the deleted product is currently in singleProducts, reset it
        if (state.singleProducts?._id === action.payload.id) {
          state.singleProducts = null;
        }
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
      });
  },
});

export const { getSingleProducts } = productSlice.actions;
export default productSlice.reducer;
