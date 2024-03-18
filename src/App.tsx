import Grid from "@mui/material/Grid/Grid";
import { useState } from "react";
import Header from "./components/Header";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Map from "./components/Map";
import Search from "./components/Search";
import { Container } from "@mui/material";
import { AirportsProvider } from "./context/airportsRoute";
import useLocalStorage from "./hooks/useLocalStorage";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ffffff", // Change the primary color for dark theme
    },
    background: {
      default: "#181e26",
      paper: "#181e26",
    },
    text: {
      primary: "#ffffff",
      secondary: "#ffffff",
    },
  },
});
// Define your light theme
const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0000a3",
      light: "#fff8e4",
    },
    secondary: {
      main: "#ffffff",
    },
    background: {
      default: "#ffffff",
      paper: "#f1f3f5",
    },
    text: {
      primary: "#000000",
      secondary: "#000000",
    },
  },
});

function App() {
  const [value, updateValue] = useLocalStorage("darkMode", false);
  const [darkMode, setDarkMode] = useState(value);

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
    updateValue(!darkMode);
  };

  return (
    <AirportsProvider>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <Container
          sx={{
            bgcolor: "background.default",
          }}
          style={{
            padding: "2rem",
            height: "100vh",
          }}
          maxWidth="xl"
          disableGutters
        >
          <Header handleThemeToggle={handleThemeToggle} darkMode={darkMode} />
          <Grid
            container
            justifyContent={"space-between"}
            columns={{ sm: 12, xs: 6 }}
          >
            <Grid item xs={6}>
              <Search />
            </Grid>
            <Grid item xs={6}>
              <Map />
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </AirportsProvider>
  );
}

export default App;
