import { useState, useEffect } from "react";
import AddNewItem from "../components/AddNewItem";

function ToDos() {
  const [list, setList] = useState([]);
  const userId = JSON.parse(localStorage.getItem("currentUser")).id;

  const username = JSON.parse(localStorage.getItem("currentUser")).username;
  useEffect(() => {
    showList();
  }, []);

  async function showList() {
    fetch(`http://localhost:3000/todos/?userId=${userId}`)
      .then((response) => response.json())
      .then((data) => setList(data));
  }

  async function changeChecked(id, setChecked) {
    try {
      const res = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: setChecked,
        }),
      });
      if (!res.ok) {
        throw Error("Something went wrong");
      }
      showList();
    } catch (e) {
      alert(e);
    }
  }

  async function deleteItem(id) {
    try {
      const res = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw Error("Something went wrong");
      } else {
        showList();
      }
    } catch (e) {
      alert(e);
    }
  }

  return (
    <>
      <h1>{username}'s To-Do List</h1>
      <AddNewItem userId={userId} showList={showList} />
      <div id="todos-container">
        {list.map((todo) => (
          <div key={todo.id} id="todos-text-container">
            <span className={todo.completed ? "completed" : ""}>
              {todo.title}
            </span>
            <span>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => changeChecked(todo.id, !todo.completed)}
              />
              <button id="delete" onClick={() => deleteItem(todo.id)}>
                Delete
              </button>
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

export default ToDos;
