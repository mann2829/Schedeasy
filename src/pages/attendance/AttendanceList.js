import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchAllHolidays,
  deleteHoliday,
  changeHolidayStatus,
} from "../../slices/HolidaysSlice";
import { DataGrid } from "@mui/x-data-grid";
import { Button, IconButton, MenuItem, Select } from "@mui/material";
import { Box } from "@mui/system";
import { ReactComponent as PlusIcon } from "../../assets/img/plus-icon.svg";
import { ReactComponent as EditIcon } from "../../assets/img/edit-icon.svg";
import { ReactComponent as DeleteIcon } from "../../assets/img/delete-icon.svg";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { ReactComponent as DatePickerIcon } from "../../assets/img/date-picker.svg";
import { AddAttendanceModal } from "../scheduleshifts/AddAttendanceModal.js";
import { AttendanceDetailsModal } from "../scheduleshifts/AttendanceDetailsModal.js";
import { fetchEmployeeAttendaceById } from "../../slices/ScheduleShiftsSlice";
import { fetchAllEmployees } from "./../../slices/EmployeeSlice.js";
import { ReactComponent as ExclamationIcon } from "../../assets/img/exclamation-icon.svg";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CDateRangePicker from "../../common/CDateRangePicker.js";
import moment from "moment";
import CLoader from "../../common/CLoader.js";

