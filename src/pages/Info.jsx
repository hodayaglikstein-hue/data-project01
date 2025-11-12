import { useState } from "react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

function Info() {
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  //   const username =
  //     JSON.parse(localStorage.getItem("currentUser")).username || "";
  const navigate = useNavigate();
  const currentUser = localStorage.getItem("currentUser");

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
    let username = "";
    if (localStorage.getItem("currentUser")) {
      username = JSON.parse(localStorage.getItem("currentUser")).username || "";
    }
    setIsLoading(true);
    async function getUser() {
      try {
        const res = await fetch(
          `http://localhost:3000/users?username=${username}`
        );
        if (!res.ok) throw new Error("Something is wrong...");
        const data = await res.json();
        setUser(data[0]);
        setIsLoading(false);
      } catch (err) {
        alert(err);
      }
    }
    getUser();
  }, []);
  let username = "";
  if (localStorage.getItem("currentUser")) {
    username = JSON.parse(localStorage.getItem("currentUser")).username || "";
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <h1>{username}'s Info page</h1>

      <Outlet />

      <h2>Name: {user.name}</h2>
      <h2>Username: {user.username}</h2>
      <h2>Email: {user.email}</h2>
      <h2>Phone: {user.phone}</h2>

      <button onClick={() => navigate("updateuser")}>Update</button>
    </>
  );
}

export default Info;
