import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Button } from "@mui/material";
import useForm from "../../common/useForm";
import changepasswordValidator from "../../common/validators/changepasswordValidator";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { changePasswordRequest } from "../../slices/ForgotPasswordSlice";
import "./../../assets/css/style.css";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { values, errors, handleChange, handleSubmit, initializeValues } =
    useForm(onNext, validationError, changepasswordValidator);

  function validationError() {}

  function onNext() {
    const payload = {
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
      confirmPassword: values.confirmPassword,
    };
    dispatch(changePasswordRequest(payload)).then((res) => {
      if (!res.error) {
        history("/dashboard");
      }
    });
  }

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

  const handleClickOldPassword = () => {
    handleChange("showOldPassword", !values.showOldPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const redirectToDashboard = () => {
    history("/dashboard");
  };
  return (
    <div className="login-sec change-password-sec">
      <div className="login-form">
        <div>
          <h2>Change Password</h2>
        </div>
        <div className="form">
          <div className="form-group">
            <TextField
              InputLabelProps={{ shrink: true }}
              className="form-control"
              label="Old Password"
              variant="outlined"
              placeholder="Old Password"
              onChange={(e) => handleChange("oldPassword", e.target.value)}
              value={values.oldPassword}
              type={values.showOldPassword ? "text" : "password"}
              onKeyPress={onKeyPress}
              required
              error={!!errors.oldPassword}
              helperText={errors.oldPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickOldPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showOldPassword ? (
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
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
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
          <div className="form-group change-pw-btns">
            <Button
              type="primary"
              sx={{ mt: 1 }}
              className="btn-primary"
              onClick={handleSubmit}
            >
              Submit
            </Button>
            <Button
              type="primary"
              sx={{ mt: 1 }}
              className="btn-thin-primary"
              onClick={() => redirectToDashboard()}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
