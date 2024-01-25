import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate, useLocation } from "react-router-dom";
import { ReactComponent as DashboardIcon } from "../../assets/img/dashboard-icon.svg";
import { ReactComponent as JobsIcon } from "../../assets/img/jobs-icon.svg";
import { ReactComponent as ShiftsIcon } from "../../assets/img/shifts-icon.svg";
import { ReactComponent as BranchIcon } from "../../assets/img/branch-icon.svg";
import { ReactComponent as EmployeeIcon } from "../../assets/img/employee-icon.svg";
import { ReactComponent as RateShiftsIcon } from "../../assets/img/rate-shifts-icon.svg";
import { ReactComponent as ScheduleShiftsIcon } from "../../assets/img/schedule-shifts-icon.svg";
import { ReactComponent as HolidayIcon } from "../../assets/img/holiday-icon.svg";
import { ReactComponent as PaybleIcon } from "../../assets/img/payble-icon.svg";

const LeftSidebar = () => {
  const pages = [
    "Dashboard",
    "Jobs",
    "Shifts",
    "Branch",
    "Employee",
    "Rate Shifts",
    "Schedule Shifts",
    "Holiday",
    "Payable",
  ];
  const history = useNavigate();
  const location = useLocation();

  const redirectToPage = (pageName) => {
    history(`/${pageName}`);
  };

  const getActiveClass = (pageName) => {
    return location.pathname.includes(pageName) ? "active" : "";
  };

  return (
    <div className="main-sidebar">
      <Box>
        <Button
          onClick={() => {
            redirectToPage("dashboard");
          }}
          className={getActiveClass("dashboard")}
        >
          <DashboardIcon />
          Dashboard
        </Button>
        <Button
          onClick={() => redirectToPage("jobs")}
          className={getActiveClass("jobs")}
        >
          <JobsIcon />
          Jobs
        </Button>
        <Button
          onClick={() => redirectToPage("employee")}
          className={getActiveClass("employee")}
        >
          <EmployeeIcon />
          Employee
        </Button>
        <Button
          onClick={() => redirectToPage("shifts")}
          className={getActiveClass("shifts")}
        >
          <ShiftsIcon />
          Shifts
        </Button>
        <Button
          onClick={() => redirectToPage("rateshift")}
          className={getActiveClass("rateshift")}
        >
          <RateShiftsIcon />
          Rate Shifts
        </Button>
        <Button
          onClick={() => redirectToPage("scheduleshift")}
          className={getActiveClass("scheduleshift")}
        >
          <ScheduleShiftsIcon />
          Schedule Shifts
        </Button>
        {/* <Button
          onClick={() => redirectToPage("branch")}
          className={getActiveClass("branch")}
        >
          <BranchIcon />
          Branch
        </Button> */}

        <Button
          onClick={() => redirectToPage("holidays")}
          className={getActiveClass("holiday")}
        >
          <HolidayIcon />
          Holiday
        </Button>
        <Button
          onClick={() => redirectToPage("attendacedetails")}
          className={getActiveClass("attendacedetails")}
        >
          <PaybleIcon />
          Attendance
        </Button>
        <Button
          onClick={() => redirectToPage("payable")}
          className={getActiveClass("payable")}
        >
          <PaybleIcon />
          Payable
        </Button>
      </Box>
    </div>
  );
};

export default LeftSidebar;
