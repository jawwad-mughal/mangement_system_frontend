import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const Url = "http://localhost:5000"; // correct backend URL

// create Branch in database
export const createBranch = createAsyncThunk(
  "branch/createBranch",
  async (branchData, thunkAPI) => {
    try {
      const res = await axios.post(`${Url}/branch/createbranch`, branchData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

// fetech all branch data
export const allBranch = createAsyncThunk(
  "branch/getBranch",
  async ({ page, limit }, rejectWithValue) => {
   
    try {
      const res = await axios.get(
        `${Url}/branch/get?page=${page}&limit=${limit}`,
        { withCredentials: true }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// get all branch
export const getAllBranch = createAsyncThunk(
  "branch/getAllBranch",
  async ( _,{ rejectWithValue }) => {
    try {
      const res = await axios.get(`${Url}/branch/getallbranch`, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

// get single branch
export const singleBranch = createAsyncThunk(
  "branch/singlebranch",
  async (id, rejectWithValue) => {
    try {
      const res = await axios.get(`${Url}/branch/getsinglebranch/${id}`, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// update branch data
export const updateBranch = createAsyncThunk(
  "branch/updateBranch",
  async (formData, thunkAPI) => {
    try {
      const res = await axios.put(`${Url}/branch/updatebranch`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Update failed"
      );
    }
  }
);

// delete branch
export const deleteBranch = createAsyncThunk(
  "branch/deleteBranch",
  async (id, thunkAPI) => {
    try {
      const res = await axios.delete(`${Url}/branch/delete/${id}`, {
        withCredentials: true,
      });
      return { id, message: res.data.message };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const branchSlice = createSlice({
  name: "branch",
  initialState: {
    list: [],
    message: null,
    loader: false,
    hasMore: null,
    totalPage: 0,
    singleBranchData: null,
  },
  reducers: {
    clearMessage: (state) => {
      state.message = null;
    },
    resetBranch: (state) => {
      (state.list = []), (state.singleBranchData = null);
    },
  },

  extraReducers: (builder) => {
    builder

      // create branch slice
      .addCase(createBranch.pending, (state) => {
        state.loader = true;
        state.message = null;
      })
      .addCase(createBranch.fulfilled, (state, action) => {
        state.loader = false;
        state.message = action.payload?.message;
      })
      .addCase(createBranch.rejected, (state, action) => {
        state.loader = false;
        state.message = action.payload; // error message string
      })

      // fetch data slice
      .addCase(allBranch.pending, (state) => {
        state.loader = true;
        state.message = null;
      })
      .addCase(allBranch.fulfilled, (state, action) => {
        state.loader = false;
        const newBranch = action.payload.getAllBranch;
        state.list = [...state.list, ...newBranch];
        state.hasMore = action.payload.hasMore;
      })
      .addCase(allBranch.rejected, (state, action) => {
        state.loader = false;
        state.message = action.payload;
      })

      // single data
      .addCase(singleBranch.pending, (state) => {
        state.loader = true;
        state.message = null;
      })
      .addCase(singleBranch.fulfilled, (state, action) => {
        state.loader = false;
        state.singleBranchData = action.payload;
      })
      .addCase(singleBranch.rejected, (state, action) => {
        state.loader = false;
        state.message = action.payload;
      })

      // update branch slice
      .addCase(updateBranch.pending, (state) => {
        state.loader = true;
        state.message = null;
      })
      .addCase(updateBranch.fulfilled, (state, action) => {
        state.loader = false;
        state.message =
          action.payload?.message || "Branch updated successfully";

        // update list in UI without refetch
        const updated = action.payload?.updatedBranch;
        if (updated) {
          state.list = state.list.map((item) =>
            item._id === updated._id ? updated : item
          );
        }
      })
      .addCase(updateBranch.rejected, (state, action) => {
        state.loader = false;
        state.message = action.payload;
      })

      // DELETE
      .addCase(deleteBranch.pending, (state) => {
        state.loader = true;
      })
      .addCase(deleteBranch.fulfilled, (state, action) => {
        state.loader = false;
        state.message = action.payload.message;
        state.list = state.list.filter((b) => b._id !== action.payload.id);
      })
      .addCase(deleteBranch.rejected, (state, action) => {
        state.loader = false;
        state.message = action.payload;
      })

      // get all branch
      .addCase(getAllBranch.pending, (state) => {
        state.loader = true;
        state.message = null;
      })
      .addCase(getAllBranch.fulfilled, (state, action) => {
        state.loader = false;
        state.list = action.payload || [];
      })
      .addCase(getAllBranch.rejected, (state, action) => {
        state.loader = false;
        state.message = action.payload;
      });
  },
});
export const { clearMessage, resetBranch } = branchSlice.actions;
export default branchSlice.reducer;
