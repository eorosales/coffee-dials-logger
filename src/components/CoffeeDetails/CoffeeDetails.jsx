import { useEffect, useRef, useState } from "react";
import {
  Link as RouterLink,
  useParams,
  useRevalidator,
} from "react-router-dom";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import NewDialForm from "../NewDialForm/NewDialForm";
import DialsTable from "../DialsTable/DialsTable";
import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Link,
  List,
  ListItemText,
  Typography,
} from "@mui/material";

const CoffeeDetails = () => {
  const [status, setStatus] = useState("pending");
  const { coffeeId } = useParams();
  const revalidator = useRevalidator();
  const coffeeDocRef = doc(db, "coffees", coffeeId);

  let coffee = useRef({});

  useEffect(() => {
    const getCoffee = async () => {
      try {
        const docSnap = await getDoc(coffeeDocRef);
        coffee.current = docSnap.data();
        setStatus("success");
        return coffee;
      } catch (err) {
        setStatus("error");
        throw Error(err);
      }
    };
    getCoffee();
  }, [coffeeDocRef]);

  const deleteDial = async (id) => {
    const dialsDocRef = doc(db, "dials", id);
    await deleteDoc(dialsDocRef);
    revalidator.revalidate();
  };

  return (
    <Container>
      <Link
        component={RouterLink}
        to={`/`}
        sx={{ textDecoration: "none", mt: "2ch" }}>
        <strong>Back to Home</strong>
      </Link>
      <Card sx={{ mt: "2ch" }}>
        {status === "success" && (
          <>
            <CardContent>
              {Object.values(coffee).map((value) => {
                return (
                  <Box
                    component='div'
                    sx={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                    key={`${value.roaster} + ${value.name}`}>
                    <Box component='div'>
                      <Typography variant='h5'>{value.roaster}</Typography>
                      <Typography variant='h3'>{value.name}</Typography>
                      <Typography variant='subtitle' color='text.secondary'>
                        {value.origin}
                      </Typography>
                    </Box>
                    <Divider orientation='vertical' flexItem>
                      <Typography variant='h5'>
                        {value.process} Process
                      </Typography>
                    </Divider>
                    <List sx={{ textAlign: "right" }}>
                      {value.flavor_notes.map((flavor) => (
                        <ListItemText key={flavor} primary={flavor} />
                      ))}
                    </List>
                  </Box>
                );
              })}
            </CardContent>
          </>
        )}
      </Card>
      <Box>
        <NewDialForm coffeeId={coffeeId} />
        <DialsTable deleteDial={deleteDial} />
      </Box>
    </Container>
  );
};

export default CoffeeDetails;
