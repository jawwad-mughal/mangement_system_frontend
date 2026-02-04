import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "https://mangement-system-backend.vercel.app";

// ======================= GET ALL STOCK =======================
export const getAllStock = createAsyncThunk(
  "stock/getAllStock",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${url}/inventory/all`, {
        withCredentials: true,
      });

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// ======================= ADD STOCK =======================
export const addStock = createAsyncThunk(
  "stock/addStock",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${url}/inventory/add`, formData, {
        withCredentials: true,
      });

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// ======================= UPDATE STOCK =======================
export const updateStock = createAsyncThunk(
  "stock/updateStock",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${url}/inventory/update`, formData, {
        withCredentials: true,
      });

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// ======================= DELETE STOCK =======================
export const deleteStock = createAsyncThunk(
  "stock/deleteStock",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${url}/inventory/delete`, {
        data: { id },
        withCredentials: true,
      });

      return { message: res.data.message, id };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// ======================= Slice =======================
const stockSlice = createSlice({
  name: "stock",
  initialState: {
    list: [],
    editData: null,
    loader: false,
    message: null,
    error: null,
  },

  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },

    getEditStock: (state, action) => {
      state.editData = action.payload;
    },
  },

  extraReducers: (builder) => {
    // GET ALL
    builder
      .addCase(getAllStock.pending, (state) => {
        state.loader = true;
      })
      .addCase(getAllStock.fulfilled, (state, action) => {
        state.loader = false;
        state.list = action.payload.data;
      })
      .addCase(getAllStock.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload;
      });

    // ADD
    builder
      .addCase(addStock.pending, (state) => {
        state.loader = true;
      })
      .addCase(addStock.fulfilled, (state, action) => {
        state.loader = false;
        state.message = action.payload.message;
      })
      .addCase(addStock.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload;
      });

    // UPDATE
    builder
      .addCase(updateStock.pending, (state) => {
        state.loader = true;
      })
      .addCase(updateStock.fulfilled, (state, action) => {
        state.loader = false;
        state.message = action.payload.message;
      })
      .addCase(updateStock.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload;
      });

    // DELETE
    builder
      .addCase(deleteStock.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.list = state.list.filter((s) => s._id !== action.payload.id);
      })
      .addCase(deleteStock.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { resetMessage, getEditStock } = stockSlice.actions;

export default stockSlice.reducer;

