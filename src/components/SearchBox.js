import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { COUNTRY_RESET } from "../redux/constants/countryConstants";

function SearchBox() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      dispatch({ type: COUNTRY_RESET });
      navigate(`/country/?country=${keyword}`);
      setKeyword("");
    } else {
      navigate("/");
      setKeyword("");
    }
  };

  return (
    <Form onSubmit={submitHandler}>
      <Row>
        <Col>
          <Form.Control
            type="text"
            name="q"
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search Countries..."
            className="mr-sm-2 ml-sm-3"
            value={keyword}
          ></Form.Control>
        </Col>
        <Col>
          <Button type="submit" variant="outline-primary" className="p-1">
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default SearchBox;
