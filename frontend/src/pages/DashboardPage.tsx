import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar, Legend } from 'recharts';
import { useState } from 'react';

const stats = [
  { title: 'Total Projects', value: 18 },
  { title: 'Repositories', value: 94 },
  { title: 'Running Pipelines', value: 11 },
  { title: 'Failed Pipelines', value: 2 },
  { title: 'Running Pods', value: 27 },
  { title: 'Failed Pods', value: 3 },
  { title: 'AKS Clusters', value: 5 },
  { title: 'Container Apps', value: 8 }
];

const initialPipelines = [
  { id: 'p1', name: 'WebApp CI', environment: 'Production', running: true, preDeployApproval: false },
  { id: 'p2', name: 'API CI', environment: 'Staging', running: true, preDeployApproval: false },
  { id: 'p3', name: 'Mobile CI', environment: 'Production', running: false, preDeployApproval: true }
];

const trendData = [
  { name: 'Mon', success: 85, failed: 15 },
  { name: 'Tue', success: 90, failed: 10 },
  { name: 'Wed', success: 92, failed: 8 },
  { name: 'Thu', success: 88, failed: 12 },
  { name: 'Fri', success: 94, failed: 6 }
];

function DashboardPage() {
  const [pipelines] = useState(initialPipelines);
  const [pipelinesDialogOpen, setPipelinesDialogOpen] = useState(false);
  const [pipelineState, setPipelineState] = useState(() => {
    // Track mutable approver toggles locally
    const map: Record<string, boolean> = {};
    initialPipelines.forEach((p) => { map[p.id] = !!p.preDeployApproval; });
    return map;
  });
  const openPipelinesDialog = () => setPipelinesDialogOpen(true);
  const closePipelinesDialog = () => setPipelinesDialogOpen(false);
  const togglePreDeploy = (id: string) => {
    setPipelineState((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Typography variant="h4" sx={{ color: '#fff' }}>Executive Dashboard</Typography>
        <Grid container spacing={3}>
          {stats.map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item.title}>
              <Paper
                sx={{ p: 2, bgcolor: '#111b28', border: '1px solid #1f2b3a', cursor: item.title === 'Running Pipelines' ? 'pointer' : 'default' }}
                onClick={item.title === 'Running Pipelines' ? openPipelinesDialog : undefined}
              >
                <Typography variant="subtitle2" gutterBottom sx={{ color: '#9bb3cf' }}>{item.title}</Typography>
                <Typography variant="h5" sx={{ color: '#fff' }}>{item.value}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 2, bgcolor: '#111b28', border: '1px solid #1f2b3a', minHeight: 360 }}>
              <Typography variant="h6" sx={{ mb: 2, color: '#fff' }}>Pipeline Success Trend</Typography>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={trendData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke="#27354f" />
                  <XAxis dataKey="name" stroke="#9bb3cf" />
                  <YAxis stroke="#9bb3cf" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="success" stroke="#4caf50" strokeWidth={3} />
                  <Line type="monotone" dataKey="failed" stroke="#f44336" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, bgcolor: '#111b28', border: '1px solid #1f2b3a', minHeight: 360 }}>
              <Typography variant="h6" sx={{ mb: 2, color: '#fff' }}>Security Score</Typography>
              <Typography variant="h3" sx={{ color: '#4caf50' }}>87%</Typography>
              <Typography sx={{ color: '#9bb3cf', mb: 2 }}>Enterprise security posture and policy compliance.</Typography>
              <Typography variant="subtitle2" sx={{ color: '#fff' }}>Threat detection</Typography>
              <LinearProgress variant="determinate" value={78} sx={{ height: 10, borderRadius: 5, bgcolor: '#1f2b3a', '& .MuiLinearProgress-bar': { bgcolor: '#4caf50' } }} />
              <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <ArrowUpwardIcon sx={{ color: '#4caf50' }} />
                  <Typography sx={{ color: '#fff' }}>Performance +12%</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <ArrowDownwardIcon sx={{ color: '#f44336' }} />
                  <Typography sx={{ color: '#fff' }}>Risk -8%</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, bgcolor: '#111b28', border: '1px solid #1f2b3a' }}>
              <Typography variant="h6" sx={{ mb: 2, color: '#fff' }}>Deployment Frequency</Typography>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={trendData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke="#27354f" />
                  <XAxis dataKey="name" stroke="#9bb3cf" />
                  <YAxis stroke="#9bb3cf" />
                  <Tooltip />
                  <Bar dataKey="success" fill="#2196f3" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, bgcolor: '#111b28', border: '1px solid #1f2b3a' }}>
              <Typography variant="h6" sx={{ mb: 2, color: '#fff' }}>Code Quality Trend</Typography>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={trendData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke="#27354f" />
                  <XAxis dataKey="name" stroke="#9bb3cf" />
                  <YAxis stroke="#9bb3cf" />
                  <Tooltip />
                  <Line type="monotone" dataKey="success" stroke="#8bc34a" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <Dialog open={pipelinesDialogOpen} onClose={closePipelinesDialog} fullWidth maxWidth="sm">
        <DialogTitle>Running Pipelines</DialogTitle>
        <DialogContent>
          <List>
            {pipelines.map((p) => (
              <ListItem key={p.id} secondaryAction={
                p.environment === 'Production' ? (
                  <FormControlLabel
                    control={<Switch checked={!!pipelineState[p.id]} onChange={() => togglePreDeploy(p.id)} />}
                    label="Pre-deploy approver"
                  />
                ) : null
              }>
                <ListItemText primary={p.name} secondary={`${p.environment} • ${p.running ? 'Running' : 'Idle'}`} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={closePipelinesDialog}>Close</Button>
          <Button onClick={() => { localStorage.setItem('devops-pipeline-approvers', JSON.stringify(pipelineState)); closePipelinesDialog(); }} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DashboardPage;
