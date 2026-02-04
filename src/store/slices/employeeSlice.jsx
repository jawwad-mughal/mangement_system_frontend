import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://mangement-system-backend.vercel.app";

// =========================
// 📌 FETCH Employees (Pagination)
// =========================
export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async ({ page, limit }, thunkAPI) => {
    try {
      const res = await axios.get(
        `${API_URL}/employee/get?page=${page}&limit=${limit}`,
        { withCredentials: true }
      );
      return res.data; // { employees, page, hasMore, total }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

// get single data
export const getSingleEmployee = createAsyncThunk(
  "employees/getSingleEmployee",
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(`${API_URL}/employee/getsingledata/${id}`, {
        withCredentials: true,
      });
      return res.data; // single employee data
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

// =========================
// 📌 UPDATE Employee
// =========================
export const updateEmployee = createAsyncThunk(
  "employees/updateEmployee",
  async ({ id, formData }, thunkAPI) => {
    try {
      const res = await axios.put(
        `${API_URL}/employee/update/${id}`,
        formData,
        {
          withCredentials: true,  
        }
      );

      return res.data; // updated employee
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

// =========================
// 📌 ADD Employee
// =========================
export const addEmployee = createAsyncThunk(
  "employees/addEmployee",
  async (formData, thunkAPI) => {
    try {
      const res = await axios.post(`${API_URL}/employee/add`, formData, {
        withCredentials: true,
        
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

// =========================
// 📌 DELETE Employee
// =========================
export const deleteEmployee = createAsyncThunk(
  "employees/deleteEmployee",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`${API_URL}/employee/delete/${id}`, {
        withCredentials: true,
      });
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

// =========================
// 📌 SLICE
// =========================
const employeeSlice = createSlice({
  name: "employees",
  initialState: {
    list: [],
    page: 1,
    limit: 10,
    hasMore: true,
    total: 0,
    loading: false,
    error: null,
    success: null,
    singleEmployee: null,
  },

  reducers: {
    clearMessage: (state) => {
      state.error = null;
      state.success = null;
    },
    resetEmployees: (state) => {
      state.list = [];
      state.page = 1;
      state.hasMore = true;
    },
  },

  extraReducers: (builder) => {
    builder

      // =========================
      // FETCH PAGINATION
      // =========================
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;

        const { employees, page, hasMore, total } = action.payload;

        // Agar page 1 hai, list replace kar do (refresh)
        if (page === 1) {
          state.list = employees;
        } else {
          // append only new employees (avoid duplicates)
          const newEmployees = employees.filter(
            (emp) => !state.list.some((e) => e._id === emp._id)
          );
          state.list = [...state.list, ...newEmployees];
        }

        state.page = page;
        state.hasMore = hasMore;
        state.total = total;
      })

      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =========================
      // ADD EMPLOYEE
      // =========================
      .addCase(addEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.list.unshift(action.payload); // add on top
        state.success = "Employee added successfully!";
      })
      .addCase(addEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =========================
      // UPDATE EMPLOYEE
      // =========================
      .addCase(updateEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.loading = false;

        // employee list update (replace edited employee)
        state.list = state.list.map((emp) =>
          emp._id === action.payload._id ? action.payload : emp
        );

        state.success = "Employee updated successfully!";
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // get single data
      .addCase(getSingleEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getSingleEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.singleEmployee = action.payload;
      })

      .addCase(getSingleEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =========================
      // DELETE EMPLOYEE
      // =========================
      .addCase(deleteEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter((emp) => emp._id !== action.payload);
        state.success = "Employee deleted!";
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMessage, resetEmployees } = employeeSlice.actions;

export default employeeSlice.reducer;
