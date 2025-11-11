import { useState } from "react";
function AddNewPost({ onPostAdded, onCancel }) {
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostBody, setNewPostBody] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    addPostToServer();
    setNewPostTitle("");
    setNewPostBody("");
  }
  async function addPostToServer() {
    const currentUser = JSON.parse(localStorage.currentUser);
    console.log(currentUser);
    try {
      const res = await fetch(`http://localhost:3000/posts`, {
        method: "POST",
        body: JSON.stringify({
          userId: currentUser.id,
          title: newPostTitle,
          body: newPostBody,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        console.log(res);
        throw Error("Something went wrong");
      } else {
        onPostAdded();
      }
    } catch (e) {
      alert(e);
    }
  }
  return (
    <>
      <div id="add-new-post">
        <form onSubmit={handleSubmit}>
          <label htmlFor="new-post-title">New post title: </label>
          <input
            required
            id="new-post-title"
            type="text"
            value={newPostTitle}
            onChange={(e) => setNewPostTitle(e.target.value)}
          />
          <label htmlFor="new-post-body">New post body: </label>
          <input
            required
            id="new-post-body"
            type="text"
            value={newPostBody}
            onChange={(e) => setNewPostBody(e.target.value)}
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

export default AddNewPost;
