import { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import GitHubIcon from '@mui/icons-material/GitHub';
import StorageIcon from '@mui/icons-material/Storage';

const repositories = [
  {
    name: 'devops-ai-monitor',
    owner: 'sonata-platform',
    language: 'TypeScript',
    branches: ['main', 'develop', 'feature/auth-ui'],
    defaultBranch: 'main'
  },
  {
    name: 'platform-api',
    owner: 'sonata-platform',
    language: 'C#',
    branches: ['main', 'release/1.2', 'hotfix/security'],
    defaultBranch: 'main'
  },
  {
    name: 'infra-blueprints',
    owner: 'sonata-platform',
    language: 'Bicep',
    branches: ['main', 'devops/pipeline-updates'],
    defaultBranch: 'main'
  }
];

function RepositoriesPage() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ color: '#fff' }}>Repositories</Typography>
          <Typography variant="body2" sx={{ color: '#9bb3cf' }}>Browse repositories and their branches in your Azure DevOps or GitHub workspace.</Typography>
        </Box>
        <Chip icon={<StorageIcon />} label={`${repositories.length} repositories`} color="primary" />
      </Box>

      <Stack spacing={2}>
        {repositories.map((repo) => (
          <Card key={repo.name} sx={{ bgcolor: '#111b28', border: '1px solid #1f2b3a', color: '#fff' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <GitHubIcon sx={{ color: '#4dabf5' }} />
                  <Box>
                    <Typography variant="h6">{repo.name}</Typography>
                    <Typography variant="body2" sx={{ color: '#9bb3cf' }}>{repo.owner}</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip label={repo.language} size="small" variant="outlined" />
                  <Chip label={`Default: ${repo.defaultBranch}`} size="small" color="success" />
                </Box>
              </Box>
              <Divider sx={{ my: 2, borderColor: '#27354f' }} />
              <Typography variant="subtitle2" sx={{ mb: 1, color: '#9bb3cf' }}>Branches</Typography>
              <List dense disablePadding sx={{ bgcolor: 'rgba(255,255,255,0.03)', borderRadius: 2 }}>
                {repo.branches.map((branch) => (
                  <ListItem key={branch} sx={{ py: 0.5 }}>
                    <ListItemText
                      primary={branch}
                      primaryTypographyProps={{ color: branch === repo.defaultBranch ? '#fff' : '#dfe9f5', fontWeight: branch === repo.defaultBranch ? 700 : 400 }}
                    />
                    {branch === repo.defaultBranch && <Chip label="default" size="small" color="primary" />}
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}

export default RepositoriesPage;
