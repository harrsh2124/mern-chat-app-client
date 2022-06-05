import { Box, Button, Container, TextField, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const Home = () => {
    const navigate = useNavigate();

    const { name, room, setUserDetails } = useContext(UserContext);

    const [userData, setUserData] = useState({
        name: name,
        room: room
    });

    const handleFormValues = (event) => {
        setUserData((prevData) => {
            return {
                ...prevData,
                [event.target.id]: event.target.value
            };
        });
    };

    const handleSubmitForm = (event) => {
        event.preventDefault();
        if (userData.name.trim() && userData.room.trim())
            setUserDetails(userData.name.trim(), userData.room.trim(), () => {
                navigate('/chat');
            });
    };

    return (
        <Container
            maxWidth="xs"
            sx={{
                display: 'flex',
                flexFlow: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                gap: '3rem'
            }}
        >
            <Typography variant="h4">Home</Typography>

            <Box
                component="form"
                noValidate
                sx={{
                    display: 'flex',
                    flexFlow: 'column',
                    gap: '0.5rem',
                    width: '100%'
                }}
                onSubmit={handleSubmitForm}
            >
                <TextField
                    value={userData.name}
                    id="name"
                    onChange={handleFormValues}
                    variant="outlined"
                    label="Name"
                    autoFocus
                />

                <TextField
                    value={userData.room}
                    id="room"
                    onChange={handleFormValues}
                    variant="outlined"
                    label="Room"
                />

                <Button type="submit" variant="outlined">
                    Submit
                </Button>
            </Box>
        </Container>
    );
};

export default Home;
