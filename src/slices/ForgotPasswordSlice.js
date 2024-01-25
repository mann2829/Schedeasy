import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { statusCodes } from "../common/constant";
import commonService from "../common/commonService";
import { URLS } from "../common/appConstants";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  errorMessage: "",
  error: null,
  userFound: null,
  isOtpValid: null,
  userData: [],
  otpVerifiedUserData: [],
  isPasswordChanged: null,
};

export const executeForgotPasswordRequest = createAsyncThunk(
  "forgotPassword/email",
  async (data, { rejectWithValue }) => {
    const res = await commonService.postRequest(URLS.FORGOT_PASSWORD, data);
    if (res.statusCode !== statusCodes.SUCCESS) {
      toast.error(res.message);
      return rejectWithValue(res.message);
    }
    toast.success(res.message);
    return res.data;
  }
);

export const verifyOtpRequest = createAsyncThunk(
  "verify/otp",
  async (data, { rejectWithValue }) => {
    const res = await commonService.postRequest(URLS.VERIFY_OTP, data);
    if (res.statusCode !== statusCodes.SUCCESS) {
      toast.error(res.message);
      return rejectWithValue(res.message);
    }
    toast.success(res.message);
    return res.data;
  }
);

export const resetPasswordRequest = createAsyncThunk(
  "reset/password",
  async (data, { rejectWithValue }) => {
    const res = await commonService.putRequest(URLS.RESET_PASSWORD, data);
    if (res.statusCode !== statusCodes.SUCCESS) {
      toast.error(res.message);
      return rejectWithValue(res.message);
    }
    toast.success(res.message);
    return res.data;
  }
);

export const changePasswordRequest = createAsyncThunk(
  "auth/changepassword",
  async (data, { rejectWithValue }) => {
    const res = await commonService.postRequest(URLS.CHANGE_PASSWORD, data);
    if (res.statusCode !== statusCodes.SUCCESS) {
      toast.error(res.message);
      return rejectWithValue(res.message);
    }
    toast.success(res.message);
    return res.data;
  }
);

const ForgotPasswordSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(executeForgotPasswordRequest.pending, (state) => {
        return {
          ...state,
          isLoading: true,
          error: null,
        };
      })
      .addCase(executeForgotPasswordRequest.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: false,
          userData: action.payload,
          userFound: true,
        };
      })
      .addCase(executeForgotPasswordRequest.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload,
          userFound: false,
        };
      })
      .addCase(verifyOtpRequest.pending, (state) => {
        return {
          ...state,
          isLoading: true,
          error: null,
        };
      })
      .addCase(verifyOtpRequest.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: false,
          otpVerifiedUserData: action.payload,
          isOtpValid: true,
        };
      })
      .addCase(verifyOtpRequest.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload,
          isOtpValid: false,
        };
      })
      .addCase(resetPasswordRequest.pending, (state) => {
        return {
          ...state,
          isLoading: true,
          error: null,
          isPasswordChanged: false,
        };
      })
      .addCase(resetPasswordRequest.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: false,
          isPasswordChanged: true,
        };
      })
      .addCase(resetPasswordRequest.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload,
          isPasswordChanged: true,
        };
      });
  },
});

const { reducer } = ForgotPasswordSlice;
export default reducer;
