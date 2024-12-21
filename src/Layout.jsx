import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Components/common/navbar";

export default function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
