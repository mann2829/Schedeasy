import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { statusCodes } from "../common/constant";
import commonService from "../common/commonService";
import { URLS } from "../common/appConstants";
import { toast } from "react-toastify";

const initialState = {
  isProfileLoading: false,
  errorMessage: "",
  error: null,
  profileDetails: null,
  isProfileUpdated: null,
};

export const getProfileById = createAsyncThunk(
  "profile/id",
  async (data, { rejectWithValue }) => {
    const res = await commonService.getRequest(URLS.USER_PROFILE, data);
    if (res.statusCode !== statusCodes.SUCCESS) {
      return rejectWithValue(res.message);
    }
    return res.data;
  }
);

export const updateProfile = createAsyncThunk(
  "profile/update",
  async (data, { rejectWithValue }) => {
    const res = await commonService.putRequestForProfile(
      URLS.USER_PROFILE_UPDATE,
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

const ProfileSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfileById.pending, (state) => {
        return {
          ...state,
          isProfileLoading: true,
          error: null,
        };
      })
      .addCase(getProfileById.fulfilled, (state, action) => {
        return {
          ...state,
          isProfileLoading: false,
          error: false,
          profileDetails: action.payload,
        };
      })
      .addCase(getProfileById.rejected, (state, action) => {
        return {
          ...state,
          isProfileLoading: false,
          error: action.payload,
        };
      })
      .addCase(updateProfile.pending, (state) => {
        return {
          ...state,
          isProfileLoading: true,
          error: null,
          isProfileUpdated: false,
        };
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        return {
          ...state,
          isProfileLoading: false,
          error: false,
          isProfileUpdated: true,
        };
      })
      .addCase(updateProfile.rejected, (state, action) => {
        return {
          ...state,
          isProfileLoading: false,
          isProfileUpdated: false,
        };
      });
  },
});

const { reducer } = ProfileSlice;
export default reducer;
