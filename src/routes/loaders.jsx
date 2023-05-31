import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";

const coffeesRef = collection(db, "coffees");

export const coffeesLoader = async () => {
  const data = await getDocs(coffeesRef);
  const coffees = data.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return { coffees };
};
