import { useState } from "react";
function AddNewPhoto({ albumId, onPhotoAdded, onCancel }) {
  const [newPhotoTitle, setNewPhotoTitle] = useState("");
  const [newPhotoURL, setNewPhotoURL] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    addPhotoToServer();
    setNewPhotoTitle("");
    setNewPhotoURL("");
  }
  async function addPhotoToServer() {
    // const currentUser = JSON.parse(localStorage.currentUser);
    try {
      const res = await fetch(`http://localhost:3000/photos`, {
        method: "POST",
        body: JSON.stringify({
          albumId: albumId,
          title: newPhotoTitle,
          url: newPhotoURL,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        console.log(res);
        throw Error("Something went wrong");
      } else {
        onPhotoAdded();
      }
    } catch (e) {
      alert(e);
    }
  }
  return (
    <>
      <div id="add-new-photo">
        <form onSubmit={handleSubmit}>
          <label htmlFor="new-photo-title">New photo title: </label>
          <input
            required
            id="new-photo-title"
            type="text"
            value={newPhotoTitle}
            onChange={(e) => setNewPhotoTitle(e.target.value)}
          />
          <label htmlFor="new-photo-body">New photo body: </label>
          <input
            required
            id="new-photo-body"
            type="text"
            value={newPhotoURL}
            onChange={(e) => setNewPhotoURL(e.target.value)}
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
export default AddNewPhoto;
