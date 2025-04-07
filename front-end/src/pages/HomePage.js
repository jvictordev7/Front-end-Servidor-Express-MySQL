import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Bem-vindo ao TILAPIO</h1>
        <p>Soluções em Aquicultura Moderna</p>
      </div>
      
      <div className="features-section">
        <div className="feature-card">
          <h3>Gestão de Clientes</h3>
          <p>Gerencie todos os seus clientes de forma eficiente</p>
        </div>
        
        <div className="feature-card">
          <h3>Controle de Produtos</h3>
          <p>Mantenha seu inventário sempre atualizado</p>
        </div>
        
        <div className="feature-card">
          <h3>Relatórios</h3>
          <p>Acompanhe seu negócio com dados precisos</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;