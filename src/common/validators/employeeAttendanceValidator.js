import { checkNull } from "./../utility";
export default function employeeAttendanceValidator(values) {
  let errors = {};

  if (!values.date) errors.date = checkNull("Date", values.date);

  if (!values.shiftsId) errors.shiftsId = checkNull("Shift", values.shiftsId);

  if (!values.jobCategoryId)
    errors.jobCategoryId = checkNull("Job", values.jobCategoryId);

  if (!values.checkInTime)
    errors.checkInTime = checkNull("Check In", values.checkInTime);

  if (!values.checkOutTime)
    errors.checkOutTime = checkNull("Check Out", values.checkOutTime);

  if (!values.breakTime)
    errors.breakTime = checkNull("Break time", values.breakTime);

  return errors;
}
