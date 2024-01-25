import { Button, Dialog, MenuItem, Select, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import useForm from "../../common/useForm";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import moment from "moment";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import shiftValidator from "../../common/validators/shiftValidator";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ReactComponent as CloseIcon } from "../../assets/img/close-icon.svg";
import {
  addShift,
  fetchAllShifts,
  fetchShiftById,
  updateShift,
} from "../../slices/ShiftsSlice";
import dayjs from "dayjs";

export const AddShiftModal = ({ title, onClose, mode, id, showPopup }) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [fromTime, setFromTime] = useState();
  const [toTime, setToTime] = useState();
  const [breakTime, setBreakTime] = useState();
  const [shiftHours, setShiftHours] = useState();
  const [dateFormat, setDateFormat] = useState(moment().format("YYYY-MM-DD"));
  const { shiftDetails } = useSelector((state) => state?.shifts);
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
    if (mode === "add") {
      dispatch(addShift(payload)).then((res) => {
        if (!res.error) {
          setTimeout(() => {
            dispatch(fetchAllShifts());
            onClose();
          }, 400);
        }
      });
    }
    if (mode === "edit") {
      const updatePayload = {
        id: id,
        payload: payload,
      };
      dispatch(updateShift(updatePayload)).then((res) => {
        if (!res.error) {
          setTimeout(() => {
            dispatch(fetchAllShifts());
            onClose();
          }, 400);
        }
      });
    }
  }

  const formatValuesHandle = (key) => {
    let formattedValue = dayjs(
      dateFormat +
        "T" +
        dayjs("1/1/1" + " " + shiftDetails?.[key]).format("HH:mm")
    );
    return formattedValue;
  };

  useEffect(() => {
    if (mode === "add") {
      handleChange("shiftStatus", "Paid");
    }
    if (mode === "edit") {
      dispatch(fetchShiftById(id));
    }
  }, []);

  useEffect(() => {
    if (mode === "edit") {
      shiftDetails && initializeValues(shiftDetails);
      setFromTime(formatValuesHandle("fromTime"));
      setToTime(formatValuesHandle("toTime"));
      setBreakTime(formatValuesHandle("breakTime"));
      setShiftHours(formatValuesHandle("shiftHours"));
    }
  }, [shiftDetails]);

  return (
    <Dialog
      open={showPopup}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div className="confirmation_modal" role="document">
        <div className="modal-content">
          <div className="userPopup fullWidth">
            <div className="userPopupText">
              <h3>{mode === "add" ? "Add Shift" : "Edit Shift"}</h3>
              <a
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={onClose}
              >
                <CloseIcon />
              </a>
            </div>
            <div className="form-content">
              <div className="form-group">
                <TextField
                  label="Shift Type"
                  className="form-control"
                  value={values.shiftType}
                  required
                  error={!!errors.shiftType}
                  helperText={errors.shiftType}
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => handleChange("shiftType", e.target.value)}
                />
              </div>
              <div className="shift-timing">
                <p>Shift Timing</p>
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
                      slotProps={{
                        textField: {
                          variant: "outlined",
                          required: true,
                          error: !!errors.fromTime,
                          helperText: errors.fromTime,
                        },
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
                      slotProps={{
                        textField: {
                          variant: "outlined",
                          required: true,
                          error: !!errors.toTime,
                          helperText: errors.toTime,
                        },
                      }}
                    />
                  </LocalizationProvider>
                </div>
              </div>
              <div className="breaktiming">
                <div className="form-group">
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
                          required: true,
                          variant: "outlined",
                          error: !!errors.breakTime,
                          helperText: errors.breakTime,
                        },
                      }}
                    />
                  </LocalizationProvider>
                </div>
                <div className="form-group">
                  <RadioGroup
                    onChange={(event) =>
                      handleChange("shiftStatus", event.target.value)
                    }
                    value={values.shiftStatus ? values.shiftStatus : "Paid"}
                    className="custom-radio"
                  >
                    <FormControlLabel
                      value="Paid"
                      control={<Radio />}
                      label="Paid"
                    />
                    <FormControlLabel
                      value="Unpaid"
                      control={<Radio />}
                      label="Unpaid"
                    />
                  </RadioGroup>
                </div>
              </div>
              <div className="form-group total-shift-hour">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    label="Shift Hours"
                    ampm={false}
                    value={shiftHours}
                    onChange={(newValue) => {
                      setShiftHours(newValue);
                      handleChange(
                        "shiftHours",
                        dayjs(newValue?.$d).format("HH:mm")
                      );
                    }}
                    slotProps={{
                      textField: {
                        variant: "outlined",
                        required: true,
                        error: !!errors.shiftHours,
                        helperText: errors.shiftHours,
                      },
                    }}
                  />
                </LocalizationProvider>
              </div>
            </div>

            <Button className="btn-primary" onClick={handleSubmit}>
              {mode === "add" ? "Add" : "Update"}
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};
