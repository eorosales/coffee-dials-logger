import PropTypes from "prop-types";
import { useState } from "react";
import { db } from "../../../config/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useRevalidator } from "react-router-dom";

const NewDialForm = ({ coffeeId }) => {
  const [dialInput, setDialInput] = useState({
    coffeeName: "",
    temp: "",
    weight: "",
    time: "",
    yield: "",
  });

  const dialsCollectionRef = collection(db, "dials");
  const revalidator = useRevalidator();

  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    const name = e.target.name;
    setDialInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(dialsCollectionRef, {
        coffee: coffeeId,
        temp: dialInput.temp,
        weight: dialInput.weight,
        time: dialInput.time,
        yield: dialInput.yield,
        createdAt: serverTimestamp(),
      });
      revalidator.revalidate();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Temperatute Input */}
      <div>
        <label id='temp'>Temperature</label>
        <input
          type='number'
          id='temp'
          placeholder=' '
          name='temp'
          required
          value={dialInput.temp}
          onChange={(e) => handleChange(e)}
        />
      </div>
      {/* Weight Input */}
      <div>
        <label id='weight'>Weight</label>
        <input
          type='number'
          id='weight'
          placeholder=' '
          name='weight'
          required
          value={dialInput.weight}
          onChange={(e) => handleChange(e)}
        />
      </div>
      {/* Time input */}
      <div>
        <label id='time'>Time</label>
        <input
          type='number'
          id='time'
          placeholder=' '
          name='time'
          required
          value={dialInput.time}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div>
        <label id='yield'>Yield</label>
        <input
          type='number'
          id='yield'
          placeholder=' '
          name='yield'
          required
          value={dialInput.yield}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <button type='submit'>Add Dial</button>
    </form>
  );
};

export default NewDialForm;

NewDialForm.propTypes = {
  coffeeId: PropTypes.string.isRequired,
};
