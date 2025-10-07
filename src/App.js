import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ChergChast from './pages/ChergChast';
import Kitchen from './pages/Kitchen';
import Roty from './pages/Roty';
import Divisions from './pages/Divisions';
import SomeTest from './pages/SomeTest';
import LogIn from './pages/LogIn';
import './App.css';

function App() {
  const hashPsw = '1602656';
  const [userPsw, setUserPsw] = useState(localStorage.getItem('userPsw') || '');
  
  if(hashPsw !== userPsw.toString()){
    
    return <LogIn setUserPsw={setUserPsw} />
  }
  
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<ChergChast />} />
          <Route path="/cherhovy-chastyny" element={<ChergChast />} />
          <Route path="/kitchen" element={<Kitchen />} />
          <Route path="/roty" element={<Roty />} />
          <Route path="/divisions" element={<Divisions />} />

          <Route path="/some-test" element={<SomeTest />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
