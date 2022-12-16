import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Header from "./Header";

import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { legacy_createStore as createStore, combineReducers } from "redux";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

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
const { getByText } = render();
// eslint-disable-next-line testing-library/prefer-screen-queries

test("Header renders correctly", () => {
  const { getByText } = render(
    <Provider store={mockStore}>
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </Provider>
  );
  // eslint-disable-next-line testing-library/prefer-screen-queries
  expect(getByText("Covid-19 World Map")).toBeInTheDocument();
});

test("Clicking text Covid-19 World Map navigates to /", () => {
  const { getByText } = render(
    <Provider store={mockStore}>
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </Provider>
  );
  // eslint-disable-next-line testing-library/prefer-screen-queries
  userEvent.click(getByText("Covid-19 World Map"));
  expect(mockedUsedNavigate).toHaveBeenCalledWith("/", {
    replace: false,
    state: undefined,
  });
});
