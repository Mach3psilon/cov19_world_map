import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Message from "./Message";

test("Message renders and displays child correctly", () => {
  const { getByText } = render(<Message variant="info">test</Message>);
  // eslint-disable-next-line testing-library/prefer-screen-queries
  expect(getByText("test")).toBeInTheDocument();
});
