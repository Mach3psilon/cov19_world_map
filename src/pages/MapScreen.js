import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import ReactTooltip from "react-tooltip";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./MapScreen.css";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getAllCountries } from "../redux/actions/countryActions";
import { COUNTRY_RESET } from "../redux/constants/countryConstants";

function MapScreen() {
  const [content, setContent] = useState("");
  const [countryURL, setCountryURL] = useState("");
  const [countryData, setCountryData] = useState([]);
  const [prompt, setPrompt] = useState("Click on a country to see data");

  const dispatch = useDispatch();

  const countryList = useSelector((state) => state.countries);
  const { loading, error, countries } = countryList;

  const markers = [
    {
      markerOffset: -10,
      name: "Turkey",
      coordinates: [35.2433, 38.9637],
    },
  ];

  useEffect(() => {
    if (countries && countries.length === 0) {
      dispatch(getAllCountries());
    } else {
      setCountryData(countries);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, loading]);

  let navigate = useNavigate();
  const routeChange = () => {
    if (countryURL !== "") {
      dispatch({ type: COUNTRY_RESET });
      navigate(`/country/?country=${content}`);
    }
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Container>
      <Row className="justify-content-md-center">
        <h1>{prompt}</h1>
      </Row>
      <Row className="justify-content-md-center">
        <div className="map">
          <br></br>

          <ReactTooltip className="Tooltip">{content}</ReactTooltip>

          <div className="map__container">
            <ComposableMap data-tip="">
              <ZoomableGroup zoom={1}>
                <Geographies geography={countryData}>
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography
                        onClick={routeChange}
                        key={geo.rsmKey}
                        geography={geo}
                        onMouseEnter={() => {
                          setContent(geo.properties.name);
                          setPrompt(geo.properties.name);
                          setCountryURL(geo.id);
                        }}
                        onMouseLeave={() => {
                          setContent("");
                          setCountryURL("");
                          setPrompt("Click on a country to see data");
                        }}
                        style={{
                          hover: {
                            fill: "#158cba",
                            outline: "none",
                          },
                        }}
                      />
                    ))
                  }
                </Geographies>
                {markers.map(({ name, coordinates }) => (
                  <Marker key={name} coordinates={coordinates}>
                    <circle r={3} fill="#F00" stroke="#fff" strokeWidth={1} />
                  </Marker>
                ))}
              </ZoomableGroup>
            </ComposableMap>
          </div>
        </div>
      </Row>
    </Container>
  );
}

export default MapScreen;
