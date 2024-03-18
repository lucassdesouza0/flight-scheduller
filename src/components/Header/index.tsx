import { FormControlLabel, Switch, Toolbar, Typography } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { AppBarContainer } from "./styles";

interface HeaderProps {
  handleThemeToggle: () => void;
}

const Header: React.FC<HeaderProps & { darkMode: boolean }> = ({
  handleThemeToggle,
  darkMode,
}) => {
  return (
    <header>
      <AppBarContainer position="static">
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
      </AppBarContainer>
    </header>
  );
};

export default Header;
