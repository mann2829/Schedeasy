import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllEmployees, deleteEmployee } from "../../slices/EmployeeSlice";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/system";
import { Button, TextField } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { ReactComponent as ActionDot } from "../../assets/img/action-dots.svg";
import { ReactComponent as CloseIcon } from "../../assets/img/close-icon.svg";
import Warning from "../../assets/img/warning.png";
import { CDeleteDialog } from "../../common/CDeleteDialog";
import SampleAvtar from "../../assets/img/avtar.png";
import CLoader from "../../common/CLoader";

const EmployeeList = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openDialogDelete, setOpenDialogDelete] = React.useState(false);
  const [employeeId, setEmployeeId] = useState();
  const dispatch = useDispatch();
  const history = useNavigate();
  const {
    employeeList,
    error,
    isEmployeetDeleted,
    employeeDetails,
    isEmployeeLoading,
  } = useSelector((state) => state?.employees);
  const [employeeData, setEmployeeData] = useState([]);
  const [showDeletePopup, setShowDeletePopup] = useState({
    show: false,
    id: null,
    mode: "",
  });

  useEffect(() => {
    setEmployeeData(employeeList);
  }, [employeeList]);

  useEffect(() => {
    dispatch(fetchAllEmployees());
  }, []);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteEmployeeHandle = () => {
    setShowDeletePopup({
      show: true,
      id: employeeId,
      mode: "delete",
    });
  };

  const deleteEmployeeData = () => {
    setShowDeletePopup({
      show: false,
    });
    setAnchorEl(null);
    dispatch(deleteEmployee(showDeletePopup.id));
    setTimeout(() => {
      dispatch(fetchAllEmployees());
    }, 800);
  };

  const setEmployeeIdhandle = (id) => {
    setEmployeeId(id);
  };

  const addEmployeeHandle = () => {
    history(`/employee/${"new"}`);
  };

  const editEmployeeHandle = () => {
    history(`/employee/${employeeId}`);
  };

  const viewEmployeeHandle = () => {
    history(`/employee/${employeeId}/view`);
  };

  // const redirectToRateShift = () => {
  //   history(`/rateshift`);
  // };

  const searchEmployee = (value) => {
    const data = employeeList?.filter((item) => {
      if (
        String(item.name).toLowerCase().includes(value.toLowerCase()) ||
        String(item.birthDate).includes(value.toString()) ||
        String(item.phoneNo).toString().includes(value.toString()) ||
        String(item.email).toLowerCase().includes(value.toLowerCase()) ||
        String(item.jobTitle).toLowerCase().includes(value.toLowerCase())
      ) {
        return item;
      }
    });
    setEmployeeData([...data]);
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
      field: "name",
      headerName: "Name",
      flex: 2,
      disableColumnMenu: true,
      //editable: true,
      width: 200,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={
              params.row.profilePicture
                ? params.row.profilePicture
                : SampleAvtar
            }
            alt="Avatar"
            style={{
              width: "35px",
              height: "35px",
              borderRadius: "50%",
              border: "1px solid rgb(106 106 106)", // Customize border color here
              marginRight: "10px",
              objectFit: "cover",
            }}
          />
          {params.row.name}
        </div>
      ),
    },

    {
      field: "birthDate",
      headerName: "DOB",
      flex: 1.5,
      disableColumnMenu: true,
      //editable: true,
    },
    {
      field: "phoneNo",
      headerName: "Contact Number",
      flex: 1.5,
      disableColumnMenu: true,
      //editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 3.5,
      disableColumnMenu: true,
      //editable: true,
    },
    {
      field: "jobTitle",
      headerName: "Job Title",
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
                setEmployeeIdhandle(params.row.id);
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
              <MenuItem onClick={() => viewEmployeeHandle()}>View</MenuItem>
              <MenuItem onClick={() => editEmployeeHandle()}> Edit</MenuItem>
              <MenuItem onClick={() => deleteEmployeeHandle()}>Delete</MenuItem>
            </Menu>
          </div>
        );
      },
    },
  ];
  return (
    <>
      <CLoader show={isEmployeeLoading} />
      {showDeletePopup.show && (
        <CDeleteDialog
          description={"Are you sure you want to delete this employee?"}
          showDeletePopup={showDeletePopup.show}
          onClose={() => setShowDeletePopup({ show: false, id: null })}
          onDelete={deleteEmployeeData}
          mode={showDeletePopup.mode}
          closeIcon={<CloseIcon />}
          warningImg={Warning}
        />
      )}
      <div className="main-container">
        <div className="main-header">
          <h2>Employee</h2>
          <div className="add-btns">
            <TextField
              placeholder="Search"
              onChange={(e) => searchEmployee(e.target.value)}
            />
            <Button className="btn-primary" onClick={addEmployeeHandle}>
              Create
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
                  sortModel: [{ field: "name", sort: "asec" }],
                },
                pagination: { paginationModel: { pageSize: 25 } },
              }}
              columns={columns}
              rows={employeeData}
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
        {/* <Button variant="contained" type="primary" onClick={redirectToRateShift}>
        Rate Shift
      </Button> */}
      </div>
    </>
  );
};

export default EmployeeList;
