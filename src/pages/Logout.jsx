import { useEffect } from "react";
import { useNavigate } from "react-router";

function Logout() {
  const navigate = useNavigate();
  localStorage.removeItem("currentUser");
  useEffect(() => {
    setTimeout(() => {
      navigate("/login", { replace: true });
    }, 3500);
  }, [navigate]);

  return (
    <>
      <h1>You have successfully logged out!</h1>
    </>
  );
}

export default Logout;
