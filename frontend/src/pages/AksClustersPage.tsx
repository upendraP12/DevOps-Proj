import type React from 'react';
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

const clusterData = [
  {
    name: 'aks-dev-01',
    region: 'East US',
    nodes: 3,
    status: 'Healthy',
    env: 'Dev',
    cpu: 45,
    memory: 63,
    pods: 24
  },
  {
    name: 'aks-uat-01',
    region: 'West US',
    nodes: 5,
    status: 'Healthy',
    env: 'UAT',
    cpu: 58,
    memory: 71,
    pods: 38
  },
  {
    name: 'aks-preprod-01',
    region: 'Central US',
    nodes: 4,
    status: 'Warning',
    env: 'Pre-Prod',
    cpu: 72,
    memory: 84,
    pods: 46
  },
  {
    name: 'aks-prod-01',
    region: 'East US 2',
    nodes: 6,
    status: 'Healthy',
    env: 'Prod',
    cpu: 61,
    memory: 76,
    pods: 59
  }
];

const podDetails = [
  { cluster: 'aks-dev-01', name: 'dev-api-1', status: 'Running', replicas: 2, cpu: 8, memory: 22, age: '3h 12m' },
  { cluster: 'aks-dev-01', name: 'dev-web-1', status: 'Running', replicas: 3, cpu: 12, memory: 31, age: '2h 45m' },
  { cluster: 'aks-dev-01', name: 'dev-worker-1', status: 'Evicted', replicas: 1, cpu: 0, memory: 0, age: '1h 02m' },
  { cluster: 'aks-uat-01', name: 'uat-api-1', status: 'Running', replicas: 2, cpu: 10, memory: 29, age: '5h 21m' },
  { cluster: 'aks-uat-01', name: 'uat-web-1', status: 'Running', replicas: 4, cpu: 16, memory: 35, age: '4h 10m' },
  { cluster: 'aks-preprod-01', name: 'preprod-api-1', status: 'Running', replicas: 3, cpu: 20, memory: 42, age: '8h 05m' },
  { cluster: 'aks-preprod-01', name: 'preprod-db-1', status: 'Running', replicas: 2, cpu: 18, memory: 47, age: '7h 32m' },
  { cluster: 'aks-prod-01', name: 'prod-api-1', status: 'Running', replicas: 5, cpu: 25, memory: 46, age: '12h 35m' },
  { cluster: 'aks-prod-01', name: 'prod-web-1', status: 'Running', replicas: 4, cpu: 22, memory: 41, age: '11h 02m' },
  { cluster: 'aks-prod-01', name: 'prod-worker-1', status: 'Running', replicas: 2, cpu: 15, memory: 28, age: '6h 47m' }
];

