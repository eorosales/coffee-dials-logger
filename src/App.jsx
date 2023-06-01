import { useLoaderData } from "react-router-dom";
import "./App.css";
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
