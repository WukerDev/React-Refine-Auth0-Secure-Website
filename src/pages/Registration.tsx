
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Avatar, TextField, Button, Typography, Snackbar } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Alert from '@material-ui/lab/Alert';

function checkPasswordStrength(password: string): { isStrong: boolean; errors: string[] } {
  const criteria = {
    length: password.length >= 8,
    digit: /\d/.test(password),
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    specialChar: /[!@#$%^&*]/.test(password),
  };

  const errors: string[] = [];
  if (!criteria.length) {
    errors.push("Password must be at least 8 characters long.");
  }
  if (!criteria.digit) {
    errors.push("Password must include at least one number.");
  }
  if (!criteria.uppercase) {
    errors.push("Password must include at least one uppercase letter.");
  }
  if (!criteria.lowercase) {
    errors.push("Password must include at least one lowercase letter.");
  }
  if (!criteria.specialChar) {
    errors.push("Password must include at least one special character (!@#$%^&*).");
  }

  return {
    isStrong: criteria.length && criteria.digit && criteria.uppercase && criteria.lowercase && criteria.specialChar,
    errors,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(2), // responsive padding
  },
  paperStyle: {
    padding: theme.spacing(4),
    margin: theme.spacing(2, 'auto'),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: theme.shadows[4], // for elevation
  },
  avatarStyle: {
    
    
    backgroundColor: theme.palette.primary.main,
    marginBottom: theme.spacing(1),
  },
  btnStyle: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  form: {
    width: '100%', // might want to make this responsive
    marginTop: theme.spacing(1),
  },
  submit: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
}));

const Registration: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setPassword(newPassword);

    const { isStrong, errors } = checkPasswordStrength(newPassword);
    setPasswordErrors(errors);
  };

  const handleRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (passwordErrors.length === 0) {
      try {
        const userData = { email, username, password };
        const response = await axios.post('http://localhost:8080/user/register', userData);
        console.log('Registration successful', response.data);
        navigate('/login');
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            if (error.response.status === 400) {
              setError('Email already exists in the database');
            } else if (error.response.status === 401) {
              setError('User already exists in the database');
            } else {
              setError('An error occurred during registration');
            }
          } else {
            setError('An error occurred: ' + error.message);
          }
        } else {
          setError('An unexpected error occurred');
        }
      }
    } else {
      setError('Password is not strong enough');
    }
  };

  const handleCloseSnackbar = () => {
    setError('');
  };


  return (
    <div className={classes.root}>
      <Paper className={classes.paperStyle}>
        <Avatar className={classes.avatarStyle}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Snackbar open={error !== ''} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error">
          {error}
        </Alert>
      </Snackbar>
        <form className={classes.form} noValidate onSubmit={handleRegistration}>
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
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            value={username}
            onChange={handleUsernameChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error={passwordErrors.length > 0}
            helperText={passwordErrors.join(' ')}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handlePasswordChange}
          />
                    <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item xs>
              <Typography variant="body2" color="textSecondary" align="center">
                Already have an account? <a href="/login">Sign In</a>
              </Typography>
            </Grid>
          </Grid>

        </form>
      </Paper>
    </div>
  );
};

export default Registration;
