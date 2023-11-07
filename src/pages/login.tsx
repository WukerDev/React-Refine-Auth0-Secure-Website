import { useLogin } from "@refinedev/core";
import { useEffect, useState, useRef} from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Home from "./home";

import { CredentialResponse } from "../interfaces/google";


const GOOGLE_CLIENT_ID =
"1041339102270-e1fpe2b6v6u1didfndh7jkjmpcashs4f.apps.googleusercontent.com";

export const Login: React.FC = () => {
  const { mutate: login } = useLogin<CredentialResponse>();
  const [loogin, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLoginWithUsernamePassword = async () => {
    try {
      const response = await fetch('http://localhost:8080/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login:loogin, password }),
      });

      if (response.ok) {
        const data = await response.json();
        login(data);
        setError('');
        navigate('/home');
      } else {
        setError('Authentication failed');
      }
    } catch (error) {
      setError('An error occurred');
      console.error(error);
    }
  };

  const GoogleButton = (): JSX.Element => {
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (typeof window === "undefined" || !window.google || !divRef.current) {
        return;
      }

      try {
        window.google.accounts.id.initialize({
          ux_mode: "popup",
          client_id: GOOGLE_CLIENT_ID,
          callback: async (res: CredentialResponse) => {
            if (res.credential) {
              login(res);
            }
          },
        });
        window.google.accounts.id.renderButton(divRef.current, {
          theme: "filled_blue",
          size: "medium",
          type: "standard",
        });
      } catch (error) {
        console.log(error);
      }
    }, []);

    return <div ref={divRef} />;
  };

  return (
    <Container
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        display="flex"
        gap="36px"
        justifyContent="center"
        flexDirection="column"
      >
        <TextField
          label="Login" // Changed label to "Login"
          variant="outlined"
          value={loogin}
          onChange={handleLoginChange}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleLoginWithUsernamePassword}
        >
          Login with Username and Password
        </Button>

        <GoogleButton />

        <Link to="/registration">
          <Button variant="contained" color="primary">
            Register
          </Button>
        </Link>
      </Box>
    </Container>
  );
};
