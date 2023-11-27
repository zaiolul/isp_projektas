import GlobalStyles from '@mui/material/GlobalStyles';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffa726',
      light: '#2A1E04',
      dark: '#6A655A',
    },
    secondary: {
      main: '#6A655A',
    },
  },
});

export default theme;

