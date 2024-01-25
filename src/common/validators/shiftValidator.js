import { checkNull } from "./../utility";
import moment from "moment";
export default function shiftValidator(values) {
  let errors = {};

  if (!values.shiftType)
    errors.shiftType = checkNull("Shift type", values.shiftType);

  if (!values.fromTime)
    errors.fromTime = checkNull("From time", values.fromTime);

  if (!values.toTime) errors.toTime = checkNull("To time", values.toTime);

  if (
    values.fromTime &&
    values.toTime &&
    moment(values.fromTime, "hh:mm a") > moment(values.toTime, "hh:mm a")
  ) {
    errors.fromTime = "Invalid time range";
    errors.toTime = "Invalid time range";
  }

  if (!values.breakTime)
    errors.breakTime = checkNull("Break time", values.breakTime);

  if (!values.shiftStatus)
    errors.shiftStatus = checkNull("Shift status", values.shiftStatus);

  if (!values.shiftHours)
    errors.shiftHours = checkNull("Shift hours", values.shiftHours);

  if (values.shiftHours && values.shiftHours === "00:00")
    errors.shiftHours = "Enter valid shift hours";

  console.log("errors", errors);
  return errors;
}
