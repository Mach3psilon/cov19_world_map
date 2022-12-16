import { Container } from "react-bootstrap";
import "./App.css";
import MapScreen from "./pages/MapScreen";
import CountryScreen from "./pages/CountryScreen";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
// eslint-disable-next-line no-unused-vars
import Footer from "./components/Footer";

function App() {
  return (
    <div className="style-page">
      <Router>
        <Header />
        <main className="styled py-5 my-5">
          <Container>
            <Routes>
              <Route path="/" element={<MapScreen />} />

              <Route path="/country" element={<CountryScreen />} />
            </Routes>
          </Container>
        </main>
      </Router>
    </div>
  );
}

export default App;
