import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchAllRateShifts,
  deleteRateShiftData,
} from "../../slices/RateShiftSlice";
// import { fetchRateShiftDataGridData } from "../../slices/DataGridSlice";
import { fetchAllShifts } from "../../slices/ShiftsSlice";
import { fetchAllJobs } from "../../slices/JobsSlice";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/system";
import { Button, TextField } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { ReactComponent as ActionDot } from "../../assets/img/action-dots.svg";
import { ReactComponent as CloseIcon } from "../../assets/img/close-icon.svg";
import Warning from "../../assets/img/warning.png";
import { ViewRateShiftModal } from "./ViewRateShiftModal";
import { CDeleteDialog } from "../../common/CDeleteDialog";
import Select from "@mui/material/Select";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CLoader from "../../common/CLoader";

const RateShiftList = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openDialogDelete, setOpenDialogDelete] = React.useState(false);
  const [rateShiftId, setRateShiftId] = useState();
  const dispatch = useDispatch();
  const history = useNavigate();
  const {
    rateShiftList,
    totalRowsData,
    error,
    isRateShiftDeleted,
    rateShiftDetails,
    isRateShiftLoading,
  } = useSelector((state) => state?.rateShifts);
  const { jobList } = useSelector((state) => state?.jobs);
  const { shiftList } = useSelector((state) => state?.shifts);
  // const { rateShiftGridData } = useSelector((state) => state?.datagrid);
  const [jobsData, setJobsData] = useState();
  const [shiftsData, setShiftsData] = useState();
  const [rateShiftData, setRateShiftData] = useState([]);
  const [filteredJobType, setFilteredJobType] = useState("All Jobs");
  const [filteredShiftType, setFilteredShiftType] = useState("All Shifts");
  const [filteredData, setFilteredData] = useState([]);
  const [filteredDataForSearch, setFilteredDataForSearch] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(25);
  const [totalRows, setTotalRows] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let formattedShiftData = rateShiftList.map((item) => {
      return {
        ...item,
        rateShiftDate: item.fromDate + " to " + item.toDate,
        rateShiftTime: item.fromTime + " to " + item.toTime,
      };
    });
    setRateShiftData(formattedShiftData);
    setFilteredData(formattedShiftData);
    setFilteredDataForSearch(formattedShiftData);
  }, [rateShiftList]);

  useEffect(() => {
    setTotalRows(totalRowsData);
  }, [totalRowsData]);

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
    // dispatch(fetchAllRateShifts());
    dispatch(fetchAllJobs());
    dispatch(fetchAllShifts());
  }, []);

  useEffect(() => {
    setJobsData(jobList);
  }, [jobList]);

  useEffect(() => {
    setShiftsData(shiftList);
  }, [shiftList]);

  useEffect(() => {
    const data = {
      page: page,
      pageSize: pageSize,
      ...(filteredJobType !== "All Jobs" && { jobCategoryId: filteredJobType }),
      ...(filteredShiftType !== "All Shifts" && {
        shiftsId: filteredShiftType,
      }),
      ...(searchTerm !== "" && { search: searchTerm.trim() }),
    };
    dispatch(fetchAllRateShifts(data));
  }, [page, pageSize, filteredJobType, filteredShiftType]);

  useEffect(() => {
    const delay = 500;
    let timeoutId;

    const fetchResults = async () => {
      const data = {
        page: page,
        pageSize: pageSize,
        ...(filteredJobType !== "All Jobs" && {
          jobCategoryId: filteredJobType,
        }),
        ...(filteredShiftType !== "All Shifts" && {
          shiftsId: filteredShiftType,
        }),
        ...(searchTerm !== "" && { search: searchTerm.trim() }),
      };
      dispatch(fetchAllRateShifts(data));
    };

    const debounce = (func, delay) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func();
      }, delay);
    };

    debounce(() => {
      fetchResults();
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const handleDialogOpenDelete = () => {
    setOpenDialogDelete(true);
  };

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const viewRateShiftHandle = () => {
    setShowPopup({
      show: true,
      id: rateShiftId,
      mode: "view",
    });
  };

  const deleteRateShiftHandle = () => {
    setShowDeletePopup({
      show: true,
      id: rateShiftId,
      mode: "delete",
    });
  };

  const deleteRateShift = () => {
    setShowDeletePopup({
      show: false,
    });
    setAnchorEl(null);
    dispatch(deleteRateShiftData(showDeletePopup.id));
    setTimeout(() => {
      dispatch(fetchAllRateShifts());
    }, 800);
  };

  const setRateShiftIdhandle = (id) => {
    setRateShiftId(id);
  };

  const addRateShiftHandle = () => {
    history(`/rateshift/${"new"}`);
  };

  const editRateShiftHandle = () => {
    history(`/rateshift/${rateShiftId}`);
  };

  const searchRateShiftData = (value) => {
    setSearchTerm(value);
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
      field: "rateShiftDate",
      headerName: "Date",
      flex: 2.5,
      disableColumnMenu: true,
      //editable: true,
    },
    {
      field: "job",
      headerName: "Jobs",
      flex: 1.5,
      disableColumnMenu: true,
      //editable: true,
    },
    {
      field: "shiftType",
      headerName: "Shift Type",
      flex: 1.5,
      disableColumnMenu: true,
      //editable: true,
    },
    {
      field: "rateShiftTime",
      headerName: "Timings",
      flex: 2.5,
      disableColumnMenu: true,
      //editable: true,
    },
    {
      field: "rate",
      headerName: "Hourly Rates",
      flex: 1.5,
      disableColumnMenu: true,
      //editable: true,
    },
    {
      field: "noOfPersons",
      headerName: "No. of Employee",
      flex: 1.5,
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
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={(e) => {
                handleClick(e);
                setRateShiftIdhandle(params.row.id);
              }}
            >
              <ActionDot />
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
              <MenuItem onClick={() => viewRateShiftHandle()}>View</MenuItem>
              <MenuItem onClick={() => editRateShiftHandle()}> Edit</MenuItem>
              <MenuItem onClick={() => deleteRateShiftHandle()}>
                Delete
              </MenuItem>
            </Menu>
          </div>
        );
      },
    },
  ];

  const handlePaginationChange = (params) => {
    setPage(params.page);
    setPageSize(params.pageSize);
  };

  return (
    <>
      <CLoader show={isRateShiftLoading} />
      {showPopup.show && (
        <ViewRateShiftModal
          title={"Add Shift"}
          showPopup={showPopup.show}
          onClose={() => setShowPopup({ show: false, id: null })}
          mode={showPopup.mode}
          id={showPopup.id}
        />
      )}
      {showDeletePopup.show && (
        <CDeleteDialog
          description={"Are you sure you want to delete the Shift?"}
          showDeletePopup={showDeletePopup.show}
          onClose={() => setShowDeletePopup({ show: false, id: null })}
          onDelete={deleteRateShift}
          mode={showDeletePopup.mode}
          closeIcon={<CloseIcon />}
          warningImg={Warning}
        />
      )}
      <div className="main-container">
        <div className="main-header ratelistheading">
          <div>
            <h2>Rate Shift</h2>
          </div>
          <div className="add-btns">
            <div className="rateHeadingField">
              <TextField
                placeholder="Search"
                onChange={(e) => searchRateShiftData(e.target.value)}
              />
            </div>
            <div className="rateHeadingField">
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                IconComponent={ExpandMoreIcon}
                className="CSelect"
                value={filteredJobType}
                onChange={(e) => setFilteredJobType(e.target.value)}
              >
                <MenuItem key="" value="All Jobs">
                  All Jobs
                </MenuItem>
                {jobsData?.map((item, index) => (
                  <MenuItem key={index} value={item.id}>
                    {item.categoryName}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div className="rateHeadingField">
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                IconComponent={ExpandMoreIcon}
                className="CSelect"
                value={filteredShiftType}
                onChange={(e) => setFilteredShiftType(e.target.value)}
              >
                <MenuItem key="" value="All Shifts">
                  All Shifts
                </MenuItem>
                {shiftsData?.map((item, index) => (
                  <MenuItem key={index} value={item.id}>
                    {item.shiftType}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div className="rateHeadingField">
              <Button className="btn-primary" onClick={addRateShiftHandle}>
                Create
              </Button>
            </div>
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
              rowCount={totalRows}
              pageSize={pageSize}
              page={page}
              columns={columns}
              rows={filteredData}
              paginationMode="server"
              autoHeight={false}
              getRowId={(row) => row.id}
              rowSelection={false}
              // hideFooterPagination
              // hideFooter
              onPaginationModelChange={(e) => handlePaginationChange(e)}
              onChange
              //pagination={true}
              disableColumnFilter
              hover={false}
              localeText={{ noRowsLabel: "No records found" }}
            />
          </Box>
        </div>
        {/* <Button variant="contained" type="primary" onClick={redirectToRateShift}>
        Rate Shift
      </Button> */}
      </div>
    </>
  );
};

export default RateShiftList;
