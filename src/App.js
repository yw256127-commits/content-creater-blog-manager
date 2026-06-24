import React, { useState } from "react";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("Draft");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !content) return;

    if (editId) {
      setPosts(
        posts.map((post) =>
          post.id === editId
            ? { ...post, title, content, status }
            : post
        )
      );
      setEditId(null);
    } else {
      const newPost = {
        id: Date.now(),
        title,
        content,
        status,
      };

      setPosts([...posts, newPost]);
    }

    setTitle("");
    setContent("");
    setStatus("Draft");
  };

  const editPost = (post) => {
    setTitle(post.title);
    setContent(post.content);
    setStatus(post.status);
    setEditId(post.id);
  };

  const deletePost = (id) => {
    setPosts(posts.filter((post) => post.id !== id));

    if (selectedPost && selectedPost.id === id) {
      setSelectedPost(null);
    }
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Content Creator Blog Manager</h1>

      {/* Form */}

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Blog Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Draft</option>
          <option>Published</option>
        </select>

        <button type="submit">
          {editId ? "Update Post" : "Create Post"}
        </button>
      </form>

      {/* Search */}

      <input
        className="search"
        type="text"
        placeholder="Search Posts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Post List */}

      <div className="post-list">
        <h2>All Posts</h2>

        {filteredPosts.length === 0 ? (
          <p>No Posts Found</p>
        ) : (
          filteredPosts.map((post) => (
            <div className="card" key={post.id}>
              <h3>{post.title}</h3>

              <span
                className={
                  post.status === "Published"
                    ? "published"
                    : "draft"
                }
              >
                {post.status}
              </span>

              <div className="btn-group">
                <button
                  onClick={() => setSelectedPost(post)}
                >
                  View
                </button>

                <button
                  onClick={() => editPost(post)}
                >
                  Edit
                </button>

                <button
                  className="delete"
                  onClick={() => deletePost(post.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Detailed Blog Page */}

      {selectedPost && (
        <div className="details">
          <h2>Blog Details</h2>

          <h3>{selectedPost.title}</h3>

          <p>
            <strong>Status:</strong>{" "}
            {selectedPost.status}
          </p>

          <p>{selectedPost.content}</p>
        </div>
      )}
    </div>
  );
}

export default App;