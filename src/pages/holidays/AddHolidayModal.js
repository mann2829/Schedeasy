import { Button, Dialog, MenuItem, Select, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import useForm from "../../common/useForm";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import moment from "moment";
import { InputLabel } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import shiftValidator from "../../common/validators/shiftValidator";
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
import holidayValidator from "../../common/validators/holidayValidator";
import { FormHelperText, Textarea } from "@mui/joy";

export const AddHolidayModal = ({
  title,
  onClose,
  mode,
  id,
  showPopup,
  autoFetchStatus,
}) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const { holidayDetails } = useSelector((state) => state?.holidays);
  const { values, errors, handleChange, handleSubmit, initializeValues } =
    useForm(onNext, validationError, holidayValidator);

  function validationError() {}
  function onNext() {
    const payload = {
      fromDate: values.fromDate,
      toDate: values.toDate,
      holidayName: values.holidayName,
      holidayType: values.holidayType,
      note: values.note,
      holidayStatus: values.holidayStatus,
    };
    if (mode === "add") {
      dispatch(addHoliday(payload)).then((res) => {
        if (!res.error) {
          setTimeout(() => {
            if (autoFetchStatus) {
              dispatch(fetchAllHolidays("auto"));
            } else {
              dispatch(fetchAllHolidays("manual"));
            }
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
      dispatch(updateHoliday(updatePayload)).then((res) => {
        if (!res.error) {
          setTimeout(() => {
            if (autoFetchStatus) {
              dispatch(fetchAllHolidays("auto"));
            } else {
              dispatch(fetchAllHolidays("manual"));
            }
            onClose();
          }, 400);
        }
      });
    }
  }

  useEffect(() => {
    if (mode === "add") {
      handleChange("holidayStatus", "Paid");
    }
    if (mode === "edit") {
      dispatch(fetchHolidayById(id));
    }
  }, []);

  useEffect(() => {
    if (mode === "edit") {
      holidayDetails && initializeValues(holidayDetails);

      // setFromTime(formatValuesHandle("fromTime"));
      // setToTime(formatValuesHandle("toTime"));
      // setBreakTime(formatValuesHandle("breakTime"));
      // setShiftHours(formatValuesHandle("shiftHours"));
    }
  }, [holidayDetails]);

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
              <h3>{mode === "add" ? "Add Holiday" : "Edit Holiday"}</h3>
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
                    label="From Date"
                    value={
                      mode === "edit"
                        ? dayjs(
                            moment(
                              holidayDetails?.fromDate,
                              "DD/MM/YYYY"
                            ).format("YYYY-MM-DD")
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
                    format="DD/MM/YYYY"
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
                    label="To Date"
                    value={
                      mode === "edit"
                        ? dayjs(
                            moment(
                              holidayDetails?.fromDate,
                              "DD/MM/YYYY"
                            ).format("YYYY-MM-DD")
                          )
                        : toDate
                    }
                    onChange={(newValue) => {
                      setToDate(newValue);
                      handleChange(
                        "toDate",
                        moment(newValue?.$d).format("DD/MM/YYYY")
                      );
                    }}
                    format="DD/MM/YYYY"
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
                  label="Holiday Name"
                  className="form-control"
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
                  label="Type of Holiday"
                  className="form-control"
                  onChange={(e) => handleChange("holidayType", e.target.value)}
                  value={values.holidayType}
                  required
                  error={!!errors.holidayType}
                  helperText={errors.holidayType}
                  InputLabelProps={{ shrink: true }}
                />
              </div>
              <div className="form-group">
                <InputLabel required>Note</InputLabel>
                <Textarea
                  className="form-control"
                  multiline
                  minRows={3}
                  maxRows={4}
                  onChange={(e) => handleChange("note", e.target.value)}
                  value={values.note}
                  InputLabelProps={{ shrink: true }}
                />
                <FormHelperText>{errors.note}</FormHelperText>
              </div>
              <div className="form-group">
                <RadioGroup
                  onChange={(event) =>
                    handleChange("holidayStatus", event.target.value)
                  }
                  value={values.holidayStatus ? values.holidayStatus : "Paid"}
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

            <Button className="btn-primary" onClick={handleSubmit}>
              {mode === "add" ? "Add" : "Update"}
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};
