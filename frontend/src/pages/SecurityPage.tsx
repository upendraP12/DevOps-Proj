import type React from 'react';
import { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

interface UserRecord {
  username: string;
  fullName: string;
  email: string;
  role: string;
  status: string;
}

const initialUsers: UserRecord[] = [
  { username: 'admin', fullName: 'Admin User', email: 'admin@example.com', role: 'Administrator', status: 'Active' },
  { username: 'jdoe', fullName: 'John Doe', email: 'john.doe@example.com', role: 'Developer', status: 'Active' },
  { username: 'msmith', fullName: 'Mary Smith', email: 'mary.smith@example.com', role: 'QA Engineer', status: 'Active' },
  { username: 'kbrown', fullName: 'Kevin Brown', email: 'kevin.brown@example.com', role: 'Support', status: 'Inactive' }
];

const groups = [
  { name: 'DevOps Admins', members: 4, description: 'Full platform access for operations and security teams' },
  { name: 'Developers', members: 18, description: 'Application development and deployment access' },
  { name: 'QA Team', members: 6, description: 'Quality assurance and test environment access' },
  { name: 'Support', members: 5, description: 'Access for support and incident response' }
];

function SecurityPage() {
  const [usersState, setUsersState] = useState<UserRecord[]>(initialUsers);
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [groupMenuAnchor, setGroupMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [dialogMode, setDialogMode] = useState<'create' | 'edit' | 'resetPassword' | 'rename' | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogData, setDialogData] = useState<UserRecord>({ username: '', fullName: '', email: '', role: '', status: 'Active' });
  const [passwordResetValue, setPasswordResetValue] = useState('');
  const [tenants, setTenants] = useState<{ name: string; subscriptions: string[] }[]>([]);
  const [tenantDialogOpen, setTenantDialogOpen] = useState(false);
  const [newTenantName, setNewTenantName] = useState('');
  const [newTenantSubscriptions, setNewTenantSubscriptions] = useState<string[]>([]);
  const tenantSubscriptionOptions = ['Subscription 1', 'Subscription 2', 'Subscription 3'];

  const parseJwt = (token: string | null) => {
    if (!token) return null;
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');

    try {
      return JSON.parse(atob(padded));
    } catch {
      return null;
    }
  };

  const token = localStorage.getItem('devops-ai-monitor-token');
  const profile = useMemo(() => parseJwt(token), [token]);

  const getRoleFromProfile = (profileData: any) => {
    if (!profileData) return undefined;
    return (
      profileData.role ||
      profileData['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ||
      profileData['http://schemas.microsoft.com/ws/2008/06/identity/claims/name'] ||
      profileData.name ||
      profileData.unique_name
    );
  };

  const fallbackRole = localStorage.getItem('devops-ai-monitor-role');
  const role = getRoleFromProfile(profile) ?? fallbackRole ?? 'reader';
  const isAdmin = typeof role === 'string' && role.toLowerCase().includes('admin');

  const handleCreateUser = () => {
    setDialogMode('create');
    setDialogData({ username: '', fullName: '', email: '', role: '', status: 'Active' });
    setDialogOpen(true);
  };

  const handleCreateGroup = () => {
    console.log('Create group');
  };

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>, username: string) => {
    setUserMenuAnchor(event.currentTarget);
    setSelectedUser(username);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
    setSelectedUser(null);
  };

  const handleUserAction = (action: 'Reset password' | 'Edit' | 'Delete' | 'Suspend') => {
    const user = usersState.find((item) => item.username === selectedUser);
    if (!user) {
      handleUserMenuClose();
      return;
    }

    if (action === 'Edit') {
      setDialogMode('edit');
      setDialogData({ ...user });
      setDialogOpen(true);
    } else if (action === 'Reset password') {
      setDialogMode('resetPassword');
      setPasswordResetValue('');
      setDialogData({ ...user });
      setDialogOpen(true);
    } else if (action === 'Suspend') {
      setUsersState((prev) =>
        prev.map((item) =>
          item.username === user.username
            ? { ...item, status: item.status === 'Active' ? 'Inactive' : 'Active' }
            : item
        )
      );
    } else if (action === 'Delete') {
      setUsersState((prev) => prev.filter((item) => item.username !== user.username));
    }
    handleUserMenuClose();
  };

  const handleGroupMenuOpen = (event: React.MouseEvent<HTMLElement>, groupName: string) => {
    setGroupMenuAnchor(event.currentTarget);
    setSelectedGroup(groupName);
  };

  const handleGroupMenuClose = () => {
    setGroupMenuAnchor(null);
    setSelectedGroup(null);
  };

  const handleGroupAction = (action: 'Rename' | 'Add user' | 'Add group' | 'Delete') => {
    console.log(`${action} group`, selectedGroup);
    handleGroupMenuClose();
  };

  const openTenantDialog = () => {
    setNewTenantName('');
    setNewTenantSubscriptions([]);
    setTenantDialogOpen(true);
  };

  const closeTenantDialog = () => setTenantDialogOpen(false);

  const handleTenantSubscriptionsChange = (event: SelectChangeEvent<typeof newTenantSubscriptions>) => {
    const value = event.target.value;
    const selected = typeof value === 'string' ? value.split(',') : value;
    if (selected.includes('All Subscriptions')) {
      setNewTenantSubscriptions(['All Subscriptions', ...tenantSubscriptionOptions]);
      return;
    }
    setNewTenantSubscriptions(selected.filter((s) => s !== 'All Subscriptions'));
  };

  const saveTenant = () => {
    if (!newTenantName) return;
    setTenants((prev) => [...prev, { name: newTenantName, subscriptions: newTenantSubscriptions.length ? newTenantSubscriptions : ['All Subscriptions'] }]);
    setTenantDialogOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography variant="h4" sx={{ color: '#fff' }}>Security</Typography>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <Button variant="contained" color="primary" onClick={openTenantDialog} disabled={!isAdmin}>
          Add Tenant
        </Button>
        {tenants.length > 0 && (
          <Typography sx={{ color: '#cbd5e1' }}>{tenants.length} tenant(s)</Typography>
        )}
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, bgcolor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Box>
                <Typography variant="h6" sx={{ color: '#9bb3cf' }}>Users</Typography>
                <Typography sx={{ color: '#cbd5e1' }}>Manage individual user accounts and membership.</Typography>
              </Box>
              <Button variant="contained" color="primary" onClick={handleCreateUser} disabled={!isAdmin}>
                Create User
              </Button>
            </Box>
            <Typography sx={{ mt: 1, color: '#9bb3cf', fontSize: '0.9rem' }}>
              {isAdmin ? `Admin role detected: ${role}` : `No admin role found; current role: ${role ?? 'none'}`}
            </Typography>
            <TableContainer component={Paper} sx={{ bgcolor: 'rgba(255,255,255,0.04)' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: '#9bb3cf' }}>Username</TableCell>
                    <TableCell sx={{ color: '#9bb3cf' }}>Name</TableCell>
                    <TableCell sx={{ color: '#9bb3cf' }}>Email</TableCell>
                    <TableCell sx={{ color: '#9bb3cf' }}>Role</TableCell>
                    <TableCell sx={{ color: '#9bb3cf' }}>Status</TableCell>
                    <TableCell sx={{ color: '#9bb3cf' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {usersState.map((user) => (
                    <TableRow key={user.username}>
                      <TableCell sx={{ color: '#fff' }}>{user.username}</TableCell>
                      <TableCell sx={{ color: '#fff' }}>{user.fullName}</TableCell>
                      <TableCell sx={{ color: '#fff' }}>{user.email}</TableCell>
                      <TableCell sx={{ color: '#fff' }}>{user.role}</TableCell>
                      <TableCell>
                        <Chip
                          label={user.status}
                          color={user.status === 'Active' ? 'success' : 'default'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton
                          size="small"
                          sx={{ color: '#9bb3cf' }}
                          onClick={(event) => handleUserMenuOpen(event, user.username)}
                          disabled={!isAdmin}
                        >
                          <MoreHorizIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, bgcolor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Box>
                <Typography variant="h6" sx={{ color: '#9bb3cf' }}>Groups</Typography>
                <Typography sx={{ color: '#cbd5e1' }}>Organize users into groups for role-based access and policies.</Typography>
              </Box>
              <Button variant="contained" color="primary" onClick={handleCreateGroup}>
                Create Group
              </Button>
            </Box>
            <TableContainer component={Paper} sx={{ bgcolor: 'rgba(255,255,255,0.04)' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: '#9bb3cf' }}>Group Name</TableCell>
                    <TableCell sx={{ color: '#9bb3cf' }}>Members</TableCell>
                    <TableCell sx={{ color: '#9bb3cf' }}>Description</TableCell>
                    <TableCell sx={{ color: '#9bb3cf' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {groups.map((group) => (
                    <TableRow key={group.name}>
                      <TableCell sx={{ color: '#fff' }}>{group.name}</TableCell>
                      <TableCell sx={{ color: '#fff' }}>{group.members}</TableCell>
                      <TableCell sx={{ color: '#fff' }}>{group.description}</TableCell>
                      <TableCell>
                        <IconButton
                          size="small"
                          sx={{ color: '#9bb3cf' }}
                          onClick={(event) => handleGroupMenuOpen(event, group.name)}
                          disabled={!isAdmin}
                        >
                          <MoreHorizIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>
          {dialogMode === 'create' && 'Create User'}
          {dialogMode === 'edit' && 'Edit User'}
          {dialogMode === 'rename' && 'Rename User'}
          {dialogMode === 'resetPassword' && 'Reset Password'}
        </DialogTitle>
        <DialogContent sx={{ display: 'grid', gap: 2, pt: 1 }}>
          {(dialogMode === 'create' || dialogMode === 'edit' || dialogMode === 'rename') && (
            <>
              <TextField
                label="Username"
                value={dialogData.username}
                onChange={(event) => setDialogData((prev) => ({ ...prev, username: event.target.value }))}
                disabled={dialogMode === 'edit'}
                fullWidth
              />
              {dialogMode !== 'rename' && (
                <>
                  <TextField
                    label="Full Name"
                    value={dialogData.fullName}
                    onChange={(event) => setDialogData((prev) => ({ ...prev, fullName: event.target.value }))}
                    fullWidth
                  />
                  <TextField
                    label="Email"
                    value={dialogData.email}
                    onChange={(event) => setDialogData((prev) => ({ ...prev, email: event.target.value }))}
                    fullWidth
                  />
                  <TextField
                    label="Role"
                    value={dialogData.role}
                    onChange={(event) => setDialogData((prev) => ({ ...prev, role: event.target.value }))}
                    fullWidth
                  />
                  <TextField
                    label="Status"
                    value={dialogData.status}
                    onChange={(event) => setDialogData((prev) => ({ ...prev, status: event.target.value }))}
                    fullWidth
                  />
                </>
              )}
            </>
          )}
          {dialogMode === 'resetPassword' && (
            <TextField
              autoFocus
              label="New Password"
              type="password"
              value={passwordResetValue}
              onChange={(event) => setPasswordResetValue(event.target.value)}
              fullWidth
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          {(dialogMode === 'create' || dialogMode === 'edit') && (
            <Button
              onClick={() => {
                if (dialogMode === 'create') {
                  setUsersState((prev) => [...prev, dialogData]);
                } else if (dialogMode === 'edit') {
                  setUsersState((prev) => prev.map((item) => (item.username === dialogData.username ? dialogData : item)));
                }
                setDialogOpen(false);
              }}
              variant="contained"
            >
              Save
            </Button>
          )}
          {dialogMode === 'resetPassword' && (
            <Button
              onClick={() => {
                console.log('Password reset for', dialogData.username, 'new password:', passwordResetValue);
                setDialogOpen(false);
              }}
              variant="contained"
            >
              Reset
            </Button>
          )}
        </DialogActions>
      </Dialog>

      <Dialog open={tenantDialogOpen} onClose={closeTenantDialog} fullWidth maxWidth="sm">
        <DialogTitle>Add Tenant</DialogTitle>
        <DialogContent sx={{ display: 'grid', gap: 2, pt: 1 }}>
          <TextField
            label="Tenant Name"
            value={newTenantName}
            onChange={(e) => setNewTenantName(e.target.value)}
            fullWidth
            autoFocus
          />
          <FormControl fullWidth>
            <InputLabel>Subscriptions</InputLabel>
            <Select
              multiple
              value={newTenantSubscriptions}
              onChange={handleTenantSubscriptionsChange}
              renderValue={(selected) => (selected as string[]).join(', ')}
            >
              <MenuItem value="All Subscriptions">
                <Checkbox checked={newTenantSubscriptions.includes('All Subscriptions')} />
                <ListItemText primary="All Subscriptions" />
              </MenuItem>
              {tenantSubscriptionOptions.map((s) => (
                <MenuItem key={s} value={s}>
                  <Checkbox checked={newTenantSubscriptions.includes(s) || newTenantSubscriptions.includes('All Subscriptions')} />
                  <ListItemText primary={s} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeTenantDialog}>Cancel</Button>
          <Button onClick={saveTenant} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      <Menu
        anchorEl={userMenuAnchor}
        open={Boolean(userMenuAnchor)}
        onClose={handleUserMenuClose}
      >
        <MenuItem onClick={() => handleUserAction('Edit')}>Edit</MenuItem>
        <MenuItem onClick={() => handleUserAction('Reset password')}>Reset password</MenuItem>
        <MenuItem onClick={() => handleUserAction('Suspend')}>Suspend</MenuItem>
        <MenuItem onClick={() => handleUserAction('Delete')}>Delete</MenuItem>
      </Menu>

      <Menu
        anchorEl={groupMenuAnchor}
        open={Boolean(groupMenuAnchor)}
        onClose={handleGroupMenuClose}
      >
        <MenuItem onClick={() => handleGroupAction('Rename')}>Rename</MenuItem>
        <MenuItem onClick={() => handleGroupAction('Add user')}>Add user</MenuItem>
        <MenuItem onClick={() => handleGroupAction('Add group')}>Add group</MenuItem>
        <MenuItem onClick={() => handleGroupAction('Delete')}>Delete</MenuItem>
      </Menu>
    </Box>
  );
}

export default SecurityPage;
