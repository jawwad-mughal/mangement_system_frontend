import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ============================
// Async thunk → check section access
// ============================
export const checkSectionAccess = createAsyncThunk(
  "section/checkAccess",
  async (section, { rejectWithValue }) => {
    
    try {
      const res = await axios.post(
        `https://mangement-system-backend.vercel.app/checkSection`,
        {section},
        { withCredentials: true }
      );
      return res.data  
    } catch (err) {
      // 403 / 401 → Access denied
       return rejectWithValue({
        message: err.response?.data?.message,
        employeeData: err.response?.data?.employeeData,
        url: err.response?.data?.url
      });
    }
  }
);

// ============================
// Slice
// ============================
const sectionSlice = createSlice({
  name: "section",
  initialState: {
    loader: false,
    error: null,
    urlsection: null,
    url: null,
    employees: null
  },
  reducers: {
    resetSections: (state) => {
      state.loader = false;
      state.error = null;
      state.urlsection = null
      state.url = null
      state.employees = null

    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkSectionAccess.pending, (state) => {
        state.loader = true;
        state.error = null;
      })
      .addCase(checkSectionAccess.fulfilled, (state, action) => {
        state.loader = false;
        state.message = action.payload.message;
        state.url = action.payload?.url
        state.urlsection = action.payload?.urlsection
        state.employees = action.payload?.employeeData
      })
      .addCase(checkSectionAccess.rejected, (state, action) => {
        state.loader = false;
        state.message = action.payload?.message;
        state.url = action.payload?.url
        state.urlsection = action.payload?.urlsection
        state.employees = action.payload?.employeeData || null;
        
      });
  },
});

export const { resetSections } = sectionSlice.actions;
export default sectionSlice.reducer;
