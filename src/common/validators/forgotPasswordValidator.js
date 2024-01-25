import { checkNull } from "./../utility";
export const EMAIL_REGEX = /^[a-z0-9.]+@[a-z]+.[a-z]{2,3}$/;

export default function forgotPasswordValidator(values) {
  let errors = {};
  if (!values.email) errors.email = checkNull("Email", values.email);

  if (values.email && !EMAIL_REGEX.test(values.email))
    errors.email = "Enter valid email";
  return errors;
}
