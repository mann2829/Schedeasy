import { Button, Dialog, MenuItem, Select, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import useForm from "../../common/useForm";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import moment from "moment";
import { InputLabel } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ReactComponent as CloseIcon } from "../../assets/img/close-icon.svg";
import { ReactComponent as DatePickerIcon } from "../../assets/img/date-picker.svg";
import {
  addHoliday,
  fetchAllHolidays,
  fetchHolidayById,
  updateHoliday,
} from "../../slices/HolidaysSlice";
import dayjs from "dayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import employeeAttendaceValidator from "../../common/validators/employeeAttendanceValidator";
import { fetchAllJobs } from "../../slices/JobsSlice";
import { fetchAllShifts } from "../../slices/ShiftsSlice";
import { Textarea } from "@mui/joy";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { fetchAllEmployees } from "./../../slices/EmployeeSlice";
import {
  assignEmployee,
  fetchEmployeeAttendanceDetails,
} from "../../slices/ScheduleShiftsSlice";

export const AttendanceDetailsModal = ({
  title,
  onClose,
  mode,
  id,
  showPopup,
}) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { attendanceDetails } = useSelector((state) => state?.scheduleShifts);

  useEffect(() => {
    dispatch(fetchEmployeeAttendanceDetails(id));
  }, []);

  return (
    <Dialog
      open={showPopup}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div className="confirmation_modal attendance_modal" role="document">
        <div className="modal-content">
          <div className="userPopup fullWidth">
            <div className="dialog-heading">
              <h3>{title}</h3>
              <Button
                onClick={onClose}
                className="closeBtn"
                data-dismiss="modal"
                aria-label="Close"
              >
                <CloseIcon />
              </Button>
            </div>
            <div className="">
              <div className="attendance-heading">
                <h3>{attendanceDetails?.name}</h3>
                <h3>
                  {moment(attendanceDetails?.date, "DD/MM/YYYY").format(
                    "Do MMM YYYY"
                  )}
                </h3>
              </div>
              <div className="attendance-time">
                <div className="rate">
                  <span>Hourly Rate</span>
                  <h4>{attendanceDetails?.rate} $</h4>
                </div>
                <div className="base-salary">
                  <span>Base Salary</span>
                  <h4>{attendanceDetails?.baseSalary} $</h4>
                </div>
              </div>
              <div className="attendance-location">
                <strong>Location</strong>
                <p>{attendanceDetails?.location}</p>
              </div>
              {/* <div className="attendance-timing">
                <p>
                  Break Taken :{" "}
                  <strong>{attendanceDetails?.breakTime} hrs</strong>
                </p>
                <p>
                  Total Hours :{" "}
                  <strong>{attendanceDetails?.totalHours} hrs</strong>
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};
