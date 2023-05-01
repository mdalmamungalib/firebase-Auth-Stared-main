import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Main from "./components/Layout/Main";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import About from "./components/About/About";

function App() {
  const [users, setUsers] = useState("");
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main users={users} setUsers={setUsers}></Main>,
      children: [
        {
          path: "/",
          element: <Home></Home>,
        },
        {
          path: "/home",
          element: <Home></Home>,
        },
        {
          path: "/login",
          element: <Login  users={users} setUsers={setUsers}></Login>,
        },
        {
          path: "/registration",
          element: <Registration  users={users} setUsers={setUsers}></Registration>,
        },
        {
          path: "/about",
          element: <About></About>,
        },
      ],
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
