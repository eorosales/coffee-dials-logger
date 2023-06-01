import PropTypes from "prop-types";

const CoffeeCard = ({ coffee, deleteCoffee }) => {
  const { name, roaster, origin, process, flavor_notes } = coffee;

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
      <button onClick={() => deleteCoffee(coffee.id)}>X</button>
    </>
  );
};

export default CoffeeCard;

CoffeeCard.propTypes = {
  coffee: PropTypes.object.isRequired,
  deleteCoffee: PropTypes.func.isRequired,
};
