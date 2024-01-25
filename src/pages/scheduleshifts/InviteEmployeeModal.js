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
import assignEmployeeValidator from "../../common/validators/assignEmployeeValidator";
import { fetchAllJobs } from "../../slices/JobsSlice";
import { fetchAllShifts } from "../../slices/ShiftsSlice";
import { FormHelperText, Textarea } from "@mui/joy";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { fetchAllEmployees } from "./../../slices/EmployeeSlice";
import {
  assignEmployee,
  getScheduleData,
  getEmployeeByDate,
} from "../../slices/ScheduleShiftsSlice";
import inviteEmployeeValidator from "../../common/validators/inviteEmployeeValidator";

export const InviteEmployeeModal = ({
  title,
  onClose,
  mode,
  id,
  showPopup,
  fromDate,
  toDate,
  shiftType,
  jobType,
  shiftDate,
}) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [date, setDate] = useState(null);
  //   const [toDate, setToDate] = useState(null);
  //   const { holidayDetails } = useSelector((state) => state?.holidays);
  const [jobsData, setJobsData] = useState();
  const [shiftsData, setShiftsData] = useState();
  const [employeeData, setEmployeeData] = useState();
  const [shiftDateData, setShiftDateData] = useState();
  const [jobCategoryData, setJobCategoryData] = useState();
  const [shiftCategoryData, setShiftCategoryData] = useState();
  const [formattedDateData, setFormattedDateData] = useState();
  const { jobList } = useSelector((state) => state?.jobs);
  const { shiftList } = useSelector((state) => state?.shifts);
  const { employeeList } = useSelector((state) => state?.employees);
  const { dateBasedEmployeeList } = useSelector(
    (state) => state?.scheduleShifts
  );
  const { values, errors, handleChange, handleSubmit, initializeValues } =
    useForm(onNext, validationError, inviteEmployeeValidator);

  function validationError() {}
  function onNext() {
    let payload = {};
    if (formattedDateData) {
      payload = {
        shiftDate: formattedDateData,
        shiftsId: shiftCategoryData,
        jobCategoryId: jobCategoryData,
        userId: values.empId,
      };
    } else {
      payload = {
        shiftDate: shiftDate,
        shiftsId: shiftCategoryData,
        jobCategoryId: jobCategoryData,
        userId: values.empId,
      };
    }

    dispatch(assignEmployee(payload)).then((res) => {
      if (!res.error) {
        setTimeout(() => {
          dispatch(
            getScheduleData({
              fromDate: fromDate,
              toDate: toDate,
              shiftId: shiftType,
            })
          );
          onClose();
        }, 400);
      }
    });

    // if (mode === "add") {
    //   dispatch(addHoliday(payload));
    //   setTimeout(() => {
    //     dispatch(fetchAllHolidays());
    //     onClose();
    //   }, 400);
    // }
    // if (mode === "edit") {
    //   const updatePayload = {
    //     id: id,
    //     payload: payload,
    //   };
    //   dispatch(updateHoliday(updatePayload));
    //   setTimeout(() => {
    //     dispatch(fetchAllHolidays());
    //     onClose();
    //   }, 400);
    // }
  }

  useEffect(() => {
    dispatch(fetchAllJobs());
    dispatch(fetchAllShifts());
    // dispatch(fetchAllEmployees());
    setShiftDateData(
      dayjs(moment(shiftDate, "DD/MM/YYYY").format("YYYY-MM-DD"))
    );
    setJobCategoryData(jobType);
    setShiftCategoryData(shiftType);
  }, []);

  useEffect(() => {
    if (shiftDateData && shiftCategoryData) {
      const data = {
        date: moment(shiftDateData?.$d).format("DD/MM/YYYY"),
        shiftId: shiftCategoryData,
      };
      dispatch(getEmployeeByDate(data));
    }
  }, [shiftDateData, shiftCategoryData]);

  useEffect(() => {
    setJobsData(jobList);
  }, [jobList]);

  useEffect(() => {
    setShiftsData(shiftList);
  }, [shiftList]);

  useEffect(() => {
    setEmployeeData(dateBasedEmployeeList);
  }, [dateBasedEmployeeList]);

  //   useEffect(() => {
  //     if (mode === "add") {
  //       handleChange("holidayStatus", "Paid");
  //     }
  //     if (mode === "edit") {
  //       dispatch(fetchHolidayById(id));
  //     }
  //   }, []);

  //   useEffect(() => {
  //     if (mode === "edit") {
  //       holidayDetails && initializeValues(holidayDetails);
  //       // setFromTime(formatValuesHandle("fromTime"));
  //       // setToTime(formatValuesHandle("toTime"));
  //       // setBreakTime(formatValuesHandle("breakTime"));
  //       // setShiftHours(formatValuesHandle("shiftHours"));
  //     }
  //   }, [holidayDetails]);

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
              {/* <div className="form-group">
                <InputLabel>Branch</InputLabel>
                <Select
                  label="Branch"
                  //value={Number(values.jobCategoryId)}
                  // onChange={(e) =>
                  //   handleChange("jobCategoryId", e.target.value)
                  // }
                  className="form-select"
                  IconComponent={ExpandMoreIcon}
                >
                  <MenuItem key={1} value={"LA"}>
                    LA
                  </MenuItem>
                </Select>
              </div> */}
              <div className="form-group">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    slots={{
                      openPickerIcon: DatePickerIcon,
                    }}
                    label="Date"
                    format="DD/MM/YYYY"
                    value={shiftDateData}
                    onChange={(newValue) => {
                      setShiftDateData(newValue);
                      setFormattedDateData(
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
                <InputLabel required>Job</InputLabel>
                <Select
                  label="Job"
                  value={Number(jobCategoryData)}
                  onChange={(e) => {
                    setJobCategoryData(e.target.value);
                    handleChange("jobCategoryId", e.target.value);
                  }}
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
              <div className="form-group">
                <InputLabel required>Shift Type</InputLabel>
                <Select
                  label="Shift Type"
                  className="form-select"
                  value={Number(shiftCategoryData)}
                  onChange={(e) => {
                    setShiftCategoryData(e.target.value);
                    handleChange("shiftsId", e.target.value);
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
                <InputLabel required>Employee</InputLabel>
                <Select
                  label="Employee"
                  className="form-select"
                  value={Number(values.empId)}
                  onChange={(e) => {
                    handleChange("empId", e.target.value);
                  }}
                  IconComponent={ExpandMoreIcon}
                >
                  {employeeData?.map((item, index) => (
                    <MenuItem key={index} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors.empId}</FormHelperText>
              </div>
            </div>
            <div className="assign-action-btns">
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
