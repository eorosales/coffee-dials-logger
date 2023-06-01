import PropTypes from "prop-types";
import { useRevalidator } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import UpdateCoffeeForm from "../UpdateCoffeeForm";

const CoffeeCard = ({ coffee }) => {
  const { name, roaster, origin, process, flavor_notes } = coffee;
  const revalidator = useRevalidator();

  // Delete coffee and revalidate loader data
  const handleDeleteCoffee = async (id) => {
    const coffeeDoc = doc(db, "coffees", id);
    await deleteDoc(coffeeDoc);
    revalidator.revalidate();
  };

  return (
    <>
      <h4>{name}</h4>
      <p>{roaster}</p>
      <p>{origin}</p>
      <p>{process}</p>
      <ul>
        {flavor_notes.map((note) => {
          return <li key={flavor_notes.indexOf(note)}>{note}</li>;
        })}
      </ul>
      <button onClick={() => handleDeleteCoffee(coffee.id)}>X</button>
      {/* <button onClick={() => handleUpdateCoffee()}></button> */}
      <UpdateCoffeeForm coffeeInfo={coffee} />
    </>
  );
};

export default CoffeeCard;

CoffeeCard.propTypes = {
  coffee: PropTypes.object.isRequired,
};
