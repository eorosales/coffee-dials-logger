import "./styles.css";
import PropTypes from "prop-types";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { useRevalidator } from "react-router-dom";
import { db } from "../../../config/firebase";
import { capitalize } from "../../utils/capitalize";

const UpdateCoffeeForm = ({ coffeeInfo }) => {
  const { roaster, name, origin, process, flavor_notes } = coffeeInfo;

  // Form input controlled value states
  const [updateData, setUpdateData] = useState({
    roaster,
    name,
    origin,
    process,
    flavorNotes: `${flavor_notes}`,
  });

  // Firebase utilities
  const coffeeDocRef = doc(db, "coffees", coffeeInfo.id);
  const revalidator = useRevalidator();

  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    const name = e.target.name;
    setUpdateData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(coffeeDocRef, {
        roaster: capitalize(updateData.roaster),
        name: capitalize(updateData.name),
        origin: capitalize(updateData.origin),
        process: capitalize(updateData.process),
        flavor_notes: capitalize(updateData.flavorNotes).split(","),
        createdAt: Date.now(),
      });
      revalidator.revalidate();
    } catch (err) {
      throw new Error(err);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          name='roaster'
          placeholder='Coffee Roaster'
          value={updateData.roaster}
          onChange={(e) => handleChange(e)}
          required
        />
        <input
          name='name'
          placeholder='Coffee Name'
          value={updateData.name}
          onChange={(e) => handleChange(e)}
          required
        />
        <input
          name='origin'
          placeholder='Coffee Origin'
          value={updateData.origin}
          onChange={(e) => handleChange(e)}
          required
        />
        <input
          name='process'
          placeholder='Coffee Process'
          value={updateData.process}
          onChange={(e) => handleChange(e)}
          required
        />
        <input
          name='flavorNotes'
          placeholder='Coffee Flavor Notes'
          value={updateData.flavorNotes}
          onChange={(e) => handleChange(e)}
          required
        />
        <button type='submit'>Update</button>
      </form>
    </>
  );
};

export default UpdateCoffeeForm;

UpdateCoffeeForm.propTypes = {
  coffeeInfo: PropTypes.object.isRequired,
};
