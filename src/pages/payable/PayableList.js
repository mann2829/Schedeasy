import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { DataGrid, GridRowModes } from "@mui/x-data-grid";
import { Button, IconButton, MenuItem, Select } from "@mui/material";
import { Box } from "@mui/system";
import { ReactComponent as EditIcon } from "../../assets/img/edit-icon.svg";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { ReactComponent as DatePickerIcon } from "../../assets/img/date-picker.svg";
import CDateRangePicker from "../../common/CDateRangePicker.js";
import { fetchAllPayable, updatePayable } from "./../../slices/PayableSlice";
import { fetchAllEmployees } from "./../../slices/EmployeeSlice.js";
import { toast } from "react-toastify";
import moment from "moment";
import CLoader from "../../common/CLoader.js";

const PayableList = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [dateRange, setDateRange] = useState();
  const [rowModesModel, setRowsModesModel] = useState({});
  const [finalData, setFinalData] = useState([]);
  const [formattedDataForDownload, setFormattedDataForDownload] = useState([]);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const { payableList, totalRowsData, isPayableLoading } = useSelector(
    (state) => state?.payable
  );
  const { employeeList, error, isEmployeetDeleted, employeeDetails } =
    useSelector((state) => state?.employees);
  const [employeeData, setEmployeeData] = useState([]);
  const [payableData, setPayableData] = useState([]);
  const [empId, setEmpId] = useState("All");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(25);
  const [totalRows, setTotalRows] = useState();

  // const [data, setData] = useState([
  //   {
  //     name: "Joey",
  //     jobTitle: "Actor",
  //     type: "weekly",
  //     payData: [
  //       {
  //         range: "1 sept to 6 sept",
  //         hours: "08:00 hrs",
  //         baseSalary: "30",
  //         shift: "30",
  //         totalAmount: "60",
  //       },
  //       {
  //         range: "7 sept to 13 sept",
  //         hours: "06:00 hrs",
  //         baseSalary: "50",
  //         shift: "10",
  //         totalAmount: "50",
  //       },
  //       {
  //         range: "14 sept to 20 sept",
  //         hours: "07:00 hrs",
  //         baseSalary: "25",
  //         shift: "25",
  //         totalAmount: "55",
  //       },
  //       {
  //         range: "21 sept to 28 sept",
  //         hours: "04:00 hrs",
  //         baseSalary: "15",
  //         shift: "55",
  //         totalAmount: "12",
  //       },
  //     ],
  //   },
  //   {
  //     name: "Ross",
  //     jobTitle: "Actor",
  //     type: "monthly",
  //     payData: [
  //       {
  //         month: "September",
  //         hours: "04:00 hrs",
  //         baseSalary: "15",
  //         shift: "55",
  //         totalAmount: "12",
  //       },
  //     ],
  //   },
  // ]);

  useEffect(() => {
    let data = {
      fromDate: moment().startOf("month").format("DD/MM/YYYY"),
      toDate: moment().endOf("month").format("DD/MM/YYYY"),
      userId: empId,
      page: 0,
      pageSize: 25,
    };

    dispatch(fetchAllPayable(data));
    dispatch(fetchAllEmployees());
  }, []);

  useEffect(() => {
    setTotalRows(totalRowsData);
  }, [totalRowsData]);

  useEffect(() => {
    if (page !== undefined && pageSize !== undefined && fromDate && toDate) {
      let data = {
        fromDate: fromDate,
        toDate: toDate,
        userId: empId,
        page: page,
        pageSize: pageSize,
      };
      dispatch(fetchAllPayable(data));
    }
  }, [page, pageSize]);

  useEffect(() => {
    if (fromDate !== toDate && page !== undefined && pageSize !== undefined) {
      let data = {
        fromDate: fromDate,
        toDate: toDate,
        userId: empId,
        page: page,
        pageSize: pageSize,
      };
      dispatch(fetchAllPayable(data));
    }
  }, [fromDate, toDate, empId]);

  useEffect(() => {
    setEmployeeData(employeeList);
  }, [employeeList]);

  useEffect(() => {
    setPayableData(payableList);
  }, [payableList]);

  const setRangeDates = (fDate, tDate) => {
    setFromDate(fDate);
    setToDate(tDate);
  };

  useEffect(() => {
    let payableFormattedData = [];
    let formattedDataForCSV = [];
    let i = 0;
    payableData?.map((item) => {
      item?.payData?.map((pData, index) => {
        let finalData = {};
        finalData.id = pData.paymentId;
        finalData.name = index === 0 ? item.name : "";
        finalData.jobName = index === 0 ? item.jobName : "";
        finalData.range =
          item.paymentSalaryType === "hour"
            ? moment(pData?.fromDate, "DD/MM/YYYY").format("Do MMM YYYY") +
              " to " +
              moment(pData?.toDate, "DD/MM/YYYY").format("Do MMM YYYY")
            : pData.month;
        finalData.totalHours = pData.totalHours;
        finalData.baseSalary = pData.baseSalary;
        finalData.shiftAllowance = pData.shiftAllowance;
        finalData.totalAmount = pData.totalAmount;
        i = i + 1;
        payableFormattedData.push(finalData);
        console.log("Final Data", finalData);
      });
    });
    payableData.map((item) => {
      item.payData.map((pData, index) => {
        let finalData = {};
        finalData.name = item.name;
        finalData.jobName = item.jobName;
        finalData.range =
          item.paymentSalaryType === "hour"
            ? moment(pData?.fromDate, "DD/MM/YYYY").format("Do MMM YYYY") +
              " to " +
              moment(pData?.toDate, "DD/MM/YYYY").format("Do MMM YYYY")
            : pData.month;
        finalData.totalHours = pData.totalHours;
        finalData.baseSalary = pData.baseSalary;
        finalData.shiftAllowance = pData.shiftAllowance;
        finalData.totalAmount = pData.totalAmount;
        i = i + 1;
        formattedDataForCSV.push(finalData);
      });
    });
    setFinalData(payableFormattedData);
    setFormattedDataForDownload(formattedDataForCSV);
  }, [payableData]);

  // const setFormattedData = () => {
  //   let payableData = [];

  //   let i = 0;
  //   data.map((item) => {
  //     item.payData.map((pData, index) => {
  //       let finalData = {};
  //       finalData.id = i;
  //       finalData.name = index === 0 ? item.name : "";
  //       finalData.jobTitle = index === 0 ? item.jobTitle : "";
  //       finalData.range = item.payData.length > 1 ? pData.range : pData.month;
  //       finalData.hours = pData.hours;
  //       finalData.baseSalary = pData.baseSalary;
  //       finalData.shiftAllowance = pData.shiftAllowance;
  //       finalData.totalAmount = pData.totalAmount;
  //       i = i + 1;
  //       payableData.push(finalData);
  //     });
  //   });
  //   setFinalData(payableData);
  // };

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
    if (!row.baseSalary?.toString() || !row.shiftAllowance?.toString()) {
      toast.error("Please fill out the required fields");
      return false;
    }
    return true;
  };

  const processRowUpdate = (newRow) => {
    console.log("Row update", newRow);
    let updatedRow = { ...newRow };
    if (validateRow(newRow)) {
      setRowsModesModel({
        ...rowModesModel,
        [newRow["id"]]: {
          mode: GridRowModes.View,
          ignoreModifications: true,
        },
      });

      const payload = {
        baseSalary: newRow.baseSalary,
        shiftAllowance: newRow.shiftAllowance,
      };
      if (!updatedRow.isNew) {
        const updatePayload = {
          id: updatedRow.id,
          payload: payload,
        };
        dispatch(updatePayable(updatePayload));
        setTimeout(() => {
          dispatch(
            fetchAllPayable({
              page: page,
              pageSize: pageSize,
              fromDate: fromDate,
              toDate: toDate,
              userId: empId,
            })
          );
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
    setRowsModesModel({
      ...rowModesModel,
      [rowId]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const handleExportClick = (columns, rows) => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      columns.map((column) => column.headerName).join(",") +
      "\n" +
      rows
        .map((row) => columns.map((column) => row[column.field]).join(","))
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "export.csv");
    document.body.appendChild(link);
    link.click();
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
      hide: true,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 3.5,
      disableColumnMenu: true,
      sortable: false,
      //editable: true,
    },
    {
      field: "jobName",
      headerName: "Job Title",
      flex: 2.0,
      disableColumnMenu: true,
      sortable: false,
      //editable: true,
    },
    {
      field: "range",
      headerName: "Date Range",
      flex: 5.5,
      disableColumnMenu: true,
      sortable: false,
      //editable: true,
    },
    {
      field: "totalHours",
      headerName: "Total Hours",
      flex: 2,
      disableColumnMenu: true,
      sortable: false,
      //editable: true,
    },
    {
      field: "baseSalary",
      headerName: "Base Salary",
      flex: 2,
      disableColumnMenu: true,
      sortable: false,
      editable: true,
    },
    {
      field: "shiftAllowance",
      headerName: "Shift Allowance",
      flex: 2.5,
      disableColumnMenu: true,
      sortable: false,
      editable: true,
    },
    {
      field: "totalAmount",
      headerName: "Total Ammount",
      flex: 2.5,
      disableColumnMenu: true,
      sortable: false,
      //   editable: true,
    },
    {
      field: "Actions",
      headerName: "Actions",
      flex: 3,
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
                onClick={() => handleCancelClick(params.id)}
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
            </div>,
          ];
        }
      },
    },
  ];

  const columnsForExport = [
    {
      field: "name",
      headerName: "Name",
      flex: 2.0,
      disableColumnMenu: true,
      //editable: true,
    },
    {
      field: "jobName",
      headerName: "Job Title",
      flex: 2.0,
      disableColumnMenu: true,
      //editable: true,
    },
    {
      field: "range",
      headerName: "Date Range",
      flex: 4.5,
      disableColumnMenu: true,
      //editable: true,
    },
    {
      field: "totalHours",
      headerName: "Total Hours",
      flex: 1.75,
      disableColumnMenu: true,
      //editable: true,
    },
    {
      field: "baseSalary",
      headerName: "Base Salary",
      flex: 1.75,
      disableColumnMenu: true,
      editable: true,
    },
    {
      field: "shiftAllowance",
      headerName: "Shift Allowance",
      flex: 1.5,
      disableColumnMenu: true,
      editable: true,
    },
    {
      field: "totalAmount",
      headerName: "Total Ammount",
      flex: 1.5,
      disableColumnMenu: true,
      //   editable: true,
    },
  ];

  const exportToCSV = () => {
    handleExportClick(columnsForExport, formattedDataForDownload);
  };

  const handlePaginationChange = (params) => {
    console.log("In function");
    setPage(params.page);
    setPageSize(params.pageSize);
  };

  const columnsForFiles = [
    "Name",
    "Job Title",
    "Date Range",
    "Total Hours",
    "Base Salary",
    "Shift Allowance",
    "Total Ammount",
  ];

  return (
    <>
      <CLoader show={isPayableLoading} />
      <div className="main-container">
        <div className="main-header">
          <h2>Payable</h2>
          <div className="add-btns payable-top-btns">
            <div className="form-group">
              <CDateRangePicker
                handleDates={setRangeDates}
                view={"payableCalendar"}
              />
            </div>
            <div className="form-group">
              <Select
                value={empId}
                onChange={(e) => setEmpId(e.target.value)}
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
            <Button className="btn-primary" onClick={exportToCSV}>
              Download CSV
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
                // sorting: {
                //   sortModel: [{ field: "id", sort: "desc" }],
                // },
                pagination: { paginationModel: { pageSize: 25 } },
              }}
              rowCount={totalRows}
              pageSize={pageSize}
              page={page}
              columns={columns}
              rows={finalData}
              paginationMode="sever"
              editMode="row"
              autoHeight={false}
              getRowId={(row) => row.id}
              rowSelection={false}
              rowModesModel={rowModesModel}
              onRowEditStart={handleRowEditStart}
              onRowEditStop={handleRowEditStop}
              processRowUpdate={processRowUpdate}
              experimentalFeatures={{ newEditingApi: true }}
              onPaginationModelChange={(e) => handlePaginationChange(e)}
              // hideFooterPagination
              // hideFooter
              pagination={true}
              disableColumnFilter
              hover={false}
              className="payblelist_table"
              localeText={{ noRowsLabel: "No records found" }}
            />
          </Box>
        </div>
      </div>
    </>
  );
};

export default PayableList;
