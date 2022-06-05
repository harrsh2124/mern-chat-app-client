import { Box, Typography } from '@mui/material';
import React from 'react';

const MessagesList = (props) => {
    const { messagesList } = props;

    return messagesList.map((message, index) => {
        return (
            <Box key={index}>
                <Typography>
                    {message.from}: {message.text}
                </Typography>
            </Box>
        );
    });
};

export default MessagesList;
