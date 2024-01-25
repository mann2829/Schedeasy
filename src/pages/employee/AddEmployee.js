import React, { useEffect, useState } from "react";
import CAccordion from "../../common/CAccordion";
import { TextField, InputLabel } from "@mui/material";
import Grid from "@mui/material/Grid";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ReactComponent as DatePickerIcon } from "../../assets/img/date-picker.svg";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { pageMode } from "../../common/appConstants";
import employeeValidator from "../../common/validators/employeeValidator";
import useForm from "../../common/useForm";
import {
  addEmployee,
  fetchEmployeeById,
  updateEmployee,
} from "../../slices/EmployeeSlice";
import { fetchAllJobs } from "../../slices/JobsSlice";
import dayjs from "dayjs";
import moment from "moment";
import { Button, FormHelperText } from "@mui/joy";
import CLoader from "../../common/CLoader";

const AddEmployee = () => {
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
  const { employeeDetails, isEmployeeLoading } = useSelector(
    (state) => state?.employees
  );
  const { empId } = useParams();
  const { jobList } = useSelector((state) => state?.jobs);
  const [jobsData, setJobsData] = useState();
  const [birthDate, setBirthDate] = useState(null);
  const [joiningDate, setJoiningDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const { values, errors, handleChange, handleSubmit, initializeValues } =
    useForm(onNext, validationError, employeeValidator);
  function validationError() {}
  function onNext() {
    formatFormData();
    // const payload = {
    //   personalDetails: {
    //     name: values.name,
    //     email: values.email,
    //     phoneNo: values.phoneNo,
    //     birthDate: values.birthDate,
    //     address: values.address,
    //     gender: values.gender,
    //   },
    //   emergencyDetails: {
    //     contactName: values.contactName,
    //     contactEmail: values.contactEmail,
    //     contactNumber: values.contactNumber,
    //     relation: values.relation,
    //     contactAddress: values.contactAddress,
    //   },
    //   professionalDetails: {
    //     jobCategoryId: values.jobCategoryId,
    //     joiningDate: values.joiningDate,
    //     endDate: values.endDate,
    //     employeeStatus: values.employeeStatus,
    //     baseSalary: values.baseSalary,
    //     salaryType: values.salaryType,
    //     accountNo: values.accountNo,
    //   },
    // };
    // mode !== pageMode.EDIT
    //   ? dispatch(addEmployee(payload)).then((res) => {
    //       if (!res.error) {
    //         history("/employee");
    //       }
    //     })
    //   : dispatch(updateEmployee({ id: empId, payload: payload })).then(
    //       (res) => {
    //         if (!res.error) {
    //           history("/employee");
    //         }
    //       }
    //     );
  }

  const formatFormData = () => {
    const payload = new FormData();
    values.name && payload.append("personalDetails[name]", values.name);
    values.email && payload.append("personalDetails[email]", values.email);
    values.phoneNo &&
      payload.append("personalDetails[phoneNo]", values.phoneNo);
    values.birthDate &&
      payload.append("personalDetails[birthDate]", values.birthDate);
    values.address &&
      payload.append("personalDetails[address]", values.address);
    values.gender && payload.append("personalDetails[gender]", values.gender);
    values.contactName &&
      payload.append("emergencyDetails[contactName]", values.contactName);
    values.contactEmail &&
      payload.append("emergencyDetails[contactEmail]", values.contactEmail);
    values.contactNumber &&
      payload.append("emergencyDetails[contactNumber]", values.contactNumber);
    values.relation &&
      payload.append("emergencyDetails[relation]", values.relation);
    values.contactAddress &&
      payload.append("emergencyDetails[contactAddress]", values.contactAddress);
    values.jobCategoryId &&
      payload.append(
        "professionalDetails[jobCategoryId]",
        values.jobCategoryId
      );
    values.joiningDate &&
      payload.append("professionalDetails[joiningDate]", values.joiningDate);
    values.endDate &&
      payload.append("professionalDetails[endDate]", values.endDate);
    values.employeeStatus &&
      payload.append(
        "professionalDetails[employeeStatus]",
        values.employeeStatus
      );
    values.baseSalary &&
      payload.append("professionalDetails[baseSalary]", values.baseSalary);
    values.salaryType &&
      payload.append("professionalDetails[salaryType]", values.salaryType);
    values.accountNo &&
      payload.append("professionalDetails[accountNo]", values.accountNo);

    mode !== pageMode.EDIT
      ? dispatch(addEmployee(payload)).then((res) => {
          if (!res.error) {
            history("/employee");
          }
        })
      : dispatch(updateEmployee({ id: empId, payload: payload })).then(
          (res) => {
            if (!res.error) {
              history("/employee");
            }
          }
        );
  };

  useEffect(() => {
    dispatch(fetchAllJobs());
  }, []);

  useEffect(() => {
    empId && dispatch(fetchEmployeeById(empId));
  }, []);

  useEffect(() => {
    if (mode === pageMode.EDIT || mode === pageMode.VIEW) {
      employeeDetails && initializeValues(employeeDetails);
    }
  }, [employeeDetails]);

  useEffect(() => {
    setJobsData(jobList);
  }, [jobList]);

  const redirectToEmployee = () => {
    history("/employee");
  };

  const setDefaultBaseSalary = (jobId) => {
    jobsData?.map((item) => {
      if (item.id === jobId) {
        handleChange("baseSalary", item.jobBaseSalary);
        handleChange("salaryType", "Hour");
      }
    });
  };

  return (
    <>
      <CLoader show={isEmployeeLoading} />
      <div className="main-container">
        <div>
          <h2>
            {mode === pageMode.ADD
              ? "Add Employee"
              : mode === pageMode.VIEW
              ? "View Employee"
              : "Edit Employee"}
          </h2>
        </div>
        <div className="card-box">
          <CAccordion title="Personal Details" className="add-employee-form">
            <div className="form-content">
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <div className="form-group">
                    <TextField
                      label="Full Name"
                      placeholder="Full Name"
                      onChange={(e) => handleChange("name", e.target.value)}
                      required
                      disabled={mode === pageMode.VIEW ? true : false}
                      value={values.name}
                      error={!!errors.name}
                      helperText={errors.name}
                      InputLabelProps={{ shrink: true }}
                    />
                  </div>
                </Grid>
                <Grid item xs={4}>
                  <div className="form-group">
                    <TextField
                      label="Email ID"
                      placeholder="Email ID"
                      onChange={(e) => handleChange("email", e.target.value)}
                      required
                      disabled={mode === pageMode.VIEW ? true : false}
                      value={values.email}
                      error={!!errors.email}
                      helperText={errors.email}
                      InputLabelProps={{ shrink: true }}
                    />
                  </div>
                </Grid>
                <Grid item xs={4}>
                  <div className="form-group">
                    <TextField
                      label="Contact Number"
                      placeholder="Contact Number"
                      onChange={(e) => handleChange("phoneNo", e.target.value)}
                      required
                      disabled={mode === pageMode.VIEW ? true : false}
                      value={values.phoneNo}
                      error={!!errors.phoneNo}
                      helperText={errors.phoneNo}
                      InputLabelProps={{ shrink: true }}
                    />
                  </div>
                </Grid>
                <Grid item xs={4}>
                  <div className="form-group">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        slots={{
                          openPickerIcon: DatePickerIcon,
                        }}
                        label="Birth Date"
                        format="DD/MM/YYYY"
                        value={
                          mode === pageMode.EDIT
                            ? dayjs(
                                moment(values?.birthDate, "DD/MM/YYYY").format(
                                  "YYYY-MM-DD"
                                )
                              )
                            : mode === pageMode.VIEW
                            ? dayjs(
                                moment(values?.birthDate, "DD/MM/YYYY").format(
                                  "YYYY-MM-DD"
                                )
                              )
                            : birthDate
                        }
                        onChange={(newValue) => {
                          setBirthDate(newValue);
                          handleChange(
                            "birthDate",
                            moment(newValue?.$d).format("DD/MM/YYYY")
                          );
                        }}
                        disableFuture
                        disabled={mode === pageMode.VIEW ? true : false}
                        renderInput={(params) => {
                          <TextField
                            {...params}
                            error={!!errors.birthDate}
                            helperText={errors.birthDate}
                          />;
                        }}
                      />
                    </LocalizationProvider>
                  </div>
                </Grid>
                <Grid item xs={8}>
                  <div className="form-group">
                    <TextField
                      label="Address"
                      placeholder="Address"
                      onChange={(e) => handleChange("address", e.target.value)}
                      disabled={mode === pageMode.VIEW ? true : false}
                      value={values.address}
                      error={!!errors.address}
                      helperText={errors.address}
                      InputLabelProps={{ shrink: true }}
                    />
                  </div>
                </Grid>
                <Grid item xs={4}>
                  <div className="form-group">
                    <FormLabel id="gender-radio-label" required>
                      Gender
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby="gender-radio-label"
                      name="radio-buttons-group"
                      value={String(values.gender)}
                      onChange={(e) => handleChange("gender", e.target.value)}
                    >
                      <FormControlLabel
                        value="Female"
                        control={<Radio />}
                        label="Female"
                        disabled={mode === pageMode.VIEW ? true : false}
                      />
                      <FormControlLabel
                        value="Male"
                        control={<Radio />}
                        label="Male"
                        disabled={mode === pageMode.VIEW ? true : false}
                      />
                      <FormControlLabel
                        value="Other"
                        control={<Radio />}
                        label="Other"
                        disabled={mode === pageMode.VIEW ? true : false}
                      />
                    </RadioGroup>
                    <FormHelperText>{errors.gender}</FormHelperText>
                  </div>
                </Grid>
              </Grid>
            </div>
          </CAccordion>
        </div>
        <div className="card-box">
          <CAccordion title="Emergency Contact Details">
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <div className="form-group">
                  <TextField
                    label="Emergency Contact Name"
                    placeholder="Contact Name"
                    onChange={(e) =>
                      handleChange("contactName", e.target.value)
                    }
                    disabled={mode === pageMode.VIEW ? true : false}
                    value={values.contactName}
                    error={!!errors.contactName}
                    helperText={errors.contactName}
                    InputLabelProps={{ shrink: true }}
                  />
                </div>
              </Grid>
              <Grid item xs={4}>
                <div className="form-group">
                  <TextField
                    label="Emergency Contact Email"
                    placeholder="Contact Email"
                    onChange={(e) =>
                      handleChange("contactEmail", e.target.value)
                    }
                    disabled={mode === pageMode.VIEW ? true : false}
                    value={values.contactEmail}
                    error={!!errors.contactEmail}
                    helperText={errors.contactEmail}
                    InputLabelProps={{ shrink: true }}
                  />
                </div>
              </Grid>
              <Grid item xs={4}>
                <div className="form-group">
                  <TextField
                    label="Emergency Contact Number"
                    placeholder="Contact Number"
                    onChange={(e) =>
                      handleChange("contactNumber", e.target.value)
                    }
                    disabled={mode === pageMode.VIEW ? true : false}
                    value={values.contactNumber}
                    error={!!errors.contactNumber}
                    helperText={errors.contactNumber}
                    InputLabelProps={{ shrink: true }}
                  />
                </div>
              </Grid>
              <Grid item xs={4}>
                <div className="form-group">
                  <TextField
                    label="Relationship"
                    placeholder="Relationship"
                    onChange={(e) => handleChange("relation", e.target.value)}
                    disabled={mode === pageMode.VIEW ? true : false}
                    value={values.relation}
                    error={!!errors.relation}
                    helperText={errors.relation}
                    InputLabelProps={{ shrink: true }}
                  />
                </div>
              </Grid>
              <Grid item xs={8}>
                <div className="form-group">
                  <TextField
                    label="Emergency Contact Full Address"
                    placeholder="Address"
                    onChange={(e) =>
                      handleChange("contactAddress", e.target.value)
                    }
                    disabled={mode === pageMode.VIEW ? true : false}
                    value={values.contactAddress}
                    error={!!errors.contactAddress}
                    helperText={errors.contactAddress}
                    InputLabelProps={{ shrink: true }}
                  />
                </div>
              </Grid>
            </Grid>
          </CAccordion>
        </div>
        <div className="card-box">
          <CAccordion title="Professional Details">
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <div className="form-group">
                  <TextField
                    label="Employee ID"
                    placeholder="ID"
                    disabled={mode === pageMode.VIEW ? true : false}
                  />
                </div>
              </Grid>
              <Grid item xs={4}>
                <div className="form-group">
                  <InputLabel required>Job Title</InputLabel>
                  <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    value={Number(values.jobCategoryId)}
                    onChange={(e) => {
                      handleChange("jobCategoryId", e.target.value);
                      setDefaultBaseSalary(e.target.value);
                    }}
                    disabled={mode === pageMode.VIEW ? true : false}
                    IconComponent={ExpandMoreIcon}
                    className="CSelect"
                  >
                    {jobsData?.map((item, index) => (
                      <MenuItem key={index} value={item.id}>
                        {item.categoryName}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{errors.jobCategoryId}</FormHelperText>
                </div>
              </Grid>
              <Grid item xs={4}></Grid>
              <Grid item xs={4}>
                <div className="form-group">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      slots={{
                        openPickerIcon: DatePickerIcon,
                      }}
                      label="Date of Joining"
                      format="DD/MM/YYYY"
                      value={
                        mode === pageMode.EDIT
                          ? dayjs(
                              moment(values?.joiningDate, "DD/MM/YYYY").format(
                                "YYYY-MM-DD"
                              )
                            )
                          : mode === pageMode.VIEW
                          ? dayjs(
                              moment(values?.joiningDate, "DD/MM/YYYY").format(
                                "YYYY-MM-DD"
                              )
                            )
                          : joiningDate
                      }
                      onChange={(newValue) => {
                        setJoiningDate(newValue);
                        handleChange(
                          "joiningDate",
                          moment(newValue?.$d).format("DD/MM/YYYY")
                        );
                      }}
                      disabled={mode === pageMode.VIEW ? true : false}
                      slotProps={{
                        textField: {
                          variant: "outlined",
                          required: true,
                          error: !!errors.joiningDate,
                          helperText: errors.joiningDate,
                        },
                      }}
                    />
                  </LocalizationProvider>
                </div>
              </Grid>
              <Grid item xs={4}>
                <div className="form-group">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      slots={{
                        openPickerIcon: DatePickerIcon,
                      }}
                      label="End Date (if Applicable)"
                      format="DD/MM/YYYY"
                      value={
                        mode === pageMode.EDIT
                          ? dayjs(
                              moment(values?.endDate, "DD/MM/YYYY").format(
                                "YYYY-MM-DD"
                              )
                            )
                          : mode === pageMode.VIEW
                          ? dayjs(
                              moment(values?.endDate, "DD/MM/YYYY").format(
                                "YYYY-MM-DD"
                              )
                            )
                          : endDate
                      }
                      onChange={(newValue) => {
                        setEndDate(newValue);
                        handleChange(
                          "endDate",
                          moment(newValue?.$d).format("DD/MM/YYYY")
                        );
                      }}
                      disabled={mode === pageMode.VIEW ? true : false}
                      renderInput={(params) => {
                        <TextField
                          {...params}
                          error={!!errors.endDate}
                          helperText={errors.endDate}
                        />;
                      }}
                    />
                  </LocalizationProvider>
                </div>
              </Grid>
              <Grid item xs={4}></Grid>
              <Grid item xs={4}>
                <div className="form-group">
                  <InputLabel required>Employee Status</InputLabel>
                  <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    IconComponent={ExpandMoreIcon}
                    className="CSelect"
                    value={String(values.employeeStatus)}
                    onChange={(e) =>
                      handleChange("employeeStatus", e.target.value)
                    }
                    disabled={mode === pageMode.VIEW ? true : false}
                  >
                    <MenuItem value={"Full Time"}>Full Time</MenuItem>
                    <MenuItem value={"Part Time"}>Part Time</MenuItem>
                  </Select>
                  <FormHelperText>{errors.employeeStatus}</FormHelperText>
                </div>
              </Grid>
              <Grid item xs={4}>
                <div className="base-salary-fields">
                  <div className="form-group">
                    <TextField
                      label="Base Salary"
                      onChange={(e) =>
                        handleChange("baseSalary", e.target.value)
                      }
                      required
                      disabled={mode === pageMode.VIEW ? true : false}
                      value={values.baseSalary}
                      error={!!errors.baseSalary}
                      helperText={errors.baseSalary}
                      InputLabelProps={{ shrink: true }}
                    />
                  </div>
                  <div className="form-group">
                    <InputLabel required>Salary Type</InputLabel>
                    <Select
                      labelId="demo-controlled-open-select-label"
                      id="demo-controlled-open-select"
                      IconComponent={ExpandMoreIcon}
                      value={String(values.salaryType)}
                      onChange={(e) =>
                        handleChange("salaryType", e.target.value)
                      }
                      disabled={mode === pageMode.VIEW ? true : false}
                      className="CSelect base-salary-select"
                    >
                      <MenuItem value={"Month"}>Month</MenuItem>
                      <MenuItem value={"Hour"}>Hour</MenuItem>
                    </Select>
                    <FormHelperText>{errors.salaryType}</FormHelperText>
                  </div>
                </div>
              </Grid>
              <Grid item xs={4}></Grid>
              <Grid item xs={4}>
                <div className="form-group">
                  <TextField
                    label="Bank Account Number"
                    onChange={(e) => handleChange("accountNo", e.target.value)}
                    disabled={mode === pageMode.VIEW ? true : false}
                    value={values.accountNo}
                    error={!!errors.accountNo}
                    helperText={errors.accountNo}
                    InputLabelProps={{ shrink: true }}
                  />
                </div>
              </Grid>
            </Grid>
          </CAccordion>
        </div>
        <div className="save-rate">
          <Button className="btn-thin-primary" onClick={redirectToEmployee}>
            Cancel
          </Button>
          {mode !== pageMode.VIEW && (
            <Button className="btn-primary" onClick={handleSubmit}>
              Save
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
export default AddEmployee;
