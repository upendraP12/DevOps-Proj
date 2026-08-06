import { useEffect, useMemo, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import AksClustersPage from './pages/AksClustersPage';
import ContainerAppsPage from './pages/ContainerAppsPage';
import SecurityPage from './pages/SecurityPage';
import GovernancePage from './pages/GovernancePage';
import RepositoriesPage from './pages/RepositoriesPage';
import PipelinesPage from './pages/PipelinesPage';
import CodeQualityPage from './pages/CodeQualityPage';
import CodeQualityPassedPage from './pages/CodeQualityPassedPage';
import CodeQualityWarningPage from './pages/CodeQualityWarningPage';
import CodeQualityFailedPage from './pages/CodeQualityFailedPage';
import { clearSession, extendSession, isSessionActive, shouldSignOutFromRefresh } from './session';

function App() {
  const [themeMode, setThemeMode] = useState<'bright' | 'light'>(() => {
    return (localStorage.getItem('themeMode') as 'bright' | 'light') ?? 'bright';
  });

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode === 'light' ? 'light' : 'dark',
          primary: { main: themeMode === 'light' ? '#1976d2' : '#4dabf5' },
          background: {
            default: themeMode === 'light' ? '#f7fbff' : '#0e1b2c',
            paper: themeMode === 'light' ? '#ffffff' : '#111b28'
          },
          text: {
            primary: themeMode === 'light' ? '#1f2937' : '#f8fbff'
          }
        }
      }),
    [themeMode]
  );

  const handleThemeChange = (mode: 'bright' | 'light') => {
    setThemeMode(mode);
    localStorage.setItem('themeMode', mode);
  };

  useEffect(() => {
    const handleSessionGuard = () => {
      if (window.location.pathname === '/login') {
        return;
      }

      if (!isSessionActive()) {
        clearSession();
        window.location.replace('/login');
        return;
      }

      if (shouldSignOutFromRefresh()) {
        clearSession();
        window.location.replace('/login');
      }
    };

    const refreshSession = () => {
      if (window.location.pathname !== '/login') {
        extendSession();
      }
    };

    const interval = window.setInterval(handleSessionGuard, 10_000);

    window.addEventListener('mousemove', refreshSession);
    window.addEventListener('keydown', refreshSession);
    window.addEventListener('click', refreshSession);
    window.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        handleSessionGuard();
      }
    });

    return () => {
      window.clearInterval(interval);
      window.removeEventListener('mousemove', refreshSession);
      window.removeEventListener('keydown', refreshSession);
      window.removeEventListener('click', refreshSession);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        </Route>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/aks-clusters" element={<AksClustersPage />} />
          <Route path="/container-apps" element={<ContainerAppsPage />} />
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/governance" element={<GovernancePage />} />
          <Route path="/repositories" element={<RepositoriesPage />} />
          <Route path="/pipelines" element={<PipelinesPage />} />
          <Route path="/code-quality" element={<CodeQualityPage />} />
          <Route path="/code-quality/passed" element={<CodeQualityPassedPage />} />
          <Route path="/code-quality/warning" element={<CodeQualityWarningPage />} />
          <Route path="/code-quality/failed" element={<CodeQualityFailedPage />} />
          <Route path="/settings" element={<SettingsPage themeMode={themeMode} setThemeMode={handleThemeChange} />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
