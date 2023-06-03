import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { coffeesLoader } from "./routes/loaders.jsx";
import App from "./App.jsx";
import Coffee from "./components/Coffee/Coffee";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: coffeesLoader,
  },
  {
    path: "coffees/:coffeeId",
    element: <Coffee />,
    loader: coffeesLoader,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
