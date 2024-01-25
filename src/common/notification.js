import * as React from "react";
import { Button, Dialog, MenuItem, Select, TextField } from "@mui/material";
import Menu from "@mui/material/Menu";
import Fade from "@mui/material/Fade";
import { ReactComponent as NotificationIcon } from "../assets/img/notification-icon.svg";
import { ReactComponent as CloseIcon } from "../assets/img/close-icon.svg";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RepeatIcon from "../assets/img/repeat-icon.png";
import { CNotificationDialog } from "./CNotificationDialog";
import {
  fetchAllNotifications,
  fetchNotificationById,
  clearAllNotification,
  seeNotification,
  getNotificationCount,
} from "./../slices/NotificationSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Badge from "@mui/material/Badge";
import { useNavigate } from "react-router-dom";
import moment from "moment";

export const Notification = ({ title, onClose, mode, id, showPopup }) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isCollapse, setIsCollapse] = React.useState(true);
  const API_INTERVAL = process.env.REACT_APP_NOTIFICATION_API_TIMEOUT * 1000;

  const { notificationList, notificationDetails, notificationCount } =
    useSelector((state) => state?.notification);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    dispatch(fetchAllNotifications());
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [showNotifyPopup, setShowNotifyPopup] = React.useState({
    show: false,
    id: null,
    mode: "",
  });

  const openNotifyPopup = (id) => {
    setShowNotifyPopup({
      show: true,
      id: "",
      mode: "",
    });
    setAnchorEl(null);
    dispatch(fetchNotificationById(id)).then((res) => {
      if (!res.error) {
        dispatch(getNotificationCount());
      }
    });
  };

  const [notificationData, setNotificationData] = React.useState([]);

  useEffect(() => {
    dispatch(getNotificationCount());
    const interval = setInterval(() => {
      dispatch(getNotificationCount());
    }, API_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setNotificationData(notificationList);
  }, [notificationList]);

  const clearAllNotificationHandle = () => {
    dispatch(clearAllNotification()).then((res) => {
      if (!res.error) {
        dispatch(fetchAllNotifications());
        dispatch(getNotificationCount());
      }
    });
  };

  const seeNotificationHandle = (notiId) => {
    const data = {
      id: notiId,
    };
    dispatch(seeNotification(data)).then((res) => {
      if (!res.error) {
      }
    });
  };

  const redirectToMoreNotification = () => {
    history("/notifications");
    handleClose();
  };

  return (
    <>
      {showNotifyPopup.show && (
        <CNotificationDialog
          description={"Are you sure you want to delete this Shift?"}
          showNotifyPopup={showNotifyPopup.show}
          onClose={() => setShowNotifyPopup({ show: false, id: null })}
          notificationDetails={notificationDetails}
          mode={showNotifyPopup.mode}
          closeIcon={<CloseIcon />}
        />
      )}
      <div>
        <Button
          id="fade-button"
          aria-controls={open ? "fade-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <Badge badgeContent={notificationCount} color="primary">
            <NotificationIcon />
          </Badge>
        </Button>
        <Menu
          id="fade-menu"
          MenuListProps={{
            "aria-labelledby": "fade-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
          className="notification-popup"
        >
          <div className="notification-content">
            <div className="notification-heading">
              <h3>Notifications</h3>
              {notificationData.length > 0 && (
                <Button
                  onClick={() => {
                    clearAllNotificationHandle();
                    handleClose();
                  }}
                >
                  Mark as read
                </Button>
              )}
            </div>
            {notificationData.length > 0 && (
              <div className="notification-list">
                {notificationData?.map((item) => {
                  return (
                    <div
                      className="box"
                      id={item.seenAdmin ? "" : "noti-status"}
                    >
                      <span
                        className={
                          item.title === "Swap" ? "noti-title1" : "noti-title2"
                        }
                      >
                        {item.title} Shift
                      </span>
                      <p>
                        {item?.description?.acceptBy} accepted{" "}
                        {item?.description?.assignedTo}’s{" "}
                        {item?.description?.day} {item?.description?.shiftType}{" "}
                        shift from {item?.description?.fromTime} to{" "}
                        {item?.description?.toTime} on {item?.description?.date}
                      </p>
                      <span className="textDay">
                        {moment
                          .utc(item.createdAt)
                          .local()
                          .format("DD/MM/YYYY, hh:mm A")}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            {notificationData.length === 0 && (
              <div className="schedule-table-no-data">
                <p>No notifications</p>
              </div>
            )}
            <div className="notification-see-more">
              {notificationData.length > 0 && (
                <Button
                  onClick={() => {
                    redirectToMoreNotification();
                  }}
                  className=" btn-primary"
                >
                  View All
                </Button>
              )}
            </div>
          </div>
        </Menu>

        <Dialog
          open={showPopup}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className="repeatModal"
        >
          <div className="confirmation_modal" role="document">
            <div className="modal-content">
              <div className="userPopup fullWidth">
                <div className="dialog-heading">
                  <h3></h3>
                  <Button
                    onClick={onClose}
                    className="closeBtn"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <CloseIcon />
                  </Button>
                </div>
                <div className="form-content holiday-add-form">
                  <img src={RepeatIcon} />
                  <h4>{title}</h4>
                  <p>
                    This button will help you repeat the same shift schedule{" "}
                    <br />
                    for the next week or this entire month.
                  </p>
                  <div className="form-group">
                    <Select
                      //value={Number(values.jobCategoryId)}
                      //   onChange={(e) =>
                      //     handleChange("jobCategoryId", e.target.value)
                      //   }
                      className="form-select"
                      IconComponent={ExpandMoreIcon}
                    >
                      <MenuItem key={1} value={"None"}>
                        None
                      </MenuItem>
                      <MenuItem key={2} value={"Next Week"}>
                        Next Week
                      </MenuItem>
                      <MenuItem key={3} value={"This Month"}>
                        This Month
                      </MenuItem>
                    </Select>
                  </div>
                  <Button className="btn-primary" onClick={onClose}>
                    submit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Dialog>
      </div>
    </>
  );
};

export default Notification;
