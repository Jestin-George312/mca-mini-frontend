import React from 'react';
import { TextField, Button, Stack, Typography, Box } from '@mui/material';
import { useForm } from 'react-hook-form';

const Login = () => {
  const { register,handleSubmit,formState: { errors }} = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = (data) => {
    console.log('Login data:', data);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f5f5f5" >
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate
        sx={{
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          bgcolor: 'white',
          width: 400
        }}>
        <Typography variant="h5" mb={3} textAlign="center">
          Login
        </Typography>

        <Stack spacing={2}>
          <TextField label="Email" type="email" fullWidth  autoComplete="email"{...register('email', { required: 'Email is required' })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField label="Password" type="password" fullWidth autoComplete="current-password" {...register('password', { required: 'Password is required' })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Button type="submit" variant="contained" color="primary" fullWidth> Login</Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default Login;