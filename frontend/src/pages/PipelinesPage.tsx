import { useState } from 'react';
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
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const pipelines = [
  { id: 'pl-101', name: 'WebApp CI', status: 'Running', environment: 'Production', branch: 'main', duration: '12m' },
  { id: 'pl-102', name: 'API CI', status: 'Failed', environment: 'Staging', branch: 'develop', duration: '4m' },
  { id: 'pl-103', name: 'Mobile CI', status: 'Succeeded', environment: 'Production', branch: 'release/1.2', duration: '18m' },
  { id: 'pl-104', name: 'Infra Deploy', status: 'Succeeded', environment: 'Dev', branch: 'main', duration: '8m' },
  { id: 'pl-105', name: 'Security Scan', status: 'Running', environment: 'QA', branch: 'hotfix/security', duration: '2m' }
];

const statusConfig = {
  Running: { color: 'primary' as const, icon: <PlayArrowIcon fontSize="small" /> },
  Failed: { color: 'error' as const, icon: <ErrorOutlineIcon fontSize="small" /> },
  Succeeded: { color: 'success' as const, icon: <CheckCircleOutlineIcon fontSize="small" /> }
};

function PipelinesPage() {
  const [activeStatus, setActiveStatus] = useState<'Running' | 'Failed' | 'Succeeded'>('Running');
  const running = pipelines.filter((item) => item.status === 'Running');
  const failed = pipelines.filter((item) => item.status === 'Failed');
  const succeeded = pipelines.filter((item) => item.status === 'Succeeded');
  const visibleItems = pipelines.filter((item) => item.status === activeStatus);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <Typography variant="h4" sx={{ color: '#fff' }}>Azure DevOps Pipelines</Typography>
        <Typography variant="body2" sx={{ color: '#9bb3cf' }}>Track running, failed, and successfully completed pipelines for your current workstreams.</Typography>
      </Box>

      <Grid container spacing={2}>
        {[
          { key: 'Running', label: 'Running', count: running.length, icon: <PlayArrowIcon fontSize="small" /> },
          { key: 'Failed', label: 'Failed', count: failed.length, icon: <ErrorOutlineIcon fontSize="small" /> },
          { key: 'Succeeded', label: 'Succeeded', count: succeeded.length, icon: <CheckCircleOutlineIcon fontSize="small" /> }
        ].map((item) => (
          <Grid item xs={12} md={4} key={item.key}>
            <Card
              onClick={() => setActiveStatus(item.key as 'Running' | 'Failed' | 'Succeeded')}
              sx={{
                bgcolor: item.key === activeStatus ? '#1a365d' : '#111b28',
                border: item.key === activeStatus ? '1px solid #4dabf5' : '1px solid #1f2b3a',
                color: '#fff',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  {item.icon}
                  <Typography variant="h6">{item.label}</Typography>
                </Box>
                <Typography variant="h3">{item.count}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Card sx={{ bgcolor: '#111b28', border: '1px solid #1f2b3a', color: '#fff' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            {statusConfig[activeStatus].icon}
            <Typography variant="h6">{activeStatus} Pipelines</Typography>
          </Box>
          <Divider sx={{ mb: 2, borderColor: '#27354f' }} />
          <List dense disablePadding>
            {visibleItems.map((pipeline) => (
              <ListItem key={pipeline.id} sx={{ px: 0, py: 0.7 }}>
                <ListItemText
                  primary={pipeline.name}
                  secondary={`${pipeline.environment} • Branch: ${pipeline.branch} • Duration: ${pipeline.duration}`}
                  primaryTypographyProps={{ color: '#fff' }}
                  secondaryTypographyProps={{ color: '#9bb3cf' }}
                />
                <Chip label={pipeline.status} color={statusConfig[pipeline.status as keyof typeof statusConfig].color} size="small" />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
}

export default PipelinesPage;
