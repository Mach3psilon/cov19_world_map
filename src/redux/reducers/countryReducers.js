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

export const getAllCountriesReducer = (state = { countries: [] }, action) => {
  switch (action.type) {
    case ALL_COUNTRIES_REQUEST:
      return { loading: true, countries: [] };
    case ALL_COUNTRIES_SUCCESS:
      return { loading: false, countries: action.payload };
    case ALL_COUNTRIES_FAIL:
      return { loading: false, error: action.payload };
    case ALL_COUNTRIES_RESET:
      return { loading: false, countries: [] };
    default:
      return state;
  }
};

export const getCountryReducer = (state = { country: null }, action) => {
  switch (action.type) {
    case COUNTRY_REQUEST:
      return { loading: true, country: null };
    case COUNTRY_SUCCESS:
      return { loading: false, country: action.payload };
    case COUNTRY_FAIL:
      return { loading: false, error: action.payload };
    case COUNTRY_RESET:
      return { loading: false, country: null };
    default:
      return state;
  }
};
