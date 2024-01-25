import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { statusCodes } from "../common/constant";
import commonService from "../common/commonService";
import { URLS } from "../common/appConstants";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  errorMessage: "",
  error: null,
  totalRowsData: null,
  notificationList: [],
  allNotifications: [],
  notificationDetails: null,
  clearNotification: null,
  isNotificationSeen: null,
  notificationCount: null,
};

export const fetchAllNotifications = createAsyncThunk(
  "notification/all",
  async (data, { rejectWithValue }) => {
    const res = await commonService.getRequest(URLS.NOTIFICATION, data);
    if (res.statusCode !== statusCodes.SUCCESS) {
      return rejectWithValue(res.message);
    }
    return res.data;
  }
);

export const fetchNotificationList = createAsyncThunk(
  "notification/list",
  async (data, { rejectWithValue }) => {
    const res = await commonService.getRequestForNotification(
      URLS.ALL_NOTIFICATION,
      data
    );
    if (res.statusCode !== statusCodes.SUCCESS) {
      return rejectWithValue(res.message);
    }
    return res.data;
  }
);

export const fetchNotificationById = createAsyncThunk(
  "notification/id",
  async (id, { rejectWithValue }) => {
    const res = await commonService.getByIdRequest(URLS.NOTIFICATION, id);
    if (res.statusCode !== statusCodes.SUCCESS) {
      return rejectWithValue(res.message);
    }
    return res.data;
  }
);

export const clearAllNotification = createAsyncThunk(
  "notification/clear",
  async (data, { rejectWithValue }) => {
    const res = await commonService.putRequestForNotificaion(
      URLS.CLEAR_NOTIFICATION,
      data
    );
    if (res.statusCode !== statusCodes.SUCCESS) {
      return rejectWithValue(res.message);
    }
    return res.data;
  }
);

export const seeNotification = createAsyncThunk(
  "notification/see",
  async (data, { rejectWithValue }) => {
    const res = await commonService.putRequest(URLS.SEE_NOTIFICATION, data);
    if (res.statusCode !== statusCodes.SUCCESS) {
      return rejectWithValue(res.message);
    }
    return res.data;
  }
);

export const getNotificationCount = createAsyncThunk(
  "notification/count",
  async (data, { rejectWithValue }) => {
    const res = await commonService.getRequest(URLS.NOTIFICATION_COUNT, data);
    if (res.statusCode !== statusCodes.SUCCESS) {
      return rejectWithValue(res.message);
    }
    return res.data;
  }
);

const NotificationSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllNotifications.pending, (state) => {
        return {
          ...state,
          isLoading: true,
          error: null,
        };
      })
      .addCase(fetchAllNotifications.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: false,
          notificationList: action.payload,
        };
      })
      .addCase(fetchAllNotifications.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      })
      .addCase(fetchNotificationList.pending, (state) => {
        return {
          ...state,
          isLoading: true,
          error: null,
        };
      })
      .addCase(fetchNotificationList.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: false,
          allNotifications: action.payload.result,
          totalRowsData: action.payload.totalRecord,
        };
      })
      .addCase(fetchNotificationList.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      })
      .addCase(fetchNotificationById.pending, (state) => {
        return {
          ...state,
          isLoading: true,
          error: null,
        };
      })
      .addCase(fetchNotificationById.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: false,
          notificationDetails: action.payload,
        };
      })
      .addCase(fetchNotificationById.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      })
      .addCase(clearAllNotification.pending, (state) => {
        return {
          ...state,
          isLoading: true,
          error: null,
          clearAllNotification: false,
        };
      })
      .addCase(clearAllNotification.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: false,
          clearAllNotification: true,
        };
      })
      .addCase(clearAllNotification.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload,
          clearAllNotification: false,
        };
      })
      .addCase(seeNotification.pending, (state) => {
        return {
          ...state,
          isLoading: true,
          error: null,
          isNotificationSeen: false,
        };
      })
      .addCase(seeNotification.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: false,
          isNotificationSeen: true,
        };
      })
      .addCase(seeNotification.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload,
          isNotificationSeen: false,
        };
      })
      .addCase(getNotificationCount.pending, (state) => {
        return {
          ...state,
          isLoading: true,
          error: null,
        };
      })
      .addCase(getNotificationCount.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: false,
          notificationCount: action.payload.count,
        };
      })
      .addCase(getNotificationCount.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      });
  },
});

const { reducer } = NotificationSlice;
export default reducer;
