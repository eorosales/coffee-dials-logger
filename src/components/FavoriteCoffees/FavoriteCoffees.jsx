import PropTypes from "prop-types";
import CoffeeCard from "../CoffeeCard";

const FavoriteCoffees = ({ coffees }) => {
  return (
    <>
      <div>FavoriteCoffees</div>
      {coffees.map((coffee) => {
        return <CoffeeCard key={coffee.id} coffee={coffee} />;
      })}
    </>
  );
};

export default FavoriteCoffees;

FavoriteCoffees.propTypes = {
  coffees: PropTypes.array.isRequired,
};
