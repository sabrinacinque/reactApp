// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Header        from './MainComponent/Header';
import PrivateRoute  from './MainComponent/PrivateRoute';
import HomePage      from './pages/HomePage';
import LoginPage     from './pages/LoginPage';
import RegisterPage  from './pages/RegisterPage';
import Dashboard     from './pages/Dashboard';
import SettingsPage  from './pages/SettingsPage';
import TeamsPage from "./pages/FriendConnections.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        {/* pubbliche */}
        <Route path="/"         element={<HomePage />} />
        <Route path="/login"    element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* protette */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings"  element={<SettingsPage />} />
          <Route path="/teams" element={<TeamsPage />} />
          {/* in futuro Projects, Teams… */}
        </Route>

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
