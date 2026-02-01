import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/bankaccount";

/* ================= GET ALL ================= */
export const getBankAccounts = createAsyncThunk(
  "bankAccount/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/getall`);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

/* ================= CREATE ================= */
export const createBankAccount = createAsyncThunk(
  "bankAccount/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/create`, data);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

/* ================= UPDATE ================= */
export const updateBankAccount = createAsyncThunk(
  "bankAccount/update",
  async (data, { rejectWithValue }) => {
    // console.log(data)
    try {
      const res = await axios.put(`${API_URL}/edit`, data);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

/* ================= DELETE ================= */
export const deleteBankAccount = createAsyncThunk(
  "bankAccount/delete",
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${API_URL}/delete`, { data: { id } });
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

/* ================= SLICE ================= */
const bankAccountSlice = createSlice({
  name: "bankAccount",
  initialState: { accounts: [], loader: false, message: null },
  reducers: { resetMessage: (state) => { state.message = null } },
  extraReducers: (builder) => {
    builder
      /* GET */
      .addCase(getBankAccounts.pending, (state) => { state.loader = true })
      .addCase(getBankAccounts.fulfilled, (state, action) => { state.loader = false; state.accounts = action.payload })
      .addCase(getBankAccounts.rejected, (state, action) => { state.loader = false; state.message = action.payload })

      /* CREATE */
      .addCase(createBankAccount.pending, (state) => { state.loader = true })
      .addCase(createBankAccount.fulfilled, (state, action) => {
        state.loader = false;
        state.accounts.unshift(action.payload);
        state.message = "Account created successfully";
      })
      .addCase(createBankAccount.rejected, (state, action) => { state.loader = false; state.message = action.payload })

      /* UPDATE */
      .addCase(updateBankAccount.fulfilled, (state, action) => {
        const index = state.accounts.findIndex(acc => acc._id === action.payload._id);
        if (index !== -1) state.accounts[index] = action.payload;
        state.message = "Account updated successfully";
      })

      /* DELETE */
      .addCase(deleteBankAccount.fulfilled, (state, action) => {
        state.accounts = state.accounts.filter(acc => acc._id !== action.payload);
        state.message = "Account deleted successfully";
      });
  }
});

export const { resetMessage } = bankAccountSlice.actions;
export default bankAccountSlice.reducer;







