import { checkNull } from "./../utility";
export default function assignEmployeeValidator(values) {
  let errors = {};

  if (!values.date) errors.date = checkNull("Shift Date", values.date);

  if (!values.shiftsId)
    errors.shiftsId = checkNull("Shift Type", values.shiftsId);

  if (!values.jobCategoryId)
    errors.jobCategoryId = checkNull("Job", values.jobCategoryId);

  if (!values.empId) errors.empId = checkNull("Employee", values.empId);

  return errors;
}
