import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="Navbar">
      <ul>
        <li><Link to="/">Головна</Link></li>
        <li><Link to="/about-us">Про нас</Link></li>
        <li><Link to="/gallery">Галерея</Link></li>
        <li><Link to="/news">Новини</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
