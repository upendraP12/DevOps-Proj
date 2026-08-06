import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LockResetIcon from '@mui/icons-material/LockReset';

const schema = z.object({
  email: z.string().email('Enter a valid business email').refine((value) => value.endsWith('@example.com'), { message: 'Business email required' })
});

type FormValues = z.infer<typeof schema>;

function ForgotPasswordPage() {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { email: '' } });

  const onSubmit = () => {
    navigate('/login');
  };

  return (
    <Box sx={{ bgcolor: '#0e1b2c', p: 4, borderRadius: 3, boxShadow: '0 12px 40px rgba(0,0,0,0.18)' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}><LockResetIcon /></Avatar>
      </Box>
      <Typography component="h1" variant="h5" align="center" sx={{ mb: 3 }}>Forgot Password</Typography>
      <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
        <Controller name="email" control={control} render={({ field, fieldState }) => (
          <TextField fullWidth label="Business Email" margin="normal" {...field} error={!!fieldState.error} helperText={fieldState.error?.message} />
        )} />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, py: 1.5 }}>Send Reset Link</Button>
      </Box>
    </Box>
  );
}

export default ForgotPasswordPage;
