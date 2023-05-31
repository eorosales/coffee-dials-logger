import PropTypes from "prop-types";

const CoffeeCard = ({ coffee }) => {
  const { name, roaster, origin, process, flavor_notes } = coffee;

  return (
    <>
      <h3>{name}</h3>
      <p>{roaster}</p>
      <p>{origin}</p>
      <p>{process}</p>
      <ul>
        {flavor_notes.map((note) => {
          return <li key={flavor_notes.indexOf(note)}>{note}</li>;
        })}
      </ul>
    </>
  );
};

export default CoffeeCard;

CoffeeCard.propTypes = {
  coffee: PropTypes.object.isRequired,
};
