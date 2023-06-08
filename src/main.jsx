import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { coffeesLoader } from "./routes/loaders.jsx";
import App from "./App.jsx";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase";
import CoffeeDetails from "./components/CoffeeDetails/CoffeeDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: coffeesLoader,
  },
  {
    path: "coffees/:coffeeId",
    element: <CoffeeDetails />,
    loader: async ({ params }) => {
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
    },
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
);
