import { useState, useEffect } from "react";
import AddNewComment from "../components/AddComment";
import { useNavigate } from "react-router";
function Comments({ postId }) {
  const [Comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddCommentForm, setShowAddCommentForm] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("currentUser"));

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
      <button
        onClick={() => {
          setShowAddCommentForm(true);
          navigate(`/posts/${user.id}/comments/${postId}/new`);
        }}
      >
        add comment
      </button>
      {showAddCommentForm && (
        <AddNewComment
          postId={postId}
          onCommentAdded={() => {
            fetchComments();
            setShowAddCommentForm(false);
          }}
          onCancel={() => {
            setShowAddCommentForm(false);
            navigate(`/posts/${user.id}/comments/${postId}`);
          }}
        />
      )}

      {Comments.map((comment) => {
        return (
          <div className="allComments" key={comment.id}>
            <h2>{comment.name} </h2>
            <h4>{comment.email}</h4>
            <h5>{comment.body}</h5>
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
