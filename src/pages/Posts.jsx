import { useState, useEffect } from "react";

function Posts() {
  const [posts, setPosts] = useState([]);
  const userid = 5;
  useEffect(() => {
    fetch(`http://localhost:3000/posts/?userId=${userid}`)
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <>
      <div>
        <h1>My posts</h1>

        {posts.map((post) => (
          <div className="allPosts">
            <h2 key={post.id}>{post.title} </h2>
            <h4>{post.body}</h4>
          </div>
        ))}
      </div>
    </>
  );
}

export default Posts;
