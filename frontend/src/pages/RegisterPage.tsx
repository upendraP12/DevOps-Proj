import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { register as registerUser } from '../api';

const schema = z.object({
  username: z.string().min(3, 'Username is required'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  companyName: z.string().min(1, 'Company name is required'),
  email: z.string().email('Enter a valid business email').refine((value) => value.endsWith('@example.com'), { message: 'Business email required' }),
  phone: z.string().regex(/^\+?\d{10,15}$/, 'Enter a valid phone number'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Confirm password is required')
}).refine((data) => data.password === data.confirmPassword, { message: 'Passwords must match', path: ['confirmPassword'] });

type FormValues = z.infer<typeof schema>;

function RegisterPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { control, handleSubmit } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { username: '', firstName: '', lastName: '', companyName: '', email: '', phone: '', password: '', confirmPassword: '' } });

  const onSubmit = async (values: FormValues) => {
    setError(null);
    try {
      const response = await registerUser({
        username: values.username,
        firstName: values.firstName,
        lastName: values.lastName,
        companyName: values.companyName,
        email: values.email,
        phoneNumber: values.phone,
        password: values.password
      });

      if (!response.success) {
        setError(response.errors?.join(', ') ?? 'Registration failed');
        return;
      }

      navigate('/login');
    } catch {
      setError('Unable to register. Please try again.');
    }
  };

  return (
    <Box sx={{ bgcolor: '#0e1b2c', p: 4, borderRadius: 3, boxShadow: '0 12px 40px rgba(0,0,0,0.18)' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}><PersonAddAltIcon /></Avatar>
      </Box>
      <Typography component="h1" variant="h5" align="center" sx={{ mb: 3 }}>Register</Typography>
      <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller name="username" control={control} render={({ field, fieldState }) => (
              <TextField fullWidth label="Username" {...field} error={!!fieldState.error} helperText={fieldState.error?.message} />
            )} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller name="firstName" control={control} render={({ field, fieldState }) => (
              <TextField fullWidth label="First Name" {...field} error={!!fieldState.error} helperText={fieldState.error?.message} />
            )} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller name="lastName" control={control} render={({ field, fieldState }) => (
              <TextField fullWidth label="Last Name" {...field} error={!!fieldState.error} helperText={fieldState.error?.message} />
            )} />
          </Grid>
          <Grid item xs={12}>
            <Controller name="companyName" control={control} render={({ field, fieldState }) => (
              <TextField fullWidth label="Company Name" {...field} error={!!fieldState.error} helperText={fieldState.error?.message} />
            )} />
          </Grid>
          <Grid item xs={12}>
            <Controller name="email" control={control} render={({ field, fieldState }) => (
              <TextField fullWidth label="Business Email" {...field} error={!!fieldState.error} helperText={fieldState.error?.message} />
            )} />
          </Grid>
          <Grid item xs={12}>
            <Controller name="phone" control={control} render={({ field, fieldState }) => (
              <TextField fullWidth label="Mobile Number" {...field} error={!!fieldState.error} helperText={fieldState.error?.message} />
            )} />
          </Grid>
          <Grid item xs={12}>
            <Controller name="password" control={control} render={({ field, fieldState }) => (
              <TextField
                fullWidth
                label="Password"
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
          </Grid>
          <Grid item xs={12}>
            <Controller name="confirmPassword" control={control} render={({ field, fieldState }) => (
              <TextField
                fullWidth
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                {...field}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton aria-label="toggle confirm password visibility" onClick={() => setShowConfirmPassword((prev) => !prev)} edge="end">
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            )} />
          </Grid>
        </Grid>
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, py: 1.5 }}>Create Account</Button>
      </Box>
    </Box>
  );
}

export default RegisterPage;
