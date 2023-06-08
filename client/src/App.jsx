import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
      <Toaster position="bottom-center" />
      <Header />
      <Outlet />
    </>
  );
}
