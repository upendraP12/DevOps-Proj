import { useMemo } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

function parseJwt(token: string | null) {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;

  const base64Url = parts[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');

  try {
    const payload = JSON.parse(atob(padded));
    return payload;
  } catch {
    return null;
  }
}

function ProfilePage() {
  const token = localStorage.getItem('devops-ai-monitor-token');
  const profile = useMemo(() => parseJwt(token), [token]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography variant="h4" sx={{ color: '#fff' }}>Profile</Typography>

      {!profile ? (
        <Paper sx={{ p: 4, bgcolor: '#111b28', border: '1px solid #1f2b3a' }}>
          <Typography variant="body1" sx={{ color: '#fff' }}>
            No user is currently logged in. Please sign in to view profile details.
          </Typography>
        </Paper>
      ) : (
        <Paper sx={{ p: 4, bgcolor: '#111b28', border: '1px solid #1f2b3a' }}>
          <Typography variant="h6" sx={{ mb: 2, color: '#9bb3cf' }}>Logged-in User</Typography>
          <Box sx={{ display: 'grid', gap: 2 }}>
            <Typography sx={{ color: '#fff' }}><strong>Username:</strong> {profile.name || profile.username || 'N/A'}</Typography>
            <Typography sx={{ color: '#fff' }}><strong>Email:</strong> {profile.email || 'N/A'}</Typography>
            <Typography sx={{ color: '#fff' }}><strong>Role:</strong> {profile.role || 'User'}</Typography>
            <Typography sx={{ color: '#fff' }}><strong>User ID:</strong> {profile.sub || 'N/A'}</Typography>
          </Box>
        </Paper>
      )}
    </Box>
  );
}

export default ProfilePage;
