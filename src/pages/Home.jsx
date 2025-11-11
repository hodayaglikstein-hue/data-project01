import { useEffect } from "react";
import { useNavigate } from "react-router";

function Home() {
  const navigate = useNavigate();
  const currentUser = localStorage.getItem("currentUser");

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  if (!currentUser) return null;

  const username = JSON.parse(localStorage.getItem("currentUser")).username;

  return (
    <>
      <h1>Hello {username}!</h1>
    </>
  );
}

export default Home;
