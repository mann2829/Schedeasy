import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { statusCodes } from "../common/constant";
import commonService from "../common/commonService";
import { URLS } from "../common/appConstants";
import { toast } from "react-toastify";

const initialState = {
  isHolidaysLoading: false,
  errorMessage: "",
  error: null,
  holidayList: [],
  holidayDetails: null,
  isHolidayDeleted: null,
  isHolidayAdded: null,
  isHolidayUpdated: null,
  isHolidayStatusChanged: null,
  settingDetails: null,
  isSettingUpdated: null,
};

export const fetchAllHolidays = createAsyncThunk(
  "holiday/all",
  async (data, { rejectWithValue }) => {
    const res = await commonService.getRequest(URLS.HOLIDAYS, data);
    if (res.statusCode !== statusCodes.SUCCESS) {
      return rejectWithValue(res.message);
    }
    return res.data;
  }
);

export const fetchHolidayById = createAsyncThunk(
  "holiday/id",
  async (id, { rejectWithValue }) => {
    const res = await commonService.getByIdRequest(URLS.HOLIDAYS, id);
    if (res.statusCode !== statusCodes.SUCCESS) {
      return rejectWithValue(res.message);
    }
    return res.data;
  }
);

export const deleteHoliday = createAsyncThunk(
  "holiday/delete",
  async (id, { rejectWithValue }) => {
    const res = await commonService.deleteRequest(URLS.HOLIDAYS, id);
    if (res.statusCode !== statusCodes.SUCCESS) {
      toast.error(res.message);
      return rejectWithValue(res.message);
    }
    toast.success(res.message);
    return res.data;
  }
);

export const addHoliday = createAsyncThunk(
  "holiday/add",
  async (data, { rejectWithValue }) => {
    const res = await commonService.postRequest(URLS.HOLIDAYS, data);
    if (res.statusCode !== statusCodes.SUCCESS) {
      toast.error(res.message);
      return rejectWithValue(res.message);
    }
    toast.success(res.message);
    return res.data;
  }
);

export const updateHoliday = createAsyncThunk(
  "holiday/update",
  async (data, { rejectWithValue }) => {
    const res = await commonService.putRequest(URLS.HOLIDAYS, data);
    if (res.statusCode !== statusCodes.SUCCESS) {
      toast.error(res.message);
      return rejectWithValue(res.message);
    }
    toast.success(res.message);
    return res.data;
  }
);

export const changeHolidayStatus = createAsyncThunk(
  "holiday/statusUpdate",
  async (id, { rejectWithValue }) => {
    const res = await commonService.putRequest(URLS.HOLIDAYS, id);
    if (res.statusCode !== statusCodes.SUCCESS) {
      toast.error(res.message);
      return rejectWithValue(res.message);
    }
    toast.success(res.message);
    return res.data;
  }
);

export const fetchHolidaySettings = createAsyncThunk(
  "holiday/setting",
  async (data, { rejectWithValue }) => {
    const res = await commonService.getRequest(URLS.HOLIDAY_SETTING, data);
    if (res.statusCode !== statusCodes.SUCCESS) {
      return rejectWithValue(res.message);
    }
    return res.data;
  }
);

export const updateHolidaySetting = createAsyncThunk(
  "setting/update",
  async (data, { rejectWithValue }) => {
    const res = await commonService.postRequest(URLS.HOLIDAY_SETTING, data);
    if (res.statusCode !== statusCodes.SUCCESS) {
      return rejectWithValue(res.message);
    }
    return res.data;
  }
);

const HolidaySlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllHolidays.pending, (state) => {
        return {
          ...state,
          isHolidaysLoading: true,
          error: null,
        };
      })
      .addCase(fetchAllHolidays.fulfilled, (state, action) => {
        return {
          ...state,
          isHolidaysLoading: false,
          error: false,
          holidayList: action.payload,
        };
      })
      .addCase(fetchAllHolidays.rejected, (state, action) => {
        return {
          ...state,
          isHolidaysLoading: false,
          error: action.payload,
        };
      })
      .addCase(fetchHolidayById.pending, (state) => {
        return {
          ...state,
          isHolidaysLoading: true,
          error: null,
        };
      })
      .addCase(fetchHolidayById.fulfilled, (state, action) => {
        return {
          ...state,
          isHolidaysLoading: false,
          error: false,
          holidayDetails: action.payload,
        };
      })
      .addCase(fetchHolidayById.rejected, (state, action) => {
        return {
          ...state,
          isHolidaysLoading: false,
          error: action.payload,
        };
      })
      .addCase(deleteHoliday.pending, (state) => {
        return {
          ...state,
          isHolidaysLoading: true,
          error: null,
          isHolidayDeleted: false,
        };
      })
      .addCase(deleteHoliday.fulfilled, (state, action) => {
        return {
          ...state,
          isHolidaysLoading: false,
          error: false,
          isHolidayDeleted: true,
        };
      })
      .addCase(deleteHoliday.rejected, (state, action) => {
        return {
          ...state,
          isHolidaysLoading: false,
          isHolidayDeleted: false,
        };
      })
      .addCase(addHoliday.pending, (state) => {
        return {
          ...state,
          isHolidaysLoading: true,
          error: null,
          isHolidayAdded: false,
        };
      })
      .addCase(addHoliday.fulfilled, (state, action) => {
        return {
          ...state,
          isHolidaysLoading: false,
          error: false,
          isHolidayAdded: true,
        };
      })
      .addCase(addHoliday.rejected, (state, action) => {
        return {
          ...state,
          isHolidaysLoading: false,
          isHolidayAdded: false,
        };
      })
      .addCase(updateHoliday.pending, (state) => {
        return {
          ...state,
          isHolidaysLoading: true,
          error: null,
          isHolidayUpdated: false,
        };
      })
      .addCase(updateHoliday.fulfilled, (state, action) => {
        return {
          ...state,
          isHolidaysLoading: false,
          error: false,
          isHolidayUpdated: true,
        };
      })
      .addCase(updateHoliday.rejected, (state, action) => {
        return {
          ...state,
          isHolidaysLoading: false,
          isHolidayUpdated: false,
        };
      })
      .addCase(changeHolidayStatus.pending, (state) => {
        return {
          ...state,
          isHolidaysLoading: true,
          error: null,
          isHolidayStatusChanged: false,
        };
      })
      .addCase(changeHolidayStatus.fulfilled, (state, action) => {
        return {
          ...state,
          isHolidaysLoading: false,
          error: false,
          isHolidayStatusChanged: true,
        };
      })
      .addCase(changeHolidayStatus.rejected, (state, action) => {
        return {
          ...state,
          isHolidaysLoading: false,
          isHolidayStatusChanged: false,
        };
      })
      .addCase(fetchHolidaySettings.pending, (state) => {
        return {
          ...state,
          isHolidaysLoading: true,
          error: null,
        };
      })
      .addCase(fetchHolidaySettings.fulfilled, (state, action) => {
        return {
          ...state,
          isHolidaysLoading: false,
          error: false,
          settingDetails: action.payload,
        };
      })
      .addCase(fetchHolidaySettings.rejected, (state, action) => {
        return {
          ...state,
          isHolidaysLoading: false,
          error: action.payload,
        };
      })
      .addCase(updateHolidaySetting.pending, (state) => {
        return {
          ...state,
          isHolidaysLoading: true,
          error: null,
          isSettingUpdated: false,
        };
      })
      .addCase(updateHolidaySetting.fulfilled, (state, action) => {
        return {
          ...state,
          isHolidaysLoading: false,
          error: false,
          isSettingUpdated: true,
        };
      })
      .addCase(updateHolidaySetting.rejected, (state, action) => {
        return {
          ...state,
          isHolidaysLoading: false,
          error: action.payload,
          isSettingUpdated: false,
        };
      });
  },
});

const { reducer } = HolidaySlice;
export default reducer;
