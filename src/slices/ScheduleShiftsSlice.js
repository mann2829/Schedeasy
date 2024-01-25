import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { statusCodes } from "../common/constant";
import commonService from "../common/commonService";
import { URLS } from "../common/appConstants";
import { toast } from "react-toastify";

const initialState = {
  isScheduleShiftsLoading: false,
  errorMessage: "",
  error: null,
  isEmployeeAssigned: null,
  isAttendanceAdded: null,
  attendanceDetails: null,
  employeeAttendanceList: {},
  dateBasedEmployeeList: [],
  calendarData: [],
  isScheduleRepeated: null,
  isShiftEntryDeleted: null,
};

export const getScheduleData = createAsyncThunk(
  "schedule/data",
  async (data, { rejectWithValue }) => {
    if (data.mode === "refresh") {
      let payloadData = { ...data };
      delete payloadData["mode"];
      const res = await commonService.postRequest(
        URLS.REFRESH_CALENDAR,
        payloadData
      );
      if (res.statusCode !== statusCodes.SUCCESS) {
        toast.error(res.message);
        return rejectWithValue(res.message);
      }
      toast.success(res.message);
      return res.data;
    } else {
      const res = await commonService.getRequestWithParamsForCalendar(
        URLS.SCHEDULE_CALENDAR,
        data
      );
      if (res.statusCode !== statusCodes.SUCCESS) {
        return rejectWithValue(res.message);
      }
      return res.data;
    }
  }
);

export const assignEmployee = createAsyncThunk(
  "assign/employee",
  async (data, { rejectWithValue }) => {
    const res = await commonService.postRequest(URLS.ASSIGN_EMPLOYEE, data);
    if (res.statusCode !== statusCodes.SUCCESS) {
      toast.error(res.message);
      return rejectWithValue(res.message);
    }
    toast.success(res.message);
    return res.data;
  }
);

