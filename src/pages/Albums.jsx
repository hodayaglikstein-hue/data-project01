import { useState, useEffect } from "react";
import Photos from "./Photos";
function Albums() {
  const [albums, setAlbums] = useState([]);
  const [activeAlbumsId, setActiveAlbumsId] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));

    fetch(`http://localhost:3000/albums/?userId=${user.id}`)
      .then((response) => response.json())
      .then((data) => setAlbums(data));
  }, []);

  const handleAlbumClick = (albumId) => {
    setActiveAlbumsId(albumId);
  };
  const handleBackToAlbums = () => {
    setActiveAlbumsId(null);
  };

  return (
    <div>
      <h1>
        {JSON.parse(localStorage.getItem("currentUser")).username}'s albums
      </h1>
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
        albums.map((album) => {
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
        })
      )}
    </div>
  );
}

export default Albums;
