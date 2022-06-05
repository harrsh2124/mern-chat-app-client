import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import IndexProvider from './contexts';
import IndexRouter from './utils/router';
import { lightTheme } from './utils/theme';

const App = () => {
    return (
        <IndexProvider>
            <BrowserRouter>
                <ThemeProvider theme={lightTheme}>
                    <CssBaseline />

                    <Box
                        sx={{
                            height: '100%',
                            minHeight: '100vh'
                        }}
                    >
                        <IndexRouter />
                    </Box>
                </ThemeProvider>
            </BrowserRouter>
        </IndexProvider>
    );
};

export default App;
