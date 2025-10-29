import React, { useState } from 'react'; // <-- 1. IMPORT useState
import { TextField, Button, Stack, Typography, Box, Alert } from '@mui/material'; // <-- 1. IMPORT Alert
import { useForm } from 'react-hook-form';

const Login = () => {
 const { register,handleSubmit,formState: { errors }} = useForm({
  defaultValues: {
 email: '',
 password: ''
}
 });

  // 2. Initialize error state
  const [loginError, setLoginError] = useState('');

 /*const onSubmit = (data) => {
    console.log('Login data:', data);
  };*/

const onSubmit = async (data) => {
    setLoginError(''); // Clear previous errors on submit
 try {
const response = await fetch('http://127.0.0.1:8000/api/auth/login/', {
  method: 'POST',
 headers: {
 'Content-Type': 'application/json'
 },
 body: JSON.stringify({
username: data.email,
password: data.password
})
 });

 const result = await response.json();
 if (response.ok) {
 console.log('Login successful:', result);

 // Save tokens
 localStorage.setItem('access', result.access);
 localStorage.setItem('refresh', result.refresh);

// Optional: redirect after login
window.location.href = "/dashboard";
} else {
 console.error('Login error:', result);

// 3. Set error state from API
        setLoginError(result.detail || 'Invalid username or password.'); 
 }
} catch (error) {
 console.error('Network error:', error);
      // 3. Set network error state
      setLoginError('Network error. Please try again later.');
 }
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
          {/* 4. Conditionally render the Alert component */}
          {loginError && <Alert severity="error">{loginError}</Alert>}

 <TextField label="username" type="text" fullWidth  autoComplete="email"{...register('email', { required: 'username is required' })}
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