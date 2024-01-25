import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Button } from "@mui/material";
import useForm from "../../common/useForm";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import forgotPasswordValidator from "../../common/validators/forgotPasswordValidator";
import "./../../assets/css/style.css";
import { useNavigate } from "react-router-dom";
import { executeForgotPasswordRequest } from "../../slices/ForgotPasswordSlice";
import { toast } from "react-toastify";
import { Toast } from "../layout/Toast";
import "react-toastify/dist/ReactToastify.css";
import LoginImg from "../../assets/img/login-img.png";
import Logo from "../../assets/img/logo.png";
import Link from "@mui/material/Link";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [userDetails, setUserDetails] = useState();
  const { userData, userFound, error } = useSelector(
    (state) => state?.forgotPassword
  );
  const { values, errors, handleChange, handleSubmit, initializeValues } =
    useForm(onNext, validationError, forgotPasswordValidator);

  function validationError() {}

  function onNext() {
    const payload = {
      email: values.email,
    };
    dispatch(executeForgotPasswordRequest(payload));
  }

  useEffect(() => {
    setUserDetails(userData);
    localStorage.setItem("id", userData?.id);
    localStorage.setItem("email", userData?.email);
  }, [userData]);

  useEffect(() => {
    if (userFound) {
      history("/verifyotp");
    }
  }, [userFound]);

  //   useEffect(() => {
  //     if (userDetails?.id) {
  //       localStorage.setItem("forgotPasswordUserId", userDetails?.id);
  //       history("/verifyotp");
  //     }
  //   }, [userDetails]);

  const onKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <>
      <Toast />
      <div className="login-sec">
        <div className="login-form">
          <div className="logo">
            <img src={Logo} alt="logo" />
            <h2>Forgot Password</h2>
          </div>
          <div className="form">
            <div className="form-group">
              <TextField
                InputLabelProps={{ shrink: true }}
                className="form-control"
                label="Email"
                onChange={(e) => handleChange("email", e.target.value)}
                onKeyPress={onKeyPress}
                value={values.email}
                required
                error={!!errors.email}
                helperText={errors.email}
                id="filled-hidden-label-normal"
                placeholder="Email"
                variant="outlined"
              />
            </div>
            <div className="form-group">
              <Button
                type="primary"
                sx={{ mt: 1 }}
                className="btn-primary"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
        <div className="login-right">
          <div>
            <img src={LoginImg} />
          </div>
        </div>
        <></>
      </div>
    </>
  );
};

export default ForgotPassword;
