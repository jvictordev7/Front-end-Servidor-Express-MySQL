import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ClientesPage from './pages/ClientesPage';
import ProdutosPage from './pages/ProdutosPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/clientes" element={<ClientesPage />} />
          <Route path="/produtos" element={<ProdutosPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;