import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { statusCodes } from "../common/constant";
import commonService from "../common/commonService";
import { URLS } from "../common/appConstants";
import { toast } from "react-toastify";

const initialState = {
  isEmployeeLoading: false,
  errorMessage: "",
  error: null,
  employeeList: [],
  employeeDetails: null,
  isEmployeeDeleted: null,
  isEmployeeAdded: null,
  isEmployeeUpdated: null,
};

export const fetchAllEmployees = createAsyncThunk(
  "employee/all",
  async (data, { rejectWithValue }) => {
    const res = await commonService.getRequest(URLS.EMPLOYEE, data);
    if (res.statusCode !== statusCodes.SUCCESS) {
      return rejectWithValue(res.message);
    }
    return res.data;
  }
);
export const fetchEmployeeById = createAsyncThunk(
  "employee/id",
  async (id, { rejectWithValue }) => {
    const res = await commonService.getByIdRequest(URLS.EMPLOYEE, id);
    if (res.statusCode !== statusCodes.SUCCESS) {
      return rejectWithValue(res.message);
    }
    return res.data;
  }
);

export const deleteEmployee = createAsyncThunk(
  "employee/delete",
  async (id, { rejectWithValue }) => {
    const res = await commonService.deleteRequest(URLS.EMPLOYEE, id);
    if (res.statusCode !== statusCodes.SUCCESS) {
      toast.error(res.message);
      return rejectWithValue(res.message);
    }
    toast.success(res.message);
    return res.data;
  }
);

export const addEmployee = createAsyncThunk(
  "employee/add",
  async (data, { rejectWithValue }) => {
    const res = await commonService.postRequestForFormData(
      URLS.ADD_EMPLOYEE,
      data
    );
    if (res.statusCode !== statusCodes.SUCCESS) {
      toast.error(res.message);
      return rejectWithValue(res.message);
    }
    toast.success(res.message);
    return res.data;
  }
);

export const updateEmployee = createAsyncThunk(
  "employee/update",
  async (data, { rejectWithValue }) => {
    const res = await commonService.putRequestForFormData(URLS.EMPLOYEE, data);
    if (res.statusCode !== statusCodes.SUCCESS) {
      toast.error(res.message);
      return rejectWithValue(res.message);
    }
    toast.success(res.message);
    return res.data;
  }
);

const EmployeeSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllEmployees.pending, (state) => {
        return {
          ...state,
          isEmployeeLoading: true,
          error: null,
        };
      })
      .addCase(fetchAllEmployees.fulfilled, (state, action) => {
        return {
          ...state,
          isEmployeeLoading: false,
          error: false,
          employeeList: action.payload,
        };
      })
      .addCase(fetchAllEmployees.rejected, (state, action) => {
        return {
          ...state,
          isEmployeeLoading: false,
          error: action.payload,
        };
      })
      .addCase(fetchEmployeeById.pending, (state) => {
        return {
          ...state,
          isEmployeeLoading: true,
          error: null,
        };
      })
      .addCase(fetchEmployeeById.fulfilled, (state, action) => {
        return {
          ...state,
          isEmployeeLoading: false,
          error: false,
          employeeDetails: action.payload,
        };
      })
      .addCase(fetchEmployeeById.rejected, (state, action) => {
        return {
          ...state,
          isEmployeeLoading: false,
          error: action.payload,
        };
      })
      .addCase(deleteEmployee.pending, (state) => {
        return {
          ...state,
          isEmployeeLoading: true,
          error: null,
          isEmployeeDeleted: false,
        };
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        return {
          ...state,
          isEmployeeLoading: false,
          error: false,
          isEmployeeDeleted: true,
        };
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        return {
          ...state,
          isEmployeeLoading: false,
          isEmployeeDeleted: false,
        };
      })
      .addCase(addEmployee.pending, (state) => {
        return {
          ...state,
          isEmployeeLoading: true,
          error: null,
          isEmployeeAdded: false,
        };
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        return {
          ...state,
          isEmployeeLoading: false,
          error: false,
          isEmployeeAdded: true,
        };
      })
      .addCase(addEmployee.rejected, (state, action) => {
        return {
          ...state,
          isEmployeeLoading: false,
          isEmployeeAdded: false,
        };
      })
      .addCase(updateEmployee.pending, (state) => {
        return {
          ...state,
          isEmployeeLoading: true,
          error: null,
          isEmployeeUpdated: false,
        };
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        return {
          ...state,
          isEmployeeLoading: false,
          error: false,
          isEmployeeUpdated: true,
        };
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        return {
          ...state,
          isEmployeeLoading: false,
          isEmployeeUpdated: false,
        };
      });
  },
});

const { reducer } = EmployeeSlice;
export default reducer;
