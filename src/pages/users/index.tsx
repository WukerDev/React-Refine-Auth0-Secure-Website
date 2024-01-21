import { IResourceComponentsProps, useList } from "@refinedev/core";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, Avatar, Typography, Button } from '@mui/material';
import { useEffect, useState } from "react";
import { Modal, Backdrop, Fade, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import 'chart.js/auto';


const myHeaders = new Headers();
myHeaders.append("Accept", "application/json");
myHeaders.append("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjhTQTY4SkxwTjB4MWlFVEQyOHpwUyJ9.eyJpc3MiOiJodHRwczovL2Rldi02NWMwd3hxZXRqODhrZDZqLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJsUHYxeTlRSFRCcnQ1Nkw2N096d0pTd050bDh0ejlNc0BjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9kZXYtNjVjMHd4cWV0ajg4a2Q2ai51cy5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTcwNTgzOTcxMCwiZXhwIjoxNzA4NDMwNzEwLCJhenAiOiJsUHYxeTlRSFRCcnQ1Nkw2N096d0pTd050bDh0ejlNcyIsInNjb3BlIjoicmVhZDpjbGllbnRfZ3JhbnRzIGNyZWF0ZTpjbGllbnRfZ3JhbnRzIGRlbGV0ZTpjbGllbnRfZ3JhbnRzIHVwZGF0ZTpjbGllbnRfZ3JhbnRzIHJlYWQ6dXNlcnMgdXBkYXRlOnVzZXJzIGRlbGV0ZTp1c2VycyBjcmVhdGU6dXNlcnMgcmVhZDp1c2Vyc19hcHBfbWV0YWRhdGEgdXBkYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBkZWxldGU6dXNlcnNfYXBwX21ldGFkYXRhIGNyZWF0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgcmVhZDp1c2VyX2N1c3RvbV9ibG9ja3MgY3JlYXRlOnVzZXJfY3VzdG9tX2Jsb2NrcyBkZWxldGU6dXNlcl9jdXN0b21fYmxvY2tzIGNyZWF0ZTp1c2VyX3RpY2tldHMgcmVhZDpjbGllbnRzIHVwZGF0ZTpjbGllbnRzIGRlbGV0ZTpjbGllbnRzIGNyZWF0ZTpjbGllbnRzIHJlYWQ6Y2xpZW50X2tleXMgdXBkYXRlOmNsaWVudF9rZXlzIGRlbGV0ZTpjbGllbnRfa2V5cyBjcmVhdGU6Y2xpZW50X2tleXMgcmVhZDpjb25uZWN0aW9ucyB1cGRhdGU6Y29ubmVjdGlvbnMgZGVsZXRlOmNvbm5lY3Rpb25zIGNyZWF0ZTpjb25uZWN0aW9ucyByZWFkOnJlc291cmNlX3NlcnZlcnMgdXBkYXRlOnJlc291cmNlX3NlcnZlcnMgZGVsZXRlOnJlc291cmNlX3NlcnZlcnMgY3JlYXRlOnJlc291cmNlX3NlcnZlcnMgcmVhZDpkZXZpY2VfY3JlZGVudGlhbHMgdXBkYXRlOmRldmljZV9jcmVkZW50aWFscyBkZWxldGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGNyZWF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgcmVhZDpydWxlcyB1cGRhdGU6cnVsZXMgZGVsZXRlOnJ1bGVzIGNyZWF0ZTpydWxlcyByZWFkOnJ1bGVzX2NvbmZpZ3MgdXBkYXRlOnJ1bGVzX2NvbmZpZ3MgZGVsZXRlOnJ1bGVzX2NvbmZpZ3MgcmVhZDpob29rcyB1cGRhdGU6aG9va3MgZGVsZXRlOmhvb2tzIGNyZWF0ZTpob29rcyByZWFkOmFjdGlvbnMgdXBkYXRlOmFjdGlvbnMgZGVsZXRlOmFjdGlvbnMgY3JlYXRlOmFjdGlvbnMgcmVhZDplbWFpbF9wcm92aWRlciB1cGRhdGU6ZW1haWxfcHJvdmlkZXIgZGVsZXRlOmVtYWlsX3Byb3ZpZGVyIGNyZWF0ZTplbWFpbF9wcm92aWRlciBibGFja2xpc3Q6dG9rZW5zIHJlYWQ6c3RhdHMgcmVhZDppbnNpZ2h0cyByZWFkOnRlbmFudF9zZXR0aW5ncyB1cGRhdGU6dGVuYW50X3NldHRpbmdzIHJlYWQ6bG9ncyByZWFkOmxvZ3NfdXNlcnMgcmVhZDpzaGllbGRzIGNyZWF0ZTpzaGllbGRzIHVwZGF0ZTpzaGllbGRzIGRlbGV0ZTpzaGllbGRzIHJlYWQ6YW5vbWFseV9ibG9ja3MgZGVsZXRlOmFub21hbHlfYmxvY2tzIHVwZGF0ZTp0cmlnZ2VycyByZWFkOnRyaWdnZXJzIHJlYWQ6Z3JhbnRzIGRlbGV0ZTpncmFudHMgcmVhZDpndWFyZGlhbl9mYWN0b3JzIHVwZGF0ZTpndWFyZGlhbl9mYWN0b3JzIHJlYWQ6Z3VhcmRpYW5fZW5yb2xsbWVudHMgZGVsZXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGNyZWF0ZTpndWFyZGlhbl9lbnJvbGxtZW50X3RpY2tldHMgcmVhZDp1c2VyX2lkcF90b2tlbnMgY3JlYXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgZGVsZXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgcmVhZDpjdXN0b21fZG9tYWlucyBkZWxldGU6Y3VzdG9tX2RvbWFpbnMgY3JlYXRlOmN1c3RvbV9kb21haW5zIHVwZGF0ZTpjdXN0b21fZG9tYWlucyByZWFkOmVtYWlsX3RlbXBsYXRlcyBjcmVhdGU6ZW1haWxfdGVtcGxhdGVzIHVwZGF0ZTplbWFpbF90ZW1wbGF0ZXMgcmVhZDptZmFfcG9saWNpZXMgdXBkYXRlOm1mYV9wb2xpY2llcyByZWFkOnJvbGVzIGNyZWF0ZTpyb2xlcyBkZWxldGU6cm9sZXMgdXBkYXRlOnJvbGVzIHJlYWQ6cHJvbXB0cyB1cGRhdGU6cHJvbXB0cyByZWFkOmJyYW5kaW5nIHVwZGF0ZTpicmFuZGluZyBkZWxldGU6YnJhbmRpbmcgcmVhZDpsb2dfc3RyZWFtcyBjcmVhdGU6bG9nX3N0cmVhbXMgZGVsZXRlOmxvZ19zdHJlYW1zIHVwZGF0ZTpsb2dfc3RyZWFtcyBjcmVhdGU6c2lnbmluZ19rZXlzIHJlYWQ6c2lnbmluZ19rZXlzIHVwZGF0ZTpzaWduaW5nX2tleXMgcmVhZDpsaW1pdHMgdXBkYXRlOmxpbWl0cyBjcmVhdGU6cm9sZV9tZW1iZXJzIHJlYWQ6cm9sZV9tZW1iZXJzIGRlbGV0ZTpyb2xlX21lbWJlcnMgcmVhZDplbnRpdGxlbWVudHMgcmVhZDphdHRhY2tfcHJvdGVjdGlvbiB1cGRhdGU6YXR0YWNrX3Byb3RlY3Rpb24gcmVhZDpvcmdhbml6YXRpb25zX3N1bW1hcnkgY3JlYXRlOmF1dGhlbnRpY2F0aW9uX21ldGhvZHMgcmVhZDphdXRoZW50aWNhdGlvbl9tZXRob2RzIHVwZGF0ZTphdXRoZW50aWNhdGlvbl9tZXRob2RzIGRlbGV0ZTphdXRoZW50aWNhdGlvbl9tZXRob2RzIHJlYWQ6b3JnYW5pemF0aW9ucyB1cGRhdGU6b3JnYW5pemF0aW9ucyBjcmVhdGU6b3JnYW5pemF0aW9ucyBkZWxldGU6b3JnYW5pemF0aW9ucyBjcmVhdGU6b3JnYW5pemF0aW9uX21lbWJlcnMgcmVhZDpvcmdhbml6YXRpb25fbWVtYmVycyBkZWxldGU6b3JnYW5pemF0aW9uX21lbWJlcnMgY3JlYXRlOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyByZWFkOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyB1cGRhdGU6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIGRlbGV0ZTpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgY3JlYXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJfcm9sZXMgcmVhZDpvcmdhbml6YXRpb25fbWVtYmVyX3JvbGVzIGRlbGV0ZTpvcmdhbml6YXRpb25fbWVtYmVyX3JvbGVzIGNyZWF0ZTpvcmdhbml6YXRpb25faW52aXRhdGlvbnMgcmVhZDpvcmdhbml6YXRpb25faW52aXRhdGlvbnMgZGVsZXRlOm9yZ2FuaXphdGlvbl9pbnZpdGF0aW9ucyBkZWxldGU6cGhvbmVfcHJvdmlkZXJzIGNyZWF0ZTpwaG9uZV9wcm92aWRlcnMgcmVhZDpwaG9uZV9wcm92aWRlcnMgdXBkYXRlOnBob25lX3Byb3ZpZGVycyBkZWxldGU6cGhvbmVfdGVtcGxhdGVzIGNyZWF0ZTpwaG9uZV90ZW1wbGF0ZXMgcmVhZDpwaG9uZV90ZW1wbGF0ZXMgdXBkYXRlOnBob25lX3RlbXBsYXRlcyBjcmVhdGU6ZW5jcnlwdGlvbl9rZXlzIHJlYWQ6ZW5jcnlwdGlvbl9rZXlzIHVwZGF0ZTplbmNyeXB0aW9uX2tleXMgZGVsZXRlOmVuY3J5cHRpb25fa2V5cyByZWFkOmNsaWVudF9jcmVkZW50aWFscyBjcmVhdGU6Y2xpZW50X2NyZWRlbnRpYWxzIHVwZGF0ZTpjbGllbnRfY3JlZGVudGlhbHMgZGVsZXRlOmNsaWVudF9jcmVkZW50aWFscyIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.qyDQP6zx2mo3UUpKz3EosDfG41hG3_Up4ILFNScT_QjgRAEzg38C7SbFbs1rPNjCwk5r18uuWBiejmp8khpuIUx1xeJ_pvhCXEpzG4zpo4gpLfcPACBroEYCHxOkytAmly2ziaSUzA-EIDcciZ3aXJxAH_JU7XCrY5eA-4KAZlR7vL7Gf0jSigPfGA4bx3Vo2wZcik003tz8d6KUVwOwptc0IKrybx9BzYMT3Sq4zWRyxiA0nvU93qdPy-9pvg-hnxPA-BWEseYr09bPLRk0AEJrneaPNMAzMqQjjoRVS66J1qqj2V2V1FqBRS8eLzuNrrfcQ5ZJRfpHCzuMSen8fw"); 





export const UsersPage: React.FC<IResourceComponentsProps> = () => {


  
interface User {
  // Define the structure of user data, for example:
  user_id: string;
  name: string;
  picture: string;
  nickname: string;
  email: string;
  last_login: string;
  blocked: boolean;
  // Add other user fields as per your API response
}

  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [logs, setLogs] = useState<string>('');

  const handleOpen = (userId: string) => {
    // Fetch logs for the specific user
    const requestOptions: RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`https://dev-65c0wxqetj88kd6j.us.auth0.com/api/v2/users/${userId}/logs`, requestOptions)
      .then(response => response.text())
      .then(data => {
        const logging = (JSON.parse(data))
        setLogs(JSON.stringify(logging, null, 2)); 
        setOpenModal(true);
      })
      .catch(error => {
        console.error('Error fetching logs: ', error);
        setError(error.message);
      });
  };

  const handleClose = () => {
    setOpenModal(false);
    setLogs('');
  };

  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'ascending' | 'descending' | 'none' }>({ key: '', direction: 'none' });

  const sortedUsers = [...users].sort((a, b) => {
    if (sortConfig.direction === 'none' || sortConfig.key === '') {
      return 0;
    }
  
    const key = sortConfig.key as keyof User;
  
    if (a[key] < b[key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[key] > b[key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key: string) => {
    let direction: "ascending" | "descending" | "none" = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
        direction = 'descending';
    } else if (sortConfig.key === key && sortConfig.direction === 'descending') {
        direction = 'none';
    }
    setSortConfig({ key, direction });
};

  const getSortDirectionIndicator = (key: string) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? ' ↑' : sortConfig.direction === 'descending' ? ' ↓' : '';
    }
    return '';
  };
  const deleteUser = (userId: string) => {
    const requestOptions: RequestInit = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`https://dev-65c0wxqetj88kd6j.us.auth0.com/api/v2/users/${userId}`, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Update the users state to remove the deleted user
        setUsers(users.filter(user => user.user_id !== userId));
      })
      .catch(error => {
        console.error('Error deleting user: ', error);
        setError(error.message);
      });
  };  
  

  useEffect(() => {
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
      .then(data => {
        setUsers(data); // Assuming the data is an array of users
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
        setError(error.message);
      });

      

  }, []); // Empty dependency array means this effect runs once after the initial render


  
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (

    <Box sx={{ flexGrow: 1, alignContent: 'center' }}>
    <TableContainer component={Paper}>
    <Typography sx={{m: 2, alignContent: 'center'}} variant="h4" gutterBottom>
      Użytkownicy
    </Typography>
    <Button sx={{ background: 'green', m:2, color: 'white', borderRadius: 4, '&:hover': { background: 'black' } }}>NOWY UŻYTWKOWNIK</Button>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>AWATAR</TableCell>
            <TableCell>
              <Button onClick={() => requestSort('name')}>Dane{getSortDirectionIndicator('name')}</Button>
            </TableCell>
            <TableCell>
              <Button onClick={() => requestSort('nickname')}>Login{getSortDirectionIndicator('nickname')}</Button>
            </TableCell>
            <TableCell>
              <Button onClick={() => requestSort('email')}>Email{getSortDirectionIndicator('email')}</Button>
            </TableCell>
            <TableCell>OSTATNIE LOGOWANIE</TableCell>
            <TableCell>OPCJE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedUsers.map((user) => (
            <TableRow key={user.user_id}>
              <TableCell component="th" scope="row">
                <Avatar alt={user.name} src={user.picture} sx={{ width: 56, height: 56 }} />
              </TableCell>
              <TableCell sx={{color: user.blocked === true ? 'red' : '',}}>{user.name}</TableCell>
              <TableCell>{user.nickname}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.last_login}</TableCell>
              <TableCell>
                <Button  sx={{ background: 'blue', color: 'white', borderRadius: 4, '&:hover': { background: 'black' } }}>EDYTUJ</Button>
                <Button onClick={() => deleteUser(user.user_id)}  sx={{ background: 'red', color: 'white', borderRadius: 4, '&:hover': { background: 'black' }, mx: 1  }}>USUŃ</Button>
                <Button  sx={{ background: user.blocked === true ? 'darkgreen' : 'darkred', color: 'white', borderRadius: 4, '&:hover': { background: 'black' }}}>
          {user.blocked === true ? 'ODBLOKUJ' : 'ZABLOKUJ'} 
           </Button>
          <Button onClick={() => handleOpen(user.user_id)} sx={{ background: 'purple', color: 'white', borderRadius: 4, '&:hover': { background: 'black', }, mx: 1 }}>LOGI</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Modal
      open={openModal}
      onClose={handleClose}
      closeAfterTransition
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Fade in={openModal}>
        <Box sx={{ background: "black" }}>
          <IconButton onClick={handleClose} sx={{ /* styling for close button */ }}>
            <CloseIcon />
          </IconButton>
          <div style={{ overflowY: 'scroll', maxHeight: '80vh' }}>
            <pre>{logs}</pre>
          </div>
        </Box>
      </Fade>
    </Modal>
</Box>
  );
};


