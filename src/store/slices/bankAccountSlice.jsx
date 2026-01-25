import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/bankaccount";

/* ============================
   CREATE BANK ACCOUNT
============================ */
export const createBankAccount = createAsyncThunk(
  "bankAccount/create",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/create`, formData);
      return res.data.data; // ✅ sirf account data return karenge
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Account create failed"
      );
    }
  }
);


/* ============================
   GET ALL BANK ACCOUNTS
============================ */
export const getBankAccounts = createAsyncThunk(
  "bankAccount/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}`);
      return res.data.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch bank accounts");
    }
  },
);

/* ============================
   SLICE
============================ */
const bankAccountSlice = createSlice({
  name: "bankAccount",
  initialState: {
    accounts: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetStatus: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      /* CREATE */
      .addCase(createBankAccount.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBankAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true; // success boolean
        state.accounts.unshift(action.payload); // payload = account object (res.data.data)
        state.error = null;
      })
      .addCase(createBankAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* GET ALL */
      .addCase(getBankAccounts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBankAccounts.fulfilled, (state, action) => {
        state.loading = false;
        state.accounts = action.payload;
      })
      .addCase(getBankAccounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetStatus } = bankAccountSlice.actions;
export default bankAccountSlice.reducer;
