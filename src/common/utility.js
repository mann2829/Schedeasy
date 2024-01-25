export const checkNull = (fieldName, fieldValue) => {
  if (fieldValue == null || fieldValue.trim() === "") {
    return fieldName + " required!";
  }
  return false;
};
