import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./components/views/LandingPage/landingPage";
import LoginPage from "./components/views/LoginPage/loginPage";
import RegisterPage from "./components/views/RegisterPage/registerPage";

function App() {
  return (
    <BrowserRouter>
      <div>
        <ul>
          <li>LoginPage</li>
          <li>registerPage</li>
          <li>LandingPage</li>
        </ul>

        <hr />
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
