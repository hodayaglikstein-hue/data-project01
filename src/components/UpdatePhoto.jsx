import { useState } from "react";
import { useNavigate } from "react-router";

function UpdatePhoto(props) {
  const [updateTitle, setUpdateTitle] = useState(props.photoTitle);
  const [updateURL, setUpdateURL] = useState(props.photoURL);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    async function updateUser() {
      try {
        const res = await fetch(
          `http://localhost:3000/photos/${props.photoId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: updateTitle,
              url: updateURL,
            }),
          }
        );
        if (!res.ok) {
          throw Error("Something went wrong");
        } else {
          navigate(`/albums/${props.userId}/photos/`);
          props.showPhotos();
          props.setShowPhotoUpdate(null);
        }
      } catch (e) {
        alert(e);
      }
    }
    updateUser();
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={updateTitle}
          onChange={(e) => setUpdateTitle(e.target.value)}
          required
        ></input>
        <label htmlFor="url">URL</label>
        <input
          id="url"
          type="text"
          value={updateURL}
          onChange={(e) => setUpdateURL(e.target.value)}
        ></input>
        <input type="submit" value="Done" />
      </form>
    </>
  );
}

export default UpdatePhoto;
