import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Button, Select, MenuItem } from "@mui/material";
import useForm from "../../common/useForm";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import { fetchAllJobs } from "../../slices/JobsSlice";
import { fetchAllShifts } from "../../slices/ShiftsSlice";
import {
  addRateShift,
  fetchRateShiftById,
  updateRateShift,
} from "../../slices/RateShiftSlice";
import moment from "moment";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import rateShiftValidator from "../../common/validators/rateShiftValidator";
import { InputLabel } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ReactComponent as DatePickerIcon } from "../../assets/img/date-picker.svg";
import { pageMode } from "../../common/appConstants";
import dayjs from "dayjs";
import { FormHelperText } from "@mui/joy";
import CLoader from "../../common/CLoader";
import CRadioCustom from "../../common/CRadioCustom";

const AddRateShift = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const url = useLocation();
  const [mode, setMode] = useState(
    url.pathname.includes("new") ? pageMode.ADD : pageMode.EDIT
  );
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const { jobList } = useSelector((state) => state?.jobs);
  const { shiftList } = useSelector((state) => state?.shifts);
  const { rateShiftDetails, isRateShiftLoading } = useSelector(
    (state) => state?.rateShifts
  );
  const [jobsData, setJobsData] = useState();
  const [shiftsData, setShiftsData] = useState();
  const [paymentType, setPaymentType] = useState("$");
  const { rsId } = useParams();

  const { values, errors, handleChange, handleSubmit, initializeValues } =
    useForm(onNext, validationError, rateShiftValidator);
  function validationError() {}
  function onNext() {
    const payload = {
      fromDate: values.fromDate,
      toDate: values.toDate,
      jobCategoryId: values.jobCategoryId,
      shiftsId: values.shiftsId,
      rate: values.rate,
      noOfPersons: values.noOfPersons,
      rateType: paymentType === "$" ? false : true,
    };
    mode !== pageMode.EDIT
      ? dispatch(addRateShift(payload)).then((res) => {
          if (!res.error) {
            history(`/rateshift`);
          }
        })
      : dispatch(updateRateShift({ id: rsId, payload: payload })).then(
          (res) => {
            if (!res.error) {
              history(`/rateshift`);
            }
          }
        );
  }

  useEffect(() => {
    dispatch(fetchAllJobs());
    dispatch(fetchAllShifts());
  }, []);

  useEffect(() => {
    rsId && dispatch(fetchRateShiftById(rsId));
  }, []);

  useEffect(() => {
    if (mode === pageMode.EDIT) {
      rateShiftDetails && initializeValues(rateShiftDetails);
      if (rateShiftDetails?.rateType) {
        setPaymentType("%");
      } else {
        setPaymentType("$");
      }
    }
  }, [rateShiftDetails]);

  useEffect(() => {
    setJobsData(jobList);
  }, [jobList]);

  useEffect(() => {
    setShiftsData(shiftList);
  }, [shiftList]);

  const setDefaultShiftValues = (shiftId) => {
    shiftsData?.map((item) => {
      if (item.id === shiftId) {
        handleChange("fromTime", item.fromTime);
        handleChange("toTime", item.toTime);
        handleChange("shiftHours", item.shiftHours);
        handleChange("breakTime", item.breakTime);
        handleChange("shiftStatus", item.shiftStatus);
      }
    });
  };

  const setDefaultHourlyRate = (jobId) => {
    jobsData?.map((item) => {
      if (item.id === jobId) {
        handleChange("rate", item.jobRate);
      }
    });
  };

  const redirectToRateShift = () => {
    history("/rateshift");
  };

  const isMonday = (date) => {
    return dayjs(date).day() === 1;
  };

  const isSunday = (date) => {
    return dayjs(date).day() === 0;
  };

  return (
    <>
      <CLoader show={isRateShiftLoading} />
      <div className="main-container">
        <h2>
          {mode !== pageMode.EDIT ? `${"Create"}` : `${"Edit"}`} Rate Shift
        </h2>
        <div className="create-rate-shift card-box">
          <div className="form-group rate-shift-inputs">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                slots={{
                  openPickerIcon: DatePickerIcon,
                }}
                label="From Date"
                format="DD/MM/YYYY"
                value={
                  mode === pageMode.EDIT
                    ? dayjs(
                        moment(values?.fromDate, "DD/MM/YYYY").format(
                          "YYYY-MM-DD"
                        )
                      )
                    : fromDate
                }
                onChange={(newValue) => {
                  setFromDate(newValue);
                  handleChange(
                    "fromDate",
                    moment(newValue?.$d).format("DD/MM/YYYY")
                  );
                }}
                shouldDisableDate={(date) => !isMonday(date)}
                slotProps={{
                  textField: {
                    variant: "outlined",
                    required: true,
                    error: !!errors.fromDate,
                    helperText: errors.fromDate,
                  },
                }}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                slots={{
                  openPickerIcon: DatePickerIcon,
                }}
                label="To Date"
                format="DD/MM/YYYY"
                value={
                  mode === pageMode.EDIT
                    ? dayjs(
                        moment(values?.toDate, "DD/MM/YYYY").format(
                          "YYYY-MM-DD"
                        )
                      )
                    : toDate
                }
                onChange={(newValue) => {
                  console.log("New Date", newValue);
                  setToDate(newValue);
                  handleChange(
                    "toDate",
                    moment(newValue?.$d).format("DD/MM/YYYY")
                  );
                }}
                shouldDisableDate={(date) => !isSunday(date)}
                slotProps={{
                  textField: {
                    variant: "outlined",
                    required: true,
                    error: !!errors.toDate,
                    helperText: errors.toDate,
                  },
                }}
              />
            </LocalizationProvider>
          </div>

          <div className="form-group rate-shift-inputs">
            <div className="rate-shift-select">
              <InputLabel required>Job</InputLabel>
              <Select
                label="Job"
                value={Number(values.jobCategoryId)}
                onChange={(e) => {
                  handleChange("jobCategoryId", e.target.value);
                  setDefaultHourlyRate(e.target.value);
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
            <div className="rate-shift-select">
              <InputLabel required>Shift Type</InputLabel>
              <Select
                label="Shift Type"
                className="form-select"
                value={Number(values.shiftsId)}
                onChange={(e) => {
                  handleChange("shiftsId", e.target.value);
                  setDefaultShiftValues(e.target.value);

                  // handleChange("fromTime", e.target.value.fromTime);
                  // handleChange("toTime", e.target.value.toTime);
                  // handleChange("shiftHours", e.target.value.shiftHours);
                  // handleChange("breakTime", e.target.value.breakTime);
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
          </div>
          <div className="form-group shift-timings">
            <p>Shift Timings</p>
            <TextField
              className="form-control"
              label="From"
              disabled={true}
              value={values.fromTime}
              error={!!errors.fromTime}
              helperText={errors.fromTime}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              className="form-control"
              label="To"
              disabled={true}
              value={values.toTime}
              error={!!errors.toTime}
              helperText={errors.toTime}
              InputLabelProps={{ shrink: true }}
            />
          </div>
          <div className="form-group shift-rate-fields shift-hrs-content">
            <TextField
              className="form-control"
              label="Break Timing"
              disabled={true}
              value={values.breakTime}
              required
              error={!!errors.breakTime}
              helperText={errors.breakTime}
              InputLabelProps={{ shrink: true }}
            />
            <span className="shift-rate-hrs">hrs</span>
            <div className="hrs-status">
              <span
                className={
                  values.shiftStatus === "Paid" ? "paid-hrs" : "unpaid-hrs"
                }
              >
                {values.shiftStatus}
              </span>
            </div>
          </div>
          <div className="form-group shift-rate-fields shift-hrs-content">
            <TextField
              className="form-control"
              label="Shift Hours"
              disabled={true}
              value={values.shiftHours}
              required
              error={!!errors.shiftHours}
              helperText={errors.shiftHours}
              InputLabelProps={{ shrink: true }}
            />
          </div>
          <div className="form-group shift-rate-fields custom-radio-shift">
            <TextField
              className="form-control"
              label="Hourly Rate"
              onChange={(e) => handleChange("rate", e.target.value)}
              value={values.rate}
              required
              error={!!errors.rate}
              helperText={errors.rate}
              InputLabelProps={{ shrink: true }}
            />
            <CRadioCustom
              label={["%", "$"]}
              value={paymentType}
              onChange={(value) => {
                setPaymentType(value);
              }}
            />
          </div>
          <div className="form-group shift-rate-fields">
            <TextField
              className="form-control"
              label="No of person needed"
              onChange={(e) => handleChange("noOfPersons", e.target.value)}
              value={values.noOfPersons}
              required
              error={!!errors.noOfPersons}
              helperText={errors.noOfPersons}
              InputLabelProps={{ shrink: true }}
            />
          </div>
        </div>
        <div className="save-rate">
          <Button className="btn-thin-primary" onClick={redirectToRateShift}>
            Cancel
          </Button>
          <Button className="btn-primary" onClick={handleSubmit}>
            Save
          </Button>
        </div>
      </div>
    </>
  );
};

export default AddRateShift;
