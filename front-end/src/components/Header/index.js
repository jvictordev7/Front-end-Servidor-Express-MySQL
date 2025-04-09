import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header>
      <div className="header-logo">
        <Link to="/">TILÁPIO</Link>
      </div>
      
      <button className={`menu-toggle ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </button>
      
      <nav className={`nav-menu ${menuOpen ? 'open' : ''}`}>
        <ul>
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/produtos" onClick={() => setMenuOpen(false)}>Produtos</Link></li>
          <li><Link to="/clientes" onClick={() => setMenuOpen(false)}>Clientes</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;