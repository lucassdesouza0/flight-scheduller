import Grid from "@mui/material/Grid/Grid";
import { useState } from "react";
import Header from "./components/Header";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Map from "./components/Map";
import Search from "./components/Search";
import { AirportsProvider } from "./context/airportsRoute";
import useLocalStorage from "./hooks/useLocalStorage";
import { Container } from "./styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ffffff",
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

function App(): JSX.Element {
  const [value, updateValue] = useLocalStorage("darkMode", false);
  const [darkMode, setDarkMode] = useState<boolean>(value);

  const handleThemeToggle = (): void => {
    setDarkMode(!darkMode);
    updateValue(!darkMode);
  };

  return (
    <AirportsProvider>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <Container maxWidth="xl" disableGutters>
          <Header handleThemeToggle={handleThemeToggle} darkMode={darkMode} />
          <Grid
            container
            justifyContent="space-between"
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
