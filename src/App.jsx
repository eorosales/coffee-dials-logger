import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./App.css";
import { useLoaderData } from "react-router-dom";
import Coffees from "./components/Coffees/Coffees";
import { Container, Typography } from "@mui/material";

function App() {
  const { coffees } = useLoaderData();

  return (
    <Container>
      <Typography
        sx={{ fontSize: "3rem", textAlign: "center", marginBlockEnd: 8 }}>
        Coffee Dials Logger
      </Typography>
      <Coffees coffees={coffees} />
    </Container>
  );
}

export default App;
