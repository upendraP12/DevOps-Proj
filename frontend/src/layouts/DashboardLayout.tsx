import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import FolderIcon from '@mui/icons-material/Folder';
import StorageIcon from '@mui/icons-material/Storage';
import BuildIcon from '@mui/icons-material/Build';
import CloudIcon from '@mui/icons-material/Cloud';
import BugReportIcon from '@mui/icons-material/BugReport';
import SecurityIcon from '@mui/icons-material/Security';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useState } from 'react';
import { useLanguage } from '../i18n';
import { clearSession } from '../session';

const drawerWidth = 280;

function DashboardLayout() {
  const { t } = useLanguage();
  const menuItems = [
    { label: t('nav.dashboard'), icon: <DashboardIcon />, path: '/dashboard' },
    { label: 'Projects', icon: <FolderIcon /> },
    { label: t('nav.repositories'), icon: <StorageIcon />, path: '/repositories' },
    { label: t('nav.pipelines'), icon: <BuildIcon />, path: '/pipelines' },
    { label: 'AKS Clusters', icon: <CloudIcon />, path: '/aks-clusters' },
    { label: 'Container Apps', icon: <CloudIcon />, path: '/container-apps' },
    { label: t('nav.codeQuality'), icon: <BugReportIcon />, path: '/code-quality' },
    { label: 'Security', icon: <SecurityIcon />, path: '/security' },
    { label: 'Governance', icon: <SettingsIcon />, path: '/governance' },
    { label: t('nav.settings'), icon: <SettingsIcon />, path: '/settings' },
  ];
  const [open, setOpen] = useState(true);
  const [profileMenuAnchor, setProfileMenuAnchor] = useState<null | HTMLElement>(null);
  const [tenant, setTenant] = useState('Tenant A');
  const [selectedSubscriptions, setSelectedSubscriptions] = useState<string[]>(['All Subscriptions']);
  const [versionControl, setVersionControl] = useState('Azure DevOps');
  const navigate = useNavigate();

  const tenantOptions = ['Tenant A', 'Tenant B', 'Tenant C'];
  const subscriptionOptions = ['Subscription 1', 'Subscription 2', 'Subscription 3'];
  const versionControlOptions = ['Azure DevOps', 'GitHub'];

  const subscriptionMenuProps = {
    PaperProps: {
      style: {
        maxHeight: 300,
        width: 260,
      },
    },
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
  };

  const handleLogout = () => {
    clearSession();
    navigate('/login');
    handleProfileMenuClose();
  };

  const handleViewProfile = () => {
    navigate('/profile');
    handleProfileMenuClose();
  };

  const handleSettings = () => {
    navigate('/settings');
    handleProfileMenuClose();
  };

  const handleTenantChange = (event: SelectChangeEvent<string>) => {
    setTenant(event.target.value as string);
  };

  const handleSubscriptionsChange = (event: SelectChangeEvent<typeof selectedSubscriptions>) => {
    const value = event.target.value;
    const selected = typeof value === 'string' ? value.split(',') : value;
    if (selected.includes('All Subscriptions')) {
      setSelectedSubscriptions(['All Subscriptions', ...subscriptionOptions]);
      return;
    }
    setSelectedSubscriptions(selected.filter((item) => item !== 'All Subscriptions'));
  };

  const handleVersionControlChange = (event: SelectChangeEvent<string>) => {
    setVersionControl(event.target.value as string);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, background: '#111b28' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton edge="start" color="inherit" onClick={() => setOpen(!open)}>
              <MenuIcon />
            </IconButton>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                component="img"
                src="https://upload.wikimedia.org/wikipedia/en/thumb/0/02/Sonata_Software.svg/250px-Sonata_Software.svg.png"
                alt="Sonata Software"
                sx={{ width: 120, height: 'auto' }}
              />
              <Typography variant="subtitle1" noWrap sx={{ fontWeight: 700 }}>Sonata Software</Typography>
            </Box>
            <Typography variant="h6" noWrap sx={{ fontWeight: 700 }}>{t('app.title')}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <FormControl variant="outlined" size="small" sx={{ minWidth: 160 }}>
              <InputLabel sx={{ color: '#fff' }}>Tenant</InputLabel>
              <Select
                value={tenant}
                onChange={handleTenantChange}
                label="Tenant"
                sx={{ color: '#fff', '.MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.23)' } }}
              >
                {tenantOptions.map((option) => (
                  <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="outlined" size="small" sx={{ minWidth: 240 }}>
              <InputLabel sx={{ color: '#fff' }}>Subscriptions</InputLabel>
              <Select
                multiple
                value={selectedSubscriptions}
                onChange={handleSubscriptionsChange}
                label="Subscriptions"
                renderValue={(selected) => selected.join(', ')}
                MenuProps={subscriptionMenuProps}
                sx={{ color: '#fff', '.MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.23)' } }}
              >
                <MenuItem value="All Subscriptions">
                  <Checkbox checked={selectedSubscriptions.includes('All Subscriptions')} />
                  <ListItemText primary="All Subscriptions" />
                </MenuItem>
                {subscriptionOptions.map((subscription) => (
                  <MenuItem key={subscription} value={subscription}>
                    <Checkbox checked={selectedSubscriptions.includes(subscription) || selectedSubscriptions.includes('All Subscriptions')} />
                    <ListItemText primary={subscription} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="outlined" size="small" sx={{ minWidth: 160 }}>
              <InputLabel sx={{ color: '#fff' }}>Version Control</InputLabel>
              <Select
                value={versionControl}
                onChange={handleVersionControlChange}
                label="Version Control"
                sx={{ color: '#fff', '.MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.23)' } }}
              >
                {versionControlOptions.map((option) => (
                  <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <IconButton color="inherit"><NotificationsIcon /></IconButton>
            <IconButton color="inherit" onClick={handleProfileMenuOpen} sx={{ p: 0 }}>
              <Avatar alt="User" sx={{ width: 34, height: 34 }}>DM</Avatar>
            </IconButton>
            <Menu
              anchorEl={profileMenuAnchor}
              open={Boolean(profileMenuAnchor)}
              onClose={handleProfileMenuClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem onClick={handleViewProfile}>View Profile</MenuItem>
              <MenuItem onClick={handleSettings}>Settings</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} sx={{ width: open ? drawerWidth : 88, flexShrink: 0, '& .MuiDrawer-paper': { width: open ? drawerWidth : 88, boxSizing: 'border-box', background: '#0b141f', color: '#fff' } }}>
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {menuItems.map((item) => (
              <ListItemButton
                key={item.label}
                component={item.path ? RouterLink : 'button'}
                to={item.path}
                sx={{ py: 2 }}
              >
                <ListItemIcon sx={{ color: '#9bb3cf' }}>{item.icon}</ListItemIcon>
                {open && <ListItemText primary={item.label} />}
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, minHeight: '100vh', background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(18px)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)' }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

export default DashboardLayout;
