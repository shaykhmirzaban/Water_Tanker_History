import React from "react";
import { Outlet } from "react-router-dom";

//component
import Navbar from "./Navbar";

const Component = () => {
  return (
    <React.StrictMode>
      <Navbar />
      <Outlet />
    </React.StrictMode>
  );
};

export default Component;
