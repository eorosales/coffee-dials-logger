import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./App.jsx";
import Layout from "./components/Layout/Layout";
import CoffeeDetails from "./components/CoffeeDetails/CoffeeDetails";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { coffeesLoader } from "./utils/utils";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { fetchCoffee } from "./utils/utils";

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
    loader: () => coffeesLoader(),
  },
  {
    path: "coffees/:coffeeId",
    element: (
      <Layout>
        <CoffeeDetails />
      </Layout>
    ),
    loader: (params) => fetchCoffee(params),
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
