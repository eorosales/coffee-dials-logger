import PropTypes from "prop-types";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import NewCoffeeForm from "../NewCoffeeForm";
import CoffeeCard from "../CoffeeCard";
import { useRevalidator } from "react-router-dom";

const Coffees = ({ coffees }) => {
  const revalidator = useRevalidator();

  // Delete coffee and revalidate loader data
  const handleDeleteCoffee = async (id) => {
    const coffeeDoc = doc(db, "coffees", id);
    await deleteDoc(coffeeDoc);
    revalidator.revalidate();
  };

  const favorites = coffees.filter((coffee) => coffee.favorite === true);

  return (
    <>
      <NewCoffeeForm />
      <section>
        <h3>Recent</h3>
      </section>
      <section>
        <h3>Favorites</h3>
        {favorites.map((fav) => (
          <CoffeeCard
            key={fav.id}
            coffee={fav}
            deleteCoffee={(id) => handleDeleteCoffee(id)}
          />
        ))}
      </section>
      <section>
        <h3>Coffees</h3>
        {coffees.map((coffee) => (
          <CoffeeCard
            key={coffee.id}
            coffee={coffee}
            deleteCoffee={handleDeleteCoffee}
          />
        ))}
      </section>
    </>
  );
};

export default Coffees;

Coffees.propTypes = {
  coffees: PropTypes.array.isRequired,
};
