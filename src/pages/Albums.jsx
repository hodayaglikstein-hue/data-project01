import { useState, useEffect } from "react";
import Photos from "./Photos";
import { useNavigate } from "react-router";
import AddAlbum from "../components/AddAlbum";
import UpdateAlbum from "../components/UpdateAlbum";
function Albums() {
  const [albums, setAlbums] = useState([]);
  const [activeAlbumsId, setActiveAlbumsId] = useState(null);
  const [showAddAlbumForm, setShowAddAlbumForm] = useState(false);
  const [showAlbumUpdate, setShowAlbumUpdate] = useState(null);
  const [searchItem, setSearchItem] = useState("");

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    navigate(`/albums`);
    showAlbums();
  }, []);

  async function showAlbums() {
    try {
      const res = await fetch(
        `http://localhost:3000/albums/?userId=${user.id}`
      );
      if (!res.ok) {
        throw Error("something went wrong");
      } else {
        const data = await res.json();
        setAlbums(data);
      }
    } catch (e) {
      alert(e);
    }
  }

  const handleAlbumClick = (albumId) => {
    setActiveAlbumsId(albumId);
    navigate(`/albums/${user.id}/photos`);
  };
  const handleBackToAlbums = () => {
    setActiveAlbumsId(null);
    navigate(`/albums/`);
  };

  async function deleteAlbum(albumId) {
    try {
      const res = await fetch(`http://localhost:3000/albums/${albumId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw Error("Something went wrong");
      } else {
        showAlbums();
      }
    } catch (e) {
      alert(e);
    }
  }

  const handleShowAddAlbumForm = () => {
    setShowAddAlbumForm(true);
    navigate(`/albums/${user.id}/new`);
  };

  const filteredAlbums = albums.filter((todo) =>
    todo.title.toLowerCase().includes(searchItem.toLocaleLowerCase())
  );

  return (
    <div>
      <h1>
        {JSON.parse(localStorage.getItem("currentUser")).username}'s albums
      </h1>
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

      {!activeAlbumsId && (
        <>
          <button onClick={handleShowAddAlbumForm}>New Album</button>

          {showAddAlbumForm && (
            <AddAlbum
              userid={user.id}
              onAlbumAdded={() => {
                showAlbums();
                setShowAddAlbumForm(false);
                navigate(`/albums/${user.id}/new`);
              }}
              onCancel={() => {
                setShowAddAlbumForm(false);
                navigate(`/albums`);
              }}
            />
          )}
        </>
      )}

      {activeAlbumsId ? (
        <>
          <button
            onClick={() => {
              handleBackToAlbums();
            }}
          >
            go back to albums
          </button>
          <Photos albumId={activeAlbumsId} />
        </>
      ) : (
        <div id="albums-container">
          {filteredAlbums.map((album) => {
            return (
              <div className="allAlbums" key={album.id}>
                <h2>{album.title} </h2>
                <button
                  onClick={() => {
                    console.log("it was clicked");
                    handleAlbumClick(album.id);
                  }}
                >
                  see photos
                </button>
                <button
                  onClick={() => {
                    deleteAlbum(album.id);
                  }}
                >
                  Delete Album
                </button>
                <button
                  onClick={() => {
                    setShowAlbumUpdate(album.id);
                    navigate(`/albums/${album.id}/update/`);
                  }}
                >
                  Update
                </button>
                {showAlbumUpdate === album.id && (
                  <UpdateAlbum
                    albumTitle={album.title}
                    albumId={album.id}
                    showAlbums={showAlbums}
                    setShowAlbumUpdate={setShowAlbumUpdate}
                  />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Albums;
