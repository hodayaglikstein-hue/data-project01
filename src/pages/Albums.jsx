import { useState, useEffect } from "react";
import Photos from "./Photos";
import { useNavigate } from "react-router";
function Albums() {
  const [albums, setAlbums] = useState([]);
  const [activeAlbumsId, setActiveAlbumsId] = useState(null);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    navigate(`/albums/${user.id}`);
    fetch(`http://localhost:3000/albums/?userId=${user.id}`)
      .then((response) => response.json())
      .then((data) => setAlbums(data));
  }, []);

  const handleAlbumClick = (albumId) => {
    setActiveAlbumsId(albumId);
    navigate(`/albums/${user.id}/photos/${albumId}`);
  };
  const handleBackToAlbums = () => {
    setActiveAlbumsId(null);
    navigate(`/albums/${user.id}`);
  };

  return (
    <div>
      <h1>
        {JSON.parse(localStorage.getItem("currentUser")).username}'s albums
      </h1>
      {!activeAlbumsId && <button>New Album</button>}
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
          {albums.map((album) => {
            return (
              <div className="allAlbums" key={album.id}>
                <h2>{album.title} </h2>
                <h2>{album.id}</h2>
                <button
                  onClick={() => {
                    console.log("it was clicked");
                    handleAlbumClick(album.id);
                  }}
                >
                  see photos
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Albums;
