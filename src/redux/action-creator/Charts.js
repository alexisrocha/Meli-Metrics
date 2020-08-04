import {
  GET_CHART,
  DELETE_CHART,
  SELECTED_CHART,
  SET_SELECTEDCHART,
  ADD_METRIC,
  DELETE_METRIC,
  COPY_CHART,
  CHANGE_NAME,
  CHANGE_METRIC_INFO,
  CHANGE_VISUALIZATION,
  CHART_TO_VERSUS,
  DELETE_ROW,
  ADD_NAME,
  DELETE_NAME,
  ADD_CHART_TO_VERSUS,
} from "../constants";
import axios from "axios";

let host = "https://run.mocky.io/v3/";

let url = {
  "Buy Box - GMV": `5ceb55d7-2f8b-44ee-818c-28c7fe46d36c`,
  "CBT - ASP(e) Billable": "6477bf45-b68e-45f3-83a5-1a798c517ac6",
  "Avg Shipping Time": "3af1379f-4676-4d4e-958f-d5fb9c379fd4",
  "Devices Sold": `5b620a5b-4941-4b65-acdb-02da3bebb863`,
  "New Buyers": "25e5d4bf-fca9-4161-9175-72020548c29a",
  "ASP per Shippment": "6c098f7d-aeb9-44e3-9dd3-40240b4c789b",
  "Unique Receivers": "226724ff-5b90-4b39-9d4c-8a32139d8ade",
  "Share GMV Buy Box": "0145f405-c88d-4aca-a056-12cc03e3c1a2",
};

let metricUrl = {
  "Buy Box - GMV": "930ee191-8d1e-43b8-b7a7-0213a31eadb9",
  "CBT - ASP(e) Billable": "d720e0d3-f70e-41e9-9abe-58285e395fed",
  "Avg Shipping Time": "ce8ec606-5383-4169-a423-a2e5620c63c7",
  "Devices Sold": "f0c1db20-2b03-4f07-80f8-d4b22e5e0257",
  "New Buyers": "60b3c552-d717-4330-a3be-dab187eb6f51",
  "ASP per Shippment": "39a9cccd-2ff2-4738-adb5-cd0b3ec68356",
  "Unique Receivers": "a697f11b-4019-4cc9-a4ee-40966f35cc64",
  "Share GMV Buy Box": "373bf76d-4695-403a-9671-a519b3151923",
};

const chartToVersus = (list, listFlag) => ({
  type: CHART_TO_VERSUS,
  list,
  listFlag,
});

const getChart = (charts) => ({
  type: GET_CHART,
  charts,
});

export const chartSelect = (selectedChart) => ({
  type: SELECTED_CHART,
  selectedChart,
});

export const deleteCharts = (id) => ({
  type: DELETE_CHART,
  id,
});

const deleteMetric = (id) => ({
  type: DELETE_METRIC,
  id,
});

export const copyList = (id) => ({
  type: COPY_CHART,
  id,
});

export const changeChart = (selectedChart) => ({
  type: SET_SELECTEDCHART,
  selectedChart,
});

const addMetric = (metric) => ({
  type: ADD_METRIC,
  metric,
});

export const changeTitle = (index, newName) => ({
  type: CHANGE_NAME,
  index,
  newName,
});

const changeInfo = (index, newChart) => ({
  type: CHANGE_METRIC_INFO,
  index,
  newChart,
});

export const changeView = (index, data) => ({
  type: CHANGE_VISUALIZATION,
  index,
  data,
});

const deleteRow = (metricID) => ({
  type: DELETE_ROW,
  metricID,
});

const addName = (flags, newList) => ({
  type: ADD_NAME,
  flags,
  newList,
});

const deleteName = (flags, newList) => ({
  type: DELETE_NAME,
  flags,
  newList,
});

const addChartToVersus = (metric) => ({
  type: ADD_CHART_TO_VERSUS,
  metric,
});

export const addToVersus = (id) => {
  return (dispatch) =>
    axios
      .get(host + metricUrl[id])
      .then((res) => res.data)
      .then((metric) => dispatch(addChartToVersus(metric)));
};

export const deleteMetrics = (metricID) => {
  return (dispatch) => {
    dispatch(deleteRow(metricID));
  };
};

export const changeView = (index, data) => {
  return (dispatch) => {
    dispatch(changeVisualization(index, data));
  };
};

export const fetchChart = (id, title) => {
  return (dispatch) =>
    axios
      .get(host + url[id])
      .then((res) => res.data)
      .then((chart) => {
        chart.title = title;
        return chart;
      })
      .then((charts) => dispatch(getChart(charts)));
};

export const removeMetric = (id, selectedChart, chartLength) => {
  if (id == 0 && chartLength == 1) {
    return (dispatch) => {
      dispatch(deleteCharts(selectedChart));
      dispatch(changeChart(0));
    };
  } else {
    return (dispatch) => {
      dispatch(deleteMetric(id));
    };
  }
};

export const addMetricToChart = (id) => {
  return (dispatch) =>
    axios
      .get(host + metricUrl[id])
      .then((res) => res.data)
      .then((metric) => dispatch(addMetric(metric)));
};

export const changeMetricInfo = (
  index,
  metric_id,
  site,
  subgroup,
  time_frame,
  comparison
) => {
  return (dispatch) => {
    let newChart = {
      metric_id,
      time_frame,
      dimension: {
        site,
        subgroup,
      },
      comparation: [comparison],
    };
    dispatch(changeInfo(index, newChart));
  };
};

export const sendToVersus = (list, listFlag) => {
  console.log("List es:", list);
  console.log("Listflags es:", listFlag);
  let listVersus = [];
  let diccionario = new Object();
  let newListFlags = [];
  if (listFlag.includes("MLA")) {
    newListFlags.push("MLA");
  }
  if (listFlag.includes("MLB")) {
    newListFlags.push("MLB");
  }
  if (listFlag.includes("MLM")) {
    newListFlags.push("MLM");
  }
  listFlag = listFlag.filter((x) => x != "MLA" && x != "MLB" && x != "MLM");
  let test = [...newListFlags, ...listFlag].slice(
    0,
    Math.min(listFlag.length + newListFlags.length, 4)
  );

  console.log("Test: ", test);
  for (let i = 0; i < list.length; i++) {
    listVersus.push({
      ...list[i],
      dimension: { ...list[i].dimension, site: test },
    });
  }

  return (dispatch) => {
    dispatch(chartToVersus(listVersus, test));
  };
};

export const addCountry = (flags, newList) => {
  console.log("Flags: ", flags);
  console.log;
  let listVersus = [];
  for (let i = 0; i < newList.length; i++) {
    listVersus.push({
      ...newList[i],
      dimension: { ...newList[i].dimension, site: flags },
    });
  }
  return (dispatch) => {
    dispatch(addName(flags, listVersus));
  };
};

export const deleteCountry = (flags, list) => {
  let listVersus = [];
  for (let i = 0; i < list.length; i++) {
    listVersus.push({
      ...list[i],
      dimension: { ...list[i].dimension, site: flags },
    });
  }
  return (dispatch) => {
    dispatch(deleteName(flags, listVersus));
  };
};
