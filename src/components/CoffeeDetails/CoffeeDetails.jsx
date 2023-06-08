import { useEffect, useRef, useState } from "react";
import { useParams, useRevalidator } from "react-router-dom";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import "./styles.css";
import NewDialForm from "../NewDialForm/NewDialForm";
import DialsTable from "../DialsTable/DialsTable";

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
    <>
      <h1>Coffee</h1>
      {status === "success" && (
        <>
          {Object.values(coffee).map((value) => {
            return (
              <div key={`${value.roaster} + ${value.name}`}>
                <p>{value.roaster}</p>
                <p>{value.name}</p>
                <p>{value.origin}</p>
                <p>{value.process}</p>
                <ul>
                  {value.flavor_notes.map((flavor) => (
                    <li key={flavor}>{flavor}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </>
      )}

      <section>
        <h2>Dials</h2>
        <NewDialForm coffeeId={coffeeId} />
        <DialsTable deleteDial={deleteDial} />
      </section>
    </>
  );
};

export default CoffeeDetails;
