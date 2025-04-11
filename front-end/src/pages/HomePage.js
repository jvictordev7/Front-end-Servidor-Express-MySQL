import React, { useEffect, useState } from 'react';
import './styles/HomePage.css';

const HomePage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3500); // 1.5 segundos de loading (ajuste como quiser)

    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="fish-icon">🐟</div>
        <h1 className="typing-text">Bem-Vindo...</h1>
      </div>
    );
  }

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Bem-vindo TILÁPIO</h1>
        <p>CRUD de pedidos e clientes.</p>
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
