import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Button } from "@mui/material";
import useForm from "../../common/useForm";
import loginValidator from "../../common/validators/loginValidator";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import "./../../assets/css/style.css";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../slices/AuthSlice";
import LoginImg from "../../assets/img/login-img.png";
import Logo from "../../assets/img/logo.png";
import Link from "@mui/material/Link";

const Login = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { values, errors, handleChange, handleSubmit, initializeValues } =
    useForm(onNext, validationError, loginValidator);
  const { isAuthenticated, accessToken, email, userId, profileImg, error } =
    useSelector((state) => state.auth);

  const redirectToPage = (pageName) => {
    history(`/${pageName}`);
  };

  function validationError() {}

  function onNext() {
    const payload = {
      email: values.email,
      password: values.password,
      platform: "web",
    };
    dispatch(loginUser(payload));
  }

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("token", accessToken);
      localStorage.setItem("email", email);
      localStorage.setItem("userId", userId);
      localStorage.setItem("profileImg", profileImg);
      history("/dashboard");
    }
  }, [isAuthenticated]);

  const onKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const handleClickShowPassword = () => {
    handleChange("showPassword", !values.showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const forgotPasswordHandle = () => {
    history("/forgotpassword");
  };

  return (
    <>
      <div className="login-sec">
        <div className="login-form">
          <div className="logo">
            <img src={Logo} alt="logo" />
            <h2>Login</h2>
          </div>
          <div className="form">
            <div className="form-group">
              <TextField
                InputLabelProps={{ shrink: true }}
                className="form-control"
                label="Email"
                onChange={(e) => handleChange("email", e.target.value)}
                value={values.email}
                required
                onKeyPress={onKeyPress}
                error={!!errors.email}
                helperText={errors.email}
                id="filled-hidden-label-normal"
                placeholder="Email"
                variant="outlined"
              />
            </div>
            <div className="form-group">
              <TextField
                InputLabelProps={{ shrink: true }}
                className="form-control"
                label="Password"
                variant="outlined"
                placeholder="Password"
                onChange={(e) => handleChange("password", e.target.value)}
                value={values.password}
                type={values.showPassword ? "text" : "password"}
                onKeyPress={onKeyPress}
                required
                error={!!errors.password}
                helperText={errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
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
            <div className="forgot-link">
              <Link onClick={forgotPasswordHandle}>Forgot Password</Link>
            </div>
            <div className="form-group">
              <Button
                type="primary"
                sx={{ mt: 1 }}
                className="btn-primary"
                onClick={handleSubmit}
              >
                Login
              </Button>
            </div>
          </div>
          {/* <div className="acc-link">
            <p>
              Don’t have an account?{" "}
              <Link onClick={() => redirectToPage("registration")}>
                Sign up
              </Link>
            </p>
          </div> */}
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

export default Login;
