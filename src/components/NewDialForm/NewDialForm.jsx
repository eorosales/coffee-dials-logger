// Utils
import PropTypes from "prop-types";
import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useRevalidator } from "react-router-dom";
import { db } from "../../../config/firebase";
import { Box, Button, Container, TextField } from "@mui/material";

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
    <Container
      sx={{
        "& > :not(style)": {
          m: 1,
          // width: "25ch",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        },
      }}>
      <Box
        component='form'
        sx={{
          "& > :not(style)": {
            m: 1,
            width: "25ch",
          },
        }}>
        {/* Temperatute Input */}

        <TextField
          id='filled-number'
          type='number'
          label='Temperature'
          variant='filled'
          name='temp'
          placeholder=''
          value={dialInput.temp}
          onChange={(e) => handleChange(e)}
          required
        />

        {/* Weight Input */}

        <TextField
          id='filled-number'
          variant='filled'
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
          id='filled-number'
          variant='filled'
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
          id='filled-number'
          variant='filled'
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
    </Container>
  );
};

export default NewDialForm;

NewDialForm.propTypes = {
  coffeeId: PropTypes.string.isRequired,
};
