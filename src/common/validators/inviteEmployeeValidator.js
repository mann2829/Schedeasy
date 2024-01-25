import { checkNull } from "./../utility";
export default function inviteEmployeeValidator(values) {
  let errors = {};

  if (!values.empId) errors.empId = checkNull("Employee", values.empId);

  return errors;
}
