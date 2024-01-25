import { checkNull } from "./../utility";

export const EMAIL_REGEX = /^[a-z0-9.]+@[a-z]+.[a-z]{2,3}$/;

export default function employeeValidator(values) {
  let errors = {};

  if (!values.name) errors.name = checkNull("Name", values.name);

  if (!values.email) errors.email = checkNull("Email", values.email);

  if (values.email && !EMAIL_REGEX.test(values.email))
    errors.email = "Enter valid email";

  if (!values.phoneNo) {
    errors.phoneNo = checkNull("Phone number", values.phoneNo);
  }

  if (values.phoneNo) {
    let phoneNum = values.phoneNo;
    if (phoneNum.length < 9 || phoneNum.length > 15) {
      errors.phoneNo = "Contact number fields should have 9 to 15 digits";
    }
  }

  if (!values.gender) errors.gender = checkNull("Gender", values.gender);

  if (!values.jobCategoryId)
    errors.jobCategoryId = checkNull("Job Title", values.jobCategoryId);

  if (!values.joiningDate)
    errors.joiningDate = checkNull("Date of joining", values.joiningDate);

  if (!values.employeeStatus)
    errors.employeeStatus = checkNull("Employee Status", values.employeeStatus);

  if (!values.baseSalary)
    errors.baseSalary = checkNull("Base Salary", values.baseSalary);

  if (!values.salaryType)
    errors.salaryType = checkNull("Salary Type", values.salaryType);

  return errors;
}
