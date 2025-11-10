import { useState, useEffect } from "react";

function ToDos() {
  const [list, setList] = useState([]);
  const userid = 5;
  useEffect(() => {
    fetch(`http://localhost:3000/todos/?userId=${userid}`)
      .then((response) => response.json())
      .then((data) => setList(data));
  }, []);

  return (
    <>
      <div>
        <h1>My To-Do List</h1>
        <ul>
          {list.map((todo) => (
            <li key={todo.id}>
              {todo.title}----- task status:{" "}
              {todo.completed ? "done" : "not done"}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default ToDos;
