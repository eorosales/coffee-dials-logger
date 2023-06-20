import PropTypes from "prop-types";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";

const AlertDeleteCoffee = ({ coffee }) => {
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert severity='warning'>
        <AlertTitle>Warning</AlertTitle>
        Deleting this coffee will also delete associated logged dials. Are you
        sure you would like to delete{" "}
        <strong>
          {coffee.name} roasted by {coffee.roaster}
        </strong>
        ?<Button>Yes</Button>
        <Button>Cancel</Button>
      </Alert>
    </Stack>
  );
};

export default AlertDeleteCoffee;

AlertDeleteCoffee.propTypes = {
  coffee: PropTypes.object.isRequired,
};
