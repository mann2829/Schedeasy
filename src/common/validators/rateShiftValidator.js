import { checkNull } from "./../utility";
export default function rateShiftValidator(values) {
  let errors = {};

  if (!values.fromDate)
    errors.fromDate = checkNull("From date", values.fromDate);

  if (!values.toDate) errors.toDate = checkNull("To date", values.toDate);

  if (!values.jobCategoryId)
    errors.jobCategoryId = checkNull("Job category", values.jobCategoryId);

  if (!values.shiftsId)
    errors.shiftsId = checkNull("Shift type", values.shiftsId);

  if (!values.rate) errors.rate = checkNull("Hourly rate", values.rate);

  if (!values.noOfPersons)
    errors.noOfPersons = checkNull("Persons", values.noOfPersons);

  return errors;
}
