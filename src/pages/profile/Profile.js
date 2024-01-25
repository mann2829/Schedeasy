import React, { useEffect, useState } from "react";
import CAccordion from "../../common/CAccordion";
import { TextField, InputLabel } from "@mui/material";
import Grid from "@mui/material/Grid";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ReactComponent as DatePickerIcon } from "../../assets/img/date-picker.svg";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { pageMode } from "../../common/appConstants";
import employeeValidator from "../../common/validators/employeeValidator";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import useForm from "../../common/useForm";
import { getProfileById, updateProfile } from "../../slices/ProfileSlice";
import { fetchAllJobs } from "../../slices/JobsSlice";
import dayjs from "dayjs";
import moment from "moment";
import { Button } from "@mui/joy";
import CImageUpload from "./../../common/CImageUpload";
import Textarea from "@mui/joy/Textarea";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import profileValidator from "../../common/validators/profileValidator";
import CLoader from "../../common/CLoader";

const Profile = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const url = useLocation();
  const [mode, setMode] = useState(
    url.pathname.includes("new")
      ? pageMode.ADD
      : url.pathname.includes("view")
      ? pageMode.VIEW
      : pageMode.EDIT
  );
  const { empId } = useParams();
  const { profileDetails, isProfileLoading } = useSelector(
    (state) => state?.profile
  );
  const [openingTime, setOpeningTime] = useState();
  const [closingTime, setClosingTime] = useState();
  const [searchResult, setSearchResult] = useState("");
  const [dateFormat, setDateFormat] = useState(moment().format("YYYY-MM-DD"));
  const [profileImageChanged, setProfileImageChanged] = useState(false);
  const [isPlaceSelected, setIsPlaceSelected] = useState(false);
  const [latcoor, setLatcoor] = useState(0);
  const [longcoor, setLongcoor] = useState(0);
  const [formattedAddress, setFormattedAddress] = useState();
  const libraries = ["places"];
  const { values, errors, handleChange, handleSubmit, initializeValues } =
    useForm(onNext, validationError, profileValidator);
  function validationError() {}
  function onNext() {
    formatFormData();
  }

  const formatFormData = () => {
    const data = new FormData();
    values.name
      ? data.append("personalDetails[name]", values.name)
      : data.append("personalDetails[name]", "");
    values.phoneNo
      ? data.append("personalDetails[phoneNo]", values.phoneNo)
      : data.append("personalDetails[phoneNo]", "");
    values.email
      ? data.append("personalDetails[email]", values.email)
      : data.append("personalDetails[email]", "");
    values.nipNumber
      ? data.append("personalDetails[nipNumber]", values.nipNumber)
      : data.append("personalDetails[nipNumber]", "");
    profileImageChanged && data.append("profilePicture", values.profileImg);
    values.branchAddress
      ? data.append("branchAddress", values.branchAddress)
      : data.append("branchAddress", "");
    values.branchName
      ? data.append("branchName", values.branchName)
      : data.append("branchName", "");
    values.branchType
      ? data.append("branchType", values.branchType)
      : data.append("branchType", "");
    values.closingTime
      ? data.append("closingTime", values.closingTime)
      : data.append("closingTime", "");
    values.openingTime
      ? data.append("openingTime", values.openingTime)
      : data.append("openingTime", "");
    values.latitude && data.append("latitude", values.latitude);
    values.longitude && data.append("longitude", values.longitude);
    dispatch(
      updateProfile({
        payload: data,
      })
    ).then((res) => {
      if (!res.error) {
        history(`/dashboard`);
        dispatch(getProfileById()).then((res) => {
          if (!res.error) {
            localStorage.setItem("profileImg", profileDetails?.profilePicture);
          }
        });
      }
    });
  };

  const formatValuesHandle = (key) => {
    let formattedValue = dayjs(
      dateFormat +
        "T" +
        dayjs("1/1/1" + " " + profileDetails?.[key]).format("HH:mm")
    );
    return formattedValue;
  };

  useEffect(() => {
    dispatch(getProfileById());
  }, []);

  useEffect(() => {
    profileDetails && initializeValues(profileDetails);
    setOpeningTime(formatValuesHandle("openingTime"));
    setClosingTime(formatValuesHandle("closingTime"));
    handleChange("mapAddress", profileDetails?.branchAddress);
  }, [profileDetails]);

  useEffect(() => {
    handleChange("branchAddress", formattedAddress);
  }, [formattedAddress]);

  useEffect(() => {
    handleChange("latitude", latcoor);
    handleChange("longitude", longcoor);
  }, [latcoor, longcoor]);

  const redirectToDashboard = () => {
    history("/dashboard");
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCRcctw1jRTvkURpzgBiVkQAXrmEDcKefk",
    libraries,
  });

  const onLoadAutocomplete = (autocomplete) => {
    setSearchResult(autocomplete);
  };

  const handlePlaceChanged = () => {
    if (searchResult != null) {
      setIsPlaceSelected(true);
    }
    const place = searchResult.getPlace();
    if (searchResult == null) {
      return;
    }
    if (place) {
      //console.log("Places selected")

      console.log(place);
      setLatcoor(place.geometry.location.lat());
      setLongcoor(place.geometry.location.lng());
      setFormattedAddress(place.formatted_address);
    }
  };

  return isLoaded ? (
    <>
      <CLoader show={isProfileLoading} />
      <div className="profile-container">
        <div>
          <h2>Profile</h2>
        </div>
        <div className="card-box">
          <div className="form-content">
            <Grid container spacing={2}>
              <Grid item xs={12} className="profile-upload">
                <div className="form-group">
                  <CImageUpload
                    multiple={false}
                    onImageUpload={async (img) => {
                      if (img.length === 0) {
                        handleChange("profilePicture", "");
                        setProfileImageChanged(true);
                      } else {
                        handleChange("profilePicture", img[0].data_url);
                        handleChange("profileImg", img[0].file);
                        setProfileImageChanged(true);
                      }
                    }}
                    images={
                      values.profilePicture
                        ? [{ data_url: values.profilePicture }]
                        : []
                    }
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className="form-group">
                  <TextField
                    label="Full Name"
                    placeholder="Full Name"
                    onChange={(e) => handleChange("name", e.target.value)}
                    disabled={mode === pageMode.VIEW ? true : false}
                    value={values.name}
                    error={!!errors.name}
                    helperText={errors.name}
                    required
                    InputLabelProps={{ shrink: true }}
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className="form-group">
                  <TextField
                    label="Contact Number"
                    placeholder="Contact Number"
                    onChange={(e) => handleChange("phoneNo", e.target.value)}
                    disabled={mode === pageMode.VIEW ? true : false}
                    value={values.phoneNo}
                    error={!!errors.phoneNo}
                    helperText={errors.phoneNo}
                    InputLabelProps={{ shrink: true }}
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className="form-group">
                  <TextField
                    label="Email ID"
                    placeholder="Email ID"
                    required
                    onChange={(e) => handleChange("email", e.target.value)}
                    disabled={mode === pageMode.VIEW ? true : false}
                    value={values.email}
                    error={!!errors.email}
                    helperText={errors.email}
                    InputLabelProps={{ shrink: true }}
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className="form-group">
                  <TextField
                    label="Branch Name"
                    placeholder="Branch Name"
                    onChange={(e) => handleChange("branchName", e.target.value)}
                    disabled={mode === pageMode.VIEW ? true : false}
                    value={values.branchName}
                    error={!!errors.branchName}
                    helperText={errors.branchName}
                    InputLabelProps={{ shrink: true }}
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className="form-group">
                  <TextField
                    label="Business Type"
                    placeholder="Business Type"
                    onChange={(e) => handleChange("branchType", e.target.value)}
                    disabled={mode === pageMode.VIEW ? true : false}
                    value={values.branchType}
                    error={!!errors.branchType}
                    helperText={errors.branchType}
                    InputLabelProps={{ shrink: true }}
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className="form-group">
                  <TextField
                    label="NIP Number"
                    placeholder="NIP Number"
                    onChange={(e) => handleChange("nipNumber", e.target.value)}
                    required
                    disabled={mode === pageMode.VIEW ? true : false}
                    value={values.nipNumber}
                    error={!!errors.nipNumber}
                    helperText={errors.nipNumber}
                    InputLabelProps={{ shrink: true }}
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className="form-group">
                  <Autocomplete
                    onLoad={onLoadAutocomplete}
                    onPlaceChanged={handlePlaceChanged}
                  >
                    <TextField
                      label="Google Maps"
                      type="text"
                      className="form-control"
                      placeholder="Enter Location"
                      required
                      onChange={(e) =>
                        handleChange("mapAddress", e.target.value)
                      }
                      onBlur={() => setIsPlaceSelected(true)}
                      {...(isPlaceSelected === false && {
                        value: values.mapAddress,
                      })}
                      error={!!errors.mapAddress}
                      helperText={errors.mapAddress}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Autocomplete>
                  {/* <InputLabel>Address</InputLabel>
                  <Textarea
                    label="Address"
                    placeholder="Address"
                    onChange={(e) => handleChange("address", e.target.value)}
                    disabled={mode === pageMode.VIEW ? true : false}
                    value={values.address}
                    error={!!errors.address}
                    helperText={errors.address}
                    InputLabelProps={{ shrink: true }}
                    minRows={3}
                  /> */}
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className="form-group">
                  <TextField
                    label="Address"
                    placeholder="Address"
                    onChange={(e) =>
                      handleChange("branchAddress", e.target.value)
                    }
                    disabled={mode === pageMode.VIEW ? true : false}
                    value={
                      values.branchAddress
                        ? values.branchAddress
                        : formattedAddress
                    }
                    error={!!errors.branchAddress}
                    helperText={errors.branchAddress}
                    InputLabelProps={{ shrink: true }}
                  />
                </div>
              </Grid>
              <Grid item xs={3}>
                <div className="form-group adapter_time">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      label="Branch Opening Time"
                      value={openingTime}
                      onChange={(newValue) => {
                        setOpeningTime(newValue);
                        handleChange(
                          "openingTime",
                          moment(newValue?.$d, "HH:mm:ss").format("hh:mm A")
                        );
                      }}
                      slotProps={{
                        textField: {
                          variant: "outlined",
                          required: true,
                          error: !!errors.openingTime,
                          helperText: errors.openingTime,
                        },
                      }}
                    />
                  </LocalizationProvider>
                </div>
              </Grid>
              <Grid item xs={3}>
                <div className="form-group adapter_time">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      label="Branch Closing Time"
                      value={closingTime}
                      onChange={(newValue) => {
                        setClosingTime(newValue);
                        handleChange(
                          "closingTime",
                          moment(newValue?.$d, "HH:mm:ss").format("hh:mm A")
                        );
                      }}
                      slotProps={{
                        textField: {
                          variant: "outlined",
                          required: true,
                          error: !!errors.closingTime,
                          helperText: errors.closingTime,
                        },
                      }}
                    />
                  </LocalizationProvider>
                </div>
              </Grid>
            </Grid>
          </div>
          <div className="save-rate">
            <Button className="btn-thin-primary" onClick={redirectToDashboard}>
              Cancel
            </Button>
            {mode !== pageMode.VIEW && (
              <Button className="btn-primary" onClick={handleSubmit}>
                Update
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  ) : (
    <></>
  );
};
export default Profile;
