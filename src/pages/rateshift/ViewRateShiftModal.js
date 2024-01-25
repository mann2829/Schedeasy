import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { fetchRateShiftById } from "../../slices/RateShiftSlice";
import React, { useState, useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ReactComponent as CloseIcon } from "../../assets/img/close-icon.svg";

export const ViewRateShiftModal = ({ title, onClose, mode, id, showPopup }) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { rateShiftDetails } = useSelector((state) => state?.rateShifts);

  useEffect(() => {
    if (mode === "view") {
      dispatch(fetchRateShiftById(id));
    }
  }, []);

  console.log("rateShiftDetails", rateShiftDetails);

  return (
    <Dialog open={showPopup} className="CDialog">
      <DialogContent>
        <div className="dialog-heading">
          <h3>View Rate Shift</h3>
          <Button onClick={onClose} className="closeBtn">
            <CloseIcon />
          </Button>
        </div>
        <DialogContentText>
          <div className="rate-shift-view">
            <p>Branch Address</p>
            <span>LA</span>
          </div>
          <div className="rate-shift-view">
            <p>Date</p>
            <span>
              From{" "}
              {`${moment(rateShiftDetails?.fromDate, "DD/MM/YYYY").format(
                "Do MMM YYYY"
              )}`}{" "}
              to{" "}
              {`${moment(rateShiftDetails?.toDate, "DD/MM/YYYY").format(
                "Do MMM YYYY"
              )}`}
            </span>
          </div>
          <div className="rate-shift-view">
            <p>Job</p>
            <span>{rateShiftDetails?.job}</span>
          </div>
          <div className="rate-shift-view">
            <p>Shift Type</p>
            <span>{rateShiftDetails?.shiftType}</span>
          </div>
          <div className="rate-shift-view">
            <p>Shift Timings</p>
            <span>
              From {rateShiftDetails?.fromTime} to {rateShiftDetails?.toTime}
            </span>
          </div>
          <div className="rate-shift-view">
            <p>Shift Hours</p>
            <span>{rateShiftDetails?.shiftHours} hrs</span>
          </div>
          <div className="rate-shift-view">
            <p>Break Timing</p>
            <span>{rateShiftDetails?.breakTime} hrs</span>
          </div>
          <div className="rate-shift-view">
            <p>Hourly Rate</p>
            <span>
              {rateShiftDetails?.rate} {rateShiftDetails?.rateType ? "%" : "$"}
            </span>
          </div>
          <div className="rate-shift-view">
            <p>No. of Person Needed</p>
            <span>{rateShiftDetails?.noOfPersons}</span>
          </div>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};
