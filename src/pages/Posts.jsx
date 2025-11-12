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

  async function showPosts(userid) {
    setIsLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/posts?userId=${userid}`);
      if (!res.ok) {
        throw Error("Something went wrong!");
      } else {
        const data = await res.json();
        setPosts(data);
      }
    } catch (e) {
      alert(e);
    } finally {
      setIsLoading(false);
    }
  }

  const deletePost = (postId) => {
    fetch(`http://localhost:3000/posts/${postId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          console.log("Resource deleted successfully.");
          showPosts(user.id);
        } else {
          console.error("Failed to delete resource.");
        }
      })
      .catch((error) => {
        console.error("Network or other error:", error);
      });
  };

  useEffect(() => {
    showPosts(user.id);
  }, [user.id]);

  function toggleComments(userid) {
    if (activePostId === userid) {
      setActivePostId(null);
    } else {
      setActivePostId(userid);
    }
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
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
              showPosts(user.id);
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
