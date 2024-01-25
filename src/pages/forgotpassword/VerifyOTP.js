import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Button } from "@mui/material";
import useForm from "../../common/useForm";
import "./../../assets/css/style.css";
import { useNavigate } from "react-router-dom";
import {
  executeForgotPasswordRequest,
  verifyOtpRequest,
} from "../../slices/ForgotPasswordSlice";
import { toast } from "react-toastify";
import { Toast } from "../layout/Toast";
import "react-toastify/dist/ReactToastify.css";
import LoginImg from "../../assets/img/login-img.png";
import Logo from "../../assets/img/logo.png";
import Link from "@mui/material/Link";
import otpValidator from "../../common/validators/otpValdiator";

const VerifyOTP = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [verifiedUserDetails, setVerifiedUserDetails] = useState();
  const { otpVerifiedUserData, isOtpValid, error } = useSelector(
    (state) => state?.forgotPassword
  );
  const { values, errors, handleChange, handleSubmit, initializeValues } =
    useForm(onNext, validationError, otpValidator);

  function validationError() {}

  function onNext() {
    const payload = {
      id: localStorage.getItem("id"),
      email: localStorage.getItem("email"),
      otp: Number(values.otp),
    };
    dispatch(verifyOtpRequest(payload));
  }

  useEffect(() => {
    setVerifiedUserDetails(otpVerifiedUserData);
    localStorage.setItem("verifiedUserId", otpVerifiedUserData?.id);
    localStorage.setItem("verifiedUserEmail", otpVerifiedUserData?.email);
  }, [otpVerifiedUserData]);

  useEffect(() => {
    if (isOtpValid) {
      history("/resetpassword");
    }
  }, [isOtpValid]);

  const onKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const resendOtpHandle = () => {
    dispatch(
      executeForgotPasswordRequest({ email: localStorage.getItem("email") })
    );
  };

  return (
    <>
      <Toast />
      <div className="login-sec">
        <div className="login-form">
          <div className="logo">
            <img src={Logo} alt="logo" />
            <h2>Enter OTP</h2>
          </div>
          <div className="form otp-form">
            <div className="form-group">
              <TextField
                InputLabelProps={{ shrink: true }}
                className="form-control"
                label="OTP"
                type="number"
                onChange={(e) => handleChange("otp", e.target.value)}
                onKeyPress={onKeyPress}
                value={values.otp}
                required
                error={!!errors.otp}
                helperText={errors.otp}
                id="filled-hidden-label-normal"
                placeholder="OTP"
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
            <div className="forgot-link">
              <Link
                onClick={() => {
                  resendOtpHandle();
                }}
              >
                Resend OTP
              </Link>
            </div>
          </div>
          <div className="acc-link">
            <p>
              Kindly find an email sent and enter the 4 digit code as an OTP
            </p>
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

export default VerifyOTP;
