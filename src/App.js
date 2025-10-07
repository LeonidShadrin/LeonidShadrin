import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ChergChast from './components/ChergChast';
import Kitchen from './components/Kitchen';
import Roty from './components/Roty';
import SomeTest from './components/SomeTest';
import LogIn from './components/LogIn';
import './App.css';

function App() {
  const password = '4631';
  const [userPsw, setUserPsw] = useState(localStorage.getItem('userPsw') || '');
  
  if(userPsw !== password){
    return <LogIn setUserPsw={setUserPsw} />
  }
  
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cherhovy-chastyny" element={<ChergChast />} />
          <Route path="/kitchen" element={<Kitchen />} />
          <Route path="/roty" element={<Roty />} />

          <Route path="/some-test" element={<SomeTest />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
