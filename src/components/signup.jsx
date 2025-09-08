import React from 'react';
import { TextField, Button, Stack, Typography, Box } from '@mui/material';
import { useForm } from 'react-hook-form';

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const password = watch('password');

  const onSubmit = (data) => {
    console.log('Signup data:', data);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
    >
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          bgcolor: 'white',
          width: 400
        }}
      >
        <Typography variant="h5" mb={3} textAlign="center">
          Sign Up
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Name"
            fullWidth
          //   autoComplete="name"
            {...register('name', { required: 'Name is required' })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />

          <TextField
            label="Email"
            type="email"
            fullWidth
         //   autoComplete="email"
            {...register('email', { required: 'Email is required' })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
          //  autoComplete="new-password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters'
              }
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
           // autoComplete="new-password"
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (value) =>
                value === password || 'Passwords do not match'
            })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Sign Up
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default Signup;