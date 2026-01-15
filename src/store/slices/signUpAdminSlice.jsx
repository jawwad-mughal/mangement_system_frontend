import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const signupAdmin = createAsyncThunk(
    "auth/signupAdmin",
    async (signupAdminForm, { rejectWithValue }) => {
        try {
            const res = await axios.post(
             "http://localhost:5000/signup",
               signupAdminForm 
            )

            // Return data for fulfilled action
            return  res.data
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Signup failed')
        }
    }
)

const initialState = {
    loading: false,
    message: null,
}

const signupAdminSlice = createSlice({
    name: "signupadmin",
    initialState,
    reducers: {
    clearMessage: (state) => {
      state.message = null;
      state.error = null;
    },
  },

    extraReducers: (builder) => {
        builder
            .addCase(signupAdmin.pending, (state) => {
                state.loading = true,
                state.message = null
            })
            .addCase(signupAdmin.fulfilled,(state, action) => {
                state.loading = false
                state.message = action.payload.message
            })
            .addCase(signupAdmin.rejected, (state, action) => {
                state.loading = false
                state.message = action.payload
            })
    } 
})

export const { clearMessage } = signupAdminSlice.actions
export default signupAdminSlice.reducer
