import { TextField } from '@mui/material';
import React from 'react';

const ChatInput = (props) => {
    const { messageValue, handleMessageChange, handleSendMessage, isError } = props;

    return (
        <TextField
            id="message"
            value={messageValue}
            onChange={handleMessageChange}
            onKeyDown={(event) => {
                if (event.key === 'Enter') {
                    handleSendMessage(event);
                }
            }}
            disabled={isError}
            autoFocus
            fullWidth
        />
    );
};

export default ChatInput;
