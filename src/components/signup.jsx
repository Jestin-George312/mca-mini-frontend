import React from 'react';
import { TextField, Button, Stack, Typography, Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'; // <-- 1. IMPORT

const Signup = () => {
  const navigate = useNavigate(); // <-- 2. INITIALIZE
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

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/auth/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: data.name,
          email: data.email,
          password: data.password
        })
      });

      const result = await response.json();
      if (response.ok) {
        console.log('Signup successful:', result);
        navigate('/login'); // <-- 3. REDIRECT ON SUCCESS
      } else {
        console.error('Signup error:', result);
        // You might want to set an error state here to show the user
      }
    } catch (error) {
      console.error('Network error:', error);
      // Handle network errors
    }
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
            //   autoComplete="name"
            {...register('name', { required: 'Name is required' })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />

          <TextField
            label="Email"
            type="email"
            fullWidth
            //   autoComplete="email"
            {...register('email', { required: 'Email is required' })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            //  autoComplete="new-password"
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