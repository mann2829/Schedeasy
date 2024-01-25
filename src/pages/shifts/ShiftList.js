import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllShifts, deleteShift } from "../../slices/ShiftsSlice";
import { DataGrid } from "@mui/x-data-grid";
import { Button, IconButton, TextField } from "@mui/material";
import { AddShiftModal } from "./AddShiftModal";
import { Box } from "@mui/system";
import { ReactComponent as PlusIcon } from "../../assets/img/plus-icon.svg";
import { ReactComponent as EditIcon } from "../../assets/img/edit-icon.svg";
import { ReactComponent as DeleteIcon } from "../../assets/img/delete-icon.svg";
import { CDeleteDialog } from "../../common/CDeleteDialog";
import { ReactComponent as CloseIcon } from "../../assets/img/close-icon.svg";
import Warning from "../../assets/img/warning.png";
import CLoader from "../../common/CLoader";

const ShiftList = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { shiftList, error, isShiftDeleted, isShiftsLoading } = useSelector(
    (state) => state?.shifts
  );
  const [shiftData, setShiftData] = useState([]);
  const [showPopup, setShowPopup] = useState({
    show: false,
    id: null,
    mode: "",
  });
  const [showDeletePopup, setShowDeletePopup] = useState({
    show: false,
    id: null,
    mode: "",
  });

  useEffect(() => {
    let formattedShiftData = shiftList.map((item) => {
      return {
        ...item,
        shiftTimings: item.fromTime + " to " + item.toTime,
      };
    });
    setShiftData(formattedShiftData);
  }, [shiftList]);

  useEffect(() => {
    let formattedShiftData = shiftData.map((item) => {
      return {
        ...item,
        shiftTimings: item.fromTime + " to " + item.toTime,
      };
    });
    setShiftData(formattedShiftData);
  }, [shiftData]);

  useEffect(() => {
    dispatch(fetchAllShifts());
  }, []);

  const deleteShiftCategory = (shiftId) => {
    setShowDeletePopup({
      show: true,
      id: shiftId,
      mode: "delete",
    });
  };

  const deleteShiftData = () => {
    setShowDeletePopup({
      show: false,
    });
    dispatch(deleteShift(showDeletePopup.id));
    setTimeout(() => {
      dispatch(fetchAllShifts());
    }, 500);
  };

  // const addShiftHandle = () => {
  //   history(`/shifts/${"new"}`);
  // };

  const addShiftHandle = () => {
    setShowPopup({
      show: true,
      id: null,
      mode: "add",
    });
  };

  const editShiftHandle = (shiftId) => {
    setShowPopup({
      show: true,
      id: shiftId,
      mode: "edit",
    });
  };

  const searchShifts = (value) => {
    const data = shiftList?.filter((item) => {
      if (
        item.shiftType.toLowerCase().includes(value.toLowerCase()) ||
        item.fromTime.toLowerCase().includes(value.toLowerCase()) ||
        item.toTime.toLowerCase().includes(value.toLowerCase()) ||
        item.breakTime.toLowerCase().includes(value.toLowerCase()) ||
        item.shiftHours.toLowerCase().includes(value.toLowerCase())
      ) {
        return item;
      }
    });
    setShiftData([...data]);
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1.5,
      disableColumnMenu: true,
      hide: true,
    },
    {
      field: "shiftType",
      headerName: "Shift Type",
      flex: 2.0,
      disableColumnMenu: true,
      //editable: true,
    },
    {
      field: "shiftTimings",
      headerName: "Shift Timings",
      flex: 3.0,
      disableColumnMenu: true,
      //editable: true,
    },
    // {
    //   field: "fromTime",
    //   headerName: "From Time",
    //   flex: 2.0,
    //   disableColumnMenu: true,
    //   //editable: true,
    // },
    // {
    //   field: "toTime",
    //   headerName: "To Time",
    //   flex: 2.0,
    //   disableColumnMenu: true,
    //   //editable: true,
    // },
    {
      field: "shiftHours",
      headerName: "Shift Hours",
      flex: 2.0,
      disableColumnMenu: true,
      //editable: true,
    },
    {
      field: "breakTime",
      headerName: "Break",
      flex: 2.0,
      disableColumnMenu: true,
      //editable: true,
    },
    {
      field: "Actions",
      headerName: "Actions",
      flex: 1.5,
      sortable: false,
      disableColumnMenu: true,
      disableColumnFilter: true,
      disableColumnSelector: true,
      renderCell: (params) => {
        return (
          <div>
            <IconButton onClick={() => editShiftHandle(params.row.id)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => deleteShiftCategory(params.row.id)}>
              <DeleteIcon />
            </IconButton>
          </div>
        );
      },
    },
  ];
  return (
    <>
      <CLoader show={isShiftsLoading} />
      {showPopup.show && (
        <AddShiftModal
          title={"Add Shift"}
          showPopup={showPopup.show}
          onClose={() => setShowPopup({ show: false, id: null })}
          mode={showPopup.mode}
          id={showPopup.id}
        />
      )}
      {showDeletePopup.show && (
        <CDeleteDialog
          description={"Are you sure you want to delete this Shift?"}
          showDeletePopup={showDeletePopup.show}
          onClose={() => setShowDeletePopup({ show: false, id: null })}
          onDelete={deleteShiftData}
          mode={showDeletePopup.mode}
          closeIcon={<CloseIcon />}
          warningImg={Warning}
        />
      )}
      <div className="main-container">
        <div className="main-header">
          <h2>Shifts</h2>
          <div className="add-btns">
            <TextField
              placeholder="Search"
              onChange={(e) => searchShifts(e.target.value)}
            />
            <Button className="btn-primary" onClick={addShiftHandle}>
              <PlusIcon /> Add Shift
            </Button>
          </div>
        </div>
        <div className="card-box">
          {/* <div className="shift-list-timing">
            <p>
              Opening Time : <strong>09:00 AM</strong>
            </p>
            <p>
              Closing Time : <strong>05:00 PM</strong>
            </p>
          </div> */}
          <Box className="table-box">
            <DataGrid
              initialState={{
                columns: {
                  columnVisibilityModel: {
                    id: false,
                  },
                },
                sorting: {
                  sortModel: [{ field: "id", sort: "desc" }],
                },
                pagination: { paginationModel: { pageSize: 25 } },
              }}
              columns={columns}
              rows={shiftData}
              autoHeight={false}
              getRowId={(row) => row.id}
              rowSelection={false}
              // hideFooterPagination
              // hideFooter
              pagination={true}
              disableColumnFilter
              hover={false}
              localeText={{ noRowsLabel: "No records found" }}
            />
          </Box>
        </div>
      </div>
    </>
  );
};

export default ShiftList;
