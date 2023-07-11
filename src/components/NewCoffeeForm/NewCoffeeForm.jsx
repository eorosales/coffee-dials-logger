// Utils
import PropTypes from "prop-types";
import { useState } from "react";
import { useRevalidator } from "react-router-dom";
import { addNewCoffee } from "../../utils/utils.js";
// MUI
import {
  Box,
  Button,
  Container,
  DialogActions,
  TextField,
} from "@mui/material";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewCoffee(formData);
    revalidator.revalidate();
    handleClose();
    setFormData({
      roaster: "",
      name: "",
      origin: "",
      process: "",
      flavorNotes: "",
    });
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
