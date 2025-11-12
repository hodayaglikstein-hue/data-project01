import { useState } from "react";
import { useNavigate } from "react-router";

function UpdateAlbum(props) {
  const [updateTitle, setUpdateTitle] = useState(props.albumTitle);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    async function updateAlbum() {
      try {
        const res = await fetch(
          `http://localhost:3000/albums/${props.albumId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: updateTitle,
            }),
          }
        );
        if (!res.ok) {
          throw Error("Something went wrong");
        } else {
          navigate(`/albums`);
          props.showAlbums();
          props.setShowAlbumUpdate(null);
        }
      } catch (e) {
        alert(e);
      }
    }
    updateAlbum();
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
        <input type="submit" value="Done" />
      </form>
    </>
  );
}

export default UpdateAlbum;
