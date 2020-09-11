import React, { useRef, useEffect, useState } from "react";

const api = {
  login: async (username, password) => {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.status === 401) {
      throw new Error("Denied");
    }

    return await response.json();
  },
  blogs: {
    all: async () => {
      const response = await fetch("/api/blogs", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      return await response.json();
    },
    create: async (token, url, title) => {
      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ url, title }),
      });

      return await response.json();
    },
    update: async (token, blog) => {
      const response = await fetch(`/api/blogs/${blog.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(blog),
      });

      return await response.json();
    },
    delete: async (token, id) => {
      return await fetch(`/api/blogs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
  },
};

const NOTICE_TIME = 3000;

const Popup = ({ message, error }) => (
  <div className={`popup${error ? " error" : ""}`}>{message}</div>
);

const Login = ({ onLogin, setError, setNotice }) => {
  const [show, setShow] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const onLoginChange = (event) => {
    setLogin(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.login(login, password);
      onLogin(response);
      setNotice("Signed in");
    } catch (error) {
      setError("Couldn't sign in");
    }
  };

  if (!show) {
    return <button onClick={() => setShow(true)}>Log in</button>;
  }

  return (
    <form onSubmit={onSubmit} style={{ padding: 32 }}>
      <input placeholder="Username" onChange={onLoginChange} value={login} />
      <input
        placeholder="Password"
        type="password"
        onChange={onPasswordChange}
        value={password}
      />
      <button type="submit">Login</button>
      <button onClick={() => setShow(false)}>Cancel</button>
    </form>
  );
};

const AddBlog = ({ onAddBlog, token }) => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const onTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const onUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    await api.blogs.create(token, url, title);
    setTitle("");
    setUrl("");
    onAddBlog();
  };

  if (!show) {
    return <button onClick={() => setShow(true)}>Add blog</button>;
  }

  return (
    <form onSubmit={onSubmit}>
      <input placeholder="Title" onChange={onTitleChange} value={title} />
      <input placeholder="Url" onChange={onUrlChange} value={url} />
      <button type="submit">Add</button>
      <button onClick={() => setShow(false)}>Cancel</button>
    </form>
  );
};

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
        <strong>{blog.title}</strong>{" "}
        <button onClick={() => setShow(!show)} style={{ marginLeft: 12 }}>
          View
        </button>
      </div>
      {show && (
        <div>
          <p>
            <strong>Likes:</strong> {blog.likes}
          </p>
          <p>
            <strong>URL:</strong> {blog.url}
          </p>
          <p>
            <strong>Author:</strong> {blog.author.name}
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

  const onAddBlog = async () => {
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
          <AddBlog token={session.data.token} onAddBlog={onAddBlog} />
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
