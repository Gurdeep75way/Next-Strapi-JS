import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: { main: '#1976d2' },
        secondary: { main: '#dc004e' },
    },
    typography: {
        h1: { fontSize: '2.5rem', fontWeight: 500 },
        h3: { fontSize: '1.5rem' },
    },
});

export default theme;