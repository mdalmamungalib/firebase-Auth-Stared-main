import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "./../Footer/Footer";
const Main = ({ users, setUsers }) => {
  return (
    <div>
      <Header  users={users} setUsers={setUsers}></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Main;
