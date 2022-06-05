import { Box, Container, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import ChatInput from '../components/ChatInput';
import MessagesList from '../components/MessagesList';
import { BACKEND_URL } from '../config/globals';
import { UserContext } from '../contexts/UserContext';

const ChatScreen = () => {
    const { name, room } = useContext(UserContext);

    const [socket, setSocket] = useState(null);
    const [isError, setIsError] = useState(false);
    const [messagesList, setMessagesList] = useState([]);
    const [messageValue, setMessageValue] = useState('');

    useEffect(() => {
        if ((name, room)) {
            const socketInstance = io(BACKEND_URL);

            // Send ping to the server on page load.
            // Server listens it by 'connection' event.
            setSocket(socketInstance);

            // Send event to the server to join the room.
            // Server listens it by 'joinRoom' event.
            socketInstance.emit(
                'joinRoom',
                /**
                 * Sample request:
                 * {
                 *      name: 'Test User',
                 *      room: 'Test Room'
                 * }
                 */
                {
                    name,
                    room
                },
                (error) => {
                    if (error) {
                        /**
                         * Sample error response:
                         * {
                         *      message: {
                         *          from: 'Admin',
                         *          text: '[Error message]',
                         *          isError: true
                         *      },
                         *      isError: true
                         * }
                         */
                        console.log('Error while joining the room >> ', error);

                        const { message, isError } = error;
                        setIsError(isError);
                        setMessagesList((prevMessagesList) => {
                            return [...prevMessagesList, message];
                        });
                    }
                }
            );

            return () => {
                // On component unmount

                // Nullify socket instance.
                setSocket(null);

                // Send event to the server to leave the room.
                socketInstance.disconnect();

                // Switch off the socket instance.
                socketInstance.off();
            };
        }
    }, [name, room]);

    useEffect(() => {
        if (socket) {
            // Listen for ping from the server on successful connection.
            socket.on('connected', (message) => {
                console.log(message);
            });

            // Listen any new message with 'newMessage' event from server.
            socket.on('newMessage', (response) => {
                /**
                 * Sample response:
                 * {
                 *      message: {
                 *          from: 'User name',
                 *          text: 'Message',
                 *          isError: [Boolean]
                 *      },
                 *      isError: [Boolean]
                 * }
                 */
                console.log('Server message >> ', response);

                const { message, prevMessages = [], isError } = response;
                setIsError(isError);
                setMessagesList((prevMessagesList) => {
                    return [...prevMessages, ...prevMessagesList, message];
                });
            });
        }
    }, [socket]);

    // Change current message value to be sent.
    const handleMessageChange = (event) => {
        setMessageValue(event.target.value);
    };

    // Send message to the server.
    const handleSendMessage = (event) => {
        event.preventDefault();
        console.log(messageValue);

        // Send event to the server to send the message.
        // Server listens it by 'sendMessage' event.
        socket.emit('sendMessage', messageValue, () => {
            setMessageValue('');
        });
    };

    return name && room ? (
        <Container
            maxWidth="md"
            sx={{
                display: 'flex',
                flexFlow: 'column',
                height: '100vh',
                py: '1rem'
            }}
        >
            <Typography>Chat Screen</Typography>

            <Box
                sx={{
                    height: '100%',
                    flex: 1,
                    overflowY: 'scroll'
                }}
            >
                <MessagesList messagesList={messagesList} />
            </Box>

            <ChatInput
                messageValue={messageValue}
                handleMessageChange={handleMessageChange}
                handleSendMessage={handleSendMessage}
                isError={isError}
            />
        </Container>
    ) : (
        <Navigate to="/" replace />
    );
};

export default ChatScreen;
