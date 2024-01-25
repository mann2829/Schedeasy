import { Button, Dialog, MenuItem, Select, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { DialogContent } from "@mui/joy";

export const CDeleteDialog = ({
  description,
  onClose,
  showDeletePopup,
  onDelete,
  warningImg,
  closeIcon,
}) => {
  return (
    <Dialog open={showDeletePopup} className="CDialog dialog-delete">
      <DialogContent>
        <div className="dialog-heading">
          <h3></h3>
          <Button onClick={onClose} className="closeBtn">
            {closeIcon}
          </Button>
        </div>
        <div className="dialog-delete-content">
          <img src={warningImg} alt="img" />
          <h3>Alert</h3>
          <p>{description}</p>
          <div className="alert-action">
            <Button className="btn-thin-primary" onClick={onClose}>
              No
            </Button>
            <Button className="btn-primary" onClick={onDelete}>
              Yes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
