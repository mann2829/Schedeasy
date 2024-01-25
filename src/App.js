import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./assets/css/style.css";
import { Toast } from ".././src/pages/layout/Toast.js";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/login/Login";
import JobsList from "./pages/jobs/JobsList";
import HolidaysList from "./pages/holidays/HolidaysList";
import LeftSidebar from "./pages/layout/LeftSidebar";
import Header from "./pages/layout/Header";
import { useNavigate, useLocation } from "react-router-dom";
import AddHolidays from "./pages/holidays/AddHolidays";
import ShiftList from "./pages/shifts/ShiftList";
import AddShifts from "./pages/shifts/AddShifts";
import RateShiftList from "./pages/rateshift/RateShiftsList.js";
import AddRateShift from "./pages/rateshift/AddRateShift";
import ViewRateShift from "./pages/rateshift/ViewRateShift";
import Dashboard from "./pages/dashboard/Dashboard";
import Registration from "./pages/login/Registration";
import AddEmployee from "./pages/employee/AddEmployee";
import EmployeeList from "./pages/employee/EmployeeList.js";
import ForgotPassword from "./pages/forgotpassword/ForgotPassword.js";
import VerifyOTP from "./pages/forgotpassword/VerifyOTP.js";
import ResetPassword from "./pages/forgotpassword/ResetPassword.js";
import ScheduleShifts from "./pages/scheduleshifts/ScheduleShifts.js";
import EmployeeAttendanceList from "./pages/scheduleshifts/EmployeeAttendanceList.js";
import PayableList from "./pages/payable/PayableList.js";
import Profile from "./pages/profile/Profile.js";
import ChangePassword from "./pages/changepassword/ChangePassword.js";
import AllNotifications from "./pages/notifications/AllNotifications.js";
import AttendanceList from "./pages/attendance/AttendanceList.js";
import Approvals from "./pages/attendance/Approvals.js";

function App() {
  const location = useLocation();
  const history = useNavigate();
  // const { isScheduleLoading, isAttendanceLoading } = useSelector(
  //   (state) => state?.scheduleShifts
  // );

  // const { isPaymentLoading } = useSelector((state) => state?.payable);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      history("/");
    }
  }, []);

  return (
    <>
      <Toast />
      {location.pathname !== "/" &&
        location.pathname !== "/registration" &&
        location.pathname !== "/forgotpassword" &&
        location.pathname !== "/verifyotp" &&
        location.pathname !== "/resetpassword" && (
          <>
            <Header />
            {location.pathname !== "/profile" &&
              location.pathname !== "/changepassword" &&
              location.pathname !== "/notifications" && <LeftSidebar />}
          </>
        )}
      <Routes>
        <Route exact path="/" element={<Login />}></Route>
        <Route exact path="/registration" element={<Registration />}></Route>
        <Route exact path="/dashboard" element={<Dashboard />}></Route>
        <Route exact path="/jobs" element={<JobsList />}></Route>
        <Route exact path="/holidays" element={<HolidaysList />}></Route>
        <Route exact path="/holidays/new" element={<AddHolidays />}></Route>
        <Route exact path="/shifts" element={<ShiftList />}></Route>
        <Route exact path="/shifts/new" element={<AddShifts />}></Route>
        <Route exact path="/rateshift" element={<RateShiftList />}></Route>
        <Route exact path="/rateshift/new" element={<AddRateShift />}></Route>
        <Route exact path="/rateshift/:rsId" element={<AddRateShift />}></Route>
        <Route exact path="/employee" element={<EmployeeList />}></Route>
        <Route exact path="/employee/new" element={<AddEmployee />}></Route>
        <Route exact path="/employee/:empId" element={<AddEmployee />}></Route>
        <Route
          exact
          path="/employee/:empId/view"
          element={<AddEmployee />}
        ></Route>
        <Route
          exact
          path="/forgotpassword"
          element={<ForgotPassword />}
        ></Route>
        <Route exact path="/verifyotp" element={<VerifyOTP />}></Route>
        <Route exact path="/resetpassword" element={<ResetPassword />}></Route>
        <Route exact path="/scheduleshift" element={<ScheduleShifts />}></Route>
        <Route exact path="/resetpassword" element={<ResetPassword />}></Route>
        <Route
          exact
          path="/scheduleshift/attendance/:empId"
          element={<EmployeeAttendanceList />}
        ></Route>
        <Route exact path="/payable" element={<PayableList />}></Route>
        <Route exact path="/profile" element={<Profile />}></Route>
        <Route
          exact
          path="/changepassword"
          element={<ChangePassword />}
        ></Route>
        <Route
          exact
          path="/notifications"
          element={<AllNotifications />}
        ></Route>
        <Route
          exact
          path="/attendacedetails"
          element={<AttendanceList />}
        ></Route>
        <Route exact path="/approvals" element={<Approvals />}></Route>
      </Routes>
    </>
  );
}

export default App;
