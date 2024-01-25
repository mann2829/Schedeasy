import React from "react";
import { TextField, Button } from "@mui/material";
import Textarea from '@mui/joy/Textarea';
import "./../../assets/css/style.css";
import LoginImg from "../../assets/img/login-img.png";
import Logo from "../../assets/img/logo.png";
import Link from '@mui/material/Link';
import { InputLabel } from '@mui/material';
import { useNavigate } from "react-router-dom";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const Registration = () => {
    const history = useNavigate();
    const redirectToPage = (pageName) => {
        history(`/${pageName}`);
      };
    

return(
    <>
    <div className="login-sec registration-sec">
        <div className="login-form">
           <div className="logo">
             <img src={Logo} alt="logo"/>
             <h2>Register <span>As A Employer</span></h2>
           </div>
           <div className="form">
              <div className="form-group">
                <TextField
                  label="Full Name"
                  className="form-control"
                  id="filled-hidden-label-normal"
                  placeholder="John doe"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                />
              </div>
              <div className="form-group">
                <TextField
                  label="Contact Details"
                  className="form-control"
                  variant="outlined"
                  placeholder="Contact Details" 
                  InputLabelProps={{ shrink: true }}       
                />
              </div>
              <div className="form-group">
                <TextField
                  label="Email Id"
                  className="form-control"
                  variant="outlined"
                  placeholder="Email Id"
                  InputLabelProps={{ shrink: true }}        
                />
              </div>
              <div className="form-group">
                <TextField
                  label="Branch Name"
                  className="form-control"
                  variant="outlined"
                  placeholder="Branch Name"   
                  InputLabelProps={{ shrink: true }}     
                />
              </div>
              <div className="form-group">
                <InputLabel>Business Type</InputLabel>
                <Select
                    label="Business Type"
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    defaultValue={10}
                    IconComponent={ExpandMoreIcon}
                    className="CSelect"
                    InputLabelProps={{ shrink: true }}
                    >
                    <MenuItem value={10}>Restaurent</MenuItem>
                    <MenuItem value={20}>School</MenuItem>
                    <MenuItem value={30}>Merchant</MenuItem>
                </Select>
              </div>
              <div className="form-group">
                <TextField
                  label="NIP Number"
                  className="form-control"
                  variant="outlined"
                  placeholder="NIP Number"  
                  InputLabelProps={{ shrink: true }}      
                />
              </div>
              <div className="form-group">
                <InputLabel>Address</InputLabel>
                <Textarea 
                  minRows={3} 
                  placeholder="Address" 
                  />
              </div>
              <div className="form-group">
                <TextField
                  label="Location from Maps"
                  className="form-control"
                  variant="outlined"
                  placeholder="Location Link" 
                  InputLabelProps={{ shrink: true }}       
                />
              </div>
              <div className="form-group">
                <Button type="primary" sx={{mt:1}}className="btn-primary">
                  Login
                </Button>
              </div>
           </div>
           <div className="acc-link">
              <p>Already have an account? <Link onClick={() => redirectToPage("")}>Login</Link></p>
           </div> 
        </div>
        <div className="login-right">
           <div>
             <img src={LoginImg}/>
            </div>
        </div>
        <></>
      </div>
    </>
    );
};

export default Registration;