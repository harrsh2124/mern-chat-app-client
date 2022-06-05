import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
    typography: {
        fontFamily: `'Poppins', sans-serif`
    },
    palette: {
        mode: 'light'
    }
});

export const darkTheme = createTheme({
    typography: {
        fontFamily: `'Poppins', sans-serif`
    },
    palette: {
        mode: 'dark'
    }
});
