import React from 'react';
import { Routes, Route, HashRouter, Link } from "react-router-dom";
import Divisions from './pages/Divisions';
import DutyOfficer from './pages/DutyOfficer';
import DutyOfficerAsist from './pages/DutyOfficerAsist';

function App() {
  return (
    <HashRouter>
      <Link to="/">Divisions</Link>-|-
      <Link to="/duty-officer">DutyOfficer</Link>-|-
      <Link to="/duty-officer-asist">DutyOfficerAsist</Link>-|-
      <Routes>
        <Route path="/" element={<Divisions />} />
        <Route path="/duty-officer" element={<DutyOfficer />} />
        <Route path="/duty-officer-asist" element={<DutyOfficerAsist />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
