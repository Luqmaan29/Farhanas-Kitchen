import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './hooks/useCart';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Menu from './pages/Menu';
import CustomerDetails from './pages/CustomerDetails';
import Payment from './pages/Payment';
import PaymentReturn from './pages/PaymentReturn';
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
            <Route path="/customer-details" element={<CustomerDetails />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/payment-return" element={<PaymentReturn />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
