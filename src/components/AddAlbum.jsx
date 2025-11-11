import { useState } from "react";

function AddAlbum({ onAlbumAdded, onCancel }) {
  const [newAlbumTitle, setNewAlbumTitle] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    addPostToServer();
    setNewAlbumTitle("");
  }
  async function addPostToServer() {
    const currentUser = JSON.parse(localStorage.currentUser);
    try {
      const res = await fetch(`http://localhost:3000/albums`, {
        method: "POST",
        body: JSON.stringify({
          userId: currentUser.id,
          title: newAlbumTitle,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        console.log(res);
        throw Error("Something went wrong");
      } else {
        onAlbumAdded();
      }
    } catch (e) {
      alert(e);
    }
  }
  return (
    <>
      <div id="add-new-album">
        <form onSubmit={handleSubmit}>
          <label htmlFor="new-album-title">New Album title: </label>
          <input
            required
            id="new-album-title"
            type="text"
            value={newAlbumTitle}
            onChange={(e) => setNewAlbumTitle(e.target.value)}
          />
          <input type="submit" value="Add" />
          <button type="button" onClick={onCancel}>
            cancel
          </button>
        </form>
      </div>
    </>
  );
}

export default AddAlbum;
