import { Button } from "@mui/joy";
import React, { useEffect, useState } from "react";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { AssignEmployeeModal } from "./AssignEmployeeModal";
import { RepeatScheduleModal } from "./RepeatScheduleModal";
import { useNavigate } from "react-router-dom";
import { ReactComponent as CloseIcon } from "../../assets/img/close-icon.svg";
import ChipsList from "../../common/ChipsList.js";
import { Select, TextField, MenuItem } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { fetchAllShifts } from "../../slices/ShiftsSlice";
import { useDispatch, useSelector } from "react-redux";
import { getScheduleData } from "../../slices/ScheduleShiftsSlice";
import { ReactComponent as RepeatIcon } from "../../assets/img/repeat.svg";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import CDateRangePicker from "../../common/CDateRangePicker.js";
import { toast } from "react-toastify";
import CLoader from "../../common/CLoader.js";

const ScheduleShifts = () => {
  const { shiftList } = useSelector((state) => state?.shifts);
  const { calendarData, isScheduleShiftsLoading } = useSelector(
    (state) => state?.scheduleShifts
  );
  const [shiftsData, setShiftsData] = useState();
  const [dateRange, setDateRange] = useState();
  const [headerData, setHeaderData] = useState();
  const [calData, setCalData] = useState();
  const [shiftType, setShiftType] = useState();
  const [showPopup, setShowPopup] = useState({
    show: false,
    id: null,
    mode: "",
  });

  const [showRepatPopup, setShowRepeatPopup] = useState({
    show: false,
    id: null,
    mode: "",
  });

  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();

  const [res, setRes] = useState([]);

  // const res = [
  //   {
  //     jobId: 1,
  //     jobName: "Chef",
  //     row: [
  //       {
  //         date: "05/12/2023",
  //         day: "Monday",
  //         user: [
  //           {
  //             id: 1,
  //             userName: "Joey",
  //             type: "checkIn",
  //           },
  //           {
  //             id: 2,
  //             userName: "Rachel",
  //             type: "checkOut",
  //           },
  //           {
  //             id: 3,
  //             userName: "John",
  //             type: "breakIn",
  //           },
  //           {
  //             id: 4,
  //             userName: "Monika",
  //             type: "breakIn",
  //           },
  //           {
  //             id: 5,
  //             userName: "Rechard",
  //             type: "checkOut",
  //           },
  //         ],
  //       },
  //       {
  //         date: "06/12/2023",
  //         day: "Tuesday",
  //         user: [
  //           {
  //             id: 1,
  //             userName: "test1",
  //             type: "notStarted",
  //           },
  //           {
  //             id: 2,
  //             userName: "test2",
  //             type: "notStarted",
  //           },
  //           {
  //             id: 3,
  //             userName: "test3",
  //             type: "notStarted",
  //           },
  //           {
  //             id: 4,
  //             userName: "test4",
  //             type: "checkOut",
  //           },
  //         ],
  //       },
  //       {
  //         date: "07/12/2023",
  //         day: "Wenesday",
  //         user: [
  //           {
  //             id: 1,
  //             userName: "test1",
  //             type: "breakIn",
  //           },
  //           {
  //             id: 2,
  //             userName: "test2",
  //             type: "breakIn",
  //           },
  //           {
  //             id: 3,
  //             userName: "test3",
  //             type: "notStarted",
  //           },
  //           {
  //             id: 4,
  //             userName: "test4",
  //             type: "notStarted",
  //           },
  //         ],
  //       },
  //       {
  //         date: "08/12/2023",
  //         day: "Thurday",
  //         user: [
  //           {
  //             id: 1,
  //             userName: "test1",
  //             type: "checkOut",
  //           },
  //           {
  //             id: 2,
  //             userName: "test2",
  //             type: "checkOut",
  //           },
  //           {
  //             id: 3,
  //             userName: "test3",
  //             type: "checkOut",
  //           },
  //           {
  //             id: 4,
  //             userName: "test4",
  //             type: "checkIn",
  //           },
  //         ],
  //       },
  //       {
  //         date: "09/12/2023",
  //         day: "Friday",
  //         user: [
  //           {
  //             id: 1,
  //             userName: "test1",
  //             type: "breakIn",
  //           },
  //           {
  //             id: 2,
  //             userName: "test2",
  //             type: "breakIn",
  //           },
  //           {
  //             id: 3,
  //             userName: "test3",
  //             type: "breakIn",
  //           },
  //           {
  //             id: 4,
  //             userName: "test4",
  //             type: "checkIn",
  //           },
  //         ],
  //       },
  //       {
  //         date: "10/12/2023",
  //         day: "Saturday",
  //         user: [
  //           {
  //             id: 1,
  //             userName: "test1",
  //             type: "checkIn",
  //           },
  //           {
  //             id: 2,
  //             userName: "test2",
  //             type: "breakIn",
  //           },
  //           {
  //             id: 3,
  //             userName: "test3",
  //             type: "notStarted",
  //           },
  //           {
  //             id: 4,
  //             userName: "test4",
  //             type: "checkIn",
  //           },
  //         ],
  //       },
  //       {
  //         date: "11/12/2023",
  //         day: "Sunday",
  //         user: [
  //           {
  //             id: 1,
  //             userName: "test1",
  //             type: "checkIn",
  //           },
  //           {
  //             id: 2,
  //             userName: "test2",
  //             type: "checkIn",
  //           },
  //           {
  //             id: 3,
  //             userName: "test3",
  //             type: "breakIn",
  //           },
  //           {
  //             id: 4,
  //             userName: "test4",
  //             type: "checkOut",
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     jobId: 1,
  //     jobName: "Waiter",
  //     row: [
  //       {
  //         date: "05/12/2023",
  //         day: "Monday",
  //         user: [
  //           {
  //             id: 1,
  //             userName: "Joey",
  //             type: "notStarted",
  //           },
  //           {
  //             id: 2,
  //             userName: "Mohit",
  //             type: "notStarted",
  //           },
  //           {
  //             id: 3,
  //             userName: "Vatsal",
  //             type: "notStarted",
  //           },
  //           {
  //             id: 4,
  //             userName: "Prakash",
  //             type: "notStarted",
  //           },
  //           {
  //             id: 5,
  //             userName: "Ramesh",
  //             type: "notStarted",
  //           },
  //         ],
  //       },
  //       {
  //         date: "06/12/2023",
  //         day: "Tuesday",
  //         user: [
  //           {
  //             id: 1,
  //             userName: "Joey",
  //             type: "checkOut",
  //           },
  //           {
  //             id: 2,
  //             userName: "Mohit",
  //             type: "checkOut",
  //           },
  //           {
  //             id: 3,
  //             userName: "Vatsal",
  //             type: "checkIn",
  //           },
  //           {
  //             id: 4,
  //             userName: "Prakash",
  //             type: "notStarted",
  //           },
  //         ],
  //       },
  //       {
  //         date: "07/12/2023",
  //         day: "Wenesday",
  //         user: [
  //           {
  //             id: 1,
  //             userName: "test1",
  //             type: "checkIn",
  //           },
  //           {
  //             id: 2,
  //             userName: "test2",
  //             type: "notStarted",
  //           },
  //           {
  //             id: 3,
  //             userName: "test3",
  //             type: "notStarted",
  //           },
  //           {
  //             id: 4,
  //             userName: "test4",
  //             type: "checkIn",
  //           },
  //         ],
  //       },
  //       {
  //         date: "08/12/2023",
  //         day: "Thurday",
  //         user: [
  //           {
  //             id: 1,
  //             userName: "test1",
  //             type: "breakIn",
  //           },
  //           {
  //             id: 2,
  //             userName: "test2",
  //             type: "breakIn",
  //           },
  //           {
  //             id: 3,
  //             userName: "test3",
  //             type: "breakIn",
  //           },
  //           {
  //             id: 4,
  //             userName: "test4",
  //             type: "checkIn",
  //           },
  //         ],
  //       },
  //       {
  //         date: "09/12/2023",
  //         day: "Friday",
  //         user: [
  //           {
  //             id: 1,
  //             userName: "test1",
  //             type: "checkOut",
  //           },
  //           {
  //             id: 2,
  //             userName: "test2",
  //             type: "checkOut",
  //           },
  //           {
  //             id: 3,
  //             userName: "test3",
  //             type: "checkOut",
  //           },
  //           {
  //             id: 4,
  //             userName: "test4",
  //             type: "breakIn",
  //           },
  //         ],
  //       },
  //       {
  //         date: "10/12/2023",
  //         day: "Saturday",
  //         user: [
  //           {
  //             id: 1,
  //             userName: "test1",
  //             type: "checkIn",
  //           },
  //           {
  //             id: 2,
  //             userName: "test2",
  //             type: "notStarted",
  //           },
  //           {
  //             id: 3,
  //             userName: "test3",
  //             type: "checkOut",
  //           },
  //           {
  //             id: 4,
  //             userName: "test4",
  //             type: "notStarted",
  //           },
  //           {
  //             assignEmployee: "Assign 2 Employee",
  //             type: "Assign Button",
  //           },
  //         ],
  //       },
  //       {
  //         date: "11/12/2023",
  //         day: "Sunday",
  //         user: [],
  //       },
  //     ],
  //   },
  // ];

  const setRangeDates = (fDate, tDate) => {
    setFromDate(fDate);
    setToDate(tDate);
  };

  // useEffect(() => {
  //   let data = {
  //     fromDate: "2023/12/11",
  //     toDate: "2023/12/17",
  //   };

  //   // let data = {
  //   //   fromDate: fromDate,
  //   //   toDate: toDate,
  //   //   shiftType: "shiftType",
  //   // };
  //   dispatch(getScheduleData(data));
  //   setRes(calendarData);
  // }, []);

  // useEffect(() => {
  //   const startOfWeek = moment().startOf("week").toDate();
  //   const endOfWeek = moment().endOf("week").toDate();
  //   let data = {
  //     fromDate: moment(startOfWeek).format("DD/MM/YYYY"),
  //     toDate: moment(endOfWeek).format("DD/MM/YYYY"),
  //     shiftId: shiftType,
  //   };
  //   dispatch(getScheduleData(data));
  //   setRes(calendarData);
  // }, []);

  useEffect(() => {
    setRes(calendarData);
  }, [calendarData]);

  useEffect(() => {
    if (fromDate !== toDate && shiftType) {
      let data = {
        fromDate: fromDate,
        toDate: toDate,
        shiftId: shiftType,
      };
      dispatch(getScheduleData(data));
      setRes(calendarData);
    }
  }, [fromDate, toDate, shiftType]);

  // useEffect(() => {
  //   setRes(calendarData);
  // }, [calendarData]);

  useEffect(() => {
    let column1 = [];
    let mainArr = [];

    res.map((item, index) => {
      if (index === 0) {
        item.row.map((data) => {
          let result = {};
          result.date = data.date;
          result.day = data.day;
          column1.push(result);
        });
      }
    });

    res.map((item) => {
      let tempArr = [];
      tempArr.push(item.jobName);
      item.row.map((data) => {
        tempArr.push(data.user);
      });
      mainArr.push(tempArr);
    });
    setCalData(mainArr);
    setHeaderData(column1);
    console.log("CalData", calData);
  }, [res]);

  const now = new Date();
  const history = useNavigate();
  const dispatch = useDispatch();

  // const events = [
  //   {
  //     id: 0,
  //     title: "All Day Event very long title",
  //     allDay: true,
  //     start: new Date(2015, 3, 0),
  //     end: new Date(2015, 3, 1),
  //   },
  //   {
  //     id: 1,
  //     title: "Long Event",
  //     start: new Date(2015, 3, 7),
  //     end: new Date(2015, 3, 10),
  //   },
  //   {
  //     id: 2,
  //     title: "DTS STARTS",
  //     start: new Date(2016, 2, 13, 0, 0, 0),
  //     end: new Date(2016, 2, 20, 0, 0, 0),
  //   },
  //   {
  //     id: 3,
  //     title: "DTS ENDS",
  //     start: new Date(2016, 10, 6, 0, 0, 0),
  //     end: new Date(2016, 10, 13, 0, 0, 0),
  //   },
  //   {
  //     id: 4,
  //     title: "Some Event",
  //     start: new Date(2015, 3, 9, 0, 0, 0),
  //     end: new Date(2015, 3, 10, 0, 0, 0),
  //   },
  //   {
  //     id: 5,
  //     title: "Conference",
  //     start: new Date(2015, 3, 11),
  //     end: new Date(2015, 3, 13),
  //     desc: "Big conference for important people",
  //   },
  //   {
  //     id: 6,
  //     title: "Meeting",
  //     start: new Date(2015, 3, 12, 10, 30, 0, 0),
  //     end: new Date(2015, 3, 12, 12, 30, 0, 0),
  //     desc: "Pre-meeting meeting, to prepare for the meeting",
  //   },
  //   {
  //     id: 7,
  //     title: "Lunch",
  //     start: new Date(2015, 3, 12, 12, 0, 0, 0),
  //     end: new Date(2015, 3, 12, 13, 0, 0, 0),
  //     desc: "Power lunch",
  //   },
  //   {
  //     id: 8,
  //     title: "Meeting",
  //     start: new Date(2015, 3, 12, 14, 0, 0, 0),
  //     end: new Date(2015, 3, 12, 15, 0, 0, 0),
  //   },
  //   {
  //     id: 9,
  //     title: "Happy Hour",
  //     start: new Date(2015, 3, 12, 17, 0, 0, 0),
  //     end: new Date(2015, 3, 12, 17, 30, 0, 0),
  //     desc: "Most important meal of the day",
  //   },
  //   {
  //     id: 10,
  //     title: "Dinner",
  //     start: new Date(2015, 3, 12, 20, 0, 0, 0),
  //     end: new Date(2015, 3, 12, 21, 0, 0, 0),
  //   },
  //   {
  //     id: 11,
  //     title: "Birthday Party",
  //     start: new Date(2015, 3, 13, 7, 0, 0),
  //     end: new Date(2015, 3, 13, 10, 30, 0),
  //   },
  //   {
  //     id: 12,
  //     title: "Late Night Event",
  //     start: new Date(2015, 3, 17, 19, 30, 0),
  //     end: new Date(2015, 3, 18, 2, 0, 0),
  //   },
  //   {
  //     id: 12.5,
  //     title: "Late Same Night Event",
  //     start: new Date(2015, 3, 17, 19, 30, 0),
  //     end: new Date(2015, 3, 17, 23, 30, 0),
  //   },
  //   {
  //     id: 13,
  //     title: "Multi-day Event",
  //     start: new Date(2015, 3, 20, 19, 30, 0),
  //     end: new Date(2015, 3, 22, 2, 0, 0),
  //   },
  //   {
  //     id: 14,
  //     title: "Today",
  //     start: new Date(new Date().setHours(new Date().getHours() - 3)),
  //     end: new Date(new Date().setHours(new Date().getHours() + 3)),
  //   },
  //   {
  //     id: 15,
  //     title: "Point in Time Event",
  //     start: now,
  //     end: now,
  //   },
  // ];

  const resources = [
    { id: "room1", title: "Room 1" },
    { id: "room2", title: "Room 2" },
    // Add more resources as needed
  ];

  const events = [
    {
      id: 1,
      title: "Meeting 1",
      start: new Date(2023, 0, 1, 10, 0),
      end: new Date(2023, 0, 1, 12, 0),
      resourceId: "room1",
    },
    {
      id: 2,
      title: "Meeting 2",
      start: new Date(2023, 0, 1, 14, 0),
      end: new Date(2023, 0, 1, 16, 0),
      resourceId: "room2",
    },
    // Add more events as needed
  ];

  const assignEmployeeHandle = () => {
    setShowPopup({
      show: true,
      id: null,
      mode: "add",
    });
  };

  const repeatScheduleHandle = () => {
    setShowRepeatPopup({
      show: true,
      id: null,
      mode: "add",
    });
  };

  const handleEmployeeAttendance = (e) => {
    history("/scheduleshift/attendance");
  };

  useEffect(() => {
    dispatch(fetchAllShifts());
  }, []);

  useEffect(() => {
    setShiftsData(shiftList);
  }, [shiftList]);

  useEffect(() => {
    if (!shiftType) {
      shiftsData?.map((item, index) => {
        if (index === 0) {
          setShiftType(item?.id);
        }
      });
    }
  }, [shiftsData]);

  const refreshCalendar = () => {
    if (fromDate !== toDate) {
      let data = {
        fromDate: fromDate,
        toDate: toDate,
        type: shiftType,
        mode: "refresh",
      };
      dispatch(getScheduleData(data)).then((res) => {
        if (!res.error) {
        }
      });
      setRes(calendarData);
    }
  };

  // const CustomEvent = () => (
  //   <div>
  //     {/* Your custom column content */}
  //     <div
  //       style={{
  //         backgroundColor: "lightblue",
  //         padding: "5px",
  //         marginRight: "10px",
  //       }}
  //     >
  //       Test
  //     </div>
  //     {/* Default event content */}
  //     <div style={{ backgroundColor: "lightgreen", padding: "5px" }}>Event</div>
  //   </div>
  // );

  return (
    <>
      <CLoader show={isScheduleShiftsLoading} />
      {showPopup.show && (
        <AssignEmployeeModal
          title={"Assign Employee"}
          showPopup={showPopup.show}
          onClose={() => setShowPopup({ show: false, id: null })}
          fromDate={fromDate}
          toDate={toDate}
          shiftType={shiftType}
          mode={showPopup.mode}
          id={showPopup.id}
        />
      )}
      {showRepatPopup.show && (
        <RepeatScheduleModal
          title={"Repeat Schedule"}
          showPopup={showRepatPopup.show}
          onClose={() => setShowRepeatPopup({ show: false, id: null })}
          fromDate={fromDate}
          toDate={toDate}
          mode={showRepatPopup.mode}
          id={showRepatPopup.id}
        />
      )}
      <div className="main-container">
        <div className="table-container">
          <div className="main-header">
            <h2>Schedule Shifts</h2>
            <div className="add-btns">
              <Button className="btn-primary" onClick={assignEmployeeHandle}>
                Assign
              </Button>
              <Button className="btn-primary" onClick={repeatScheduleHandle}>
                Repeat
              </Button>
            </div>
          </div>
          <div className="card-box schedule-shifts-card">
            {/* <Calendar
              events={events}
              startAccessor="start"
              endAccessor="end"
              defaultDate={moment().toDate()}
              localizer={localizer}
              defaultView="week"
              views={["week"]}
              //step={1440}
              onSelectEvent={(e) => handleEmployeeAttendance(e)}
              resources={resources}
              resourceIdAccessor="id"
              resourceTitleAccessor="title"
            /> */}
            <div className="calender-top">
              <div className="calender-top-date">
                <div className="form-group schedule-range-calender-picker">
                  <CDateRangePicker
                    handleDates={setRangeDates}
                    type={"Weekly"}
                  />
                </div>
                <div className="form-group">
                  <Select
                    label="Shift Type"
                    className="form-select CSelect"
                    value={Number(shiftType)}
                    onChange={(e) => {
                      setShiftType(e.target.value);
                    }}
                    IconComponent={ExpandMoreIcon}
                  >
                    {shiftsData?.map((item, index) => (
                      <MenuItem key={index} value={item.id}>
                        {item.shiftType}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </div>
              <div>
                <Button className="btn-thin-primary" onClick={refreshCalendar}>
                  <RepeatIcon />
                </Button>
              </div>
            </div>
            {calData?.length > 0 && (
              <div className="schedule-table-content">
                <table className="schedule-table">
                  <thead>
                    <tr>
                      <th className="schedule-job">Jobs</th>
                      {headerData &&
                        headerData.map((item) => {
                          return (
                            <th>
                              <p>{item.day}</p>
                              <span>{item.date}</span>
                            </th>
                          );
                        })}
                    </tr>
                  </thead>
                  <tbody>
                    {calData &&
                      calData.map((data) => {
                        return (
                          <tr>
                            {data.map((item, index) => {
                              if (index === 0) {
                                return <td>{item}</td>;
                              } else {
                                return (
                                  <td>
                                    <ChipsList
                                      chipData={item}
                                      fromDate={fromDate}
                                      toDate={toDate}
                                      shiftType={shiftType}
                                    />{" "}
                                  </td>
                                );
                              }
                            })}
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            )}

            {calData?.length === 0 && (
              <div className="schedule-table-no-data">
                <p>No data found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ScheduleShifts;
