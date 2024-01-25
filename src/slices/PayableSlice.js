import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { statusCodes } from "../common/constant";
import commonService from "../common/commonService";
import { URLS } from "../common/appConstants";
import { toast } from "react-toastify";

const initialState = {
  isPayableLoading: false,
  errorMessage: "",
  error: null,
  payableList: [],
  totalRowsData: null,
  isPayableUpdated: null,
};

export const fetchAllPayable = createAsyncThunk(
  "payable/all",
  async (data, { rejectWithValue }) => {
    const res = await commonService.getRequestWithParamsForPayable(
      URLS.PAYABLE_LIST,
      data
    );
    if (res.statusCode !== statusCodes.SUCCESS) {
      return rejectWithValue(res.message);
    }
    return res.data;
  }
);

export const updatePayable = createAsyncThunk(
  "payable/update",
  async (data, { rejectWithValue }) => {
    const res = await commonService.putRequest(URLS.PAYABLE_LIST, data);
    if (res.statusCode !== statusCodes.SUCCESS) {
      toast.error(res.message);
      return rejectWithValue(res.message);
    }
    toast.success(res.message);
    return res.data;
  }
);

const PayableSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPayable.pending, (state) => {
        return {
          ...state,
          isPayableLoading: true,
          error: null,
        };
      })
      .addCase(fetchAllPayable.fulfilled, (state, action) => {
        return {
          ...state,
          isPayableLoading: false,
          error: false,
          payableList: action.payload.result,
          totalRowsData: action.payload.totalRecord,
        };
      })
      .addCase(fetchAllPayable.rejected, (state, action) => {
        return {
          ...state,
          isPayableLoading: false,
          error: action.payload,
        };
      })
      .addCase(updatePayable.pending, (state) => {
        return {
          ...state,
          isPayableLoading: true,
          error: null,
          isPayableUpdated: false,
        };
      })
      .addCase(updatePayable.fulfilled, (state, action) => {
        return {
          ...state,
          isPayableLoading: false,
          error: false,
          isPayableUpdated: true,
        };
      })
      .addCase(updatePayable.rejected, (state, action) => {
        return {
          ...state,
          isPayableLoading: false,
          error: action.payload,
          isPayableUpdated: false,
        };
      });
  },
});

const { reducer } = PayableSlice;
export default reducer;
