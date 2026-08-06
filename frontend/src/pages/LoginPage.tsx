import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { login } from '../api';
import { startSession } from '../session';

const schema = z.object({
  username: z.string().min(3, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
  remember: z.boolean().optional()
});

type FormValues = z.infer<typeof schema>;

function LoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const { control, handleSubmit } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { username: '', password: '', remember: false } });

  const onSubmit = async (values: FormValues) => {
    setError(null);
    try {
      const response = await login({ username: values.username, password: values.password });
      if (!response.success) {
        setError(response.errors?.join(', ') ?? 'Login failed');
        return;
      }
      localStorage.setItem('devops-ai-monitor-token', response.token ?? '');
      startSession();
      navigate('/dashboard');
    } catch (error: any) {
      const message = error?.response?.data?.title || error?.message || 'Unable to login. Please try again.';
      setError(message);
      console.error('Login error:', error);
    }
  };

  return (
    <Box sx={{ bgcolor: '#0e1b2c', p: { xs: 3, sm: 4 }, borderRadius: 3, boxShadow: '0 12px 40px rgba(0,0,0,0.18)', width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}><LockOutlinedIcon /></Avatar>
      </Box>
      <Typography component="h1" variant="h5" align="center" sx={{ mb: 3 }}>Sign in</Typography>
      <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <Controller name="username" control={control} render={({ field, fieldState }) => (
          <TextField fullWidth label="Username" margin="normal" {...field} error={!!fieldState.error} helperText={fieldState.error?.message} />
        )} />
        <Controller name="password" control={control} render={({ field, fieldState }) => (
          <TextField
            fullWidth
            label="Password"
            margin="normal"
            type={showPassword ? 'text' : 'password'}
            {...field}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" onClick={() => setShowPassword((prev) => !prev)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        )} />
        <Controller name="remember" control={control} render={({ field }) => (
          <FormControlLabel control={<Checkbox {...field} checked={field.value} />} label="Remember me" sx={{ color: '#fff' }} />
        )} />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, py: 1.5 }}>Login</Button>
        <Grid container sx={{ mt: 2 }}>
          <Grid item xs>
            <Link href="/forgot-password" variant="body2">Forgot password?</Link>
          </Grid>
          <Grid item>
            <Link href="/register" variant="body2">Register</Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default LoginPage;
