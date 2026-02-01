import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:5000/api/transactions";

// CREATE
export const createTransaction = createAsyncThunk(
  "transactions/create",
  async (data) => {
    const res = await axios.post(API, data);
    return res.data.transaction;
  }
);

// GET
export const getTransactions = createAsyncThunk(
  "transactions/get",
  async () => {
    const res = await axios.get(API);
    return res.data.transactions;
  }
);

// UPDATE
export const updateTransaction = createAsyncThunk(
  "transactions/update",
  async ({ id, data }) => {
    const res = await axios.put(`${API}/${id}`, data);
    return res.data.transaction;
  }
);

// DELETE
export const deleteTransaction = createAsyncThunk(
  "transactions/delete",
  async (id) => {
    await axios.delete(`${API}/${id}`);
    return id;
  }
);

const transactionSlice = createSlice({
  name: "transactions",
  initialState: {
    transactions: [],
    loader: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTransactions.pending, (state) => {
        state.loader = true;
      })
      .addCase(getTransactions.fulfilled, (state, action) => {
        state.loader = false;
        state.transactions = action.payload;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.transactions.unshift(action.payload);
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        const i = state.transactions.findIndex(
          (t) => t._id === action.payload._id
        );
        if (i !== -1) state.transactions[i] = action.payload;
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.transactions = state.transactions.filter(
          (t) => t._id !== action.payload
        );
      });
  },
});

export default transactionSlice.reducer;
