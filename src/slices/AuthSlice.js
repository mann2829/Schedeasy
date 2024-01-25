import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../services/AuthService";
import commonService from "../common/commonService";
import { statusCodes } from "../common/constant";
import { URLS } from "../common/appConstants";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  errorMessage: "",
  error: null,
  isAuthenticated: null,
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    const res = await AuthService.submitLoginRequest(data);
    if (res.statusCode !== statusCodes.SUCCESS) {
      toast.error(res.message);
      return rejectWithValue(res.message);
    }
    toast.success(res.message);
    return res.data;
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (data, { rejectWithValue }) => {
    const res = await commonService.getRequest(URLS.LOGOUT, data);
    if (res.statusCode !== statusCodes.SUCCESS) {
      return rejectWithValue(res.message);
    }
    return res.data;
  }
);

const AuthSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        return {
          ...state,
          isLoading: true,
          error: null,
        };
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: false,
          accessToken: action.payload.accessToken,
          email: action.payload.email,
          userId: action.payload.id,
          profileImg: action.payload.profilePicture,
          isAuthenticated: true,
        };
      })
      .addCase(loginUser.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload,
          isAuthenticated: false,
        };
      })
      .addCase(logoutUser.pending, (state) => {
        return {
          ...state,
          isLoading: true,
          error: null,
        };
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: false,
          isAuthenticated: false,
        };
      })
      .addCase(logoutUser.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload,
          isAuthenticated: false,
        };
      });
  },
});

const { reducer } = AuthSlice;
export default reducer;
