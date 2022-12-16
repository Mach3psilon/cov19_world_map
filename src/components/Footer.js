import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  const [year, setYear] = useState(2022);
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
  return (
    <footer style={{ backgroundColor: "#4d4d4d", marginTop: "Auto" }}>
      <Container>
        <Row>
          <Col className="text-center py-3">
            <div style={{ color: "#fff" }}>
              Copyright &copy;{" "}
              <a href="http://www.erayokutay.com/">Eray Okutay</a> {year}
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
