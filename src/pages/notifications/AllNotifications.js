import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/joy";
import {
  fetchNotificationList,
  fetchNotificationById,
  clearAllNotification,
  seeNotification,
  getNotificationCount,
} from "../../slices/NotificationSlice.js";
import { CNotificationDialog } from "../../common/CNotificationDialog.js";
import { ReactComponent as CloseIcon } from "../../assets/img/close-icon.svg";
import { ReactComponent as BackBtn } from "../../assets/img/back-btn.svg";
import { ReactComponent as LeftArrow } from "../../assets/img/prev-arrow.svg";
import { ReactComponent as RightArrow } from "../../assets/img/next-arrow.svg";
import ReactPaginate from "react-paginate";
import moment from "moment";
const AllNotifications = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const url = useLocation();
  const [notificationData, setNotificationData] = useState([]);
  const {
    allNotifications,
    notificationDetails,
    notificationCount,
    totalRowsData,
  } = useSelector((state) => state?.notification);
  const [showNotifyPopup, setShowNotifyPopup] = React.useState({
    show: false,
    id: null,
    mode: "",
  });

  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);
  const [totalRows, setTotalRows] = useState();
  const [pageCount, setPageCount] = useState();

  // useEffect(() => {
  //   dispatch(fetchNotificationList());
  // }, []);

  useEffect(() => {
    let pageData = {
      page: page,
      pageSize: pageSize,
    };
    dispatch(fetchNotificationList(pageData));
  }, [page]);

  useEffect(() => {
    setTotalRows(totalRowsData);
  }, [totalRowsData]);

  useEffect(() => {
    setPageCount(Math.ceil(totalRowsData / pageSize));
  }, [totalRows]);

  useEffect(() => {
    setNotificationData(allNotifications);
  }, [allNotifications]);

  const openNotifyPopup = (id) => {
    setShowNotifyPopup({
      show: true,
      id: "",
      mode: "",
    });
    dispatch(fetchNotificationById(id)).then((res) => {
      if (!res.error) {
        dispatch(fetchNotificationList());
        dispatch(getNotificationCount());
      }
    });
  };

  const seeNotificationHandle = (notiId) => {
    const data = {
      id: notiId,
    };
    dispatch(seeNotification(data)).then((res) => {
      if (!res.error) {
      }
    });
  };

  const handlePageClick = (selectedPage) => {
    setPage(selectedPage.selected);
  };

  return (
    <>
      {showNotifyPopup.show && (
        <CNotificationDialog
          description={"Are you sure you want to delete this Shift?"}
          showNotifyPopup={showNotifyPopup.show}
          onClose={() => setShowNotifyPopup({ show: false, id: null })}
          notificationDetails={notificationDetails}
          mode={showNotifyPopup.mode}
          closeIcon={<CloseIcon />}
        />
      )}
      <div className="profile-container extra-notification-container">
        <div className="notification-heading">
          <Button onClick={() => history(-1)}>
            <BackBtn />
          </Button>
          <h2>Notifications</h2>
        </div>
        <div className="card-box extra-notification">
          <div className="form-content">
            {notificationData.length > 0 && (
              <div className="notification-list ">
                {notificationData?.map((item) => {
                  return (
                    <div
                      className="box"
                      id={item.seenAdmin ? "" : "noti-status"}
                    >
                      <span
                        className={
                          item.title === "Swap" ? "noti-title1" : "noti-title2"
                        }
                      >
                        {item.title} Shift
                      </span>
                      <p>
                        {item?.description?.acceptBy} accepted{" "}
                        {item?.description?.assignedTo}’s{" "}
                        {item?.description?.day} {item?.description?.shiftType}{" "}
                        shift from {item?.description?.fromTime} to{" "}
                        {item?.description?.toTime} on {item?.description?.date}
                      </p>
                      <span className="textDay">
                        {moment(item.createdAt).format("DD/MM/YYYY, hh:mm A")}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          {/* <div className="save-rate">
            <Button className="btn-thin-primary" onClick={redirectToDashboard}>
              Cancel
            </Button>
            {mode !== pageMode.VIEW && (
              <Button className="btn-primary" onClick={handleSubmit}>
                Update
              </Button>
            )}
          </div> */}
        </div>
        <div>
          <ReactPaginate
            pageCount={pageCount}
            pageRangeDisplayed={5}
            marginPagesDisplayed={2}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
            previousLabel={<LeftArrow />}
            nextLabel={<RightArrow />}
          />
        </div>
      </div>
    </>
  );
};
export default AllNotifications;
