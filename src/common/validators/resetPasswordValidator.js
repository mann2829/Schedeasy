import { checkNull } from "./../utility";

export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,15}$/;

export default function resetPasswordValidator(values) {
  let errors = {};
  if (!values.newPassword)
    errors.newPassword = checkNull("Password", values.newPassword);
  if (!values.confirmPassword)
    errors.confirmPassword = checkNull("Password", values.confirmPassword);

  if (values.confirmPassword !== values.newPassword)
    errors.confirmPassword = "Passwords did not match";

  if (
    values.newPassword === values.confirmPassword &&
    values.newPassword &&
    values.confirmPassword &&
    !PASSWORD_REGEX.test(values.newPassword)
  ) {
    errors.confirmPassword =
      "Password must contain at least 8 characters, including uppercase, lowercase, numbers and special character.";
  }
  return errors;
}
