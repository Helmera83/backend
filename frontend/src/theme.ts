import { createTheme } from '@mui/material/styles';

// Material 3 Color Scheme
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#6750a4',
      light: '#9f86d8',
      dark: '#4f378a',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#625b71',
      light: '#948e9c',
      dark: '#443f54',
      contrastText: '#ffffff',
    },
    error: {
      main: '#ba1a1a',
      light: '#ff9999',
      dark: '#93000a',
      contrastText: '#ffffff',
    },
    background: {
      default: '#fffbfe',
      paper: '#f7f2f9',
    },
    surface: {
      main: '#fffbfe',
    },
    onSurface: {
      main: '#1c1b1f',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 400,
      letterSpacing: '-0.25px',
    },
    h2: {
      fontSize: '2.25rem',
      fontWeight: 400,
      letterSpacing: '0px',
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 400,
      letterSpacing: '0px',
    },
    h4: {
      fontSize: '1.75rem',
      fontWeight: 400,
      letterSpacing: '0.25px',
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 400,
      letterSpacing: '0px',
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 500,
      letterSpacing: '0.15px',
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      letterSpacing: '0.5px',
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      letterSpacing: '0.25px',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          textTransform: 'none',
          fontWeight: 500,
        },
        contained: {
          boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
          '&:hover': {
            boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2), 0px 6px 10px rgba(0, 0, 0, 0.14), 0px 1px 18px rgba(0, 0, 0, 0.12)',
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#d0bcff',
      light: '#e8ddff',
      dark: '#b68ce8',
      contrastText: '#381e72',
    },
    secondary: {
      main: '#ccc2dc',
      light: '#e8def8',
      dark: '#b0a7c0',
      contrastText: '#332d41',
    },
    error: {
      main: '#ffb4ab',
      light: '#ffdad6',
      dark: '#ff897d',
      contrastText: '#690005',
    },
    background: {
      default: '#141218',
      paper: '#211f26',
    },
    surface: {
      main: '#141218',
    },
    onSurface: {
      main: '#e6e1e5',
    },
  },
  typography: lightTheme.typography,
  shape: lightTheme.shape,
  components: lightTheme.components,
});

declare module '@mui/material/styles' {
  interface Palette {
    surface: Palette['primary'];
    onSurface: Palette['primary'];
  }

  interface PaletteOptions {
    surface?: PaletteOptions['primary'];
    onSurface?: PaletteOptions['primary'];
  }
}