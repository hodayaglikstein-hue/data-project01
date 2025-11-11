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
      {photos.map((photo) => {
        return (
          <div className="allPhotos" key={photo.id}>
            <h4>{photo.title} </h4>
            <img src={photo.url} alt="photo" width="50" height="60" />
          </div>
        );
      })}
    </div>
  );
}
export default Photos;
