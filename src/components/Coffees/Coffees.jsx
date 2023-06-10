// Utils
import PropTypes from "prop-types";
import { useState } from "react";
import { useRevalidator } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
// Components
import NewCoffeeForm from "../NewCoffeeForm/NewCoffeeForm";
import CoffeeCard from "../CoffeeCard/CoffeeCard";
// MUI
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, Typography } from "@mui/material";

const Coffees = ({ coffees }) => {
  const [open, setOpen] = useState(false);
  const revalidator = useRevalidator();

  // Handle Modal form to add new coffee
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  // Render coffees in db where 'favorite' === true
  const favoriteCoffees = () => {
    const favorites = coffees.filter((coffee) => coffee.favorite === true);
    return favorites.length > 0 ? (
      favorites.map((fav) => {
        return (
          <Grid key={fav.id} xs={6} md={4} lg={3}>
            <CoffeeCard coffee={fav} toggleFavorite={toggleFavorite} />
          </Grid>
        );
      })
    ) : (
      <Grid>
        <Typography variant='h6'>
          You don&apos;t have a favorite? Keep tasting coffee until you do!
        </Typography>
      </Grid>
    );
  };

  // Render all coffees in db
  const allCoffees = () =>
    coffees.map((coffee) => (
      <Grid key={coffee.id} xs={6} md={4} lg={3}>
        <CoffeeCard coffee={coffee} toggleFavorite={toggleFavorite} />
      </Grid>
    ));

  return (
    <>
      <Box sx={{ flexgrow: 1, marginBlockEnd: 4 }}>
        {/* Grid of Coffees that are favorited */}
        <Typography sx={{ fontSize: "2.2em", marginBlockEnd: 1 }}>
          Favorites
        </Typography>
        <Grid container spacing={2}>
          {favoriteCoffees()}
        </Grid>
      </Box>
      <Box sx={{ flexgrow: 1, marginBlockEnd: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{ fontSize: "2.2em", marginBlockEnd: 1 }}>
            All Coffees
          </Typography>
          <Button onClick={handleClickOpen}>Add New Coffee</Button>
          {/* Modal form: Add New Coffee */}
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add New Coffeee</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Fill out this form to add a new coffee to your collection.
              </DialogContentText>
              <NewCoffeeForm handleClose={handleClose} />
            </DialogContent>
          </Dialog>
        </Box>
        {/* Grid of All Coffees in db */}
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
