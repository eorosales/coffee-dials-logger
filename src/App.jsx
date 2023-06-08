import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./App.css";
import { useLoaderData } from "react-router-dom";
import Coffees from "./components/Coffees/Coffees";

function App() {
  const { coffees } = useLoaderData();

  return (
    <>
      <h1>What&apos;s Up Danger</h1>
      <Coffees coffees={coffees} />
    </>
  );
}

export default App;
