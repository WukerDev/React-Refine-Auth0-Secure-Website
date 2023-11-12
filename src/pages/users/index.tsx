import { IResourceComponentsProps, useList } from "@refinedev/core";
import { Typography, Grid, Card, CardContent, Box } from "@mui/material";
import { useEffect, useState } from "react";
import 'chart.js/auto';







export const UsersPage: React.FC<IResourceComponentsProps> = () => {
    interface User {
        id: string;
        name: string;
      }
const [users, setUsers] = useState<User[]>([]);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");

  const requestOptions: RequestInit = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch("https://dev-65c0wxqetj88kd6j.us.auth0.com/api/v2/users", requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(result => setUsers(result))
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
      setError(error.message);
    });
}, []);
    return (
        <Box sx={{ flexGrow: 1, padding: '2rem' }}>
             <Typography variant="h4" gutterBottom>
            Users Site!
            Errory w konsoli, do naprawy api potem
        </Typography>
        </Box>
    );
};