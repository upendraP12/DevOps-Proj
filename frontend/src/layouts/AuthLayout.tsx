import { Outlet, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useLanguage } from '../i18n';

function AuthLayout() {
  const location = useLocation();
  const { t } = useLanguage();

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#0e1b2c', px: { xs: 2, sm: 4 }, py: { xs: 3, sm: 5 } }}>
      <Container maxWidth="sm" sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              component="img"
              src="https://upload.wikimedia.org/wikipedia/en/thumb/0/02/Sonata_Software.svg/250px-Sonata_Software.svg.png"
              alt="Sonata Software"
              sx={{ width: 120, height: 'auto' }}
            />
            <Typography variant="h6" sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>Sonata Software</Typography>
          </Box>
        </Box>
        <Box sx={{ mb: 3, textAlign: 'center' }}>
          <Box component="span" sx={{ display: 'block', fontSize: { xs: 24, sm: 32 }, color: 'primary.main', textTransform: 'uppercase', letterSpacing: 1.2, fontWeight: 700 }}>
            {t('app.title')}
          </Box>
          <Box component="h1" sx={{ fontSize: { xs: 24, sm: 32 }, fontWeight: 700, mt: 1 }}>
            {location.pathname === '/register' ? t('auth.createAccount') : location.pathname === '/forgot-password' ? t('auth.resetPassword') : t('auth.signInTitle')}
          </Box>
          <Box sx={{ mt: 1, color: 'text.secondary', fontSize: { xs: 14, sm: 16 } }}>Secure enterprise monitoring for Azure DevOps, AKS, and Container Apps.</Box>
        </Box>
        <Outlet />
      </Box>
      </Container>
    </Box>
  );
}

export default AuthLayout;
