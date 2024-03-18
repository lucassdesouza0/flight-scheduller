import { styled } from "@mui/material/styles";
import { Container as ContainerMUI } from "@mui/material";

export const Container = styled(ContainerMUI)(({ theme }) => ({
  padding: "1rem",
  height: "100vh",
  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.down("md")]: {
    padding: "0",
    overflow: "hidden",
  },
}));
