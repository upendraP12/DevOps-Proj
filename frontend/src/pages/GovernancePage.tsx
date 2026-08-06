import { useMemo } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import DownloadIcon from '@mui/icons-material/Download';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const governanceSummary = [
  { title: 'Policy coverage', value: '94%', detail: 'Critical controls mapped to enterprise standards' },
  { title: 'Audit readiness', value: '82%', detail: 'Evidence collection completed for the last quarter' },
  { title: 'Open exceptions', value: '6', detail: 'Exceptions are tracked with owners and due dates' },
  { title: 'Compliance score', value: '87%', detail: 'Strong posture across security and deployment controls' }
];

const recommendations = [
  'Enable quarterly access review for privileged service accounts.',
  'Strengthen branch protection rules for production repositories.',
  'Add environment-specific deployment approvals for Azure workloads.',
  'Publish evidence for the latest control tests to the governance workspace.'
];

function GovernancePage() {
  const reportContent = useMemo(() => {
    return [
      'DevOps Shield Governance Report',
      '=============================',
      '',
      'Policy coverage: 94%',
      'Audit readiness: 82%',
      'Open exceptions: 6',
      'Compliance score: 87%',
      '',
      'Recommendations:',
      ...recommendations.map((item) => `- ${item}`)
    ].join('\n');
  }, []);

  const handleDownload = () => {
    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'governance-report.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
        <Box>
          <Typography variant="h4" sx={{ color: '#fff' }}>Governance</Typography>
          <Typography sx={{ color: '#9bb3cf' }}>Enterprise governance posture, action items, and downloadable reporting.</Typography>
        </Box>
        <Button variant="contained" startIcon={<DownloadIcon />} onClick={handleDownload}>
          Download governance report
        </Button>
      </Box>

      <Grid container spacing={3}>
        {governanceSummary.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.title}>
            <Paper sx={{ p: 2.5, bgcolor: '#111b28', border: '1px solid #1f2b3a' }}>
              <Typography variant="subtitle2" sx={{ color: '#9bb3cf', mb: 1 }}>{item.title}</Typography>
              <Typography variant="h5" sx={{ color: '#fff', mb: 0.5 }}>{item.value}</Typography>
              <Typography sx={{ color: '#cbd5e1', fontSize: '0.95rem' }}>{item.detail}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, bgcolor: '#111b28', border: '1px solid #1f2b3a' }}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
              <VerifiedUserIcon sx={{ color: '#4caf50' }} />
              <Typography variant="h6" sx={{ color: '#fff' }}>Governance information</Typography>
            </Stack>
            <Typography sx={{ color: '#cbd5e1', mb: 2 }}>
              The current governance posture is healthy, with coverage across policy enforcement, audit evidence, and role-based controls.
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              <Chip label="Policy compliant" color="success" />
              <Chip label="Quarterly review active" color="info" />
              <Chip label="Evidence updated" color="secondary" />
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, bgcolor: '#111b28', border: '1px solid #1f2b3a' }}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
              <WarningAmberIcon sx={{ color: '#ffb300' }} />
              <Typography variant="h6" sx={{ color: '#fff' }}>Recommendations</Typography>
            </Stack>
            <List dense disablePadding>
              {recommendations.map((item) => (
                <ListItem key={item} disablePadding sx={{ py: 0.4 }}>
                  <ListItemText primary={item} primaryTypographyProps={{ color: '#cbd5e1', fontSize: '0.95rem' }} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default GovernancePage;
