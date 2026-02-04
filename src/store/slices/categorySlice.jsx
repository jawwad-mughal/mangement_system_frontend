import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = "https://mangement-system-backend.vercel.app"

// add category slice
export const addCategory = createAsyncThunk(
    "category/addCategory",
    async(formData, {rejectWithValue}) => {
        try {
            const res = await axios.post(`${url}/category/add`,formData,{
                withCredentials: true,
            })
            return res.data
            
        } catch (error) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
)

// get all category slice
export const getCategory = createAsyncThunk(
    "branch/getCategory",
    async(_, {rejectWithValue} ) => {
        try {
            const res = await axios.get(`${url}/category/get`,{
                withCredentials: true
            })
            return res.data
            
        } catch (error) {
             return rejectWithValue(error.response?.data?.message);
        }
    }
)

// edit category create function
export const updateCategory = createAsyncThunk(
    "category/editCategory",
    async(formData, {rejectWithValue}) => {

        try {
            const res = await axios.put( `${url}/category/edit`, formData, {
                withCredentials: true
            })
            return res.data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
)

// Delete category by sending ID in body
export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${url}/category/delete`, {
        data: formData, 
        withCredentials: true 
      });
      
      // return object with id taake List update ho
      return res.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);
const categorySlice = createSlice({
    name: "category",
    initialState: {
       message: null,
       loader: false, 
       List: [],
       editData: null,
       editCategory: null
    },
    reducers: {
        resetMessage: (state) => {
            state.message = null
        },

        getEditCategory: (state, action) => {
        state.editCategory = action.payload
        },
    
    },

    extraReducers: (builder) => {
        builder

        // add new Category
        .addCase(addCategory.pending, (state) => {
            state.loader = true
            state.message = null
        })
        .addCase(addCategory.fulfilled, (state, action) => {
            state.loader = false
            state.message = action.payload?.message
        })
        .addCase(addCategory.rejected, (state, action) => {
            state.loader = false
            state.message = action.payload
        })

        // create get all category Slice
        .addCase(getCategory.pending, (state) => {
            state.loader = true
            state.message = null
        })
        .addCase(getCategory.fulfilled, (state, action) => {
            state.loader = false
            state.List = action.payload?.message || []
        })
        .addCase(getCategory.rejected, (state, action) => {
            state.loader = false
            state.message = action.payload
        })

        // create edit category Slice
        .addCase(updateCategory.pending, (state) => {
            state.loader = true
            state.message = null
        })
        .addCase(updateCategory.fulfilled, (state, action) => {
            state.loader = false
            state.message = action.payload?.message
        })
        .addCase(updateCategory.rejected, (state, action) => {
            state.loader = false
            state.message = action.payload
        })

        
      // DELETE CATEGORY
     
      .addCase(deleteCategory.pending, (state) => {
        state.loader = true;
        state.message = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loader = false;
        state.message = action.payload.message;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loader = false;
        state.message = action.payload || "Failed to delete";
      });
    }
})

// Export the reducer for the store
export const {resetMessage, getEditCategory} = categorySlice.actions
export default categorySlice.reducer;