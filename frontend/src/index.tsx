import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Select your fighter</div>,
    errorElement: <div>Something went wrong</div>,
  },
  {
    path: "/create-lection",
    element: <div>Here you can create your lection</div>,
  },
  {
    path: "/lection/teacher/:lectionId",
    element: <div>Main lection page</div>,
  },
  {
    path: "/lection/connect",
    element: <div>Student lection connection page</div>,
  },
  {
    path: "/lection/student/:lectionId",
    element: <div>Student lection page</div>,
  },
  {
    path: "*", // Any other path will get you to the starting page
    element: <Navigate to="/" replace />,
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
