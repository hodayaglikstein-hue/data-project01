import { useState, useEffect } from "react";

function Comments({ postId }) {
  const [Comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchComments = () => {
    setIsLoading(true);
    fetch(`http://localhost:3000/comments?postId=${postId}`)
      .then((response) => response.json())
      .then((data) => setComments(data))
      .catch((err) => {
        console.error("Failed to fetch comments:", err);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    if (postId) {
      fetchComments();
    }
  }, [postId]);

  const deleteComment = (commentID) => {
    fetch(`http://localhost:3000/comments/${commentID}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          console.log("Resource deleted successfully.");
          fetchComments();
        } else {
          console.error("Failed to delete resource.");
        }
      })
      .catch((error) => {
        console.error("Network or other error:", error);
      });
  };
  return (
    <div>
      {Comments.map((comment) => {
        return (
          <div className="allComments" key={comment.id}>
            <h2>{comment.name} </h2>
            <h4>{comment.email}</h4>
            <h5>{comment.body}</h5>
            <h2>{comment.id}</h2>
            <button
              onClick={() => {
                deleteComment(comment.id);
              }}
            >
              delete comment
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Comments;
