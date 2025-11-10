import { useState } from "react";

function UpdateUser() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [updateName, setUpdateName] = useState(user.name);
  const [updateEmail, setUpdateEmail] = useState(user.email);
  const [updatePhone, setUpdatePhone] = useState(user.phone);
  return (
    <>
      <form>
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
      </form>
    </>
  );
}

export default UpdateUser;
