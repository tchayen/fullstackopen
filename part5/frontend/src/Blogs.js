import React from "react";
import Blog from "./Blog";

const Blogs = ({ blogs, updateBlog, deleteBlog, currentUser }) => {
  return (
    <div style={{ marginTop: 16, marginBottom: 16 }}>
      {blogs.map((blog) => (
        <Blog
          blog={blog}
          key={blog.id}
          deleteBlog={deleteBlog}
          updateBlog={updateBlog}
          currentUser={currentUser}
        />
      ))}
    </div>
  );
};

export default Blogs;
