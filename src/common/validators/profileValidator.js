import moment from "moment";
import { checkNull } from "./../utility";
export const EMAIL_REGEX = /^[a-z0-9.]+@[a-z]+.[a-z]{2,3}$/;
export default function profileValidator(values) {
  let errors = {};

  if (!values.name) errors.name = checkNull("Full name", values.name);
  if (!values.email) errors.email = checkNull("Email", values.email);

  if (!values.nipNumber)
    errors.nipNumber = checkNull("NIP Number", values.nipNumber);
  if (!values.mapAddress)
    errors.mapAddress = checkNull("Address", values.mapAddress);
  if (!values.openingTime)
    errors.openingTime = checkNull("Opening time", values.openingTime);
  if (!values.closingTime)
    errors.closingTime = checkNull("Closing time", values.closingTime);

  if (values.email && !EMAIL_REGEX.test(values.email))
    errors.email = "Enter valid email";

  if (
    values.openingTime &&
    values.closingTime &&
    moment(values.openingTime, "hh:mm a") >
      moment(values.closingTime, "hh:mm a")
  ) {
    errors.openingTime = "Invalid time range";
    errors.closingTime = "Invalid time range";
  }

  return errors;
}
