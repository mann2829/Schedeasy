import { Button, Dialog, MenuItem, Select, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { DialogContent } from "@mui/joy";
import moment from "moment";

export const CNotificationDialog = ({
  description,
  onClose,
  showNotifyPopup,
  onDelete,
  warningImg,
  closeIcon,
  notificationDetails,
}) => {
  return (
    <Dialog open={showNotifyPopup} className="CDialog dialog-notification">
      <DialogContent>
        <div className="dialog-heading">
          <h3>{notificationDetails?.title}</h3>
          <Button onClick={onClose} className="closeBtn">
            {closeIcon}
          </Button>
        </div>
        <div className="notification-dialog-content">
          <div className="list-item">
            <p>{notificationDetails?.description?.day}</p>
            <p>
              <strong>
                {moment(
                  notificationDetails?.description?.date,
                  "DD/MM/YYYY"
                ).format("Do MMM YYYY")}
              </strong>
            </p>
          </div>
          <div className="list-item">
            <p>Shift Type</p>
            <p>
              <strong>{notificationDetails?.description?.shiftType}</strong>
            </p>
          </div>
          <div className="list-item">
            <p>Timing</p>
            <p>
              <strong>
                {notificationDetails?.description?.fromTime +
                  " to " +
                  notificationDetails?.description?.toTime}
              </strong>
            </p>
          </div>
          <div className="list-item">
            <p>Break</p>
            <p>
              <strong>{notificationDetails?.description?.breakTime}</strong>
            </p>
          </div>
          <div className="list-item">
            <p>Assigned to</p>
            <p>
              <strong>{notificationDetails?.description?.assignedTo}</strong>
            </p>
          </div>
          <div>
            <p>
              <strong>Note</strong>
            </p>
            <p>{notificationDetails?.description?.notes}</p>
          </div>
          <div className="notification-accept">
            <p>{notificationDetails?.message}</p>
          </div>
        </div>
        <div className="alert-action">
          <Button className="btn-primary" onClick={onClose}>
            OK
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
