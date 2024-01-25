import React, { useEffect, useState } from "react";
import {
  TextField,
  Popover,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import DateRangeIcon from "@mui/icons-material/DateRange";
import RefreshIcon from "@mui/icons-material/Refresh";
import moment from "moment";
import { DateRange } from "react-date-range";
import { enGB } from "react-date-range/dist/locale";
// import enGb from "react-date-range/dist/locale/en-GB";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const DateRangePicker = (props) => {
  const dateFormat = "DD/MM/YYYY";

  const [displayCalendar, setDisplayCalendar] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [fromDate, setFromDate] = useState(undefined);
  const [toDate, setToDate] = useState(undefined);
  const [calendarType, setCalendarType] = useState();
  const [calendarView, setCalendarView] = useState();

  useEffect(() => {
    if (props.type !== undefined) {
      setCalendarType(props.type);
    }
    if (props.view !== undefined) {
      setCalendarView(props.view);
    }
  }, [props.type, props.view]);

  useEffect(() => {
    if (props.view === "payableCalendar") {
      const startOfWeek = moment().startOf("month").toDate();
      const endOfWeek = moment().endOf("month").toDate();

      setFromDate(startOfWeek);
      setToDate(endOfWeek);

      setInputValue(
        `${moment(startOfWeek).format(dateFormat)} - ${moment(endOfWeek).format(
          dateFormat
        )}`
      );
    } else if (props.view === "attendanceCalendar") {
      const todaysDate = moment().toDate();

      setFromDate(todaysDate);
      setToDate(todaysDate);

      setInputValue(
        `${moment(todaysDate).format(dateFormat)} - ${moment(todaysDate).format(
          dateFormat
        )}`
      );
    } else {
      // Set default selection to the current week (Sunday to Saturday)
      const startOfWeek = moment().startOf("isoWeek").toDate();
      const endOfWeek = moment().endOf("isoWeek").toDate();

      setFromDate(startOfWeek);
      setToDate(endOfWeek);

      setInputValue(
        `${moment(startOfWeek).format(dateFormat)} - ${moment(endOfWeek).format(
          dateFormat
        )}`
      );
    }
  }, []); // Run only once on component mount

  useEffect(() => {
    props.handleDates(
      moment(fromDate).format(dateFormat),
      moment(toDate).format(dateFormat)
    );
  }, [fromDate, toDate]);

  const onAdornmentClick = (e) => {
    setDisplayCalendar(true);
    setAnchorEl(e.currentTarget);
  };

  const onInputChange = (e) => {
    const inputValue = e.target.value;
    const { fromDate, toDate } = processInputValue(inputValue);

    setInputValue(inputValue);
    setFromDate(fromDate);
    setToDate(toDate);
  };

  const onPopoverClose = (e, reason) => {
    console.log(reason);
    setDisplayCalendar(false);
    setAnchorEl(null);
  };

  const onSelectFullRange = ({ selection }) => {
    let { startDate, endDate } = selection;

    startDate = moment(startDate);
    startDate = startDate.isValid() ? startDate.toDate() : undefined;

    endDate = moment(endDate);
    endDate = endDate.isValid() ? endDate.toDate() : undefined;

    let inputValue = "";
    if (startDate) inputValue += moment(startDate).format(dateFormat);
    if (endDate) inputValue += " - " + moment(endDate).format(dateFormat);

    setFromDate(startDate);
    setToDate(endDate);
    setInputValue(inputValue);
    // setTimeout(() => {
    //   setDisplayCalendar(false);
    // }, 400);
  };

  const onSelectDateRanges = ({ selection }) => {
    let { startDate } = selection;

    startDate = moment(startDate);
    startDate = startDate.isValid()
      ? startDate.startOf("isoWeek").toDate()
      : undefined;

    const endDate = startDate
      ? moment(startDate).endOf("isoWeek").toDate()
      : undefined;

    let inputValue = "";
    if (startDate) inputValue += moment(startDate).format(dateFormat);
    if (endDate) inputValue += " - " + moment(endDate).format(dateFormat);

    setFromDate(startDate);
    setToDate(endDate);
    setInputValue(inputValue);
    // setTimeout(() => {
    //   setDisplayCalendar(false);
    // }, 400);
  };

  const processInputValue = (value) => {
    let [fromDate, toDate] = value.split("-").map((elm) => elm.trim());

    fromDate = moment(fromDate, dateFormat);
    fromDate = fromDate.isValid() ? fromDate.toDate() : undefined;

    toDate = moment(toDate, dateFormat);
    toDate = toDate.isValid() ? toDate.toDate() : undefined;

    return { fromDate, toDate };
  };

  return (
    <div>
      <TextField
        fullWidth={true}
        value={inputValue}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={onAdornmentClick}>
                <DateRangeIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        onChange={onInputChange}
      />
      <Popover
        open={displayCalendar}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={onPopoverClose}
      >
        <div className="date-range">
          <DateRange
            ranges={[
              {
                startDate: fromDate,
                endDate: toDate,
                key: "selection",
              },
            ]}
            locale={enGB}
            onChange={props.type ? onSelectDateRanges : onSelectFullRange}
            staticRanges={undefined}
            inputRanges={undefined}
            showMonthAndYearPickers={true}
            moveRangeOnFirstSelection={false}
            showDateDisplay={false}
            scroll={{ enabled: true }}
            rangeColors={["#00AEEF"]}
          />
          {/* <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={() => {
              onInputChange({ target: { value: "" } });
              setFromDate(moment().startOf("week").toDate());
              setToDate(moment().endOf("week").toDate());
            }}
          >
            Reset
          </Button> */}
        </div>
      </Popover>
    </div>
  );
};

export default DateRangePicker;
