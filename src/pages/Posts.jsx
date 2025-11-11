import { useState, useEffect } from "react";
import Comments from "../components/Comments";
import { useNavigate } from "react-router";
import AddNewPost from "../components/AddPost";
function Posts() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [activePostId, setActivePostId] = useState(null);
  const [showAddPostForm, setShowAddPostForm] = useState(false);

  const user = JSON.parse(localStorage.getItem("currentUser"));

  const fetchPosts = (userid) => {
    setIsLoading(true);
    fetch(`http://localhost:3000/posts?userid=${userid}`)
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((err) => {
        console.error("Failed to fetch posts:", err);
        setIsLoading(false);
      });
  };

  const deletePost = (postId) => {
    fetch(`http://localhost:3000/posts/${postId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          console.log("Resource deleted successfully.");
          fetchPosts(user.id);
        } else {
          console.error("Failed to delete resource.");
        }
      })
      .catch((error) => {
        console.error("Network or other error:", error);
      });
  };

  useEffect(() => {
    fetchPosts(user.id);
  }, [user.id]);

  function toggleComments(userid) {
    if (activePostId === userid) {
      setActivePostId(null);
    } else {
      setActivePostId(userid);
    }
  }

  return (
    <>
      <div>
        <h1>
          {JSON.parse(localStorage.getItem("currentUser")).username}'s posts
        </h1>
        <button
          onClick={() => {
            setShowAddPostForm(true);
          }}
        >
          add post
        </button>
        {showAddPostForm && (
          <AddNewPost
            userid={user.id}
            onPostAdded={() => {
              fetchPosts(user.id);
              setShowAddPostForm(false);
            }}
            onCancel={() => setShowAddPostForm(false)}
          />
        )}

        {posts.map((post) => {
          const isCommentsOpen = activePostId === post.id;
          return (
            <div className="allPosts" key={post.id}>
              <h2>{post.title} </h2>
              <h4>{post.body}</h4>
              <button
                onClick={() => {
                  deletePost(post.id);
                }}
              >
                delete post
              </button>
              <button
                onClick={() => {
                  toggleComments(post.id);
                  if (isCommentsOpen) {
                    navigate(`/posts/${user.id}`);
                  } else {
                    navigate(`/posts/${user.id}/comments/${post.id}`);
                  }
                }}
              >
                comments
              </button>
              {isCommentsOpen && <Comments postId={post.id} />}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Posts;
