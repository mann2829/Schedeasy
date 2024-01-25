import { checkNull } from "./../utility";
export default function holidayValidator(values) {
  let errors = {};

  if (!values.fromDate)
    errors.fromDate = checkNull("From date", values.fromDate);

  if (!values.toDate) errors.toDate = checkNull("To date", values.toDate);

  if (!values.holidayName)
    errors.holidayName = checkNull("Holiday name", values.holidayName);

  if (!values.holidayType)
    errors.holidayType = checkNull("Holiday type", values.holidayType);

  if (!values.note) errors.note = checkNull("Note", values.note);

  if (!values.holidayStatus)
    errors.holidayStatus = checkNull("Holiday status", values.holidayStatus);

  return errors;
}
