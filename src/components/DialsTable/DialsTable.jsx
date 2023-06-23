// Utils
import PropTypes from "prop-types";
import { useLoaderData } from "react-router-dom";

// MUI
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const DialsTable = ({ deleteDial }) => {
  const dials = useLoaderData();

  // Render sorted dials from oldest to newwest
  const sortedDials = () => {
    return Object.keys(dials)
      .sort((a, b) => {
        const dialsA = Object.values(dials[a].createdAt)[0];
        const dialsB = Object.values(dials[b].createdAt)[0];
        return dialsB - dialsA;
      })
      .map((dial) => {
        return (
          <TableRow
            key={dials[dial].id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell align='center'>{dials[dial].temp}</TableCell>
            <TableCell align='center'>{dials[dial].weight}</TableCell>
            <TableCell align='center'>{dials[dial].time}</TableCell>
            <TableCell align='center'>{dials[dial].yield}</TableCell>
            <TableCell align='center'>
              <Button onClick={() => deleteDial(dials[dial].id)}>
                <DeleteIcon sx={{ color: "salmon" }} />
              </Button>
            </TableCell>
          </TableRow>
        );
      });
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell align='center'>Temperature (F)</TableCell>
            <TableCell align='center'>Weight (g)</TableCell>
            <TableCell align='center'>Time (seconds)</TableCell>
            <TableCell align='center'>Yield (g)</TableCell>
            <TableCell align='center'>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{sortedDials()}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default DialsTable;

DialsTable.propTypes = {
  deleteDial: PropTypes.func.isRequired,
};
