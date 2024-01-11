// import { API_KEY, API_URL_BASE } from "@env";
import axios from "axios";

// TODO: Add the GPS location to urls
const API_KEY = "b33a2bc8da394513976e30f41a04044d";
const API_URL_BASE = "https://newsapi.org/v2";

const urlTopUs = `${API_URL_BASE}/top-headlines?country=us&apiKey=${API_KEY}`;
const urlRecommendedUs = `${API_URL_BASE}/top-headlines?q=us&category=technology&apiKey=${API_KEY}`;
const urlEverythingUS = `${API_URL_BASE}/everything?q=us&apiKey=${API_KEY}`;

const urlDiscover = (discover) =>
  `${API_URL_BASE}/top-headlines?country=us&category=${discover}&apiKey=${API_KEY}`;
const urlSearch = (search) =>
  `${API_URL_BASE}/everything?q=${search}&apiKey=${API_KEY}`;

const callApi = async (url, params) => {
  const options = {
    method: "GET",
    url: url,
    params: params ? params : {},
  };
  try {
    const { data } = await axios(options);
    // console.log("Status" + data.status);
    // console.log("Log after axios kicks in:" + JSON.parse(data.articles));
    return data;
  } catch (error) {
    console.log(error);
    return {};
  }
};

const callApiAct  = () => {
  return axios
    .get(urlTopUs)
    .then(function (response) {
      // console.log(response.data);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return {};
    })
    .finally(function () {
      console.log("api cycle completed.");
    });
};

export const fetchTopUs = async () => {
  return await callApi(urlTopUs);
};

export const fetchRecommendedUs = async () => {
  return await callApi(urlRecommendedUs);
};

export const fetchEverythingUs = async () => {
  return await callApi(urlEverythingUS);
};

export const fetchDiscover = async (discover) => {
  return await callApi(urlDiscover(discover));
};

export const fetchSearch = async (search) => {
  return await callApi(urlSearch(search));
};

export const fetchTopUsAct = async () => {
  return await callApiAct();
};
