import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { useEffect, useState } from "react";
import NewDialForm from "../NewDialForm/NewDialForm";

const Coffee = () => {
  const [status, setStatus] = useState("pending");
  const [coffee, setCoffee] = useState();
  const { coffeeId } = useParams();
  const docRef = doc(db, "coffees", coffeeId);

  useEffect(() => {
    const docSnapQuery = async () => {
      await getDoc(docRef).then((res) => {
        setStatus("success");
        setCoffee(res.data());
      });
    };
    docSnapQuery();
  }, [docRef, coffee]);

  return (
    <>
      <h1>Coffee</h1>
      {status === "success" && (
        <>
          <h2>{coffee.roaster}</h2>
          <p>{coffee.name}</p>
          <p>{coffee.origin}</p>
          <p>{coffee.process}</p>
        </>
      )}

      <section>
        <h2>Dials</h2>
        <NewDialForm coffeeId={coffeeId} />
      </section>
    </>
  );
};

export default Coffee;
