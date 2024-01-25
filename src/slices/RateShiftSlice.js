import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { statusCodes } from "../common/constant";
import commonService from "../common/commonService";
import { URLS } from "../common/appConstants";
import { toast } from "react-toastify";

const initialState = {
  isRateShiftLoading: false,
  errorMessage: "",
  error: null,
  rateShiftList: [],
  totalRowsData: null,
  rateShiftDetails: null,
  isRateShiftDeleted: null,
  isRateShiftAdded: null,
  isRateShiftUpdated: null,
};

export const fetchAllRateShifts = createAsyncThunk(
  "rateshift/all",
  async (data, { rejectWithValue }) => {
    const res = await commonService.getRequestForRateShiftDataGrid(
      URLS.RATESHIFT,
      data
    );
    if (res.statusCode !== statusCodes.SUCCESS) {
      return rejectWithValue(res.message);
    }
    return res.data;
  }
);

export const fetchRateShiftById = createAsyncThunk(
  "rateShift/id",
  async (id, { rejectWithValue }) => {
    const res = await commonService.getByIdRequest(URLS.RATESHIFT, id);
    if (res.statusCode !== statusCodes.SUCCESS) {
      return rejectWithValue(res.message);
    }
    return res.data;
  }
);

export const deleteRateShiftData = createAsyncThunk(
  "rateShift/delete",
  async (id, { rejectWithValue }) => {
    const res = await commonService.deleteRequest(URLS.RATESHIFT, id);
    if (res.statusCode !== statusCodes.SUCCESS) {
      toast.error(res.message);
      return rejectWithValue(res.message);
    }
    toast.success(res.message);
    return res.data;
  }
);

export const addRateShift = createAsyncThunk(
  "rateShift/add",
  async (data, { rejectWithValue }) => {
    const res = await commonService.postRequest(URLS.RATESHIFT, data);
    if (res.statusCode !== statusCodes.SUCCESS) {
      toast.error(res.message);
      return rejectWithValue(res.message);
    }
    toast.success(res.message);
    return res.data;
  }
);

export const updateRateShift = createAsyncThunk(
  "rateShift/update",
  async (data, { rejectWithValue }) => {
    const res = await commonService.putRequest(URLS.RATESHIFT, data);
    if (res.statusCode !== statusCodes.SUCCESS) {
      toast.error(res.message);
      return rejectWithValue(res.message);
    }
    toast.success(res.message);
    return res.data;
  }
);

const RateShiftSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllRateShifts.pending, (state) => {
        return {
          ...state,
          isRateShiftLoading: true,
          error: null,
        };
      })
      .addCase(fetchAllRateShifts.fulfilled, (state, action) => {
        return {
          ...state,
          isRateShiftLoading: false,
          error: false,
          rateShiftList: action.payload?.result || [],
          totalRowsData: action.payload?.totalRecord || 0,
        };
      })
      .addCase(fetchAllRateShifts.rejected, (state, action) => {
        return {
          ...state,
          isRateShiftLoading: false,
          error: action.payload,
        };
      })
      .addCase(fetchRateShiftById.pending, (state) => {
        return {
          ...state,
          isRateShiftLoading: true,
          error: null,
        };
      })
      .addCase(fetchRateShiftById.fulfilled, (state, action) => {
        return {
          ...state,
          isRateShiftLoading: false,
          error: false,
          rateShiftDetails: action.payload,
        };
      })
      .addCase(fetchRateShiftById.rejected, (state, action) => {
        return {
          ...state,
          isRateShiftLoading: false,
          error: action.payload,
        };
      })
      .addCase(deleteRateShiftData.pending, (state) => {
        return {
          ...state,
          isRateShiftLoading: true,
          error: null,
          isRateShiftDeleted: false,
        };
      })
      .addCase(deleteRateShiftData.fulfilled, (state, action) => {
        return {
          ...state,
          isRateShiftLoading: false,
          error: false,
          isRateShiftDeleted: true,
        };
      })
      .addCase(deleteRateShiftData.rejected, (state, action) => {
        return {
          ...state,
          isRateShiftLoading: false,
          isRateShiftDeleted: false,
        };
      })
      .addCase(addRateShift.pending, (state) => {
        return {
          ...state,
          isRateShiftLoading: true,
          error: null,
          isRateShiftAdded: false,
        };
      })
      .addCase(addRateShift.fulfilled, (state, action) => {
        return {
          ...state,
          isRateShiftLoading: false,
          error: false,
          isRateShiftAdded: true,
        };
      })
      .addCase(addRateShift.rejected, (state, action) => {
        return {
          ...state,
          isRateShiftLoading: false,
          isRateShiftAdded: false,
        };
      })
      .addCase(updateRateShift.pending, (state) => {
        return {
          ...state,
          isRateShiftLoading: true,
          error: null,
          isRateShiftUpdated: false,
        };
      })
      .addCase(updateRateShift.fulfilled, (state, action) => {
        return {
          ...state,
          isRateShiftLoading: false,
          error: false,
          isRateShiftUpdated: true,
        };
      })
      .addCase(updateRateShift.rejected, (state, action) => {
        return {
          ...state,
          isRateShiftLoading: false,
          isRateShiftUpdated: false,
        };
      });
  },
});

const { reducer } = RateShiftSlice;
export default reducer;
