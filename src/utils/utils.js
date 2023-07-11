import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { capitalize } from "@mui/material";

const coffeesRef = collection(db, "coffees");
const dialsRef = collection(db, "dials");

export const coffeesLoader = async () => {
  const data = await getDocs(coffeesRef);
  const coffees = data.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return { coffees };
};

export const dialsLoader = async () => {
  const data = await getDocs(dialsRef);
  const dials = data.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return { dials };
};

export const fetchCoffee = async ({ params }) => {
  let dials = [];
  const q = query(
    collection(db, "dials"),
    where("coffee", "==", params.coffeeId)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((dial) =>
    dials.push({
      ...dial.data(),
      id: dial.id,
    })
  );
  return dials;
};

export const addNewCoffee = async (formData) => {
  try {
    await addDoc(coffeesRef, {
      roaster: capitalize(formData.roaster),
      name: capitalize(formData.name),
      origin: capitalize(formData.origin),
      process: capitalize(formData.process),
      flavor_notes: capitalize(formData.flavorNotes).split(","),
      favorite: false,
      createdAt: Date.now(),
    });
  } catch (err) {
    throw new Error(err);
  }
};

export const addNewDial = async (dialInput, coffeeId, revalidate) => {
  try {
    await addDoc(dialsRef, {
      coffee: coffeeId,
      temp: dialInput.temp,
      weight: dialInput.weight,
      time: dialInput.time,
      yield: dialInput.yield,
      createdAt: serverTimestamp(),
    });
    revalidate();
  } catch (err) {
    throw new Error(err);
  }
};
