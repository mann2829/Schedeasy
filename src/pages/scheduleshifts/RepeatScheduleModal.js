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
import {
  repeatShedule,
  getScheduleData,
} from "../../slices/ScheduleShiftsSlice";
import { Textarea } from "@mui/joy";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RepeatIcon from "../../assets/img/repeat-icon.png";

export const RepeatScheduleModal = ({
  title,
  onClose,
  mode,
  id,
  showPopup,
  fromDate,
  toDate,
}) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [date, setDate] = useState(null);
  const [repeatType, setRepeatType] = useState("Week");
  //   const [toDate, setToDate] = useState(null);
  //   const { holidayDetails } = useSelector((state) => state?.holidays);

  const handleSubmit = () => {
    const payload = {
      fromDate: fromDate,
      toDate: toDate,
      repeatType: repeatType,
    };
    dispatch(repeatShedule(payload));
    setTimeout(() => {
      onClose();
    }, 400);
  };

  return (
    <Dialog
      open={showPopup}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className="repeatModal"
    >
      <div className="confirmation_modal" role="document">
        <div className="modal-content">
          <div className="userPopup fullWidth">
            <div className="dialog-heading">
              <h3></h3>
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
              <img src={RepeatIcon} />
              <h4>{title}</h4>
              <p>
                This button will help you repeat the same shift schedule <br />
                for the next week or this entire month.
              </p>
              <div className="form-group">
                <Select
                  value={repeatType}
                  onChange={(e) => setRepeatType(e.target.value)}
                  className="form-select"
                  IconComponent={ExpandMoreIcon}
                >
                  <MenuItem key={1} value={"Week"}>
                    Next Week
                  </MenuItem>
                  <MenuItem key={2} value={"Month"}>
                    This Month
                  </MenuItem>
                </Select>
              </div>
              <Button className="btn-primary" onClick={handleSubmit}>
                submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};
