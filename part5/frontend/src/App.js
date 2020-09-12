import React, { useRef, useEffect, useState } from "react";
import Login from "./Login";
import AddBlog from "./AddBlog";
import Blogs from "./Blogs";
import api from "./api";

const NOTICE_TIME = 3000;

const Popup = ({ message, error }) => (
  <div className={`popup${error ? " error" : ""}`}>{message}</div>
);

const App = () => {
  const [session, setSession] = useState({ state: "loading" });
  const [popup, setPopup] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const timeout = useRef(null);

  const byLikes = (a, b) => b.likes - a.likes;

  useEffect(() => {
    api.blogs.all().then((blogs) => setBlogs(blogs.sort(byLikes)));
  }, []);

  const setError = (message) => {
    setPopup({ error: true, message });
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      setPopup(null);
    }, NOTICE_TIME);
  };

  const setNotice = (message) => {
    setPopup({ error: false, message });
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      setPopup(null);
    }, NOTICE_TIME);
  };

  const updateBlog = async (id, blog) => {
    const updated = await api.blogs.update(session.token, blog);
    setBlogs(
      [...blogs.filter((blog) => blog.id !== id), updated].sort(byLikes)
    );
  };

  const deleteBlog = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) {
      return;
    }
    await api.blogs.delete(session.data.token, id);
    setBlogs([...blogs.filter((blog) => blog.id !== id)].sort(byLikes));
  };

  useEffect(() => {
    const data = localStorage.getItem("data");

    if (data) {
      setSession({ state: "signed-in", data: JSON.parse(data) });
    } else {
      setSession({ state: "not-signed-in" });
    }
  }, []);

  const onLogin = (data) => {
    localStorage.setItem("data", JSON.stringify(data));
    setSession({ state: "signed-in", data });
  };

  const logout = () => {
    localStorage.removeItem("data");
    setSession({ state: "not-signed-in" });
    setNotice("You have been logged out");
  };

  const onAddBlog = async ({ url, title }) => {
    await api.blogs.create(session.data.token, url, title);
    const blogs = await api.blogs.all();
    setBlogs(blogs);
    setNotice("Added blog post");
  };

  if (session.state === "loading") {
    return <div>Loading...</div>;
  }

  if (session.state === "signed-in") {
    return (
      <div>
        {popup && <Popup message={popup.message} error={popup.error} />}
        <div style={{ padding: 32 }}>
          <button onClick={logout}>Log out</button>
          <Blogs
            deleteBlog={deleteBlog}
            updateBlog={updateBlog}
            blogs={blogs}
            currentUser={session.data}
          />
          <AddBlog onAddBlog={onAddBlog} />
        </div>
      </div>
    );
  }

  return (
    <div>
      {popup && <Popup message={popup.message} error={popup.error} />}
      <Login onLogin={onLogin} setError={setError} setNotice={setNotice} />
    </div>
  );
};

export default App;
