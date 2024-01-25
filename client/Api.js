import { Alert, PermissionsAndroid, BackHandler } from "react-native";
import axios from "axios";
import Geolocation from "react-native-geolocation-service";

//https://newsapi.org/v2/top-headlines?country=us&apiKey=b33a2bc8da394513976e30f41a04044d

const API_KEY = "b33a2bc8da394513976e30f41a04044d";
const API_URL_BASE = "https://newsapi.org/v2";

const urlTopUs = `${API_URL_BASE}/top-headlines?country=us&apiKey=${API_KEY}`;
const urlRecommendedUs = `${API_URL_BASE}/top-headlines?country=us&category=technology&apiKey=${API_KEY}`;
const urlEverythingUS = `${API_URL_BASE}/everything?country=us&apiKey=${API_KEY}`;

const gps = false;

const urlTop = () => {
  const countryCode = fetchCountryCode();
  return `${API_URL_BASE}/top-headlines?country=${countryCode}&apiKey=${API_KEY}`;
};

const urlRecommended = () => {
  const countryCode = fetchCountryCode();
  return `${API_URL_BASE}/top-headlines?country=${countryCode}&category=technology&apiKey=${API_KEY}`;
};

const urlEverything = () => {
  const countryCode = fetchCountryCode();
  return `${API_URL_BASE}/everything?country=${countryCode}&apiKey=${API_KEY}`;
};

const urlGps = (lat, lng) =>
  `http://api.geonames.org/countryCodeJSON?lat=${lat}&lng=${lng}&username=4shensnow`;

const urlDiscover = (category) =>
  `${API_URL_BASE}/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`;

const urlSearch = (search) =>
  `${API_URL_BASE}/everything?q=${search}&apiKey=${API_KEY}`;

const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Geolocation Permission",
        message: "Can we access your location?",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );
    console.log("granted", granted);
    if (granted === "granted") {
      console.log("You can use Geolocation");
      return true;
    } else {
      console.log("You cannot use Geolocation");
      return false;
    }
  } catch (err) {
    return false;
  }
};

const fetchCountryCode = async () => {
  // const result = requestLocationPermission();
  // result.then((res) => async () => {
  //   console.log("res is:", res);
  try {
    const location = Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 10000,
    });

    const lat = location.coords.latitude;
    const lng = location.coords.longitude;

    const response = await axios.get(urlGps(lat, lng));
    console.log("response", response);

    const countryCode = response.data.countryCode;
    return countryCode.toLowerCase();
  } catch (error) {
    console.error("Error fetching country code:", error);
    return null;
  }
};

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
      if (error.response.status !== 400) {
        console.log(error);
        Alert.alert(
          "Connection Error",
          "An error occurred while trying to connect to the server.",
          [
            {
              text: "OK",
              onPress: () => BackHandler.exitApp(),
            },
          ]
        );
      }
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

export const fetchSearch = async (search) => {
  return await callApi(urlSearch(search));
};

export const fetchSearchAct = async (search) => {
  return await callApiAct(urlSearch(search));
};

export const fetchTopUsAct = async () => {
  return await callApiAct(gps ? urlTop() : urlTopUs);
};

export const fetchRecommendedUsAct = async () => {
  return await callApiAct(gps ? urlRecommended() : urlRecommendedUs);
};

export const fetchCategories = async (category) => {
  return await callApiAct(urlDiscover(category));
};
