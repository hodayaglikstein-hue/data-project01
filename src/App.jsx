import { BrowserRouter, Link, Route, Routes } from "react-router";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Info from "./pages/Info";
import MainLayout from "./components/MainLayout";
import Logout from "./pages/Logout";
import UpdateUser from "./components/UpdateUser";

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
            <Route path="/updateuser" element={<UpdateUser />} />
            <Route path="/info" element={<Info />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
