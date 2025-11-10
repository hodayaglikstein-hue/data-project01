import { NavLink } from "react-router";

function NavBar() {
  return (
    <>
      <NavLink to={"/home"}>Home</NavLink>
      <NavLink to={"/info"}>Info</NavLink>
      <NavLink to={"/posts"}>Posts</NavLink>
      <NavLink to={"/todos"}>ToDos</NavLink>
      <NavLink to={"/albums"}>Albums</NavLink>
      <NavLink to={"/logout"}>Logout</NavLink>
    </>
  );
}

export default NavBar;
