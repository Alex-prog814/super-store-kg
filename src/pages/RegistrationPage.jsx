import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContextProvider';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import '../styles/RegistrationPage.css';

const ColorButton = styled(Button)(({ theme }) => ({
    backgroundColor: 'grey',
    '&:hover': {
      backgroundColor: '#121212',
    },
  }));

export default function RegistrationPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { register } = useAuth();

    function handleRegister() {
        register(username, password);
    }

  return (
    <div className="register-form">
        <Box
        component="form"
        sx={{
            '& .MuiTextField-root': { m: 1, width: '75ch' },
        }}
        noValidate
        autoComplete="off"
        className="box-form"
        >
            <h2>Registration form</h2>
            <TextField
            id="outlined-username-input"
            label="Username"
            type="text"
            autoComplete="current-username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            /><br />
            <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            /><br />
            <ColorButton onClick={() => handleRegister()} variant="contained">Register</ColorButton>
        </Box>
    </div>
  );
}
