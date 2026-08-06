import { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import Menu from '@mui/material/Menu';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const environments = ['Dev', 'UAT', 'Pre-Prod', 'Prod'];

const appData = [
  {
    name: 'contapp-dev-api',
    region: 'East US',
    status: 'Healthy',
    env: 'Dev',
    cpu: 38,
    memory: 52,
    instances: 8
  },
  {
    name: 'contapp-uat-web',
    region: 'West US',
    status: 'Healthy',
    env: 'UAT',
    cpu: 54,
    memory: 64,
    instances: 12
  },
  {
    name: 'contapp-preprod-bff',
    region: 'Central US',
    status: 'Warning',
    env: 'Pre-Prod',
    cpu: 67,
    memory: 79,
    instances: 14
  },
  {
    name: 'contapp-prod-front',
    region: 'East US 2',
    status: 'Healthy',
    env: 'Prod',
    cpu: 59,
    memory: 68,
    instances: 18
  }
];

const containerDetails = [
  { app: 'contapp-dev-api', name: 'api-container', status: 'Running', replicas: 3, cpu: 11, memory: 26, age: '2h 08m' },
  { app: 'contapp-dev-api', name: 'auth-container', status: 'Running', replicas: 2, cpu: 9, memory: 21, age: '1h 44m' },
  { app: 'contapp-dev-api', name: 'cache-container', status: 'Evicted', replicas: 1, cpu: 0, memory: 0, age: '12m' },
  { app: 'contapp-uat-web', name: 'web-container', status: 'Running', replicas: 5, cpu: 18, memory: 33, age: '4h 22m' },
  { app: 'contapp-uat-web', name: 'api-gateway', status: 'Running', replicas: 4, cpu: 16, memory: 31, age: '3h 50m' },
  { app: 'contapp-preprod-bff', name: 'bff-container', status: 'Running', replicas: 4, cpu: 23, memory: 40, age: '6h 11m' },
  { app: 'contapp-preprod-bff', name: 'logger-container', status: 'Running', replicas: 3, cpu: 19, memory: 39, age: '5h 34m' },
  { app: 'contapp-prod-front', name: 'frontend-container', status: 'Running', replicas: 8, cpu: 26, memory: 37, age: '10h 02m' },
  { app: 'contapp-prod-front', name: 'cdn-container', status: 'Running', replicas: 6, cpu: 22, memory: 31, age: '9h 10m' },
  { app: 'contapp-prod-front', name: 'monitoring-container', status: 'Running', replicas: 4, cpu: 11, memory: 20, age: '8h 07m' }
];

function ContainerAppsPage() {
  const [environment, setEnvironment] = useState('Dev');
  const [showContainerDetails, setShowContainerDetails] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [menuContainer, setMenuContainer] = useState<string | null>(null);

  const filteredApps = appData.filter((app) => app.env === environment);
  const filteredContainers = containerDetails.filter((container) => filteredApps.some((app) => app.name === container.app));

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, containerName: string) => {
    setMenuAnchor(event.currentTarget);
    setMenuContainer(containerName);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setMenuContainer(null);
  };

  const handleContainerAction = (action: 'Start' | 'Restart' | 'Delete') => {
    console.log(`${action} container`, menuContainer);
    handleMenuClose();
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography variant="h4" sx={{ color: '#fff' }}>Container Apps</Typography>

      <Paper sx={{ p: 4, bgcolor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
        <Typography variant="h6" sx={{ mb: 2, color: '#9bb3cf' }}>Deploy a new container app</Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel id="environment-select-label" sx={{ color: '#9bb3cf' }}>Environment</InputLabel>
              <Select
                labelId="environment-select-label"
                value={environment}
                label="Environment"
                onChange={(event) => setEnvironment(event.target.value)}
                sx={{ background: 'rgba(255,255,255,0.08)', color: '#fff' }}
              >
                {environments.map((env) => (
                  <MenuItem key={env} value={env}>{env}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography sx={{ color: '#cbd5e1', lineHeight: 1.7 }}>
              Pick an audience, choose your image, and deploy the container app into the selected environment. Running container metrics and app health are displayed below.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Button variant="contained" color="primary" sx={{ minWidth: 160 }}>
              Deploy Container App
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 4, bgcolor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
            <Typography variant="h6" sx={{ mb: 3, color: '#9bb3cf' }}>Apps in {environment}</Typography>
            <Grid container spacing={2}>
              {filteredApps.map((app) => (
                <Grid item xs={12} md={6} key={app.name}>
                  <Paper sx={{ p: 3, bgcolor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, gap: 2 }}>
                      <Box>
                        <Typography variant="h6" sx={{ color: '#fff' }}>{app.name}</Typography>
                        <Typography sx={{ color: '#9bb3cf' }}>{app.region}</Typography>
                      </Box>
                      <Chip
                        label={app.status}
                        color={app.status === 'Healthy' ? 'success' : 'warning'}
                        size="small"
                      />
                    </Box>
                    <Typography sx={{ color: '#cbd5e1', mb: 2 }}>Instances: {app.instances}</Typography>
                    <Typography sx={{ color: '#9bb3cf', mb: 1 }}>CPU Utilization</Typography>
                    <LinearProgress variant="determinate" value={app.cpu} sx={{ height: 10, borderRadius: 5, mb: 2 }} />
                    <Typography sx={{ color: '#fff', mb: 1 }}>{app.cpu}% used</Typography>
                    <Typography sx={{ color: '#9bb3cf', mb: 1 }}>Memory Utilization</Typography>
                    <LinearProgress variant="determinate" value={app.memory} sx={{ height: 10, borderRadius: 5, mb: 2 }} />
                    <Typography sx={{ color: '#fff' }}>{app.memory}% used</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 4, bgcolor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
            <Typography variant="h6" sx={{ mb: 3, color: '#9bb3cf' }}>Environment metrics</Typography>
            <Box sx={{ display: 'grid', gap: 2 }}>
              <Paper sx={{ p: 3, bgcolor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <Typography variant="subtitle2" sx={{ color: '#9bb3cf' }}>Average CPU</Typography>
                <Typography variant="h4" sx={{ color: '#fff' }}>{Math.round(filteredApps.reduce((sum, app) => sum + app.cpu, 0) / filteredApps.length)}%</Typography>
              </Paper>
              <Paper sx={{ p: 3, bgcolor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <Typography variant="subtitle2" sx={{ color: '#9bb3cf' }}>Average Memory</Typography>
                <Typography variant="h4" sx={{ color: '#fff' }}>{Math.round(filteredApps.reduce((sum, app) => sum + app.memory, 0) / filteredApps.length)}%</Typography>
              </Paper>
              <Paper
                sx={{ p: 3, bgcolor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer' }}
                onClick={() => setShowContainerDetails((current) => !current)}
              >
                <Typography variant="subtitle2" sx={{ color: '#9bb3cf' }}>Total Containers</Typography>
                <Typography variant="h4" sx={{ color: '#fff' }}>{filteredApps.reduce((sum, app) => sum + app.instances, 0)}</Typography>
                <Typography variant="caption" sx={{ color: '#9bb3cf', mt: 1, display: 'block' }}>
                  Click to {showContainerDetails ? 'hide' : 'show'} container details
                </Typography>
              </Paper>
              <Paper sx={{ p: 3, bgcolor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <Typography variant="subtitle2" sx={{ color: '#9bb3cf' }}>App Count</Typography>
                <Typography variant="h4" sx={{ color: '#fff' }}>{filteredApps.length}</Typography>
              </Paper>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {showContainerDetails && (
        <Paper sx={{ p: 4, bgcolor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
          <Typography variant="h6" sx={{ mb: 3, color: '#9bb3cf' }}>Container Details</Typography>
          <TableContainer component={Paper} sx={{ bgcolor: 'rgba(255,255,255,0.04)' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: '#9bb3cf' }}>App</TableCell>
                  <TableCell sx={{ color: '#9bb3cf' }}>Container</TableCell>
                  <TableCell sx={{ color: '#9bb3cf' }}>Replicas</TableCell>
                  <TableCell sx={{ color: '#9bb3cf' }}>Status</TableCell>
                  <TableCell sx={{ color: '#9bb3cf' }}>CPU %</TableCell>
                  <TableCell sx={{ color: '#9bb3cf' }}>Memory %</TableCell>
                  <TableCell sx={{ color: '#9bb3cf' }}>Age</TableCell>
                  <TableCell sx={{ color: '#9bb3cf' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredContainers.map((container) => (
                  <TableRow key={`${container.app}-${container.name}`}>
                    <TableCell sx={{ color: '#fff' }}>{container.app}</TableCell>
                    <TableCell sx={{ color: '#fff' }}>{container.name}</TableCell>
                    <TableCell sx={{ color: '#fff' }}>{container.replicas}</TableCell>
                    <TableCell sx={{ color: '#fff' }}>
                      <Chip
                        label={container.status}
                        color={container.status === 'Running' ? 'success' : 'error'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell sx={{ color: '#fff' }}>{container.cpu}%</TableCell>
                    <TableCell sx={{ color: '#fff' }}>{container.memory}%</TableCell>
                    <TableCell sx={{ color: '#fff' }}>{container.age}</TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        sx={{ color: '#9bb3cf' }}
                        onClick={(event) => handleMenuOpen(event, container.name)}
                      >
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleContainerAction('Start')}>Start</MenuItem>
        <MenuItem onClick={() => handleContainerAction('Restart')}>Restart</MenuItem>
        <MenuItem onClick={() => handleContainerAction('Delete')}>Delete</MenuItem>
      </Menu>
    </Box>
  );
}

export default ContainerAppsPage;
