import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import StudentConnect from "./components/student_connect/student_connect";
import RoleDispatch from "./components/role_dispatch/role_dispatch";
import StudentMain from "./components/student_main/student_main";
import { CreateLection } from "./components/create_lection/create_lection";
import { TeacherMain } from "./components/teacher_main/teacher_main";
import { ConfigProvider } from "antd";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <RoleDispatch />,
    errorElement: <div>Something went wrong</div>,
  },
  {
    path: "/create-lection",
    element: <CreateLection />,
  },
  {
    path: "/lection/teacher/:lectionId",
    element: <TeacherMain />,
  },
  {
    path: "/lection/connect",
    element: <StudentConnect />,
  },
  {
    path: "/lection/student/:lectionId",
    element: <StudentMain />,
  },
  {
    path: "*", // Any other path will get you to the starting page
    element: <Navigate to="/" replace />,
  },
]);

root.render(
  <React.StrictMode>
    <ConfigProvider
      theme={{ token: { colorPrimary: "#ce0071", borderRadius: 4 } }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  </React.StrictMode>,
);
