// Utils
import PropTypes from "prop-types";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { useRevalidator } from "react-router-dom";
import { db } from "../../../config/firebase";
import { capitalize } from "../../utils/capitalize";
// MUI
import Box from "@mui/material/Box";
import { Button, Container, DialogActions, TextField } from "@mui/material";

const NewCoffeeForm = ({ handleClose }) => {
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
    const value = e.target.value;
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
        roaster: capitalize(formData.roaster),
        name: capitalize(formData.name),
        origin: capitalize(formData.origin),
        process: capitalize(formData.process),
        flavor_notes: capitalize(formData.flavorNotes).split(","),
        favorite: false,
        createdAt: Date.now(),
      });
      revalidator.revalidate();
      handleClose();
      setFormData({
        roaster: "",
        name: "",
        origin: "",
        process: "",
        flavorNotes: "",
      });
    } catch (err) {
      throw new Error(err);
    }
  };

  return (
    <Container>
      <Box
        component='form'
        sx={{
          "& > :not(style)": {
            m: 1,
            // width: "25ch",
            display: "flex",
            flexDirection: "column",
          },
        }}
        autoComplete='off'
        onSubmit={handleSubmit}>
        <TextField
          id='filled-basic'
          label='Roaster'
          variant='filled'
          name='roaster'
          value={formData.roaster}
          onChange={(e) => handleChange(e)}
          required
        />
        <TextField
          id='filled-basic'
          label='Name'
          variant='filled'
          name='name'
          placeholder='Coffee Name'
          value={formData.name}
          onChange={(e) => handleChange(e)}
          required
        />
        <TextField
          id='filled-basic'
          label='Origin'
          variant='filled'
          name='origin'
          placeholder='Coffee Origin'
          value={formData.origin}
          onChange={(e) => handleChange(e)}
          required
        />
        <TextField
          id='filled-basic'
          label='Process'
          variant='filled'
          name='process'
          placeholder='Coffee Process'
          value={formData.process}
          onChange={(e) => handleChange(e)}
          required
        />
        <TextField
          id='filled-basic'
          label='Flavor Notes'
          variant='filled'
          name='flavorNotes'
          placeholder='Coffee Flavor Notes'
          value={formData.flavorNotes}
          onChange={(e) => handleChange(e)}
          required
        />
        <DialogActions sx={{ display: "flex" }}>
          <Button type='submit'>Add</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Box>
    </Container>
  );
};

export default NewCoffeeForm;

NewCoffeeForm.propTypes = {
  handleClose: PropTypes.func.isRequired,
};
