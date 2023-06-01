import PropTypes from "prop-types";
import NewCoffeeForm from "../NewCoffeeForm";
import CoffeeCard from "../CoffeeCard";

const Coffees = ({ coffees }) => {
  const recentCoffees = () =>
    coffees
      .sort((a, b) => b.createdAt - a.createdAt)
      .map((rec) => <CoffeeCard key={rec.id} coffee={rec} />);

  const favoriteCoffees = () =>
    coffees
      .filter((coffee) => coffee.favorite === true)
      .map((fav) => <CoffeeCard key={fav.id} coffee={fav} />);

  const allCoffees = () =>
    coffees.map((coffee) => <CoffeeCard key={coffee.id} coffee={coffee} />);

  return (
    <>
      <NewCoffeeForm />
      <section>
        <h3>Recent</h3>
        {recentCoffees()}
      </section>
      <hr />
      <section>
        <h3>Favorites</h3>
        {favoriteCoffees()}
      </section>
      <hr />
      <section>
        <h3>Coffees Gallery</h3>
        {allCoffees()}
      </section>
    </>
  );
};

export default Coffees;

Coffees.propTypes = {
  coffees: PropTypes.array.isRequired,
};
