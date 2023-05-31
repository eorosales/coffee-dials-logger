import { useLoaderData } from "react-router-dom";
import "./App.css";

function App() {
  const { coffees } = useLoaderData();
  console.log(coffees);
  return (
    <>
      <h1>What&apos;s Up World</h1>
    </>
  );
}

export default App;
