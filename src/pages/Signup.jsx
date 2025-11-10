import { useState } from "react";

function Signup() {
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const [userCount, setUserCount] = useState(10);

  function updateUsernameValue(e) {
    setUsernameValue(e.target.value);
  }

  function updatePasswordValue(e) {
    setPasswordValue(e.target.value);
  }

  function updateConfirmPasswordValue(e) {
    setConfirmPasswordValue(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (passwordValue !== confirmPasswordValue) {
        throw Error("The passwords aren't the same");
      } else {
        if (!(await findUser(usernameValue))) {
          addUser(usernameValue, passwordValue);
        } else {
          throw Error("User already exist");
        }
      }
    } catch (e) {
      alert(e);
    }
  }

  async function addUser(username, password) {
    try {
      const res = await fetch(`http://localhost:3000/users`, {
        method: "POST",
        body: JSON.stringify({
          id: userCount + 1,
          username: username,
          website: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw Error("Something went wrong...");
      } else {
        setUserCount((prev) => prev++);
        alert("success!");
      }
    } catch (e) {
      alert(e);
    }
  }

  async function findUser(username) {
    try {
      const res = await fetch(
        `http://localhost:3000/users?username=${username}`
      );
      if (!res.ok) {
        throw Error("Something went wrong");
      } else {
        const user = await res.json();
        if (user.length === 1) {
          return true;
        } else {
          return false;
        }
      }
    } catch (err) {
      alert(err);
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
        <label htmlFor="confirm-password">Confirm Password: </label>
        <input
          id="confirm-password"
          value={confirmPasswordValue}
          type="password"
          onChange={updateConfirmPasswordValue}
        />
        <input type="submit" value={"Signup"} />
      </form>
    </>
  );
}

export default Signup;
