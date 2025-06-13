// theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#001233", // Koyu Mavi/Siyah - Ana marka renginiz
      contrastText: "#FFFFFF"
    },
    secondary: {
      main: "#4caf50", 
      contrastText: "#FFFFFF"
    },
    warning: {
      main: "#FFC107"
    },
    background: {
      default: "#F4F6F8",
      paper: "#FFFFFF"   
    },
    text: {
      primary: "#172B4D", 
      secondary: "#5E6C84" 
    },
    divider: 'rgba(0, 0, 0, 0.12)' // Ayırıcılar için
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif', // Modern ve okunabilir bir font
    h4: {
      fontWeight: 700,
      fontSize: '2rem', // Başlıklar için biraz daha büyük
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    button: {
      textTransform: "none", // Buton metinlerini büyük harf yapma
      fontWeight: 600,
    }
  },
  shape: {
    borderRadius: 8, // Genel köşe yuvarlaklığı
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true, // Butonlara daha düz bir görünüm
      },
      styleOverrides: {
        root: {
          padding: "10px 20px", // Daha rahat tıklama alanları
        },
        containedPrimary: {
          // Zaten temanızda var ama isterseniz burada daha da özelleştirebilirsiniz
        },
        containedSecondary: {
          // Zaten temanızda var
        },
        outlined: { // Outlined butonlar için daha belirgin kenarlık
          borderColor: 'rgba(0, 0, 0, 0.23)',
        }
      }
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        fullWidth: true,
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': { // Kenarlıklı inputlar için
            '& fieldset': {
              // borderColor: 'rgba(0, 0, 0, 0.23)', // Normal kenarlık rengi
            },
            '&:hover fieldset': {
              // borderColor: '#001233', // Hover'da ana renk
            },
            '&.Mui-focused fieldset': {
              // borderColor: '#001233', // Odaklandığında ana renk
            },
          },
        }
      }
    },
    MuiPaper: {
      defaultProps: {
        elevation: 3, // Kağıt elemanlarına hafif bir gölge
      },
      styleOverrides: {
        root: {
          // borderRadius zaten shape.borderRadius'dan miras alınacak
        }
      }
    },
    MuiLink: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          color: "#001233", // Linkler için ana renk
          textDecorationColor: "rgba(0, 18, 51, 0.4)", // Alt çizgi için hafif renk
          '&:hover': {
            textDecorationColor: "#001233",
          }
        }
      }
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: "#001233", // Avatar arka planı ana renk
        }
      }
    }
  }
});

export default theme;