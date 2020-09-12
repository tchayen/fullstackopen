import React, { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, updateBlog, deleteBlog, currentUser }) => {
  const [show, setShow] = useState(false);

  const onLike = () => {
    updateBlog(blog.id, {
      ...blog,
      likes: blog.likes + 1,
      author: blog.author.id,
    });
  };

  const onDelete = () => {
    deleteBlog(blog.id);
  };

  return (
    <div
      className="blog"
      style={{
        border: "1px solid #eee",
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <strong className="blog-title">{blog.title}</strong>
        <span className="blog-author" style={{ marginLeft: 12 }}>
          {blog.author.name}
        </span>
        <button onClick={() => setShow(!show)} style={{ marginLeft: 12 }}>
          View
        </button>
      </div>
      {show && (
        <div>
          <p className="blog-likes">
            <strong>Likes:</strong> {blog.likes}
          </p>
          <p className="blog-url">
            <strong>URL:</strong> {blog.url}
          </p>
          <button onClick={onLike}>Like</button>
          {blog.author.username === currentUser.username && (
            <button style={{ marginLeft: 12 }} onClick={onDelete}>
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired,
};

export default Blog;
