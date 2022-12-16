import {
  ALL_COUNTRIES_SUCCESS,
  ALL_COUNTRIES_FAIL,
  ALL_COUNTRIES_REQUEST,
  ALL_COUNTRIES_RESET,
  COUNTRY_FAIL,
  COUNTRY_SUCCESS,
  COUNTRY_REQUEST,
  COUNTRY_RESET,
} from "../constants/countryConstants";
import axios from "axios";
import keys from "../secrets.json";

export const getAllCountries = () => async (dispatch) => {
  try {
    dispatch({ type: COUNTRY_RESET });
    dispatch({ type: ALL_COUNTRIES_REQUEST });

    const { data } = await axios({
      method: "get",
      url: "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json",
    });

    dispatch({
      type: ALL_COUNTRIES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_COUNTRIES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getCountry = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_COUNTRIES_RESET });
    dispatch({ type: COUNTRY_REQUEST });
    const options = {
      method: "GET",
      url: "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/total",
      params: { country: id },
      headers: {
        "X-RapidAPI-Key": keys["X-RapidAPI-Key"],
        "X-RapidAPI-Host": keys["X-RapidAPI-Host"],
      },
    };
    const { data } = await axios(options);

    dispatch({
      type: COUNTRY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COUNTRY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
