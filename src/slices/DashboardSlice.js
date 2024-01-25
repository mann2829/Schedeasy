import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { statusCodes } from "../common/constant";
import commonService from "../common/commonService";
import { URLS } from "../common/appConstants";

const initialState = {
  isDashboardLoading: false,
  errorMessage: "",
  error: null,
  dashboardData: {},
};

export const fetchDashboardData = createAsyncThunk(
  "dashboard/all",
  async (data, { rejectWithValue }) => {
    const res = await commonService.getRequest(URLS.DASHBOARD, data);
    if (res.statusCode !== statusCodes.SUCCESS) {
      return rejectWithValue(res.message);
    }
    return res.data;
  }
);

const DashboardSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        return {
          ...state,
          isDashboardLoading: true,
          error: null,
        };
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        return {
          ...state,
          isDashboardLoading: false,
          error: false,
          dashboardData: action.payload,
        };
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        return {
          ...state,
          isDashboardLoading: false,
          error: action.payload,
        };
      });
  },
});

const { reducer } = DashboardSlice;
export default reducer;