export const addManualAttendance = createAsyncThunk(
  "add/attendance",
  async (data, { rejectWithValue }) => {
    const res = await commonService.postRequest(
      URLS.ADD_MANUAL_ATTENDANCE,
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

export const fetchEmployeeAttendaceById = createAsyncThunk(
  "attendance/id",
  async (data, { rejectWithValue }) => {
    const res = await commonService.getByIdRequestWithParamsForAttendance(
      URLS.GET_EMPLOYEE_ATTENDANCE,
      data
    );
    if (res.statusCode !== statusCodes.SUCCESS) {
      return rejectWithValue(res.message);
    }
    return res.data;
  }
);

export const fetchEmployeeAttendanceDetails = createAsyncThunk(
  "attendanceDetails/id",
  async (id, { rejectWithValue }) => {
    const res = await commonService.getByIdRequest(
      URLS.GET_ATTENDANCE_DETAILS,
      id
    );
    if (res.statusCode !== statusCodes.SUCCESS) {
      return rejectWithValue(res.message);
    }
    return res.data;
  }
);

export const repeatShedule = createAsyncThunk(
  "repeat/schedule",
  async (data, { rejectWithValue }) => {
    const res = await commonService.postRequest(URLS.REPEAT_SCHEDULE, data);
    if (res.statusCode !== statusCodes.SUCCESS) {
      return rejectWithValue(res.message);
    }
    return res.data;
  }
);

export const deleteScheduleEntry = createAsyncThunk(
  "schedule/delete",
  async (id, { rejectWithValue }) => {
    const res = await commonService.deleteRequest(URLS.SCHEDULE_SHIFT, id);
    if (res.statusCode !== statusCodes.SUCCESS) {
      toast.error(res.message);
      return rejectWithValue(res.message);
    }
    toast.success(res.message);
    return res.data;
  }
);

export const getEmployeeByDate = createAsyncThunk(
  "employee/byDate",
  async (data, { rejectWithValue }) => {
    const res = await commonService.getRequestForDateBasedEmployees(
      URLS.GET_EMPLOYEE_BY_DATE,
      data
    );
    if (res.statusCode !== statusCodes.SUCCESS) {
      return rejectWithValue(res.message);
    }
    return res.data;
  }
);

const ScheduleShiftsSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(assignEmployee.pending, (state) => {
        return {
          ...state,
          isScheduleShiftsLoading: true,
          error: null,
        };
      })
      .addCase(assignEmployee.fulfilled, (state, action) => {
        return {
          ...state,
          isScheduleShiftsLoading: false,
          error: false,
          isEmployeeAssigned: true,
        };
      })
      .addCase(assignEmployee.rejected, (state, action) => {
        return {
          ...state,
          isScheduleShiftsLoading: false,
          error: action.payload,
        };
      })
      .addCase(fetchEmployeeAttendaceById.pending, (state) => {
        return {
          ...state,
          isScheduleShiftsLoading: true,
          error: null,
        };
      })
      .addCase(fetchEmployeeAttendaceById.fulfilled, (state, action) => {
        return {
          ...state,
          isScheduleShiftsLoading: false,
          error: false,
          employeeAttendanceList: action.payload,
        };
      })
      .addCase(fetchEmployeeAttendaceById.rejected, (state, action) => {
        return {
          ...state,
          isScheduleShiftsLoading: false,
          error: action.payload,
        };
      })
      .addCase(addManualAttendance.pending, (state) => {
        return {
          ...state,
          isScheduleShiftsLoading: true,
          error: null,
        };
      })
      .addCase(addManualAttendance.fulfilled, (state, action) => {
        return {
          ...state,
          isScheduleShiftsLoading: false,
          error: false,
          isAttendanceAdded: true,
        };
      })
      .addCase(addManualAttendance.rejected, (state, action) => {
        return {
          ...state,
          isScheduleShiftsLoading: false,
          error: action.payload,
        };
      })
      .addCase(fetchEmployeeAttendanceDetails.pending, (state) => {
        return {
          ...state,
          isScheduleShiftsLoading: true,
          error: null,
        };
      })
      .addCase(fetchEmployeeAttendanceDetails.fulfilled, (state, action) => {
        return {
          ...state,
          isScheduleShiftsLoading: false,
          error: false,
          attendanceDetails: action.payload,
        };
      })
      .addCase(fetchEmployeeAttendanceDetails.rejected, (state, action) => {
        return {
          ...state,
          isScheduleShiftsLoading: false,
          error: action.payload,
        };
      })
      .addCase(getScheduleData.pending, (state) => {
        return {
          ...state,
          isScheduleShiftsLoading: true,
          error: null,
        };
      })
      .addCase(getScheduleData.fulfilled, (state, action) => {
        return {
          ...state,
          isScheduleShiftsLoading: false,
          error: false,
          calendarData: action.payload,
        };
      })
      .addCase(getScheduleData.rejected, (state, action) => {
        return {
          ...state,
          isScheduleShiftsLoading: false,
          error: action.payload,
        };
      })
      .addCase(repeatShedule.pending, (state) => {
        return {
          ...state,
          isScheduleShiftsLoading: true,
          error: null,
          isScheduleRepeated: false,
        };
      })
      .addCase(repeatShedule.fulfilled, (state, action) => {
        return {
          ...state,
          isScheduleShiftsLoading: false,
          error: false,
          isScheduleRepeated: true,
        };
      })
      .addCase(repeatShedule.rejected, (state, action) => {
        return {
          ...state,
          isScheduleShiftsLoading: false,
          error: action.payload,
          isScheduleRepeated: false,
        };
      })
      .addCase(deleteScheduleEntry.pending, (state) => {
        return {
          ...state,
          isScheduleShiftsLoading: true,
          error: null,
          isShiftEntryDeleted: false,
        };
      })
      .addCase(deleteScheduleEntry.fulfilled, (state, action) => {
        return {
          ...state,
          isScheduleShiftsLoading: false,
          error: false,
          isShiftEntryDeleted: true,
        };
      })
      .addCase(deleteScheduleEntry.rejected, (state, action) => {
        return {
          ...state,
          isScheduleShiftsLoading: false,
          isShiftEntryDeleted: false,
        };
      })
      .addCase(getEmployeeByDate.pending, (state) => {
        return {
          ...state,
          isLoading: true,
          error: null,
        };
      })
      .addCase(getEmployeeByDate.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: false,
          dateBasedEmployeeList: action.payload,
        };
      })
      .addCase(getEmployeeByDate.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      });
  },
});

const { reducer } = ScheduleShiftsSlice;
export default reducer;
