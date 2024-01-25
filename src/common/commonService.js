import httpClient from "./http-common";

const header = {
  "Content-Type": "application/json",
};
const getRequest = (url) => {
  return httpClient.execute("get", url, null, null, null, true);
};

const postRequest = (url, data) => {
  return httpClient.execute("post", url, data, null, header, true);
};

const postRequestForFormData = (url, data) => {
  return httpClient.execute(
    "post",
    url,
    data,
    null,
    { "Content-Type": "multipart/form-data" },
    true
  );
};

const putRequest = (url, data) => {
  return httpClient.execute(
    "put",
    `${url}/${data.id}`,
    data.payload,
    null,
    header,
    true
  );
};

const putRequestForFormData = (url, data) => {
  return httpClient.execute(
    "put",
    `${url}/${data.id}`,
    data.payload,
    null,
    { "Content-Type": "multipart/form-data" },
    true
  );
};

const putRequestForProfile = (url, data) => {
  return httpClient.execute(
    "put",
    url,
    data.payload,
    null,
    { "Content-Type": "multipart/form-data" },
    true
  );
};

const deleteRequest = (url, id) => {
  return httpClient.execute("delete", `${url}/${id}`, null, null, header, true);
};

const getByIdRequest = (url, id) => {
  return httpClient.execute("get", `${url}/${id}`, null, null, header, true);
};

const getRequestWithParamsForCalendar = (url, data) => {
  if (data.shiftId) {
    return httpClient.execute(
      "get",
      `${url}/?fromDate=${data.fromDate}&toDate=${data.toDate}&type=${data.shiftId}`,
      null,
      null,
      header,
      true
    );
  } else {
    return httpClient.execute(
      "get",
      `${url}/?fromDate=${data.fromDate}&toDate=${data.toDate}`,
      null,
      null,
      header,
      true
    );
  }
};

const getRequestWithParamsForPayable = (url, data) => {
  if (data.userId !== "All") {
    return httpClient.execute(
      "get",
      `${url}/?fromDate=${data.fromDate}&toDate=${data.toDate}&userId=${data.userId}&page=${data.page}&pageSize=${data.pageSize}`,
      null,
      null,
      header,
      true
    );
  } else {
    return httpClient.execute(
      "get",
      `${url}/?fromDate=${data.fromDate}&toDate=${data.toDate}&page=${data.page}&pageSize=${data.pageSize}`,
      null,
      null,
      header,
      true
    );
  }
};

const getByIdRequestWithParamsForAttendance = (url, data) => {
  if (data.userId !== "All") {
    return httpClient.execute(
      "get",
      `${url}/?fromDate=${data.fromDate}&toDate=${data.toDate}&id=${data.userId}`,
      null,
      null,
      header,
      true
    );
  } else {
    return httpClient.execute(
      "get",
      `${url}/?fromDate=${data.fromDate}&toDate=${data.toDate}`,
      null,
      null,
      header,
      true
    );
  }
};

const putRequestForNotificaion = (url) => {
  return httpClient.execute("put", url, null, null, header, true);
};

const getRequestForHolidayWithParams = (url, type) => {
  return httpClient.execute(
    "get",
    `${url}/?type=${type}`,
    null,
    null,
    header,
    true
  );
};

const getRequestForRateShiftDataGrid = (url, filterObj) => {
  const queryString = new URLSearchParams(filterObj).toString();
  return httpClient.execute(
    "get",
    `${url}/?${queryString}`,
    null,
    null,
    header,
    true
  );
};

const getRequestForNotification = (url, paginationObj) => {
  return httpClient.execute(
    "get",
    `${url}/?page=${paginationObj.page}&pageSize=${paginationObj.pageSize}`,
    null,
    null,
    header,
    true
  );
};

const getRequestForDateBasedEmployees = (url, data) => {
  return httpClient.execute(
    "get",
    `${url}/?date=${data.date}&shiftsId=${data.shiftId}`,
    null,
    null,
    header,
    true
  );
};

const commonService = {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
  getByIdRequest,
  putRequestForProfile,
  getRequestWithParamsForCalendar,
  getRequestWithParamsForPayable,
  getByIdRequestWithParamsForAttendance,
  getRequestForHolidayWithParams,
  putRequestForNotificaion,
  postRequestForFormData,
  putRequestForFormData,
  getRequestForRateShiftDataGrid,
  getRequestForNotification,
  getRequestForDateBasedEmployees,
};

export default commonService;
