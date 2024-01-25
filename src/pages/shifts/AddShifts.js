import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField, Button, Select } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import useForm from "../../common/useForm";
import shiftValidator from "../../common/validators/shiftValidator";
import { addShift } from "../../slices/ShiftsSlice";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import moment from "moment";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

const AddShifts = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [fromTime, setFromTime] = useState(null);
  const [toTime, setToTime] = useState(null);
  const { values, errors, handleChange, handleSubmit, initializeValues } =
    useForm(onNext, validationError, shiftValidator);

  function validationError() {}
  function onNext() {
    const payload = {
      shiftType: values.shiftType,
      fromTime: values.fromTime,
      toTime: values.toTime,
      breakTime: values.breakTime,
      shiftHours: values.shiftHours,
      shiftStatus: values.shiftStatus,
    };
    dispatch(addShift(payload));
    history("/shifts");
  }

  return (
    <div>
      <h3>Add Shift</h3>
      <div
        className="main-container"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div className="form-group">
          <TextField
            className="form-control"
            label="Shift Type"
            onChange={(e) => handleChange("shiftType", e.target.value)}
            value={values.shiftType}
            required
            error={!!errors.shiftType}
            helperText={errors.shiftType}
            InputLabelProps={{ shrink: true }}
          />
        </div>
        <div className="form-group">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label="From"
              value={fromTime}
              onChange={(newValue) => {
                setFromTime(newValue);
                handleChange(
                  "fromTime",
                  moment(newValue?.$d, "HH:mm:ss").format("hh:mm A")
                );
              }}
            />
          </LocalizationProvider>
        </div>
        <div className="form-group">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label="To"
              value={toTime}
              onChange={(newValue) => {
                setToTime(newValue);
                handleChange(
                  "toTime",
                  moment(newValue?.$d, "HH:mm:ss").format("hh:mm A")
                );
              }}
            />
          </LocalizationProvider>
        </div>
        <div className="form-group">
          <TextField
            className="form-control"
            label="Break Time"
            onChange={(e) => handleChange("breakTime", e.target.value)}
            value={values.breakTime}
            required
            error={!!errors.breakTime}
            helperText={errors.breakTime}
            InputLabelProps={{ shrink: true }}
          />
        </div>
        <div className="form-group">
          <TextField
            className="form-control"
            label="Shift Hours"
            onChange={(e) => handleChange("shiftHours", e.target.value)}
            value={values.shiftHours}
            required
            error={!!errors.shiftHours}
            helperText={errors.shiftHours}
            InputLabelProps={{ shrink: true }}
          />
        </div>

        <div className="form-group">
          <Select
            label="Shift Status"
            onChange={(e) => handleChange("shiftStatus", e.target.value)}
          >
            <MenuItem value={"Paid"}>Paid</MenuItem>
            <MenuItem value={"Unpaid"}>Unpaid</MenuItem>
          </Select>
        </div>
        <div className="form-group">
          <Button variant="contained" type="primary" onClick={handleSubmit}>
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddShifts;
