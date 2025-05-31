import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header        from './MainComponent/Header';
import PrivateRoute  from './MainComponent/PrivateRoute';
import HomePage      from './pages/HomePage';
import LoginPage     from './pages/LoginPage';
import RegisterPage  from './pages/RegisterPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import Dashboard     from './pages/Dashboard';
import SettingsPage  from './pages/SettingsPage';
import TeamsPage from "./pages/FriendConnections.jsx";
import ProjectsPage from "./pages/ProjectsPage.jsx";
import ProjectDetailPage from "./pages/ProjectDetailPage.jsx";
import HelpPage from './pages/HelpPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import GlobalChatbox from './components/GlobalChatbox';
import Footer from './MainComponent/Footer';
import Sidebar from './MainComponent/Sidebar.jsx';


export default function App() {
  return (
  
      <BrowserRouter>
        <div className="d-flex flex-column min-vh-100">
          <Header />

          <main className="flex-grow-1">
            
            <Routes>
              {/* pubbliche */}
              
              <Route path="/"         element={<HomePage />} />
              <Route path="/login"    element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="/help" element={<HelpPage />} />
              <Route path="/about" element={<AboutPage />} />

              {/* protette */}
              <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/settings"  element={<SettingsPage />} />
                <Route path="/teams" element={<TeamsPage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/projects/:id" element={<ProjectDetailPage />} />
              </Route>

              {/* fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <Footer />

          {/* Chatbox globale */}
          <GlobalChatbox />
        </div>
      </BrowserRouter>
  
  );
}