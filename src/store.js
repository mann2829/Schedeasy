import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./slices/AuthSlice";
import JobSlice from "./slices/JobsSlice";
import HolidaysSlice from "./slices/HolidaysSlice";
import ShiftsSlice from "./slices/ShiftsSlice";
import RateShiftSlice from "./slices/RateShiftSlice";
import EmployeeSlice from "./slices/EmployeeSlice";
import DashboardSlice from "./slices/DashboardSlice";
import ForgotPasswordSlice from "./slices/ForgotPasswordSlice";
import ScheduleShiftsSlice from "./slices/ScheduleShiftsSlice";
import PayableSlice from "./slices/PayableSlice";
import ProfileSlice from "./slices/ProfileSlice";
import NotificationSlice from "./slices/NotificationSlice";

const reducer = {
  auth: AuthSlice,
  jobs: JobSlice,
  holidays: HolidaysSlice,
  shifts: ShiftsSlice,
  rateShifts: RateShiftSlice,
  employees: EmployeeSlice,
  dashboard: DashboardSlice,
  forgotPassword: ForgotPasswordSlice,
  scheduleShifts: ScheduleShiftsSlice,
  payable: PayableSlice,
  profile: ProfileSlice,
  notification: NotificationSlice,
};

const store = configureStore({
  reducer: reducer,
  devTools: true,
});

export default store;
