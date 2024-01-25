import * as React from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import { ReactComponent as CloseIcon } from "../assets/img/close-icon.svg";
import { useNavigate } from "react-router-dom";
import { AssignEmployeeModal } from "../pages/scheduleshifts/AssignEmployeeModal";
import { CDeleteDialog } from "./CDeleteDialog";
import Warning from "../assets/img/warning.png";
import {
  deleteScheduleEntry,
  getScheduleData,
} from "./../slices/ScheduleShiftsSlice";
import { useDispatch } from "react-redux";
import { InviteEmployeeModal } from "../pages/scheduleshifts/InviteEmployeeModal";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function ChipsList(props) {
  const dispatch = useDispatch();
  const [chipData, setChipData] = React.useState([]);
  const [fromDate, setFromDate] = React.useState();
  const [toDate, setToDate] = React.useState();
  const [shiftType, setShiftType] = React.useState();
  const [showPopup, setShowPopup] = React.useState({
    show: false,
    id: null,
    mode: "",
    shiftDate: "",
    shiftjob: "",
  });
  const [showDeletePopup, setShowDeletePopup] = React.useState({
    show: false,
    id: null,
    mode: "",
  });
  const history = useNavigate();

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  const assignChipType = (type) => {
    return type === "checkOut"
      ? "text-default text-danger"
      : type === "checkIn"
      ? "text-default text-success"
      : type === "breakIn"
      ? "text-default text-warning"
      : type === "breakOut"
      ? "text-default text-warning"
      : type === "notStarted"
      ? "text-default text-dark"
      : type === "assignButton"
      ? "text-default text-blue"
      : type === "swapDivide"
      ? "text-default text-divide"
      : "";
  };
  const assignEmployeeType = (type) => {
    return type === "checkOut"
      ? "text-danger"
      : type === "checkIn"
      ? "text-success"
      : type === "breakIn"
      ? "text-warning"
      : type === "breakOut"
      ? "text-warning"
      : type === "notStarted"
      ? "text-dark"
      : type === "assignButton"
      ? "text-blue"
      : type === "swapDivide"
      ? "text-divide"
      : "";
  };

  React.useEffect(() => {
    if (props.chipData !== undefined) {
      setChipData(props.chipData);
    }
    if (props.fromDate !== undefined) {
      setFromDate(props.fromDate);
    }
    if (props.toDate !== undefined) {
      setToDate(props.toDate);
    }
    if (props.shiftType !== undefined) {
      setShiftType(props.shiftType);
    }
  }, [props.chipData, props.fromDate, props.toDate, props.shiftType]);

  const redirectToAttendancePage = (id) => {
    history(`/scheduleshift/attendance/${id}`);
  };

  const redirectToAssignEmployee = (shiftDate, shiftJob) => {
    setShowPopup({
      show: true,
      id: null,
      mode: "add",
      shiftDate: shiftDate,
      shiftjob: shiftJob,
    });
  };
  const handleShiftDelete = (name) => {
    setShowDeletePopup({
      show: true,
      id: name,
      mode: "delete",
    });
  };

  const deleteShiftData = () => {
    dispatch(deleteScheduleEntry(showDeletePopup.id)).then((res) => {
      if (!res.error) {
        setShowDeletePopup({
          show: false,
        });
        dispatch(
          getScheduleData({
            fromDate: fromDate,
            toDate: toDate,
            shiftId: shiftType,
          })
        );
      }
    });
    // console.log("Delete", showDeletePopup.id);
    // setAnchorEl(null);
    // dispatch(deleteEmployee(showDeletePopup.id));
    // setTimeout(() => {
    //   dispatch(fetchAllEmployees());
    // }, 800);
  };

  return (
    <>
      {showPopup.show && (
        <InviteEmployeeModal
          title={"Assign Employee"}
          showPopup={showPopup.show}
          onClose={() => setShowPopup({ show: false, id: null })}
          fromDate={fromDate}
          toDate={toDate}
          shiftType={shiftType}
          jobType={showPopup.shiftjob}
          shiftDate={showPopup.shiftDate}
          mode={showPopup.mode}
          id={showPopup.id}
        />
      )}
      {showDeletePopup.show && (
        <CDeleteDialog
          description={
            "Are you sure you want to remove the employee from this shift?"
          }
          showDeletePopup={showDeletePopup.show}
          onClose={() => setShowDeletePopup({ show: false, id: null })}
          onDelete={deleteShiftData}
          mode={showDeletePopup.mode}
          closeIcon={<CloseIcon />}
          warningImg={Warning}
        />
      )}
      <Paper
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          listStyle: "none",
          p: 0,
          m: 0,
        }}
        component="ul"
        className="chips_list"
      >
        {chipData.map((data) => {
          let icon;

          // if (data.label) {
          //   icon = <CloseIcon />;
          // }

          return (
            <ListItem key={data.key}>
              {data?.pendingUser > 0 ? (
                <Chip
                  icon={icon}
                  label={`Invite ${data.pendingUser} Employee`}
                  onClick={() =>
                    redirectToAssignEmployee(data.date, data.jobId)
                  }
                  className={assignChipType(data.type)}
                />
              ) : data?.divideWith ? (
                <Chip
                  icon={icon}
                  label={
                    <>
                      <span className={assignEmployeeType(data.type)}>
                        {data.userName}
                      </span>
                      <span>|</span>
                      <span
                        className={assignEmployeeType(data?.divideWith?.type)}
                      >
                        {data?.divideWith?.name}
                      </span>
                    </>
                  }
                  clickable={false}
                  className={assignChipType("swapDivide")}
                />
              ) : (
                <Chip
                  icon={icon}
                  label={data.userName}
                  onClick={() => redirectToAttendancePage(data.id)}
                  onDelete={() => handleShiftDelete(data.sscId)}
                  className={assignChipType(data.type)}
                  deleteIcon={<CloseIcon />}
                />
              )}
            </ListItem>
          );
        })}
      </Paper>
    </>
  );
}
