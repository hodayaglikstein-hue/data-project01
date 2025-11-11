import { NavLink } from "react-router";

function NavBar() {
  return (
    <>
      <div id="nav-container">
        <div className="link">
          <NavLink to={"/home"}>Home</NavLink>
        </div>
        <div className="link">
          <NavLink to={"/info"}>Info</NavLink>
        </div>
        <div className="link">
          <NavLink to={"/posts"}>Posts</NavLink>
        </div>
        <div className="link">
          <NavLink to={"/todos"}>ToDos</NavLink>
        </div>
        <div className="link">
          <NavLink to={"/albums"}>Albums</NavLink>
        </div>
        <div className="link">
          <NavLink to={"/logout"}>Logout</NavLink>
        </div>
      </div>
    </>
  );
}

export default NavBar;
