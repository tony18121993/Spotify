import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import LoginPage from "./components/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Inicio } from "./components/Inicio";
import {Main}  from "./components/Main"; 
import RegisterPage from "./components/Registro";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/registro" element={<RegisterPage />} />
        <Route path="/inicio/*" element={<Inicio />} />
        <Route path="*" element={<Main />} /> 
      </Routes>
    </Router>
  );
};

export default App;
