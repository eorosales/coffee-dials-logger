// Utils
import PropTypes from "prop-types";
import { useState } from "react";
import { useRevalidator } from "react-router-dom";
import { Button, Grid, TextField } from "@mui/material";
import { addNewDial } from "../../utils/utils";

const NewDialForm = ({ coffeeId }) => {
  const [dialInput, setDialInput] = useState({
    temp: "",
    weight: "",
    time: "",
    yield: "",
  });

  const textfields = ["temp", "weight", "time", "yield"];
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

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewDial(dialInput, coffeeId, () => revalidator.revalidate());

    // const formInputs = Object.keys(dialInput);
    // let newDialInputs = { ...dialInput };

    // for (let index = 0; index < formInputs.length; index++) {
    //   const currentField = formInputs[index];
    //   const currentValue = dialInput[currentField];

    //   if (currentValue === "") {
    //     newDialInputs = {
    //       ...newDialInputs,
    //       [currentField]: {
    //         ...newDialInputs[currentField],
    //         error: true,
    //       },
    //     };
    //   }
    // }
  };

  return (
    <Grid container component='form' columns={{ xs: 1, sm: 10 }} spacing={1}>
      {textfields.map((category) => (
        <Grid key={category} item xs={1} sm={2} my={1}>
          <TextField
            id='outlined-number'
            label={category}
            variant='outlined'
            name={category}
            placeholder=''
            value={dialInput[category]}
            onChange={(e) => handleChange(e)}
          />
        </Grid>
      ))}
      <Grid
        item
        xs={1}
        sm={2}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}>
        <Button type='submit' onClick={handleSubmit}>
          Add Dial
        </Button>
      </Grid>
    </Grid>
  );
};

export default NewDialForm;

NewDialForm.propTypes = {
  coffeeId: PropTypes.string.isRequired,
};
