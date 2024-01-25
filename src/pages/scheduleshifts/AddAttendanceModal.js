import { Button, Dialog, MenuItem, Select, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import useForm from "../../common/useForm";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import moment from "moment";
import { InputLabel } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
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
import {
  addManualAttendance,
  fetchEmployeeAttendaceById,
} from "../../slices/ScheduleShiftsSlice";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { fetchAllJobs } from "../../slices/JobsSlice";
import { fetchAllShifts } from "../../slices/ShiftsSlice";
import { FormHelperText } from "@mui/joy";

export const AddAttendanceModal = ({
  title,
  onClose,
  mode,
  id,
  showPopup,
  fromDate,
  toDate,
  employeeId,
}) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { empId } = useParams();
  const [date, setDate] = useState(null);
  //   const [toDate, setToDate] = useState(null);
  //   const { holidayDetails } = useSelector((state) => state?.holidays);
  const { jobList } = useSelector((state) => state?.jobs);
  const { shiftList } = useSelector((state) => state?.shifts);
  const [jobsData, setJobsData] = useState();
  const [shiftsData, setShiftsData] = useState();
  const [checkInTime, setCheckInTime] = useState();
  const [checkOutTime, setCheckOutTime] = useState();
  const [breakTime, setBreakTime] = useState();
  const [dateFormat, setDateFormat] = useState(moment().format("YYYY-MM-DD"));
  const { dateBasedEmployeeList } = useSelector(
    (state) => state?.scheduleShifts
  );
  const { values, errors, handleChange, handleSubmit, initializeValues } =
    useForm(onNext, validationError, employeeAttendaceValidator);

  function validationError() {}
  function onNext() {
    const payload = {
      date: values.date,
      userId: employeeId,
      inTime: values.checkInTime,
      outTime: values.checkOutTime,
      breakTime: values.breakTime,
      jobCategoryId: values.jobCategoryId,
      shiftsId: values.shiftsId,
    };
    dispatch(addManualAttendance(payload)).then((res) => {
      if (!res.error) {
        let data = {
          fromDate: fromDate,
          toDate: toDate,
          userId: employeeId,
        };
        dispatch(fetchEmployeeAttendaceById(data));
        setTimeout(() => {
          onClose();
        }, 400);
      }
    });
  }

  const setDefaultTimings = (shiftId) => {
    shiftsData?.map((item) => {
      if (item.id === shiftId) {
        setCheckInTime(
          dayjs(
            dateFormat +
              "T" +
              dayjs("1/1/1" + " " + item.fromTime).format("HH:mm")
          )
        );
        setCheckOutTime(
          dayjs(
            dateFormat +
              "T" +
              dayjs("1/1/1" + " " + item.toTime).format("HH:mm")
          )
        );
        setBreakTime(
          dayjs(
            dateFormat +
              "T" +
              dayjs("1/1/1" + " " + item.breakTime).format("HH:mm")
          )
        );

        handleChange("checkInTime", item.fromTime);
        handleChange("checkOutTime", item.toTime);
        handleChange("breakTime", item.breakTime);
      }
    });
  };

  useEffect(() => {
    dispatch(fetchAllJobs());
    dispatch(fetchAllShifts());
  }, []);

  useEffect(() => {
    setJobsData(jobList);
  }, [jobList]);

  useEffect(() => {
    setShiftsData(shiftList);
  }, [shiftList]);

  return (
    <Dialog
      open={showPopup}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div className="confirmation_modal" role="document">
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
            <div className="form-content holiday-add-form">
              <div className="form-group">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    slots={{
                      openPickerIcon: DatePickerIcon,
                    }}
                    label="Date"
                    format="DD/MM/YYYY"
                    value={
                      mode === "edit"
                        ? null
                        : //? dayjs(holidayDetails?.fromDate)
                          date
                    }
                    onChange={(newValue) => {
                      setDate(newValue);
                      handleChange(
                        "date",
                        moment(newValue?.$d).format("DD/MM/YYYY")
                      );
                    }}
                    slotProps={{
                      textField: {
                        variant: "outlined",
                        required: true,
                        error: !!errors.date,
                        helperText: errors.date,
                      },
                    }}
                  />
                </LocalizationProvider>
              </div>
              <div className="form-group">
                <InputLabel required>Shift Type</InputLabel>
                <Select
                  label="Shift Type"
                  className="form-select"
                  value={Number(values.shiftsId)}
                  onChange={(e) => {
                    handleChange("shiftsId", e.target.value);
                    setDefaultTimings(e.target.value);
                  }}
                  IconComponent={ExpandMoreIcon}
                >
                  {shiftsData?.map((item, index) => (
                    <MenuItem key={index} value={item.id}>
                      {item.shiftType}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors.shiftsId}</FormHelperText>
              </div>
              <div className="form-group">
                <InputLabel required>Job</InputLabel>
                <Select
                  label="Job"
                  value={Number(values.jobCategoryId)}
                  onChange={(e) =>
                    handleChange("jobCategoryId", e.target.value)
                  }
                  className="form-select"
                  IconComponent={ExpandMoreIcon}
                >
                  {jobsData?.map((item, index) => (
                    <MenuItem key={index} value={item.id}>
                      {item.categoryName}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors.jobCategoryId}</FormHelperText>
              </div>
              <div className="form-group attendance-check">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    label="Check In"
                    value={checkInTime}
                    onChange={(newValue) => {
                      setCheckInTime(newValue);
                      handleChange(
                        "checkInTime",
                        moment(newValue?.$d, "HH:mm:ss").format("hh:mm A")
                      );
                    }}
                    slotProps={{
                      textField: {
                        variant: "outlined",
                        required: true,
                        error: !!errors.checkInTime,
                        helperText: errors.checkInTime,
                      },
                    }}
                  />
                </LocalizationProvider>
              </div>
              <div className="form-group attendance-check">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    label="Check Out"
                    value={checkOutTime}
                    onChange={(newValue) => {
                      setCheckOutTime(newValue);
                      handleChange(
                        "checkOutTime",
                        moment(newValue?.$d, "HH:mm:ss").format("hh:mm A")
                      );
                    }}
                    slotProps={{
                      textField: {
                        variant: "outlined",
                        required: true,
                        error: !!errors.checkOutTime,
                        helperText: errors.checkOutTime,
                      },
                    }}
                  />
                </LocalizationProvider>
              </div>
              <div className="form-group attendance-breaktime">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    label="Break Time"
                    ampm={false}
                    value={breakTime}
                    onChange={(newValue) => {
                      setBreakTime(newValue);
                      handleChange(
                        "breakTime",
                        dayjs(newValue?.$d).format("HH:mm")
                      );
                    }}
                    slotProps={{
                      textField: {
                        variant: "outlined",
                        required: true,
                        error: !!errors.breakTime,
                        helperText: errors.breakTime,
                      },
                    }}
                  />
                  <span className="hrs">hrs</span>
                </LocalizationProvider>
              </div>
            </div>
            <div className="attendance-action-button">
              <Button className="btn-primary" onClick={handleSubmit}>
                Add
              </Button>
              <Button className="btn-thin-primary" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};
