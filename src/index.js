import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles.scss';
import App from './components/App';
import Login from './components/Login/Login';
import Signup from './components/SignUp/Signup';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App container={"Home"} />}>
      </Route>
      <Route path="/login" element={<App container={"Login"} />} />
      <Route path="/signup" element={<App container={"Signup"} />} />
    </Routes>
  </Router >
);

reportWebVitals();
