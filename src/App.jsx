import { BrowserRouter, Link, Route, Routes } from "react-router";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Info from "./pages/Info";
import MainLayout from "./components/MainLayout";
import Logout from "./pages/Logout";
import UpdateUser from "./components/UpdateUser";
import ToDos from "./pages/Todos";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logout" element={<Logout />} />
          <Route element={<MainLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/updateuser" element={<UpdateUser />} />
            <Route path="/info" element={<Info />} />
            <Route path="/todos" element={<ToDos />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
