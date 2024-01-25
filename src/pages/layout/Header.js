import React from "react";
import Button from "@mui/material/Button";
import Logo from "../../assets/img/logo.png";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CDropdown from "../../common/CDropdown";
import Notification from "../../common/notification";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [age, setAge] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const history = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const redirectToDashboard = () => {
    history("/dashboard");
  };

  return (
    <div className="header">
      <div className="logo-img" onClick={() => redirectToDashboard()}>
        <img src={Logo} alt="logo" />
      </div>
      <div className="header-right">
        <div className="select-branch">
          <InputLabel id="label">Branch</InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            defaultValue={10}
            IconComponent={ExpandMoreIcon}
          >
            <MenuItem value={10}>LA</MenuItem>
          </Select>
        </div>
        <div className="notification-icon">
          <Notification></Notification>
        </div>
        <div>
          <CDropdown />
        </div>
      </div>
    </div>
  );
};

export default Header;
