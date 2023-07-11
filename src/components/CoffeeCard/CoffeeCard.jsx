import PropTypes from "prop-types";
import { useState } from "react";
import { Link as RouterLink, useRevalidator } from "react-router-dom";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import UpdateCoffeeForm from "../UpdateCoffeeForm/UpdateCoffeeForm";

// MUI
import styled from "@emotion/styled";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Link from "@mui/material/Link";
import {
  IconButton,
  // Modal
} from "@mui/material";
// import AlertDeleteCoffee from "../AlertDeleteCoffee/AlertDeleteCoffee";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton expand={expand.toString()} {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const CoffeeCard = ({ coffee, toggleFavorite }) => {
  const [expanded, setExpanded] = useState(false);
  const { name, roaster, origin, process, flavor_notes, favorite } = coffee;
  const revalidator = useRevalidator();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // const [open, setOpen] = useState(false);

  // const handleClose = () => setOpen(false);

  // Delete coffee and revalidate loader data
  const handleDeleteCoffee = async (id) => {
    const coffeeDoc = doc(db, "coffees", id);
    try {
      await deleteDoc(coffeeDoc);
      revalidator.revalidate();
    } catch (err) {
      throw Error(err);
    }
    handleExpandClick();
  };

  return (
    <Card>
      {/* Card Content */}
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
          {roaster}
        </Typography>
        <Typography variant='h5' component='div'>
          {name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color='text.secondary'>
          {origin} | {process}
        </Typography>
        {flavor_notes.map((note) => (
          <Typography variant='body2' key={flavor_notes.indexOf(note)}>
            {flavor_notes[flavor_notes.indexOf(note)]}
          </Typography>
        ))}

        <Link
          component={RouterLink}
          to={`coffees/${coffee.id}`}
          style={{ textDecoration: "none" }}>
          <strong>Details</strong>
        </Link>
      </CardContent>

      {/* Card Actions */}
      <CardActions disableSpacing>
        {favorite === true ? (
          <IconButton
            aria-label='remove from favorites'
            onClick={() => toggleFavorite(coffee.id, favorite)}>
            <MdFavorite />
          </IconButton>
        ) : (
          <IconButton
            aria-label='add to favorites'
            onClick={() => toggleFavorite(coffee.id, favorite)}>
            <MdFavoriteBorder />
          </IconButton>
        )}
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label='show more'>
          {" "}
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>

      {/* Card Collapse Content */}
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <UpdateCoffeeForm
          coffeeInfo={coffee}
          handleDeleteCoffee={handleDeleteCoffee}
          handleExpandClick={handleExpandClick}
        />
      </Collapse>

      {/* Error from below */}
      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <AlertDeleteCoffee coffee={coffee} />
      </Modal> */}
    </Card>
  );
};

export default CoffeeCard;

CoffeeCard.propTypes = {
  coffee: PropTypes.object.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
};
