// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Header from './MainComponent/Header';
import PrivateRoute from './MainComponent/PrivateRoute';
import HomePage    from './pages/HomePage';
import LoginPage   from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard   from './pages/Dashboard';
// (aggiungi qui Projects, Teams, Settings quando li hai)

export default function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        {/*rotte pubbliche */}
        <Route path="/"        element={<HomePage />} />
        <Route path="/login"   element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* le rotte protette vanno dentro PrivateRoute */}
        <Route element={<PrivateRoute />}>

          
          <Route path="/dashboard" element={<Dashboard />} />

        </Route>

        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
