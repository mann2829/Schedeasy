import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { statusCodes } from "../common/constant";
import commonService from "../common/commonService";
import { URLS } from "../common/appConstants";
import { toast } from "react-toastify";

const initialState = {
  isJobsLoading: false,
  errorMessage: "",
  error: null,
  jobList: [],
  jobDetails: null,
  isJobDeleted: null,
  isJobAdded: null,
  isJobUpdated: null,
};

export const fetchAllJobs = createAsyncThunk(
  "job/all",
  async (data, { rejectWithValue }) => {
    const res = await commonService.getRequest(URLS.JOBS, data);
    if (res.statusCode !== statusCodes.SUCCESS) {
      return rejectWithValue(res.message);
    }
    return res.data;
  }
);
export const fetchJobById = createAsyncThunk(
  "job/id",
  async (id, { rejectWithValue }) => {
    const res = await commonService.getByIdRequest(URLS.JOBS, id);
    if (res.statusCode !== statusCodes.SUCCESS) {
      return rejectWithValue(res.message);
    }
    return res.data;
  }
);

export const deleteJob = createAsyncThunk(
  "job/delete",
  async (id, { rejectWithValue }) => {
    const res = await commonService.deleteRequest(URLS.JOBS, id);
    if (res.statusCode !== statusCodes.SUCCESS) {
      toast.error(res.message);
      return rejectWithValue(res.message);
    }
    toast.success(res.message);
    return res.data;
  }
);

export const addJob = createAsyncThunk(
  "job/add",
  async (data, { rejectWithValue }) => {
    const res = await commonService.postRequest(URLS.JOBS, data);
    if (res.statusCode !== statusCodes.SUCCESS) {
      toast.error(res.message);
      return rejectWithValue(res.message);
    }
    toast.success(res.message);
    return res.data;
  }
);

export const updateJob = createAsyncThunk(
  "job/update",
  async (data, { rejectWithValue }) => {
    const res = await commonService.putRequest(URLS.JOBS, data);
    if (res.statusCode !== statusCodes.SUCCESS) {
      toast.error(res.message);
      return rejectWithValue(res.message);
    }
    toast.success(res.message);
    return res.data;
  }
);

const JobsSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllJobs.pending, (state) => {
        return {
          ...state,
          isJobsLoading: true,
          error: null,
        };
      })
      .addCase(fetchAllJobs.fulfilled, (state, action) => {
        return {
          ...state,
          isJobsLoading: false,
          error: false,
          jobList: action.payload,
        };
      })
      .addCase(fetchAllJobs.rejected, (state, action) => {
        return {
          ...state,
          isJobsLoading: false,
          error: action.payload,
        };
      })
      .addCase(fetchJobById.pending, (state) => {
        return {
          ...state,
          isJobsLoading: true,
          error: null,
        };
      })
      .addCase(fetchJobById.fulfilled, (state, action) => {
        return {
          ...state,
          isJobsLoading: false,
          error: false,
          jobDetails: action.payload,
        };
      })
      .addCase(fetchJobById.rejected, (state, action) => {
        return {
          ...state,
          isJobsLoading: false,
          error: action.payload,
        };
      })
      .addCase(deleteJob.pending, (state) => {
        return {
          ...state,
          isJobsLoading: true,
          error: null,
          isJobDeleted: false,
        };
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        return {
          ...state,
          isJobsLoading: false,
          error: false,
          isJobDeleted: true,
        };
      })
      .addCase(deleteJob.rejected, (state, action) => {
        return {
          ...state,
          isJobsLoading: false,
          isJobDeleted: false,
        };
      })
      .addCase(addJob.pending, (state) => {
        return {
          ...state,
          isJobsLoading: true,
          error: null,
          isJobAdded: false,
        };
      })
      .addCase(addJob.fulfilled, (state, action) => {
        return {
          ...state,
          isJobsLoading: false,
          error: false,
          isJobAdded: true,
        };
      })
      .addCase(addJob.rejected, (state, action) => {
        return {
          ...state,
          isJobsLoading: false,
          isJobAdded: false,
        };
      })
      .addCase(updateJob.pending, (state) => {
        return {
          ...state,
          isJobsLoading: true,
          error: null,
          isJobUpdated: false,
        };
      })
      .addCase(updateJob.fulfilled, (state, action) => {
        return {
          ...state,
          isJobsLoading: false,
          error: false,
          isJobUpdated: true,
        };
      })
      .addCase(updateJob.rejected, (state, action) => {
        return {
          ...state,
          isJobsLoading: false,
          isJobUpdated: false,
        };
      });
  },
});

const { reducer } = JobsSlice;
export default reducer;
