import { BrowserRouter, Link, Route, Routes } from "react-router";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Posts from "./pages/Posts";
function App() {
  return (
    <Posts />
    // <>
    //   <BrowserRouter>
    //     <Link to="/Login">Login</Link>

    //     <Routes>
    //       <Route path="/Login" element={<Login />} />
    //       <Route path="/Signup" element={<Signup />} />
    //     </Routes>
    //   </BrowserRouter>
    // </>
  );
}

export default App;
