import { checkNull } from "./../utility";
export default function otpValidator(values) {
  let errors = {};
  if (!values.otp) errors.otp = checkNull("OTP", values.otp);
  return errors;
}