const AttendanceList = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [dateRange, setDateRange] = useState();
  const { empId } = useParams();
  const { employeeAttendanceList, isAttendanceAdded, isScheduleShiftsLoading } =
    useSelector((state) => state?.scheduleShifts);
  const { employeeList, error, isEmployeetDeleted, employeeDetails } =
    useSelector((state) => state?.employees);
  const [employeeAttendanceData, setEmployeeAttendanceData] = useState([]);
  const [totalHours, setTotalHours] = useState();
  const [employeeData, setEmployeeData] = useState([]);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [employeeId, setEmployeeId] = useState("All");

  const [showPopup, setShowPopup] = useState({
    show: false,
    id: null,
    mode: "",
  });

  const [showAttendancePopup, setShowAttendancePopup] = useState({
    show: false,
    id: null,
    mode: "",
  });

  const label = { inputProps: { "aria-label": "Switch demo" } };

  const Placeholder = ({ children }) => {
    return <div>{children}</div>;
  };

  useEffect(() => {
    const todaysDate = moment().format("DD/MM/YYYY");
    let data = {
      fromDate: todaysDate,
      toDate: todaysDate,
      userId: employeeId,
    };
    dispatch(fetchEmployeeAttendaceById(data));

    setFromDate(todaysDate);
    setToDate(todaysDate);
  }, []);

  useEffect(() => {
    if (fromDate !== undefined && toDate !== undefined && employeeId) {
      let data = {
        fromDate: fromDate,
        toDate: toDate,
        userId: employeeId,
      };
      dispatch(fetchEmployeeAttendaceById(data));
    }
  }, [fromDate, toDate, employeeId]);

  useEffect(() => {
    setEmployeeData(employeeList);
  }, [employeeList]);

  useEffect(() => {
    if (employeeId) {
      employeeAttendanceList?.attendanceData &&
        setEmployeeAttendanceData(employeeAttendanceList?.attendanceData);
      employeeAttendanceList?.totalHours &&
        setTotalHours(employeeAttendanceList?.totalHours);
    }
  }, [employeeAttendanceList]);

  useEffect(() => {
    dispatch(fetchAllEmployees());
  }, []);

  const addAttendanceHandle = () => {
    setShowPopup({
      show: true,
      id: null,
      mode: "add",
    });
  };

  const attendanceDetailHandle = (attendanceId) => {
    setShowAttendancePopup({
      show: true,
      id: attendanceId,
      mode: "add",
    });
  };

  const setRangeDates = (fDate, tDate) => {
    setFromDate(fDate);
    setToDate(tDate);
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      disableColumnMenu: true,
      hide: true,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 4.0,
      disableColumnMenu: true,
      //editable: true,
    },
    {
      field: "categoryName",
      headerName: "Job",
      flex: 3.5,
      disableColumnMenu: true,
      //editable: true,
    },
    {
      field: "shiftType",
      headerName: "Shifts",
      flex: 3.5,
      disableColumnMenu: true,
      //editable: true,
    },
    {
      field: "date",
      headerName: "Date",
      flex: 3.0,
      disableColumnMenu: true,
      //editable: true,
    },
    {
      field: "workingHours",
      headerName: "Working Hours",
      flex: 2.0,
      disableColumnMenu: true,
      //editable: true,
    },
    {
      field: "breakTime",
      headerName: "Break",
      flex: 1.5,
      disableColumnMenu: true,
      //editable: true,
    },
    {
      field: "totalHours",
      headerName: "Total Hours",
      flex: 2.5,
      disableColumnMenu: true,
      //editable: true,
    },
    {
      field: "inTime",
      headerName: "Check In",
      flex: 2.5,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <>
            <div className="in-time">
              <h4>{params.row.inTime}</h4>
            </div>
          </>
        );
      },
      // editable: true,
    },
    {
      field: "outTime",
      headerName: "Check Out",
      flex: 2.5,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <>
            <div className="out-time">
              <h4>{params.row.outTime}</h4>
            </div>
            <div>
              <IconButton
                onClick={() => attendanceDetailHandle(params.row.attendanceId)}
              >
                <ExclamationIcon />
              </IconButton>
            </div>
          </>
        );
      },
      //editable: true,
    },
    // {
    //   field: "baseSalary",
    //   headerName: "Basic Salary",
    //   flex: 2.5,
    //   disableColumnMenu: true,
    //   renderCell: (params) => {
    //     return (
    //       <>
    //         <div className="basic-salary">{params.row.baseSalary}</div>
    //         <div>
    //           <IconButton
    //             onClick={() => attendanceDetailHandle(params.row.attendanceId)}
    //           >
    //             <ExclamationIcon />
    //           </IconButton>
    //         </div>
    //       </>
    //     );
    //   },
    //   //editable: true,
    // },
  ];
  return (
    <>
      <CLoader show={isScheduleShiftsLoading} />
      {showPopup.show && (
        <AddAttendanceModal
          title={"Manual Attendance"}
          showPopup={showPopup.show}
          onClose={() => setShowPopup({ show: false, id: null })}
          fromDate={fromDate}
          toDate={toDate}
          employeeId={employeeId}
          mode={showPopup.mode}
          id={showPopup.id}
        />
      )}

      {showAttendancePopup.show && (
        <AttendanceDetailsModal
          title={"Attendance"}
          showPopup={showAttendancePopup.show}
          onClose={() => setShowAttendancePopup({ show: false, id: null })}
          mode={showAttendancePopup.mode}
          id={showAttendancePopup.id}
        />
      )}
      <div className="main-container">
        <div className="main-header">
          <h2>Attendance</h2>

          <div className="add-btns">
            {employeeId !== "All" && (
              <Button className="btn-primary" onClick={addAttendanceHandle}>
                Add Manual Attendance
              </Button>
            )}
          </div>
        </div>
        <div className="card-box">
          <div className="employee-aatendance-top">
            <div className="col-left">
              <div className="form-group attendance-range-picker">
                <CDateRangePicker
                  view="attendanceCalendar"
                  handleDates={setRangeDates}
                />
              </div>
            </div>
            <div className="col-right">
              {employeeAttendanceData.length > 0 && (
                <div>
                  <p>
                    Total Hours Worked : <span>{totalHours} hrs</span>
                  </p>
                </div>
              )}
              <div className="form-group">
                <Select
                  // displayEmpty
                  // renderValue={
                  //   employeeId !== ""
                  //     ? undefined
                  //     : () => <Placeholder>Select Employee</Placeholder>
                  // }
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  className="form-select"
                  IconComponent={ExpandMoreIcon}
                >
                  <MenuItem key="" value="All">
                    All
                  </MenuItem>
                  {employeeData?.map((item, index) => (
                    <MenuItem key={index} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            </div>
          </div>
          <Box className="attendence-table-box">
            {employeeAttendanceData && (
              <DataGrid
                initialState={{
                  columns: {
                    columnVisibilityModel: {
                      id: false,
                    },
                  },
                }}
                columns={columns}
                rows={employeeAttendanceData}
                autoHeight={false}
                getRowId={(row) => row.attendanceId}
                rowSelection={false}
                hideFooterPagination
                hideFooter
                disableColumnFilter
                hover={false}
                localeText={{ noRowsLabel: "No records found" }}
              />
            )}
          </Box>
        </div>
      </div>
    </>
  );
};

export default AttendanceList;
