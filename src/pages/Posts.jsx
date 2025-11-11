import { useState, useEffect } from "react";
import Comments from "../components/Comments";
import { useNavigate } from "react-router";
function Posts() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  //   const [postsComments, setPostsComments] = useState([]);
  const [activePostId, setActivePostId] = useState(null);
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    navigate(`/posts/${user.id}`);
    fetch(`http://localhost:3000/posts/?userId=${user.id}`)
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

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

        {posts.map((post) => {
          const isCommentsOpen = activePostId === post.id;
          return (
            <div className="allPosts" key={post.id}>
              <h2>{post.title} </h2>
              <h4>{post.body}</h4>

              <button
                onClick={() => {
                  toggleComments(post.id);
                  if (isCommentsOpen) {
                    navigate(`/posts/${user.id}`);
                  } else {
                    navigate(`/posts/${user.id}/comments`);
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
