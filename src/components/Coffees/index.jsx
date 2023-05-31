import PropTypes from "prop-types";
import NewCoffeeForm from "../NewCoffeeForm";
import CoffeeCard from "../CoffeeCard";

const Coffees = ({ coffees }) => {
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
          <CoffeeCard key={fav.id} coffee={fav} />
        ))}
      </section>
      <section>
        <h3>Coffees</h3>
        {coffees.map((coffee) => (
          <CoffeeCard key={coffee.id} coffee={coffee} />
        ))}
      </section>
    </>
  );
};

export default Coffees;

Coffees.propTypes = {
  coffees: PropTypes.array.isRequired,
};
