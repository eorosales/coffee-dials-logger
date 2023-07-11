// Utils
import PropTypes from "prop-types";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { useRevalidator } from "react-router-dom";
import { capitalize } from "../../utils/capitalize";
import { db } from "../../../config/firebase";
// MUI
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Container } from "@mui/material";

const UpdateCoffeeForm = ({
  coffeeInfo,
  handleDeleteCoffee,
  handleExpandClick,
}) => {
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
    handleExpandClick();
  };

  return (
    <Container>
      <Box
        component='form'
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        autoComplete='off'
        onSubmit={handleSubmit}>
        <TextField
          id='filled-basic'
          label='Roaster'
          variant='filled'
          name='roaster'
          placeholder='Coffee Roaster'
          value={updateData.roaster}
          onChange={(e) => handleChange(e)}
          required
        />
        <TextField
          id='filled-basic'
          label='Name'
          variant='filled'
          name='name'
          placeholder='Coffee Name'
          value={updateData.name}
          onChange={(e) => handleChange(e)}
          required
        />
        <TextField
          id='filled-basic'
          label='Origin'
          variant='filled'
          name='origin'
          placeholder='Coffee Origin'
          value={updateData.origin}
          onChange={(e) => handleChange(e)}
          required
        />
        <TextField
          id='filled-basic'
          label='Process'
          variant='filled'
          name='process'
          placeholder='Coffee Process'
          value={updateData.process}
          onChange={(e) => handleChange(e)}
          required
        />
        <TextField
          id='filled-basic'
          label='Flavor Notes'
          variant='filled'
          name='flavorNotes'
          placeholder='Coffee Flavor Notes'
          value={updateData.flavorNotes}
          onChange={(e) => handleChange(e)}
          required
        />
        <Button type='submit'>Update</Button>
        <Button
          sx={{ color: "tomato" }}
          onClick={() => handleDeleteCoffee(coffeeInfo.id)}>
          Delete
        </Button>
      </Box>
    </Container>
  );
};

export default UpdateCoffeeForm;

UpdateCoffeeForm.propTypes = {
  coffeeInfo: PropTypes.object.isRequired,
  handleDeleteCoffee: PropTypes.func.isRequired,
  handleExpandClick: PropTypes.func.isRequired,
};
