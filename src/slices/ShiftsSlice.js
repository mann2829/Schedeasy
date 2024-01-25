import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { statusCodes } from "../common/constant";
import commonService from "../common/commonService";
import { URLS } from "../common/appConstants";
import { toast } from "react-toastify";

const initialState = {
  isShiftsLoading: false,
  errorMessage: "",
  error: null,
  shiftList: [],
  shiftDetails: null,
  isShiftDeleted: null,
  isShiftAdded: null,
  isShiftUpdated: null,
};

export const fetchAllShifts = createAsyncThunk(
  "shift/all",
  async (data, { rejectWithValue }) => {
    const res = await commonService.getRequest(URLS.SHIFTS, data);
    if (res.statusCode !== statusCodes.SUCCESS) {
      return rejectWithValue(res.message);
    }
    return res.data;
  }
);
export const fetchShiftById = createAsyncThunk(
  "shift/id",
  async (id, { rejectWithValue }) => {
    const res = await commonService.getByIdRequest(URLS.SHIFTS, id);
    if (res.statusCode !== statusCodes.SUCCESS) {
      return rejectWithValue(res.message);
    }
    return res.data;
  }
);

export const deleteShift = createAsyncThunk(
  "shift/delete",
  async (id, { rejectWithValue }) => {
    const res = await commonService.deleteRequest(URLS.SHIFTS, id);
    if (res.statusCode !== statusCodes.SUCCESS) {
      toast.error(res.message);
      return rejectWithValue(res.message);
    }
    toast.success(res.message);
    return res.data;
  }
);

export const addShift = createAsyncThunk(
  "shift/add",
  async (data, { rejectWithValue }) => {
    const res = await commonService.postRequest(URLS.SHIFTS, data);
    if (res.statusCode !== statusCodes.SUCCESS) {
      toast.error(res.message);
      return rejectWithValue(res.message);
    }
    toast.success(res.message);
    return res.data;
  }
);

export const updateShift = createAsyncThunk(
  "shift/update",
  async (data, { rejectWithValue }) => {
    const res = await commonService.putRequest(URLS.SHIFTS, data);
    if (res.statusCode !== statusCodes.SUCCESS) {
      toast.error(res.message);
      return rejectWithValue(res.message);
    }
    toast.success(res.message);
    return res.data;
  }
);

const ShiftsSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllShifts.pending, (state) => {
        return {
          ...state,
          isShiftsLoading: true,
          error: null,
        };
      })
      .addCase(fetchAllShifts.fulfilled, (state, action) => {
        return {
          ...state,
          isShiftsLoading: false,
          error: false,
          shiftList: action.payload,
        };
      })
      .addCase(fetchAllShifts.rejected, (state, action) => {
        return {
          ...state,
          isShiftsLoading: false,
          error: action.payload,
        };
      })
      .addCase(fetchShiftById.pending, (state) => {
        return {
          ...state,
          isShiftsLoading: true,
          error: null,
        };
      })
      .addCase(fetchShiftById.fulfilled, (state, action) => {
        return {
          ...state,
          isShiftsLoading: false,
          error: false,
          shiftDetails: action.payload,
        };
      })
      .addCase(fetchShiftById.rejected, (state, action) => {
        return {
          ...state,
          isShiftsLoading: false,
          error: action.payload,
        };
      })
      .addCase(deleteShift.pending, (state) => {
        return {
          ...state,
          isShiftsLoading: true,
          error: null,
          isShiftDeleted: false,
        };
      })
      .addCase(deleteShift.fulfilled, (state, action) => {
        return {
          ...state,
          isShiftsLoading: false,
          error: false,
          isShiftDeleted: true,
        };
      })
      .addCase(deleteShift.rejected, (state, action) => {
        return {
          ...state,
          isShiftsLoading: false,
          isShiftDeleted: false,
        };
      })
      .addCase(addShift.pending, (state) => {
        return {
          ...state,
          isShiftsLoading: true,
          error: null,
          isShiftAdded: false,
        };
      })
      .addCase(addShift.fulfilled, (state, action) => {
        return {
          ...state,
          isShiftsLoading: false,
          error: false,
          isShiftAdded: true,
        };
      })
      .addCase(addShift.rejected, (state, action) => {
        return {
          ...state,
          isShiftsLoading: false,
          isShiftAdded: false,
        };
      })
      .addCase(updateShift.pending, (state) => {
        return {
          ...state,
          isShiftsLoading: true,
          error: null,
          isShiftUpdated: false,
        };
      })
      .addCase(updateShift.fulfilled, (state, action) => {
        return {
          ...state,
          isShiftsLoading: false,
          error: false,
          isShiftUpdated: true,
        };
      })
      .addCase(updateShift.rejected, (state, action) => {
        return {
          ...state,
          isShiftsLoading: false,
          isShiftUpdated: false,
        };
      });
  },
});

const { reducer } = ShiftsSlice;
export default reducer;
