import { useState, useEffect } from "react";
import AddNewItem from "../components/AddNewItem";
import { useNavigate } from "react-router";

function ToDos() {
  const [list, setList] = useState([]);
  const [sortKey, setSortKey] = useState("default");
  const [searchItem, setSearchItem] = useState("");
  const navigate = useNavigate();
  const currentUser = localStorage.getItem("currentUser");
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
    showList();
  }, []);

  async function showList() {
    try {
      const res = await fetch(`http://localhost:3000/todos/?userId=${userId}`);
      if (!res.ok) {
        throw Error("Something went wrong");
      } else {
        const data = await res.json();
        setList(data);
      }
    } catch (e) {
      alert(e);
    }

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

  const handleSortChange = (key) => {
    setSortKey(key);
  };
  let sortedList = [...list];
  if (sortKey === "completed") {
    //ancomplited then complited
    sortedList.sort((a, b) => a.completed - b.completed);
  } else if (sortKey === "alphabetical") {
    sortedList.sort((a, b) => {
      const titleA = a.title.toUpperCase();
      const titleB = b.title.toUpperCase();
      if (titleA < titleB) return -1;
      if (titleA > titleB) return 1;
      return 0;
    });
  }

  const filteredList = sortedList.filter((todo) =>
    todo.title.toLowerCase().includes(searchItem.toLocaleLowerCase())
  );

  let userId = "";
  let username;
  if (localStorage.getItem("currentUser")) {
    userId = JSON.parse(localStorage.getItem("currentUser")).id;
    username = JSON.parse(localStorage.getItem("currentUser")).username;
  }

  return (
    <>
      <h1>{username}'s To-Do List</h1>
      {/*search input field */}
      <div className="search-bar">
        <label htmlFor="search-input">search items:</label>
        <input
          id="search-input"
          type="text"
          placeholder="search..."
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
        />
      </div>

      {/* SORT CONTROLS */}
      <div className="sort-controls" style={{ marginBottom: "20px" }}>
        <button
          onClick={() => handleSortChange("default")}
          disabled={sortKey === "default"}
        >
          Default Order
        </button>
        <button
          onClick={() => handleSortChange("completed")}
          disabled={sortKey === "completed"}
        >
          Incomplete First
        </button>
        <button
          onClick={() => handleSortChange("alphabetical")}
          disabled={sortKey === "alphabetical"}
        >
          Alphabetical A-Z
        </button>
      </div>
      <AddNewItem userId={userId} showList={showList} />
      <div id="todos-container">
        {filteredList.map((todo) => (
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
