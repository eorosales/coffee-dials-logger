import PropTypes from "prop-types";
import "./styles.css";
import { Link, useRevalidator } from "react-router-dom";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import UpdateCoffeeForm from "../UpdateCoffeeForm/UpdateCoffeeForm";

const CoffeeCard = ({ coffee, toggleFavorite }) => {
  const { name, roaster, origin, process, flavor_notes, favorite } = coffee;

  // const coffeeDocRef = doc(db, "coffees", coffee.id);
  const revalidator = useRevalidator();

  // Delete coffee and revalidate loader data
  const handleDeleteCoffee = async (id) => {
    const coffeeDoc = doc(db, "coffees", id);
    await deleteDoc(coffeeDoc);
    revalidator.revalidate();
  };

  return (
    <section className='coffee-card'>
      {favorite === true ? (
        <MdFavorite onClick={() => toggleFavorite(coffee.id, favorite)} />
      ) : (
        <MdFavoriteBorder onClick={() => toggleFavorite(coffee.id, favorite)} />
      )}

      <h3>{name}</h3>
      <p>{roaster}</p>
      <p>{origin}</p>
      <p>{process}</p>
      <ul>
        {flavor_notes.map((note) => {
          return <li key={flavor_notes.indexOf(note)}>{note}</li>;
        })}
      </ul>

      <UpdateCoffeeForm coffeeInfo={coffee} />
      <button onClick={() => handleDeleteCoffee(coffee.id)}>Delete</button>
      <Link to={`coffees/${coffee.id}`}>Dials</Link>
    </section>
  );
};

export default CoffeeCard;

CoffeeCard.propTypes = {
  coffee: PropTypes.object.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
};
