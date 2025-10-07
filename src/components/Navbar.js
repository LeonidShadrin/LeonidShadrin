import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="Navbar">
      <ul>
        <li><Link to="/">Головна</Link></li>
        <li><Link to="/cherhovy-chastyny">Черговий частини</Link></li>
        <li><Link to="/kitchen">Їдальня</Link></li>
        <li><Link to="/roty">Роти</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
