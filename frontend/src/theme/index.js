import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light", 
    primary: {
      main: "#001233",
      contrastText: "#FFFFFF"
    },
    secondary: {
      main: "#4caf50",
      contrastText: "#212121"
    },
    warning: {
      main: "#FFC107"
    },
    background: {
      default: "#FFFFFF",
      paper: "#F5F5F5"
    },
    text: {
      primary: "#212121",
      secondary: "#555555"
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          borderRadius: 8,
          textTransform: "none"
        },
        containedSecondary: {
          borderRadius: 8,
          textTransform: "none"
        }
      }
    }
  }
});

export default theme;
