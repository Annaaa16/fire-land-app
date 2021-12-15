// material ui core
import { createTheme } from '@mui/material';

const theme = createTheme({
  components: {
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          transition: 'all 0.2s ease-out',
        },
      },
    },
  },
});

export default theme;
