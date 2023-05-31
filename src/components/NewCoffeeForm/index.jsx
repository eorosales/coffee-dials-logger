import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { useRevalidator } from "react-router-dom";
import { db } from "../../../config/firebase";
import { capitalize } from "../../utils/capitalize";

const NewCoffeeForm = () => {
  // Form input controlled value states
  const [formData, setFormData] = useState({
    roaster: "",
    name: "",
    origin: "",
    process: "",
    flavorNotes: "",
  });

  // Firebase utilities
  const coffeesCollectionRef = collection(db, "coffees");
  const revalidator = useRevalidator();

  const handleChange = (e) => {
    e.preventDefault();
    const value = capitalize(e.target.value);
    const name = e.target.name;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(coffeesCollectionRef, {
        roaster: formData.roaster,
        name: formData.name,
        origin: formData.origin,
        process: formData.process,
        flavor_notes: formData.flavorNotes.split(", "),
        favorite: true,
      });
      revalidator.revalidate();
    } catch (err) {
      throw new Error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name='roaster'
        placeholder='Coffee Roaster'
        value={formData.roaster}
        onChange={(e) => handleChange(e)}
        required
      />
      <input
        name='name'
        placeholder='Coffee Name'
        value={formData.name}
        onChange={(e) => handleChange(e)}
        required
      />
      <input
        name='origin'
        placeholder='Coffee Origin'
        value={formData.origin}
        onChange={(e) => handleChange(e)}
        required
      />
      <input
        name='process'
        placeholder='Coffee Process'
        value={formData.process}
        onChange={(e) => handleChange(e)}
        required
      />
      <input
        name='flavorNotes'
        placeholder='Coffee Flavor Notes'
        value={formData.flavorNotes}
        onChange={(e) => handleChange(e)}
        required
      />
      <button type='submit'>Submit</button>
    </form>
  );
};

export default NewCoffeeForm;
