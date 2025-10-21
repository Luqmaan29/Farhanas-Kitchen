import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './hooks/useCart';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Checkout from './pages/Checkout';
import Confirmation from './pages/Confirmation';
import PaymentReturn from './pages/PaymentReturn';
import TestMenu from './pages/TestMenu';
import PDFTest from './pages/PDFTest';
import './styles/App.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/test" element={<TestMenu />} />
            <Route path="/pdf-test" element={<PDFTest />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/payment-return" element={<PaymentReturn />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
