import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles.scss';
import App from './components/App';
import BankHome from './components/BankHome/BankHome';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App container={"Home"} />}>
      </Route>
      <Route path="/login" element={<App container={"Login"} />} />
      <Route path="/signup" element={<App container={"Signup"} />} />

      <Route path="/bank-home" element={<BankHome container={"Dashboard"} />}>
        <Route path="/bank-home/profile" element={<BankHome container={"Profile"} />} />
        <Route path="/bank-home/add-money" element={<BankHome container={"AddMoney"} />} />
        <Route path="/bank-home/money-transfer" element={<BankHome container={"MoneyTransfer"} />} />
        <Route path="/bank-home/services" element={<BankHome container={"Services"} />} />
        <Route path="/bank-home/account-history" element={<BankHome container={"AcountHistory"} />} />
      </Route>
    </Routes>
  </Router >
);

reportWebVitals();
