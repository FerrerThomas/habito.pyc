import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Menu from './pages/Menu';
import ProductDetail from './pages/ProductDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/menu" element={<Layout><Menu /></Layout>} />
        <Route path="/producto/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
