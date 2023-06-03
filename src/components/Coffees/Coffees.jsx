import "./styles.css";
import PropTypes from "prop-types";
import { useRevalidator } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import NewCoffeeForm from "../NewCoffeeForm/NewCoffeeForm";
import CoffeeCard from "../CoffeeCard/CoffeeCard";

const Coffees = ({ coffees }) => {
  const revalidator = useRevalidator();

  const toggleFavorite = async (id, fav) => {
    const coffeeDocRef = doc(db, "coffees", id);
    try {
      await updateDoc(coffeeDocRef, {
        favorite: !fav,
      });
      revalidator.revalidate();
    } catch (err) {
      throw new Error(err);
    }
  };

  // const recentCoffees = () =>
  //   coffees
  //     .sort((a, b) => b.createdAt - a.createdAt)
  //     .map((rec) => (
  //       <CoffeeCard key={rec.id} coffee={rec} toggleFavorite={toggleFavorite} />
  //     ));

  const favoriteCoffees = () =>
    coffees
      .filter((coffee) => coffee.favorite === true)
      .map((fav) => (
        <CoffeeCard key={fav.id} coffee={fav} toggleFavorite={toggleFavorite} />
      ));

  const allCoffees = () =>
    coffees.map((coffee) => (
      <CoffeeCard
        key={coffee.id}
        coffee={coffee}
        toggleFavorite={toggleFavorite}
      />
    ));

  return (
    <>
      <NewCoffeeForm />
      <section>
        <h3>Favorites</h3>
        <div className='coffees-container'>{favoriteCoffees()}</div>
      </section>
      <hr />
      {/* <section>
        <h3>Recent</h3>
        {recentCoffees()}
      </section>
      <hr /> */}
      <section>
        <h3>Coffees Gallery</h3>
        <div className='coffees-container'>{allCoffees()}</div>
      </section>
    </>
  );
};

export default Coffees;

Coffees.propTypes = {
  coffees: PropTypes.array.isRequired,
};
