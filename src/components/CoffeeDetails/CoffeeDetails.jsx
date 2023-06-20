import { useEffect, useRef, useState } from "react";
import { useParams, useRevalidator } from "react-router-dom";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import NewDialForm from "../NewDialForm/NewDialForm";
import DialsTable from "../DialsTable/DialsTable";
import {
  Box,
  Card,
  CardContent,
  Container,
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
      <Card sx={{ mt: "6ch" }}>
        {status === "success" && (
          <>
            <CardContent>
              {Object.values(coffee).map((value) => {
                return (
                  <Box
                    component='div'
                    sx={{ display: "flex", justifyContent: "space-around" }}
                    key={`${value.roaster} + ${value.name}`}>
                    <Box component='div'>
                      <Typography variant='h5'>{value.roaster}</Typography>
                      <Typography variant='h3'>{value.name}</Typography>
                      <Typography variant='subtitle' color='text.secondary'>
                        {value.origin}
                      </Typography>
                    </Box>
                    {/* 
                    
                    */}
                    <List>
                      {/* <Typography variant='h4'>
                        {value.process} Process
                      </Typography> */}
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
