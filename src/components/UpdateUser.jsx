import { useState } from "react";
import { useNavigate } from "react-router";

function UpdateUser() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [updateName, setUpdateName] = useState(user.name);
  const [updateEmail, setUpdateEmail] = useState(user.email);
  const [updatePhone, setUpdatePhone] = useState(user.phone);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    async function updateUser() {
      const res = await fetch(`http://localhost:3000/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: updateName,
          email: updateEmail,
          phone: updatePhone,
        }),
      });
      const newUser = await res.json();
      localStorage.setItem("currentUser", JSON.stringify(newUser));
      navigate("/info");
    }
    updateUser();
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={updateName}
          onChange={(e) => setUpdateName(e.target.value)}
        ></input>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={updateEmail}
          onChange={(e) => setUpdateEmail(e.target.value)}
        ></input>
        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          type="tel"
          value={updatePhone}
          onChange={(e) => setUpdatePhone(e.target.value)}
        ></input>
        <input type="submit" value="Done" />
      </form>
    </>
  );
}

export default UpdateUser;
