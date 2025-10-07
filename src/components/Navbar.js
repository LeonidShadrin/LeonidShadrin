import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="Navbar">
      <ul>
        <li style={{marginRight: '100px'}}  ><Link to="/">Головна | </Link></li>
        <li><Link to="/cherhovy-chastyny">Черговий частини</Link></li>
        <li><Link to="/kitchen">Їдальня</Link></li>
        <li><Link to="/roty">Роти</Link></li>
        <li><Link to="/divisions">Підрозділи</Link></li>

        <li 
        style={{marginLeft: '100px'}} 
        onClick={() => { localStorage.removeItem('userPsw'); window.location.reload(); }}
        > | Вихід</li>
      </ul>
    </nav>
  );
}

export default Navbar;
