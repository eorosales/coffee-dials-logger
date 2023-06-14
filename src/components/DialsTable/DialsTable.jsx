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

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Temperature ({`\u00b0`}F)</TableCell>
            <TableCell>Weight (g)</TableCell>
            <TableCell> Time (seconds)</TableCell>
            <TableCell>Yield (g)</TableCell>
            <TableCell>&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dials.map((dial) => (
            <TableRow
              key={dial.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component='th' scope='row'>
                {dial.temp}
              </TableCell>
              <TableCell align='middle'>{dial.weight}</TableCell>
              <TableCell align='middle'>{dial.time}</TableCell>
              <TableCell align='middle'>{dial.yield}</TableCell>
              <TableCell align='right'>
                <Button onClick={() => deleteDial(dial.id)}>
                  <DeleteIcon sx={{ color: "salmon" }} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DialsTable;

DialsTable.propTypes = {
  deleteDial: PropTypes.func.isRequired,
};
