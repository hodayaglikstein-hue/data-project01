import { useState } from "react";
function AddNewCommentTitle({ postId, onCommentAdded, onCancel }) {
  const [newCommentTitle, setNewCommentTitle] = useState("");
  const [newCommentBody, setNewCommentBody] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    addCommentToServer();
    setNewCommentTitle("");
    setNewCommentBody("");
  }
  async function addCommentToServer() {
    const currentUser = JSON.parse(localStorage.currentUser);
    console.log(currentUser);
    try {
      const res = await fetch(`http://localhost:3000/comments`, {
        method: "POST",
        body: JSON.stringify({
          postId: postId,
          name: newCommentTitle,
          email: currentUser.email,
          body: newCommentBody,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        console.log(res);
        throw Error("Something went wrong");
      } else {
        onCommentAdded();
      }
    } catch (e) {
      alert(e);
    }
  }
  return (
    <>
      <div id="add-new-comment">
        <form onSubmit={handleSubmit}>
          <label htmlFor="new-comment-title">New comment title: </label>
          <input
            required
            id="new-comment-title"
            type="text"
            value={newCommentTitle}
            onChange={(e) => setNewCommentTitle(e.target.value)}
          />
          <label htmlFor="new-comment-body">New comment body: </label>
          <input
            required
            id="new-comment-body"
            type="text"
            value={newCommentBody}
            onChange={(e) => setNewCommentBody(e.target.value)}
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
export default AddNewCommentTitle;
