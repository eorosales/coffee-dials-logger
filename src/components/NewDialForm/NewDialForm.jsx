// Utils
import PropTypes from "prop-types";
import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useRevalidator } from "react-router-dom";
import { db } from "../../../config/firebase";
import { Box, Button, TextField } from "@mui/material";

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
    <Box sx={{ display: "flex", my: "2ch", justifyContent: "space-between" }}>
      <TextField
        id='outlined-number'
        type='number'
        label='Temperature'
        variant='outlined'
        name='temp'
        placeholder=''
        value={dialInput.temp}
        onChange={(e) => handleChange(e)}
        required
      />

      {/* Weight Input */}
      <TextField
        id='outlined-number'
        variant='outlined'
        type='number'
        label='Weight'
        name='weight'
        placeholder=''
        value={dialInput.weight}
        onChange={(e) => handleChange(e)}
        required
      />

      {/* Time input */}
      <TextField
        id='outlined-number'
        variant='outlined'
        type='number'
        label='Time'
        name='time'
        placeholder=''
        value={dialInput.time}
        onChange={(e) => handleChange(e)}
        required
      />

      {/* Yield input */}
      <TextField
        id='outlined-number'
        variant='outlined'
        type='number'
        label='Yield'
        name='yield'
        placeholder=' '
        value={dialInput.yield}
        onChange={(e) => handleChange(e)}
        required
      />

      <Button type='submit' onClick={handleSubmit}>
        Add Dial
      </Button>
    </Box>
  );
};

export default NewDialForm;

NewDialForm.propTypes = {
  coffeeId: PropTypes.string.isRequired,
};
