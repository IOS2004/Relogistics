import { createTheme } from "@mui/material/styles";

// Light theme - Default professional theme
export const lightTheme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Professional blue
      light: "#42a5f5",
      dark: "#1565c0",
      contrastText: "#fff",
    },
    secondary: {
      main: "#ff6f00", // Vibrant orange for CTAs
      light: "#ff9800",
      dark: "#e65100",
      contrastText: "#fff",
    },
    success: {
      main: "#2e7d32",
      light: "#4caf50",
      dark: "#1b5e20",
    },
    warning: {
      main: "#ed6c02",
      light: "#ff9800",
      dark: "#e65100",
    },
    error: {
      main: "#d32f2f",
      light: "#ef5350",
      dark: "#c62828",
    },
    background: {
      default: "#f5f7fa",
      paper: "#ffffff",
      dark: "#0a1929",
    },
    text: {
      primary: "#1a2027",
      secondary: "#4a5568",
    },
    gradient: {
      primary: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      secondary: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      success: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      info: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      blue: "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
      orange: "linear-gradient(135deg, #ff6f00 0%, #ff9800 100%)",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "3.5rem",
      fontWeight: 800,
      lineHeight: 1.2,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontSize: "3rem",
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: "-0.01em",
    },
    h3: {
      fontSize: "2.25rem",
      fontWeight: 700,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: "1.75rem",
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h5: {
      fontSize: "1.5rem",
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: "1.25rem",
      fontWeight: 600,
      lineHeight: 1.5,
    },
    subtitle1: {
      fontSize: "1.125rem",
      lineHeight: 1.75,
      letterSpacing: "0.00938em",
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.7,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    "none",
    "0px 2px 4px rgba(0,0,0,0.05)",
    "0px 4px 8px rgba(0,0,0,0.08)",
    "0px 8px 16px rgba(0,0,0,0.1)",
    "0px 12px 24px rgba(0,0,0,0.12)",
    "0px 16px 32px rgba(0,0,0,0.14)",
    "0px 20px 40px rgba(0,0,0,0.16)",
    "0px 24px 48px rgba(0,0,0,0.18)",
    "0px 2px 4px -1px rgba(0,0,0,0.06), 0px 4px 6px rgba(0,0,0,0.1)",
    "0px 4px 8px -2px rgba(0,0,0,0.08), 0px 8px 12px rgba(0,0,0,0.12)",
    "0px 8px 16px -4px rgba(0,0,0,0.1), 0px 12px 20px rgba(0,0,0,0.14)",
    "0px 12px 24px -6px rgba(0,0,0,0.12), 0px 16px 28px rgba(0,0,0,0.16)",
    "0px 16px 32px -8px rgba(0,0,0,0.14), 0px 20px 36px rgba(0,0,0,0.18)",
    "0px 20px 40px -10px rgba(0,0,0,0.16), 0px 24px 44px rgba(0,0,0,0.2)",
    "0px 24px 48px -12px rgba(0,0,0,0.18), 0px 28px 52px rgba(0,0,0,0.22)",
    "0px 28px 56px -14px rgba(0,0,0,0.2), 0px 32px 60px rgba(0,0,0,0.24)",
    "0px 32px 64px -16px rgba(0,0,0,0.22), 0px 36px 68px rgba(0,0,0,0.26)",
    "0px 36px 72px -18px rgba(0,0,0,0.24), 0px 40px 76px rgba(0,0,0,0.28)",
    "0px 40px 80px -20px rgba(0,0,0,0.26), 0px 44px 84px rgba(0,0,0,0.3)",
    "0px 44px 88px -22px rgba(0,0,0,0.28), 0px 48px 92px rgba(0,0,0,0.32)",
    "0px 48px 96px -24px rgba(0,0,0,0.3), 0px 52px 100px rgba(0,0,0,0.34)",
    "0px 52px 104px -26px rgba(0,0,0,0.32), 0px 56px 108px rgba(0,0,0,0.36)",
    "0px 56px 112px -28px rgba(0,0,0,0.34), 0px 60px 116px rgba(0,0,0,0.38)",
    "0px 60px 120px -30px rgba(0,0,0,0.36), 0px 64px 124px rgba(0,0,0,0.4)",
    "0px 64px 128px -32px rgba(0,0,0,0.38), 0px 68px 132px rgba(0,0,0,0.42)",
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "10px 24px",
          fontSize: "1rem",
          fontWeight: 600,
          textTransform: "none",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
            transform: "translateY(-2px)",
            transition: "all 0.3s ease",
          },
        },
        sizeLarge: {
          padding: "14px 32px",
          fontSize: "1.125rem",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0px 4px 20px rgba(0,0,0,0.08)",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0px 8px 30px rgba(0,0,0,0.12)",
            transform: "translateY(-4px)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
        elevation1: {
          boxShadow: "0px 2px 8px rgba(0,0,0,0.06)",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
            "&:hover fieldset": {
              borderColor: "#1976d2",
            },
          },
        },
      },
    },
  },
});

// Dark theme - Delhivery-inspired dark mode
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1a1d29",
      light: "#2d3139",
      dark: "#0a0e1a",
      contrastText: "#fff",
    },
    secondary: {
      main: "#e63946", // Delhivery red
      light: "#ff4d5a",
      dark: "#c62828",
      contrastText: "#fff",
    },
    success: {
      main: "#4caf50",
      light: "#81c784",
      dark: "#388e3c",
    },
    warning: {
      main: "#ff9800",
      light: "#ffb74d",
      dark: "#f57c00",
    },
    error: {
      main: "#f44336",
      light: "#e57373",
      dark: "#d32f2f",
    },
    background: {
      default: "#0a0e1a",
      paper: "#1a1d29",
      surface: "#2d3139",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0b3b8",
      disabled: "#6b7280",
    },
    divider: "#3a3f4b",
    gradient: {
      primary: "linear-gradient(135deg, #1a1d29 0%, #2d3139 100%)",
      secondary: "linear-gradient(135deg, #e63946 0%, #ff4d5a 100%)",
      success: "linear-gradient(135deg, #4caf50 0%, #81c784 100%)",
      info: "linear-gradient(135deg, #2196f3 0%, #64b5f6 100%)",
      red: "linear-gradient(135deg, #e63946 0%, #c62828 100%)",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "3.5rem",
      fontWeight: 800,
      lineHeight: 1.2,
      letterSpacing: "-0.02em",
      color: "#ffffff",
    },
    h2: {
      fontSize: "3rem",
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: "-0.01em",
      color: "#ffffff",
    },
    h3: {
      fontSize: "2.25rem",
      fontWeight: 700,
      lineHeight: 1.4,
      color: "#ffffff",
    },
    h4: {
      fontSize: "1.75rem",
      fontWeight: 600,
      lineHeight: 1.5,
      color: "#ffffff",
    },
    h5: {
      fontSize: "1.5rem",
      fontWeight: 600,
      lineHeight: 1.5,
      color: "#ffffff",
    },
    h6: {
      fontSize: "1.25rem",
      fontWeight: 600,
      lineHeight: 1.5,
      color: "#ffffff",
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.7,
      color: "#b0b3b8",
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.6,
      color: "#b0b3b8",
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#0a0e1a",
          color: "#ffffff",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: "#1a1d29",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#1a1d29",
          borderRadius: 16,
          boxShadow: "0px 4px 20px rgba(0,0,0,0.3)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
        contained: {
          backgroundColor: "#e63946",
          "&:hover": {
            backgroundColor: "#c62828",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#1a1d29",
        },
      },
    },
  },
});

// Default export - can be toggled based on user preference
export default lightTheme;
