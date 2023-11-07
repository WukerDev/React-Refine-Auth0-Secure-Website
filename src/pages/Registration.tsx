import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Registration: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleRegistration = async () => {
    try {
      const userData = { name, email, login, password };
      const response = await axios.post('http://localhost:8080/user/register', userData);
      console.log('Registration successful', response.data);
      navigate('/login');
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      <Grid item xs={12} sm={6} md={4}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <form>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={name}
              onChange={handleNameChange}
            />
            <TextField
              label="Email"  
              variant="outlined"
              fullWidth
              margin="normal"
              value={email} 
              onChange={handleEmailChange}
            />
            <TextField
              label="Login"
              variant="outlined"
              fullWidth
              margin="normal"
              value={login}
              onChange={handleLoginChange}
            />
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              margin="normal"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleRegistration}
            >
              Register
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );  
};
export default Registration;
