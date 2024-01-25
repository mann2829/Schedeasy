import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Button } from "@mui/material";
import useForm from "../../common/useForm";
import resetPasswordValidator from "../../common/validators/resetPasswordValidator";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import "./../../assets/css/style.css";
import { useNavigate } from "react-router-dom";
import { resetPasswordRequest } from "../../slices/ForgotPasswordSlice";
import { toast } from "react-toastify";
import { Toast } from "../layout/Toast";
import "react-toastify/dist/ReactToastify.css";
import LoginImg from "../../assets/img/login-img.png";
import Logo from "../../assets/img/logo.png";
import Link from "@mui/material/Link";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { isPasswordChanged } = useSelector((state) => state?.forgotPassword);
  const { values, errors, handleChange, handleSubmit, initializeValues } =
    useForm(onNext, validationError, resetPasswordValidator);

  function validationError() {}

  function onNext() {
    const payload = {
      email: localStorage.getItem("verifiedUserEmail"),
      password: values.newPassword,
      confirmPassword: values.confirmPassword,
    };
    dispatch(
      resetPasswordRequest({
        id: localStorage.getItem("verifiedUserId"),
        payload: payload,
      })
    );
  }

  useEffect(() => {
    if (isPasswordChanged) {
      setTimeout(() => {
        window.location.href = "/";
      }, 500);
    }
  }, [isPasswordChanged]);

  const onKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const handleClickShowNewPassword = () => {
    handleChange("showNewPassword", !values.showNewPassword);
  };

  const handleClickShowConfirmPassword = () => {
    handleChange("showConfirmPassword", !values.showConfirmPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Toast />
      <div className="login-sec">
        <div className="login-form">
          <div className="logo">
            <img src={Logo} alt="logo" />
            <h2>Reset Password</h2>
          </div>
          <div className="form">
            <div className="form-group">
              <TextField
                InputLabelProps={{ shrink: true }}
                className="form-control"
                label="New Password"
                variant="outlined"
                placeholder="New Password"
                onChange={(e) => handleChange("newPassword", e.target.value)}
                value={values.newPassword}
                type={values.showNewPassword ? "text" : "password"}
                onKeyPress={onKeyPress}
                required
                error={!!errors.newPassword}
                helperText={errors.newPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowNewPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showNewPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="form-group">
              <TextField
                InputLabelProps={{ shrink: true }}
                className="form-control"
                label="Confirm Password"
                variant="outlined"
                placeholder="Confirm Password"
                onChange={(e) =>
                  handleChange("confirmPassword", e.target.value)
                }
                value={values.confirmPassword}
                type={values.showConfirmPassword ? "text" : "password"}
                onKeyPress={onKeyPress}
                required
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
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

export default ResetPassword;
