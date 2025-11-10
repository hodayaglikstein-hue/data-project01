import { Outlet } from "react-router";
import NavBar from "./Navbar";

function MainLayout() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export default MainLayout;
