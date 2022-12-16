import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  getAllCountriesReducer,
  getCountryReducer,
} from "./reducers/countryReducers";

const reducer = combineReducers({
  countries: getAllCountriesReducer,
  country: getCountryReducer,
});

const middleware = [thunk];

const store = createStore(

  reducer,

  composeWithDevTools(applyMiddleware(...middleware))
);



export default store;
