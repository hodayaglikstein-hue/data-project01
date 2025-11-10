import { useState, useEffect } from "react";
import Comments from "../components/Comments";
function Posts() {
  const [posts, setPosts] = useState([]);
  //   const [postsComments, setPostsComments] = useState([]);
  const [activePostId, setActivePostId] = useState(null);
  useEffect(() => {
    fetch(`http://localhost:3000/posts`)
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
        <h1>My posts</h1>

        {posts.map((post) => {
          const isCommentsOpen = activePostId === post.id;
          return (
            <div className="allPosts" key={post.id}>
              <h2>{post.title} </h2>
              <h4>{post.body}</h4>

              <button
                onClick={() => {
                  toggleComments(post.id);
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
