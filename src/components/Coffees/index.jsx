import PropTypes from "prop-types";
import CoffeeCard from "../CoffeeCard";

const Coffees = ({ coffees }) => {
  return (
    <div>
      {coffees.map((coffee) => {
        return <CoffeeCard key={coffee.id} coffee={coffee} />;
      })}
    </div>
  );
};

export default Coffees;

Coffees.propTypes = {
  coffees: PropTypes.array.isRequired,
};