function AksClustersPage() {
  const [environment, setEnvironment] = useState('Dev');
  const [showPodDetails, setShowPodDetails] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [menuPod, setMenuPod] = useState<string | null>(null);

  const filteredClusters = clusterData.filter((cluster) => cluster.env === environment);
  const filteredPods = podDetails.filter((pod) => filteredClusters.some((cluster) => cluster.name === pod.cluster));

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, podName: string) => {
    setMenuAnchor(event.currentTarget);
    setMenuPod(podName);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setMenuPod(null);
  };

  const handlePodAction = (action: 'Start' | 'Restart' | 'Delete') => {
    console.log(`${action} pod`, menuPod);
    handleMenuClose();
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography variant="h4" sx={{ color: '#fff' }}>AKS Clusters</Typography>

      <Paper sx={{ p: 4, bgcolor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
        <Typography variant="h6" sx={{ mb: 2, color: '#9bb3cf' }}>Create a new AKS cluster</Typography>

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
              Select an environment and click Create to provision a new AKS cluster with the chosen configuration. Metrics and cluster status for the selected environment are shown below.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Button variant="contained" color="primary" sx={{ minWidth: 160 }}>
              Create AKS Cluster
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 4, bgcolor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
            <Typography variant="h6" sx={{ mb: 3, color: '#9bb3cf' }}>Clusters in {environment}</Typography>
            <Grid container spacing={2}>
              {filteredClusters.map((cluster) => (
                <Grid item xs={12} md={6} key={cluster.name}>
                  <Paper sx={{ p: 3, bgcolor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, gap: 2 }}>
                      <Box>
                        <Typography variant="h6" sx={{ color: '#fff' }}>{cluster.name}</Typography>
                        <Typography sx={{ color: '#9bb3cf' }}>{cluster.region}</Typography>
                      </Box>
                      <Chip
                        label={cluster.status}
                        color={cluster.status === 'Healthy' ? 'success' : 'warning'}
                        size="small"
                      />
                    </Box>
                    <Typography sx={{ color: '#cbd5e1', mb: 2 }}>Nodes: {cluster.nodes} · Pods: {cluster.pods}</Typography>
                    <Typography sx={{ color: '#9bb3cf', mb: 1 }}>CPU Utilization</Typography>
                    <LinearProgress variant="determinate" value={cluster.cpu} sx={{ height: 10, borderRadius: 5, mb: 2 }} />
                    <Typography sx={{ color: '#fff', mb: 1 }}>{cluster.cpu}% used</Typography>
                    <Typography sx={{ color: '#9bb3cf', mb: 1 }}>Memory Utilization</Typography>
                    <LinearProgress variant="determinate" value={cluster.memory} sx={{ height: 10, borderRadius: 5, mb: 2 }} />
                    <Typography sx={{ color: '#fff' }}>{cluster.memory}% used</Typography>
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
                <Typography variant="h4" sx={{ color: '#fff' }}>{Math.round(filteredClusters.reduce((sum, cluster) => sum + cluster.cpu, 0) / filteredClusters.length)}%</Typography>
              </Paper>
              <Paper sx={{ p: 3, bgcolor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <Typography variant="subtitle2" sx={{ color: '#9bb3cf' }}>Average Memory</Typography>
                <Typography variant="h4" sx={{ color: '#fff' }}>{Math.round(filteredClusters.reduce((sum, cluster) => sum + cluster.memory, 0) / filteredClusters.length)}%</Typography>
              </Paper>
              <Paper
                sx={{ p: 3, bgcolor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer' }}
                onClick={() => setShowPodDetails((current) => !current)}
              >
                <Typography variant="subtitle2" sx={{ color: '#9bb3cf' }}>Total Pods</Typography>
                <Typography variant="h4" sx={{ color: '#fff' }}>{filteredClusters.reduce((sum, cluster) => sum + cluster.pods, 0)}</Typography>
                <Typography variant="caption" sx={{ color: '#9bb3cf', mt: 1, display: 'block' }}>
                  Click to {showPodDetails ? 'hide' : 'show'} pod details
                </Typography>
              </Paper>
              <Paper sx={{ p: 3, bgcolor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <Typography variant="subtitle2" sx={{ color: '#9bb3cf' }}>Cluster Count</Typography>
                <Typography variant="h4" sx={{ color: '#fff' }}>{filteredClusters.length}</Typography>
              </Paper>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {showPodDetails && (
        <Paper sx={{ p: 4, bgcolor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
          <Typography variant="h6" sx={{ mb: 3, color: '#9bb3cf' }}>Pod Details</Typography>
          <TableContainer component={Paper} sx={{ bgcolor: 'rgba(255,255,255,0.04)' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: '#9bb3cf' }}>Cluster</TableCell>
                  <TableCell sx={{ color: '#9bb3cf' }}>Pod Name</TableCell>
                  <TableCell sx={{ color: '#9bb3cf' }}>Replicas</TableCell>
                  <TableCell sx={{ color: '#9bb3cf' }}>Status</TableCell>
                  <TableCell sx={{ color: '#9bb3cf' }}>CPU %</TableCell>
                  <TableCell sx={{ color: '#9bb3cf' }}>Memory %</TableCell>
                  <TableCell sx={{ color: '#9bb3cf' }}>Age</TableCell>
                  <TableCell sx={{ color: '#9bb3cf' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredPods.map((pod) => (
                  <TableRow key={`${pod.cluster}-${pod.name}`}>
                    <TableCell sx={{ color: '#fff' }}>{pod.cluster}</TableCell>
                    <TableCell sx={{ color: '#fff' }}>{pod.name}</TableCell>
                    <TableCell sx={{ color: '#fff' }}>{pod.replicas}</TableCell>
                    <TableCell sx={{ color: '#fff' }}>
                      <Chip
                        label={pod.status}
                        color={pod.status === 'Running' ? 'success' : 'error'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell sx={{ color: '#fff' }}>{pod.cpu}%</TableCell>
                    <TableCell sx={{ color: '#fff' }}>{pod.memory}%</TableCell>
                    <TableCell sx={{ color: '#fff' }}>{pod.age}</TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        sx={{ color: '#9bb3cf' }}
                        onClick={(event) => handleMenuOpen(event, pod.name)}
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
        <MenuItem onClick={() => handlePodAction('Start')}>Start</MenuItem>
        <MenuItem onClick={() => handlePodAction('Restart')}>Restart</MenuItem>
        <MenuItem onClick={() => handlePodAction('Delete')}>Delete</MenuItem>
      </Menu>
    </Box>
  );
}

export default AksClustersPage;
