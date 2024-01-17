import axios from "axios";

// TODO: Add the GPS location to urls
const API_KEY = "b33a2bc8da394513976e30f41a04044d";
const API_URL_BASE = "https://newsapi.org/v2";

const urlTopUs = `${API_URL_BASE}/top-headlines?country=us&apiKey=${API_KEY}`;
const urlRecommendedUs = `${API_URL_BASE}/top-headlines?country=us&category=technology&apiKey=${API_KEY}`;
const urlEverythingUS = `${API_URL_BASE}/everything?country=us&apiKey=${API_KEY}`;

const urlDiscover = (category) =>
  `${API_URL_BASE}/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`;

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

const callApiAct = (url) => {
  return axios
    .get(url)
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

// const callApiCategory = (category) => {
//   const url = `${API_URL_BASE}/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`;
//   return axios
//     .get(url)
//     .then(function (response) {
//       // console.log(response.data);
//       return response.data;
//     })
//     .catch(function (error) {
//       console.log(error);
//       return {};
//     })
//     .finally(function () {
//       console.log("api cycle completed.");
//     });
// };

export const fetchTopUs = async () => {
  return await callApi(urlTopUs);
};

export const fetchRecommendedUs = async () => {
  return await callApi(urlRecommendedUs);
};

export const fetchEverythingUs = async () => {
  return await callApi(urlEverythingUS);
};

// export const fetchDiscover = async (discover) => {
//   return await callApi(urlDiscover(discover));
// };

export const fetchSearch = async (search) => {
  return await callApi(urlSearch(search));
};

export const fetchTopUsAct = async () => {
  return await callApiAct(urlTopUs);
};

export const fetchRecommendedUsAct = async () => {
  return await callApiAct(urlRecommendedUs);
};

export const fetchCategories = async (category) => {
  return await callApiAct(urlDiscover(category));
};
