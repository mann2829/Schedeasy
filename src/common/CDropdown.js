import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ProfileImg from "../assets/img/event-profile1.png";
// import {ReactComponent as SampleAvtar} from "../assets/img/avtar.svg";
import SampleAvtar from "../../src/assets/img/avtar.png";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../slices/AuthSlice";
import { useDispatch, useSelector } from "react-redux";

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useNavigate();
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);
  const { profileDetails } = useSelector((state) => state?.profile);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const redirectToProfile = () => {
    history("/profile");
    setAnchorEl(null);
  };
  const handleLogout = () => {
    dispatch(logoutUser()).then((res) => {
      if (!res.error) {
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        window.location.href = "/";
      }
    });
  };

  const handleChangePassword = () => {
    history("/changepassword");
    setAnchorEl(null);
  };

  return (
    <div className="header-profile">
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        <span className="profile-img">
          <img
            src={
              !profileDetails?.profilePicture
                ? SampleAvtar
                : profileDetails?.profilePicture
            }
          />
        </span>{" "}
        {profileDetails?.name}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={redirectToProfile}>Profile</MenuItem>
        {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
        <MenuItem onClick={handleChangePassword}>Change Password</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
