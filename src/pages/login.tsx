import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid,Paper, Avatar, TextField, Button, Typography, Snackbar } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Alert from '@material-ui/lab/Alert';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'linear-gradient(to right top, #65dfc9, #6cdbeb)',
  },
  paperStyle: {
    padding: theme.spacing(4),
    width: 300,
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatarStyle: {
    backgroundColor: theme.palette.secondary.main,
    marginBottom: theme.spacing(1),
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const Login: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/user/login', { email, password });
      if (response.status === 200) {
        navigate('/home');
      } else {
        setError('Authentication failed');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.message || 'An error occurred during login');
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paperStyle}>
        <Avatar className={classes.avatarStyle}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleLogin}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={handleEmailChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handlePasswordChange}
          />
          <Grid container>
            <Grid item xs>
              <Typography variant="body2" color="textSecondary" align="center">
              Don't have an account ? <a href="/registration">Register</a>
              </Typography>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Login
          </Button>
        </form>
      </Paper>
      <Snackbar open={error !== ''} autoHideDuration={6000}>
        <Alert severity="error" onClose={() => setError('')}>
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Login;
