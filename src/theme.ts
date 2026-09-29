import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    tv: true;
  }
}

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      tv: 1920,
    },
  },
  palette: {
    primary: {
      main: "#0056D2",
      dark: "#003E99",
      light: "#2F7AE8",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#0B1F3A",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#FFFFFF",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#0B1F3A",
      secondary: "#5A6B80",
    },
    divider: "#E8EEF5",
  },
  typography: {
    fontFamily: "'Figtree', 'Inter', sans-serif",
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: { fontWeight: 800, letterSpacing: "-0.02em" },
    h2: { fontWeight: 800, letterSpacing: "-0.01em" },
    h3: { fontWeight: 700 },
    button: { textTransform: "none", fontWeight: 700 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: "'Figtree', 'Inter', sans-serif",
        },
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: "xl",
      },
      styleOverrides: {
        maxWidthLg: {
          maxWidth: 1180,
          "@media (min-width:1536px)": { maxWidth: 1280 },
          "@media (min-width:1920px)": { maxWidth: 1440 },
        },
        maxWidthXl: {
          maxWidth: "95% !important",
          width: "95%",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          boxShadow: "none",
          "&:hover": { boxShadow: "none" },
        },
        containedPrimary: {
          backgroundColor: "#0056D2",
          "&:hover": { backgroundColor: "#0041A8" },
        },
      },
    },
    MuiTextField: {
      defaultProps: { variant: "outlined", size: "small" },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 4px 18px rgba(15, 40, 80, 0.05)",
          border: "1px solid #E8EEF5",
        },
      },
    },
  },
});

export default theme;
