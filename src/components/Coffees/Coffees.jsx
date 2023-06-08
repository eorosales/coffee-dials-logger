import PropTypes from "prop-types";
import { useRevalidator } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import NewCoffeeForm from "../NewCoffeeForm/NewCoffeeForm";
import CoffeeCard from "../CoffeeCard/CoffeeCard";
// MUI
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { Typography } from "@mui/material";

const Coffees = ({ coffees }) => {
  const revalidator = useRevalidator();

  const toggleFavorite = async (id, fav) => {
    const coffeeDocRef = doc(db, "coffees", id);
    try {
      await updateDoc(coffeeDocRef, {
        favorite: !fav,
      });
      revalidator.revalidate();
    } catch (err) {
      throw new Error(err);
    }
  };

  const favoriteCoffees = () =>
    coffees
      .filter((coffee) => coffee.favorite === true)
      .map((fav) => (
        <Grid key={fav.id} xs={3}>
          <CoffeeCard coffee={fav} toggleFavorite={toggleFavorite} />
        </Grid>
      ));

  const allCoffees = () =>
    coffees.map((coffee) => (
      <Grid key={coffee.id} xs={3}>
        <CoffeeCard coffee={coffee} toggleFavorite={toggleFavorite} />
      </Grid>
    ));

  return (
    <>
      <NewCoffeeForm />
      <Box sx={{ flexgrow: 1 }}>
        <Typography variant='h2'>Favorites</Typography>
        <Grid container spacing={2}>
          {favoriteCoffees()}
        </Grid>
      </Box>
      <Box sx={{ flexgrow: 1 }}>
        <Typography variant='h2'>All Coffees</Typography>
        <Grid container spacing={2}>
          {allCoffees()}
        </Grid>
      </Box>
    </>
  );
};

export default Coffees;

Coffees.propTypes = {
  coffees: PropTypes.array.isRequired,
};
