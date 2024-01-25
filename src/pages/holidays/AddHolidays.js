import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField, Button, Select } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import useForm from "../../common/useForm";
import holidayValidator from "../../common/validators/holidayValidator";
import { addHoliday } from "../../slices/HolidaysSlice";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import moment from "moment";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { ReactComponent as DatePickerIcon } from "../../assets/img/date-picker.svg";

const AddHolidays = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const { values, errors, handleChange, handleSubmit, initializeValues } =
    useForm(onNext, validationError, holidayValidator);

  function validationError() {}
  function onNext() {
    const payload = {
      holidayName: values.holidayName,
      fromDate: values.fromDate,
      toDate: values.toDate,
      holidayType: values.holidayType,
      note: values.note,
      holidayStatus: values.holidayStatus,
    };
    dispatch(addHoliday(payload));
    history("/holidays");
  }

  return (
    <div className="main-container">
      <h3>Add Holiday</h3>
      <div
        className="main-container"
        style={{ display: "flex", flexDirection: "row" }}
      >
        <div className="form-group">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              slots={{
                openPickerIcon: DatePickerIcon,
              }}
              label="From"
              format="DD/MM/YYYY"
              value={fromDate}
              onChange={(newValue) => {
                setFromDate(newValue);
                handleChange(
                  "fromDate",
                  moment(newValue?.$d).format("DD/MM/YYYY")
                );
              }}
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
        </div>
        <div className="form-group">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              slots={{
                openPickerIcon: DatePickerIcon,
              }}
              label="To"
              format="DD/MM/YYYY"
              value={toDate}
              onChange={(newValue) => {
                setToDate(newValue);
                handleChange(
                  "toDate",
                  moment(newValue?.$d).format("DD/MM/YYYY")
                );
              }}
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
        <div className="form-group">
          <TextField
            className="form-control"
            label="Holiday Name"
            onChange={(e) => handleChange("holidayName", e.target.value)}
            value={values.holidayName}
            required
            error={!!errors.holidayName}
            helperText={errors.holidayName}
            InputLabelProps={{ shrink: true }}
          />
        </div>
        <div className="form-group">
          <TextField
            className="form-control"
            label="Type of Holiday"
            onChange={(e) => handleChange("holidayType", e.target.value)}
            value={values.holidayType}
            required
            error={!!errors.holidayType}
            helperText={errors.holidayType}
            InputLabelProps={{ shrink: true }}
          />
        </div>
        <div className="form-group">
          <TextField
            className="form-control"
            label="Note"
            onChange={(e) => handleChange("note", e.target.value)}
            value={values.note}
            required
            error={!!errors.note}
            helperText={errors.note}
            InputLabelProps={{ shrink: true }}
          />
        </div>
        <div className="form-group">
          <Select
            label="Type"
            onChange={(e) => handleChange("holidayStatus", e.target.value)}
          >
            <MenuItem value={"Paid"}>Paid</MenuItem>
            <MenuItem value={"Unpaid"}>Unpaid</MenuItem>
          </Select>
        </div>
        <div className="form-group">
          <Button variant="contained" type="primary" onClick={handleSubmit}>
            Add Holiday
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddHolidays;
