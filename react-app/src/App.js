import React from 'react';
import { Routes, Route, HashRouter, Link } from "react-router-dom";
import Divisions from './pages/Divisions';
import DutyOfficer from './pages/DutyOfficer';

function App() {
  return (
    <HashRouter>
      <Link to="/">Divisions</Link>;
      <Link to="/duty-officer">DutyOfficer</Link>;
      <Routes>
        <Route path="/" element={<Divisions />} />
        <Route path="/duty-officer" element={<DutyOfficer />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
