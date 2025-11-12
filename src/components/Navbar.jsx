import { NavLink } from "react-router";

function NavBar() {
  return (
    <div id="nav-container">
      <NavLink
        to="/home"
        className={({ isActive }) => (isActive ? "active-link" : "link")}
      >
        Home
      </NavLink>
      <NavLink
        to="/info"
        className={({ isActive }) => (isActive ? "active-link" : "link")}
      >
        Info
      </NavLink>
      <NavLink
        to="/posts"
        className={({ isActive }) => (isActive ? "active-link" : "link")}
      >
        Posts
      </NavLink>
      <NavLink
        to="/todos"
        className={({ isActive }) => (isActive ? "active-link" : "link")}
      >
        ToDos
      </NavLink>
      <NavLink
        to="/albums"
        className={({ isActive }) => (isActive ? "active-link" : "link")}
      >
        Albums
      </NavLink>
      <NavLink
        to="/logout"
        className={({ isActive }) => (isActive ? "active-link" : "link")}
      >
        Logout
      </NavLink>
    </div>
  );
}
export default NavBar;
