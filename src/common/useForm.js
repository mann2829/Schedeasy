import { useState, useEffect } from "react";

const useForm = (callback, callbackError, validate) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isDirty, setIsDirty] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    } else {
      callbackError();
    }
  }, [errors]);

  const handleSubmit = () => {
    setErrors(validate(values));
    setIsSubmitting(true);
  };

  const handleChange = (name, value) => {
    setValues((values) => ({ ...values, [name]: value }));
    setIsDirty(true);
  };

  const setDirty = (value) => {
    setIsDirty(value);
  };

  const initializeValues = (values) => {
    setValues(values);
  };

  return {
    handleChange,
    handleSubmit,
    initializeValues,
    setDirty,
    values,
    errors,
    isDirty,
  };
};

export default useForm;
