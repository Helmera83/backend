import { createTheme, ThemeOptions } from '@mui/material/styles';

// Material 3 color tokens
const lightTheme: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#6750A4',
      light: '#EADDFF',
      dark: '#21005D',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#625B71',
      light: '#E8DEF8',
      dark: '#1D192B',
      contrastText: '#FFFFFF',
    },
    tertiary: {
      main: '#7D5260',
      light: '#FFD8E4',
      dark: '#31111D',
    },
    error: {
      main: '#BA1A1A',
      light: '#FFDAD6',
      dark: '#410002',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#F57F17',
      light: '#FFF9C4',
      dark: '#E65100',
    },
    info: {
      main: '#1976D2',
      light: '#BBDEFB',
      dark: '#0D47A1',
    },
    success: {
      main: '#388E3C',
      light: '#C8E6C9',
      dark: '#1B5E20',
    },
    background: {
      default: '#FFFBFE',
      paper: '#FFFBFE',
    },
    text: {
      primary: '#1C1B1F',
      secondary: '#49454F',
    },
  },
  shape: {
    borderRadius: 12, // Material 3 uses more rounded corners
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 400,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 400,
      lineHeight: 1.2,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 400,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 400,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 500,
      lineHeight: 1.6,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.43,
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 500,
      textTransform: 'none' as const, // Material 3 doesn't use uppercase buttons
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20, // Material 3 button radius
          textTransform: 'none',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        contained: {
          '&:hover': {
            boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
          },
        },
        outlined: {
          borderWidth: 1,
          '&:hover': {
            borderWidth: 1,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
          '&:hover': {
            boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 4,
          },
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
  },
};

const darkTheme: ThemeOptions = {
  ...lightTheme,
  palette: {
    mode: 'dark',
    primary: {
      main: '#D0BCFF',
      light: '#6750A4',
      dark: '#EADDFF',
      contrastText: '#21005D',
    },
    secondary: {
      main: '#CCC2DC',
      light: '#625B71',
      dark: '#E8DEF8',
      contrastText: '#1D192B',
    },
    tertiary: {
      main: '#EFB8C8',
      light: '#7D5260',
      dark: '#FFD8E4',
    },
    error: {
      main: '#FFB4AB',
      light: '#BA1A1A',
      dark: '#FFDAD6',
      contrastText: '#410002',
    },
    warning: {
      main: '#FFEB3B',
      light: '#F57F17',
      dark: '#FFF9C4',
    },
    info: {
      main: '#64B5F6',
      light: '#1976D2',
      dark: '#BBDEFB',
    },
    success: {
      main: '#81C784',
      light: '#388E3C',
      dark: '#C8E6C9',
    },
    background: {
      default: '#1C1B1F',
      paper: '#1C1B1F',
    },
    text: {
      primary: '#E6E1E5',
      secondary: '#CAC4D0',
    },
  },
};

export const createAppTheme = (isDarkMode: boolean) =>
  createTheme(isDarkMode ? darkTheme : lightTheme);