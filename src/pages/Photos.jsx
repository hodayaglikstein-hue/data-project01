import { useState, useEffect } from "react";
function Photos({ albumId }) {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    // const user = JSON.parse(localStorage.getItem("currentUser"));

    fetch(`http://localhost:3000/photos?albumId=${albumId}`)
      .then((response) => response.json())
      .then((data) => setPhotos(data));
  }, []);

  return (
    <div>
      <h1>album number: {albumId}</h1>
      <button>New Photo</button>
      <div id="photo-container">
        {photos.map((photo) => {
          return (
            <div className="allPhotos" key={photo.id}>
              <div>
                <img src={photo.url} alt="photo" width="50" height="60" />
              </div>
              <div>
                <h4>{photo.title} </h4>
                <button>Delete</button>
                <button>Update</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Photos;
