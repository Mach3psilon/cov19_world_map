import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import SearchBox from "./SearchBox";

import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { legacy_createStore as createStore, combineReducers } from "redux";
import userEvent from "@testing-library/user-event";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

const reducer = combineReducers({
  countries: () => [],
  country: () => [],
});
const initialState = { country: "" };
const mockStore = createStore(reducer, composeWithDevTools());
let store, wrapper;

//store = mockStore(initialState);
const { getByTestId } = render();
// eslint-disable-next-line testing-library/prefer-screen-queries

test("SearchBox renders correctly", () => {
  const { getByPlaceholderText } = render(
    <Provider store={mockStore}>
      <SearchBox />
    </Provider>
  );
  // eslint-disable-next-line testing-library/prefer-screen-queries
  expect(getByPlaceholderText("Search Countries...")).toBeInTheDocument();
});

test("SearchBox input value changes correctly", () => {
  const { getByPlaceholderText } = render(
    <Provider store={mockStore}>
      <SearchBox />
    </Provider>
  );
  // eslint-disable-next-line testing-library/prefer-screen-queries
  const input = getByPlaceholderText("Search Countries...");
  userEvent.type(input, "test");
  expect(input).toHaveValue("test");
});

test("SearchBox button click works correctly", () => {
  const { getByPlaceholderText, getByRole } = render(
    <Provider store={mockStore}>
      <SearchBox />
    </Provider>
  );
  // eslint-disable-next-line testing-library/prefer-screen-queries
  const input = getByPlaceholderText("Search Countries...");
  userEvent.type(input, "test");
  expect(input).toHaveValue("test");
  // eslint-disable-next-line testing-library/prefer-screen-queries
  userEvent.click(getByRole("button"));
  expect(mockedUsedNavigate).toHaveBeenCalledWith("/country/?country=test");
});


