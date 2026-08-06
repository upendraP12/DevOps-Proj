import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const checks = [
  { name: 'Code Coverage', result: 'Passed', score: '87%', detail: 'Unit tests cover 87% of business logic' },
  { name: 'Security Scan', result: 'Warning', score: '74%', detail: '2 medium vulnerabilities detected in dependencies' },
  { name: 'Linting', result: 'Passed', score: '92%', detail: 'No blocking lint issues found' },
  { name: 'Duplications', result: 'Passed', score: '95%', detail: 'Code duplication remains below threshold' },
  { name: 'Reliability', result: 'Failed', score: '61%', detail: '1 critical issue found in API error handling' }
];

const resultConfig = {
  Passed: { color: 'success' as const, icon: <CheckCircleOutlineIcon fontSize="small" /> },
  Warning: { color: 'warning' as const, icon: <WarningAmberIcon fontSize="small" /> },
  Failed: { color: 'error' as const, icon: <ErrorOutlineIcon fontSize="small" /> }
};

function CodeQualityPage() {
  const passedCount = checks.filter((item) => item.result === 'Passed').length;
  const warningCount = checks.filter((item) => item.result === 'Warning').length;
  const failedCount = checks.filter((item) => item.result === 'Failed').length;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <Typography variant="h4" sx={{ color: '#fff' }}>Code Quality</Typography>
        <Typography variant="body2" sx={{ color: '#9bb3cf' }}>A summary of automated code quality checks and published results for review.</Typography>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: '#111b28', border: '1px solid #1f2b3a', color: '#fff' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 1 }}>Passed</Typography>
              <Typography variant="h3">{passedCount}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: '#111b28', border: '1px solid #1f2b3a', color: '#fff' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 1 }}>Warnings</Typography>
              <Typography variant="h3">{warningCount}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: '#111b28', border: '1px solid #1f2b3a', color: '#fff' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 1 }}>Failed</Typography>
              <Typography variant="h3">{failedCount}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card sx={{ bgcolor: '#111b28', border: '1px solid #1f2b3a', color: '#fff' }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 1 }}>
            <Typography variant="h6">Published Quality Report</Typography>
            <Chip label="Latest run: 2026-08-06" color="primary" />
          </Box>
          <Divider sx={{ mb: 2, borderColor: '#27354f' }} />
          <List dense disablePadding>
            {checks.map((check) => (
              <ListItem key={check.name} sx={{ px: 0, py: 1 }}>
                <ListItemText
                  primary={check.name}
                  secondary={check.detail}
                  primaryTypographyProps={{ color: '#fff' }}
                  secondaryTypographyProps={{ color: '#9bb3cf' }}
                />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" sx={{ color: '#dfe9f5', minWidth: 48 }}>{check.score}</Typography>
                  <Chip icon={resultConfig[check.result as keyof typeof resultConfig].icon} label={check.result} color={resultConfig[check.result as keyof typeof resultConfig].color} size="small" />
                </Box>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
}

export default CodeQualityPage;
