import React from "react";
import ReactDOM from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { coffeesLoader } from "./routes/loaders.jsx";
import App from "./App.jsx";
import Layout from "./components/Layout/Layout";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase";
import CoffeeDetails from "./components/CoffeeDetails/CoffeeDetails";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <App />
      </Layout>
    ),
    loader: coffeesLoader,
  },
  {
    path: "coffees/:coffeeId",
    element: (
      <Layout>
        <CoffeeDetails />
      </Layout>
    ),
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
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
