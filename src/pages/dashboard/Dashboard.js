import React, { useEffect, useState } from "react";
import Birthday from "../../assets/img/cake.png";
import Anniversary from "../../assets/img/anniversary.png";
import EventProfile1 from "../../assets/img/event-profile1.png";
import EventProfile2 from "../../assets/img/event-profile2.png";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fetchDashboardData } from "../../slices/DashboardSlice";
import moment from "moment";
import SampleAvtar from "../../assets/img/avtar.png";
import { fetchHolidaySettings } from "./../../slices/HolidaysSlice";
import { getProfileById } from "../../slices/ProfileSlice";
import CLoader from "../../common/CLoader";

const Dashboard = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { dashboardData, isDashboardLoading } = useSelector(
    (state) => state?.dashboard
  );
  const { settingDetails } = useSelector((state) => state?.holidays);
  const [holidaysData, setHolidaysData] = useState([]);
  const [todaysBirthdaysData, setTodaysBirthdaysData] = useState([]);
  const [upcomingBirthdaysData, setUpcomingBirthdaysData] = useState([]);
  const [todaysAnniversaryData, setTodaysAnniversaryData] = useState([]);
  const [upcomingAnniversaryData, setUpcomingAnniversaryData] = useState([]);

  useEffect(() => {
    dashboardData && setHolidaysData(dashboardData?.holidays);
    dashboardData && setTodaysBirthdaysData(dashboardData?.todaysBirthday);
    dashboardData && setUpcomingBirthdaysData(dashboardData?.upcomingBirthday);
    dashboardData &&
      setTodaysAnniversaryData(dashboardData?.todaysAnniversaries);
    dashboardData &&
      setUpcomingAnniversaryData(dashboardData?.upcomingAnniversaries);
  }, [dashboardData]);

  useEffect(() => {
    dispatch(fetchDashboardData());
    dispatch(fetchHolidaySettings());
    dispatch(getProfileById());
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 3.5,
      disableColumnMenu: true,
      editable: false,
    },
    {
      field: "holidaysName",
      headerName: "Holiday Name",
      flex: 3.5,
      disableColumnMenu: true,
      editable: false,
    },
    {
      field: "fromDate",
      headerName: "From Date",
      flex: 3.5,
      disableColumnMenu: true,
      //editable: true,
    },
    {
      field: "toDate",
      headerName: "To Date",
      flex: 3.5,
      sortable: false,
      disableColumnMenu: true,
      disableColumnFilter: true,
      disableColumnSelector: true,
    },
    {
      field: "holidaysStatus",
      headerName: "Status",
      flex: 1.5,
      disableColumnMenu: true,
    },
  ];
  var settings = {
    dots: true,
    arrow: false,
    fade: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    cssEase: "linear",
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <>
      <CLoader show={isDashboardLoading} />
      <div className="main-container">
        <h2>Dashboard</h2>
        <div className="event-items">
          {dashboardData && (
            <div className="item brithday-event">
              <Slider {...settings}>
                {!todaysBirthdaysData?.length && (
                  <div className="items">
                    <div className="inner-content">
                      <div className="event-content">
                        <h2>No Birthday Today</h2>
                      </div>
                      <div className="event-img">
                        <img src={Birthday} alt="Birthday" />
                      </div>
                    </div>
                  </div>
                )}
                {todaysBirthdaysData?.length &&
                  todaysBirthdaysData?.map((item) => {
                    return (
                      <div className="items">
                        <div className="inner-content">
                          <div className="event-content">
                            <span>
                              <img
                                src={
                                  item?.profilePicture == null
                                    ? SampleAvtar
                                    : item?.profilePicture
                                }
                                alt="profile"
                              />
                            </span>
                            <h2>{item.name}'s Birthday</h2>
                            <p>
                              {moment(item?.birthDate, "DD/MM/YYYY").format(
                                "Do MMM YYYY"
                              )}
                            </p>
                            <span>{item.categoryName}</span>
                          </div>
                          <div className="event-img">
                            <img src={Birthday} alt="Birthday" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </Slider>
              {!upcomingBirthdaysData?.length && (
                <div className="event-schedule">
                  <div>
                    <p>No Upcoming Birthday</p>
                  </div>
                </div>
              )}
              {upcomingBirthdaysData?.length
                ? upcomingBirthdaysData?.map((item) => {
                    return (
                      <div className="event-schedule">
                        <div>
                          <p>Upcoming Birthday</p>
                        </div>
                        <div>
                          <div>
                            <span>{item?.name}</span>
                            <span> | </span>
                            <span>
                              {moment(item?.birthDate, "DD/MM/YYYY").format(
                                "Do MMM YYYY"
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                : ""}
            </div>
          )}
          {dashboardData && (
            <div className="item anniversary-event">
              <Slider {...settings}>
                {!todaysAnniversaryData?.length && (
                  <div className="items">
                    <div className="inner-content">
                      <div className="event-content">
                        <h2>No Work Anniversary Today</h2>
                      </div>
                      <div className="event-img">
                        <img src={Anniversary} alt="Anniversary" />
                      </div>
                    </div>
                  </div>
                )}
                {todaysAnniversaryData?.length &&
                  todaysAnniversaryData?.map((item) => {
                    return (
                      <div className="items">
                        <div className="inner-content">
                          <div className="event-content">
                            <img
                              src={
                                item?.profilePicture == null
                                  ? SampleAvtar
                                  : item?.profilePicture
                              }
                              alt="profile"
                            />
                            <h2>{item.name}'s Work Anniversary</h2>
                            <p>
                              {moment(item?.joiningDate, "DD/MM/YYYY").format(
                                "Do MMM YYYY"
                              )}
                            </p>
                            <span>{item?.categoryName}</span>
                          </div>
                          <div className="event-img">
                            <img src={Anniversary} alt="Anniversary" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </Slider>
              {!upcomingAnniversaryData?.length && (
                <div className="event-schedule">
                  <div>
                    <p>No upcoming Work Anniversary</p>
                  </div>
                </div>
              )}
              {upcomingAnniversaryData?.length
                ? upcomingAnniversaryData?.map((item) => {
                    return (
                      <div className="event-schedule">
                        <div>
                          <p>Upcoming Anniversary</p>
                        </div>
                        {/* {upcomingAnniversaryData?.map((item) => {
              return (
                <>
                  <div>
                    <span>{item?.name}'s 1st year Anniversary</span>
                    <span> | </span>
                    <span>
                      {moment(item?.joiningDate, "DD/MM/YYYY").format(
                        "Do MMM YYYY"
                      )}
                    </span>
                  </div>
                </>
              );
            })} */}
                        <div>
                          <div>
                            <span>
                              {item?.name}'s {item?.countYears} year Anniversary
                            </span>
                            <span> | </span>
                            <span>
                              {moment(item?.joiningDate, "DD/MM/YYYY").format(
                                "Do MMM YYYY"
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                : ""}
            </div>
          )}
        </div>
        <div className="event-table card-box">
          <h3>Holidays</h3>

          <Box sx={{ width: "100%" }} className="dashboard-holiday-data">
            {holidaysData && (
              <DataGrid
                initialState={{
                  columns: {
                    columnVisibilityModel: {
                      id: false,
                    },
                  },
                }}
                columns={columns}
                rows={holidaysData}
                autoHeight={false}
                getRowId={(row) => row.id}
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

export default Dashboard;
