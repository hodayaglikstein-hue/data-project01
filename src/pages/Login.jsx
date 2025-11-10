import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";

function Login() {
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("currentUser")) {
      navigate("/info", { replace: true });
    }
  }, [navigate]);

  function updateUsernameValue(e) {
    setUsernameValue(e.target.value);
  }

  function updatePasswordValue(e) {
    setPasswordValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    findUser(usernameValue, passwordValue);

    async function findUser(username, password) {
      try {
        const res = await fetch(
          `http://localhost:3000/users?username=${username}`
        );
        if (!res.ok) {
          throw Error(`Something is worng...`);
        }
        const user = await res.json();
        console.log(user[0]);
        if (user[0].username === username && user[0].website === password) {
          localStorage.setItem("currentUser", JSON.stringify(user[0]));
          setUsernameValue("");
          setPasswordValue("");
          alert("yay");
          navigate("/info");
        } else {
          throw Error("Something is worng...");
        }
      } catch (err) {
        alert(err);
      }
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username: </label>
        <input
          id="username"
          value={usernameValue}
          type="text"
          onChange={updateUsernameValue}
        />
        <label htmlFor="password">Password: </label>
        <input
          id="password"
          value={passwordValue}
          type="password"
          onChange={updatePasswordValue}
        />
        <input type="submit" value={"Login"} />
      </form>
    </>
  );
}

export default Login;
