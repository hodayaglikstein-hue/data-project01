import { useState } from "react";

function AddNewItem(props) {
  const [newItem, setNewItem] = useState("");
  console.log(props.lastId);
  function handleSubmit(e) {
    e.preventDefault();
    addItem();
    setNewItem("");
  }

  async function addItem() {
    console.log(props.userId);
    console.log(`http://localhost:3000/todos/${props.userId}`);
    try {
      const res = await fetch(`http://localhost:3000/todos`, {
        method: "POST",
        body: JSON.stringify({
          userId: props.userId,
          title: newItem,
          completed: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        console.log(res);
        throw Error("Something went wrong");
      } else {
        props.showList();
      }
    } catch (e) {
      alert(e);
    }
  }

  return (
    <>
      <div id="add-new-item">
        <form onSubmit={handleSubmit}>
          <label htmlFor="new-item-title">New item title: </label>
          <input
            required
            id="new-item-title"
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
          <input type="submit" value="Add" />
        </form>
      </div>
    </>
  );
}

export default AddNewItem;
