import { useLoaderData } from "react-router-dom";
import "./App.css";
import Coffees from "./components/Coffees";

function App() {
  const { coffees } = useLoaderData();

  return (
    <>
      <h1>What&apos;s Up World</h1>
      <Coffees coffees={coffees} />
    </>
  );
}

export default App;
