import {
  AppBar,
  FormControlLabel,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

interface HeaderProps {
  handleThemeToggle: () => void;
}

const Header: React.FC<HeaderProps & { darkMode: boolean }> = ({
  handleThemeToggle,
  darkMode,
}) => {
  // Rest of the code...

  return (
    <header>
      <AppBar position="static" sx={{ borderRadius: "1rem" }}>
        <Toolbar>
          <Typography variant="h4" fontWeight="500">
            Flight Helper
          </Typography>
          <FormControlLabel
            control={
              <Switch
                defaultChecked
                checked={darkMode}
                onChange={handleThemeToggle}
              />
            }
            label={darkMode ? <DarkModeIcon /> : <LightModeIcon />}
            sx={{ marginLeft: "auto" }}
          />
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Header;
