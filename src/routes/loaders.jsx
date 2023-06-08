import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";

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
