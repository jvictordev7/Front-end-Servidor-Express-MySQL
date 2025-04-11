import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} TILÁPIO. Todos os direitos reservados.</p>
        
      </div>
    </footer>
  );
};

export default Footer;
