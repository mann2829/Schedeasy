import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchAllHolidays,
  deleteHoliday,
  changeHolidayStatus,
  updateHolidaySetting,
  fetchHolidaySettings,
} from "../../slices/HolidaysSlice";
import { DataGrid } from "@mui/x-data-grid";
import { Button, IconButton, MenuItem, Select } from "@mui/material";
import { Box } from "@mui/system";
import { AddHolidayModal } from "./AddHolidayModal";
import { ReactComponent as PlusIcon } from "../../assets/img/plus-icon.svg";
import { ReactComponent as EditIcon } from "../../assets/img/edit-icon.svg";
import { ReactComponent as DeleteIcon } from "../../assets/img/delete-icon.svg";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CDeleteDialog } from "../../common/CDeleteDialog";
import { ReactComponent as CloseIcon } from "../../assets/img/close-icon.svg";
import Warning from "../../assets/img/warning.png";
import CLoader from "../../common/CLoader";

const HolidaysList = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const {
    holidayList,
    error,
    isHolidayDeleted,
    settingDetails,
    isHolidaysLoading,
  } = useSelector((state) => state?.holidays);
  const [holidayData, setHolidayData] = useState([]);
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

  const [autoFetchStatus, setAutoFetchStatus] = useState();

  const label = { inputProps: { "aria-label": "Switch demo" } };

  useEffect(() => {
    setHolidayData(holidayList);
  }, [holidayList]);

  useEffect(() => {
    dispatch(fetchHolidaySettings());
    dispatch(fetchAllHolidays());
  }, []);

  useEffect(() => {
    settingDetails && setAutoFetchStatus(settingDetails?.autoFetch);
  }, [settingDetails]);

  const addHolidayHandle = () => {
    setShowPopup({
      show: true,
      id: null,
      mode: "add",
    });
  };

  const editHolidayHandle = (holidayId) => {
    setShowPopup({
      show: true,
      id: holidayId,
      mode: "edit",
    });
  };

  const changeHolidayStatusHandle = (value, holidayId) => {
    const updatePayload = {
      id: holidayId,
      payload: { holidayStatus: value },
    };
    dispatch(changeHolidayStatus(updatePayload));
    setTimeout(() => {
      if (autoFetchStatus) {
        dispatch(fetchAllHolidays("auto"));
      } else {
        dispatch(fetchAllHolidays("manual"));
      }
    }, 400);
  };

  const deleteHolidayList = (holidayId) => {
    setShowDeletePopup({
      show: true,
      id: holidayId,
      mode: "delete",
    });
  };

  const deleteHolidayData = () => {
    setShowDeletePopup({
      show: false,
    });
    dispatch(deleteHoliday(showDeletePopup.id));
    setTimeout(() => {
      if (autoFetchStatus) {
        dispatch(fetchAllHolidays("auto"));
      } else {
        dispatch(fetchAllHolidays("manual"));
      }
    }, 500);
  };

  const changeHolidaySettingHandle = (status) => {
    const data = {
      id: settingDetails?.id,
      autoFetch: status,
    };
    console.log("Data Payload", status);
    dispatch(updateHolidaySetting(data)).then((res) => {
      if (!res.error) {
        dispatch(fetchHolidaySettings());
      }
    });
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
      field: "fromDate",
      headerName: "From Date",
      flex: 1.5,
      disableColumnMenu: true,
      //editable: true,
    },
    {
      field: "toDate",
      headerName: "To Date",
      flex: 1.5,
      disableColumnMenu: true,
      //editable: true,
    },
    {
      field: "holidayName",
      headerName: "Holiday Name",
      flex: 2,
      disableColumnMenu: true,
      //editable: true,
    },
    {
      field: "holidayType",
      headerName: "Holiday Type",
      flex: 1.5,
      disableColumnMenu: true,
      //editable: true,
    },
    {
      field: "note",
      headerName: "Note",
      flex: 2.5,
      disableColumnMenu: true,
      //editable: true,
    },
    {
      field: "holidayStatus",
      headerName: "Holiday Status",
      flex: 1.5,
      disableColumnMenu: true,
      // editable: true,
      renderCell: (params) => {
        return (
          <>
            <Select
              value={params.row.holidayStatus}
              onChange={(e) =>
                changeHolidayStatusHandle(e.target.value, params.row.id)
              }
              className="holiday-select-list"
              IconComponent={ExpandMoreIcon}
            >
              <MenuItem value={"Paid"}>Paid</MenuItem>
              <MenuItem value={"Unpaid"}>Unpaid</MenuItem>
            </Select>
          </>
        );
      },
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
            <IconButton onClick={() => editHolidayHandle(params.row.id)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => deleteHolidayList(params.row.id)}>
              <DeleteIcon />
            </IconButton>
          </div>
        );
      },
    },
  ];
  return (
    <>
      <CLoader show={isHolidaysLoading} />
      {showPopup.show && (
        <AddHolidayModal
          title={"Holiday Settings"}
          showPopup={showPopup.show}
          onClose={() => setShowPopup({ show: false, id: null })}
          mode={showPopup.mode}
          autoFetchStatus={autoFetchStatus}
          id={showPopup.id}
        />
      )}
      {showDeletePopup.show && (
        <CDeleteDialog
          description={"Are you sure you want to delete the Holiday?"}
          showDeletePopup={showDeletePopup.show}
          onClose={() => setShowDeletePopup({ show: false, id: null })}
          onDelete={deleteHolidayData}
          mode={showDeletePopup.mode}
          closeIcon={<CloseIcon />}
          warningImg={Warning}
        />
      )}
      <div className="main-container">
        <div className="main-header">
          <h2>Holidays</h2>
          <div className="add-btns">
            <div className="switch-btn">
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={autoFetchStatus}
                      onChange={(e) =>
                        changeHolidaySettingHandle(e.target.checked)
                      }
                    />
                  }
                  label="Auto Fetch"
                />
              </FormGroup>
            </div>
            <Button className="btn-primary" onClick={addHolidayHandle}>
              <PlusIcon /> Add Holiday
            </Button>
          </div>
        </div>
        <div className="card-box">
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
              rows={holidayData}
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

export default HolidaysList;
