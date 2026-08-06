import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const checks = [
  { name: 'Reliability', score: '61%', detail: '1 critical issue found in API error handling' }
];

function CodeQualityFailedPage() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <Typography variant="h4" sx={{ color: '#fff' }}>Failed Checks</Typography>
        <Typography variant="body2" sx={{ color: '#9bb3cf' }}>Checks that failed and require immediate attention.</Typography>
      </Box>

      <Card sx={{ bgcolor: '#111b28', border: '1px solid #1f2b3a', color: '#fff' }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 1 }}>
            <Typography variant="h6">Failed Quality Checks</Typography>
            <Chip icon={<ErrorOutlineIcon />} label="1 failed" color="error" />
          </Box>
          <Divider sx={{ mb: 2, borderColor: '#27354f' }} />
          <List dense disablePadding>
            {checks.map((check) => (
              <ListItem key={check.name} sx={{ px: 0, py: 1 }}>
                <ListItemText primary={check.name} secondary={check.detail} primaryTypographyProps={{ color: '#fff' }} secondaryTypographyProps={{ color: '#9bb3cf' }} />
                <Chip label={check.score} color="error" size="small" />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
}

export default CodeQualityFailedPage;
