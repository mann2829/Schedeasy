import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchAllJobs,
  deleteJob,
  addJob,
  updateJob,
} from "../../slices/JobsSlice";
import { DataGrid, GridRowModes } from "@mui/x-data-grid";

import { Button, IconButton, TextField } from "@mui/material";
import Alert from "@mui/material/Alert";
import { Box } from "@mui/system";
import { useRef } from "react";
import { ReactComponent as PlusIcon } from "../../assets/img/plus-icon.svg";
import { ReactComponent as DeleteIcon } from "../../assets/img/delete-icon.svg";
import { ReactComponent as EditIcon } from "../../assets/img/edit-icon.svg";
import { CDeleteDialog } from "../../common/CDeleteDialog";
import { ReactComponent as CloseIcon } from "../../assets/img/close-icon.svg";
import Warning from "../../assets/img/warning.png";
import { toast } from "react-toastify";
import CLoader from "../../common/CLoader";

const JobsList = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { jobList, isJobsLoading } = useSelector((state) => state?.jobs);
  const [jobsData, setJobsData] = useState([]);
  const [rowModesModel, setRowsModesModel] = useState({});
  const [showDeletePopup, setShowDeletePopup] = useState({
    show: false,
    id: null,
    mode: "",
  });

  useEffect(() => {
    setJobsData(jobList);
  }, [jobList]);

  useEffect(() => {
    dispatch(fetchAllJobs());
  }, []);

  const deleteJobCategory = (jobId) => {
    setShowDeletePopup({
      show: true,
      id: jobId,
      mode: "delete",
    });
  };

  const deleteJobData = () => {
    setShowDeletePopup({
      show: false,
    });
    dispatch(deleteJob(showDeletePopup.id));
    setTimeout(() => {
      dispatch(fetchAllJobs());
    }, 500);
  };

  const addJobHandle = () => {
    const maxId =
      jobsData && jobsData.length > 0
        ? Math.max(...jobsData.map((o) => o.id))
        : 0;
    setJobsData([
      {
        id: maxId + 1,
        categoryName: "",
        jobBaseSalary: "",
        jobRate: "",
        isNew: true,
      },
      ...jobsData,
    ]);
    setRowsModesModel({
      ...rowModesModel,
      [maxId + 1]: { mode: GridRowModes.Edit, fieldToFocus: "categoryName" },
    });
  };

  const handleRowEditStart = (params, event) => {
    setRowsModesModel({
      ...rowModesModel,
      [params.id]: { mode: GridRowModes.Edit },
    });
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const validateRow = (row) => {
    if (
      !row.categoryName?.toString() ||
      !row.jobBaseSalary?.toString() ||
      !row.jobRate?.toString()
    ) {
      toast.error("All fields are required");
      return false;
    }
    return true;
  };

  const processRowUpdate = (newRow) => {
    let updatedRow = { ...newRow };
    if (validateRow(newRow)) {
      setJobsData(
        jobsData.map((row) => (row["id"] === newRow["id"] ? newRow : row))
      );
      setRowsModesModel({
        ...rowModesModel,
        [newRow["id"]]: {
          mode: GridRowModes.View,
          ignoreModifications: true,
        },
      });

      const payload = {
        categoryName: newRow.categoryName,
        jobBaseSalary: newRow.jobBaseSalary,
        jobRate: newRow.jobRate,
      };
      if (!updatedRow.isNew) {
        const updatePayload = {
          id: updatedRow.id,
          payload: payload,
        };
        dispatch(updateJob(updatePayload));
        setTimeout(() => {
          dispatch(fetchAllJobs());
        }, 50);
      } else {
        dispatch(addJob(payload));
        setTimeout(() => {
          dispatch(fetchAllJobs());
        }, 50);
      }
    } else {
      setRowsModesModel({
        ...rowModesModel,
        [newRow.id]: { mode: GridRowModes.Edit },
      });
    }
  };

  const handleAddClick = (id) => {
    setRowsModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View },
    });
  };

  // const handleCancelClick = (id) => {
  //   setRowsModesModel({
  //     ...rowModesModel,
  //     [id]: { mode: GridRowModes.View, ignoreModifications: true },
  //   });
  // };

  const handleCancelClick = (rowId, categoryName) => {
    if (!categoryName) {
      const filteredJobData = jobsData.filter((i) => i.id !== rowId);
      setJobsData(filteredJobData);
    } else {
      setRowsModesModel({
        ...rowModesModel,
        [rowId]: { mode: GridRowModes.View, ignoreModifications: true },
      });
    }
  };

  const searchJobs = (value) => {
    const data = jobList?.filter((item) => {
      if (item.categoryName.toLowerCase().includes(value.toLowerCase())) {
        return item;
      }
    });
    setJobsData([...data]);
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1.5,
      disableColumnMenu: true,
      hide: true,
      //editable: true,
    },
    {
      field: "categoryName",
      headerName: "Name",
      flex: 6,
      disableColumnMenu: true,
      editable: true,
    },
    {
      field: "jobBaseSalary",
      headerName: "Base Salary",
      flex: 5,
      disableColumnMenu: true,
      editable: true,
    },
    {
      field: "jobRate",
      headerName: "Hourly Rate",
      flex: 5,
      disableColumnMenu: true,
      editable: true,
    },

    {
      field: "Actions",
      headerName: "Actions",
      flex: 4,
      sortable: false,
      disableColumnMenu: true,
      disableColumnFilter: true,
      disableColumnSelector: true,
      renderCell: (params) => {
        const isInEditMode =
          rowModesModel[params.id]?.mode === GridRowModes.Edit;
        if (isInEditMode) {
          return (
            <div className="add-cancel-btns">
              <Button
                className="btn-success"
                type="primary"
                onClick={() => handleAddClick(params.id)}
              >
                Save
              </Button>
              <Button
                className="btn-cancel"
                type="primary"
                onClick={() =>
                  handleCancelClick(params.id, params.row.categoryName)
                }
              >
                Cancel
              </Button>
            </div>
          );
        } else {
          return [
            <div>
              <IconButton onClick={() => handleRowEditStart(params)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => deleteJobCategory(params.row.id)}>
                <DeleteIcon />
              </IconButton>
            </div>,
          ];
        }
      },
    },
  ];

  return (
    <>
      <CLoader show={isJobsLoading} />
      {showDeletePopup.show && (
        <CDeleteDialog
          description={"Are you sure you want to delete the Job?"}
          showDeletePopup={showDeletePopup.show}
          onClose={() => setShowDeletePopup({ show: false, id: null })}
          onDelete={deleteJobData}
          mode={showDeletePopup.mode}
          closeIcon={<CloseIcon />}
          warningImg={Warning}
        />
      )}
      <div className="main-container">
        <div className="table-container">
          <div className="main-header">
            <h2>Jobs</h2>
            <div className="add-btns">
              <TextField
                placeholder="Search"
                onChange={(e) => searchJobs(e.target.value)}
              />
              <Button className="btn-primary" onClick={addJobHandle}>
                <PlusIcon /> Add Job
              </Button>
            </div>
          </div>
          <div className="card-box">
            <Box className="table-box">
              <DataGrid
                className="jobList_table"
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
                rows={jobsData}
                editMode="row"
                autoHeight={false}
                getRowId={(row) => row.id}
                rowSelection={false}
                rowModesModel={rowModesModel}
                onRowEditStart={handleRowEditStart}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                experimentalFeatures={{ newEditingApi: true }}
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
      </div>
    </>
  );
};

export default JobsList;
