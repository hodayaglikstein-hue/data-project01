import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import AddNewPhoto from "../components/AddPhoto";
import UpdatePhoto from "../components/UpdatePhoto";
function Photos({ albumId }) {
  const [photos, setPhotos] = useState([]);
  const [showAddPhotoForm, setShowAddPhotoForm] = useState(false);
  const [showPhotoUpdate, setShowPhotoUpdate] = useState(null);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    showPhotos();
  }, []);

  async function showPhotos() {
    try {
      const res = await fetch(
        `http://localhost:3000/photos?albumId=${albumId}`
      );
      if (!res.ok) {
        throw Error("Something went wrong");
      } else {
        const data = await res.json();
        setPhotos(data);
      }
    } catch (e) {
      alert(e);
    }
  }

  async function deletePhoto(photoId) {
    try {
      const res = await fetch(`http://localhost:3000/photos/${photoId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw Error("Something went wrong");
      } else {
        showPhotos();
      }
    } catch (e) {
      alert(e);
    }
  }

  return (
    <div>
      <button
        onClick={() => {
          setShowAddPhotoForm(true);
          navigate(`/albums/${albumId}/photos/new`);
        }}
      >
        add photo
      </button>
      {showAddPhotoForm && (
        <AddNewPhoto
          albumId={albumId}
          onPhotoAdded={() => {
            showPhotos();
            setShowAddPhotoForm(false);
            navigate(`/albums/${albumId}/photos/new`);
          }}
          onCancel={() => {
            setShowAddPhotoForm(false);
            navigate(`/albums/${albumId}/photos/`);
          }}
        />
      )}
      <h1>album id: {albumId}</h1>
      <div id="photo-container">
        {photos.map((photo) => {
          return (
            <div className="allPhotos" key={photo.id}>
              <div>
                <img src={photo.url} alt="photo" width="50" height="60" />
              </div>
              <div>
                <h4>{photo.title} </h4>
                <button onClick={() => deletePhoto(photo.id)}>Delete</button>
                <button
                  onClick={() => {
                    setShowPhotoUpdate(photo.id);
                    navigate(`/albums/${user.id}/photos/${photo.id}/update`);
                  }}
                >
                  Update
                </button>

                {showPhotoUpdate === photo.id && (
                  <UpdatePhoto
                    photoTitle={photo.title}
                    photoURL={photo.url}
                    photoId={photo.id}
                    userId={user.id}
                    showPhotos={showPhotos}
                    setShowPhotoUpdate={setShowPhotoUpdate}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Photos;
