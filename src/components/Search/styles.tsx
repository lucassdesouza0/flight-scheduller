import { styled, Theme } from "@mui/material/styles";
import { Button, Paper, TextField } from "@mui/material";
import { FlightLand, FlightTakeoff } from "@mui/icons-material";

export const PaperContainer = styled(Paper)(({ theme }) => ({
  padding: "1rem",
  margin: "1rem",
  borderRadius: "1rem",
  bgcolor: "background.paper",
  [theme.breakpoints.down("md")]: {
    padding: "0",
    overflow: "hidden",
  },
}));

export const BasicIcon = ({ theme }: { theme: Theme }) => ({
  padding: "1rem",
  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.down("md")]: {
    padding: "0.8rem",
    width: "0.9rem",
    height: "0.9rem",
  },
});

export const TakeOffIcon = styled(FlightTakeoff)(({ theme }) => ({
  ...BasicIcon({ theme }),
  marginRight: 2,
  flexShrink: 0,
  borderRadius: "2rem",
}));

export const LanIcon = styled(FlightLand)(({ theme }) => ({
  ...BasicIcon({ theme }),
  marginRight: 2,
  flexShrink: 0,
  borderRadius: "2rem",
}));

export const SubmitButton = styled(Button)(({ theme }) => ({
  display: "block",
  minWidth: "100px",
  margin: "0 auto",
}));

export const TextFieldStyled = styled(TextField)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,

  [theme.breakpoints.down("md")]: {},
}));

export const Form = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  [theme.breakpoints.down("md")]: {
    gap: "0.1rem",
  },
}));
