import { checkNull } from "../utility";
export default function addJobsValidator(values) {
  let errors = {};

  if (!values.categoryName)
    errors.categoryName = checkNull("Job Title", values.categoryName);

  return errors;
}
