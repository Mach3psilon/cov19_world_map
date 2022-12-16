import React, { useEffect, useState } from "react";
import { Container, Button, Row, Col, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getCountry } from "../redux/actions/countryActions";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import "./CountryScreen.css";

function CountryScreen() {
  const navigate = useNavigate();
  const [countryData, setCountryData] = useState(null);

  const [searchParams] = useSearchParams();
  const countryName = decodeURIComponent(searchParams.get("country"));

  const dispatch = useDispatch();

  const countryInfo = useSelector((state) => state.country);
  const { loading, error, country } = countryInfo;

  useEffect(() => {
    if (!country) {
      dispatch(getCountry(countryName));
    } else {
      if (country.data.location === "Global") {
        setCountryData(null);
      } else setCountryData(country);
    }
  }, [dispatch, country, loading, countryName]);

  const handleClick = () => {
    navigate("/");
  };
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : countryData === null ? (
    <Container>
      <Row className="justify-content-center">
        <h1>Country data not found</h1>
        <Button onClick={handleClick} style={{ width: "45%" }} size="lg">
          Go Back
        </Button>
      </Row>
    </Container>
  ) : countryData.data.location === "Global" ? (
    <Container>
      <Row className="justify-content-center">
        <h1>Country data not found</h1>
        <Button onClick={handleClick} style={{ width: "45%" }} size="lg">
          Go Back
        </Button>
      </Row>
      <Row className="justify-content-center">
        <Image src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-536.jpg?w=826&t=st=1671054130~exp=1671054730~hmac=153b6ea837042af0ed24d6901cacf65eb66e1b64f0e4687bf30997a4b1878768"></Image>
      </Row>
    </Container>
  ) : (
    <Container>
      <Row className="justify-content-center">
        <h1>{countryData.data.location}</h1>
      </Row>
      <Row className="justify-content-center">
        <Col>
          <h3>
            Confirmed Cases: <br></br>
            {countryData.data.confirmed}
          </h3>
        </Col>
        <Col>
          <h3>
            Deaths: <br></br>
            {countryData.data.deaths}
          </h3>
        </Col>
      </Row>
      {countryData.data.recovered ? (
        <Row className="justify-content-center">
          <Col>
            <h3>
              Recovered: <br></br>
              {countryData.data.recovered}{" "}
            </h3>
          </Col>
        </Row>
      ) : null}

      <Row className="justify-content-center" lg={2}>
        <Image src="https://img.freepik.com/free-vector/covid-19-abstract-concept-vector-illustration-coronavirus-worldwide-pandemic-covid-19-victims-infection-outbreak-statistics-death-toll-emergency-state-quarantine-measure-abstract-metaphor_335657-1597.jpg?w=826&t=st=1671054687~exp=1671055287~hmac=2a9d014fa4c16795913571748f0432466534c31856e82ace7ffd71ccc873eb41"></Image>
      </Row>
      <Row className="justify-content-center">
        <Col>
          <h3>
            Last Checked: <br></br>
            {countryData.data.lastChecked.slice(0, 10)}
          </h3>
        </Col>
        <Col>
          <h3>
            Last Reported: <br></br>
            {countryData.data.lastReported.slice(0, 10)}
          </h3>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Button
          onClick={handleClick}
          style={{ width: "45%", marginTop: "25px" }}
          size="lg"
        >
          Go Back
        </Button>
      </Row>
    </Container>
  );
}

export default CountryScreen;
