import { useLoaderData } from "react-router-dom";
import "./App.css";
import Coffees from "./components/Coffees";
import FavoriteCoffees from "./components/FavoriteCoffees";
import NewCoffeeForm from "./components/NewCoffeeForm";

function App() {
  const { coffees } = useLoaderData();

  const favorites = coffees.filter((coffee) => coffee.favorite === true);

  return (
    <>
      <h1>What&apos;s Up World</h1>
      <NewCoffeeForm />
      <Coffees coffees={coffees} />
      <FavoriteCoffees coffees={favorites} />
    </>
  );
}

export default App;
