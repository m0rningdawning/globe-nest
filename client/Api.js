import { API_KEY, API_URL_BASE } from "@env";
import axios from "axios";

// TODO: Add the GPS location to urls

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
    url,
    params,
  };
  try {
    const { data } = await axios(options);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchTopUs = async () => await callApi(urlTopUs);
export const fetchRecommendedUs = async () => await callApi(urlRecommendedUs);
export const fetchEverythingUs = async () => await callApi(urlEverythingUS);

export const fetchDiscover = async (discover) => {
  await callApi(urlDiscover(discover));
};

export const fetchSearch = async (search) => {
  await callApi(urlSearch(search));
};
