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
  },
};

const NOTICE_TIME = 3000;

const Popup = ({ message, error }) => (
  <div className={`popup${error ? " error" : ""}`}>{message}</div>
);

const Login = ({ onLogin, setError, setNotice }) => {
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
      onLogin(response.token);
      setNotice("Signed in");
    } catch (error) {
      setError("Couldn't sign in");
    }
  };

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
    </form>
  );
};

const AddBlog = ({ onAddBlog, token }) => {
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

  return (
    <form onSubmit={onSubmit}>
      <input placeholder="Title" onChange={onTitleChange} value={title} />
      <input placeholder="Url" onChange={onUrlChange} value={url} />
      <button type="submit">Add</button>
    </form>
  );
};

const Blogs = ({ blogs }) => {
  return (
    <div style={{ marginTop: 16, marginBottom: 16 }}>
      {blogs.map((blog) => (
        <div key={blog.id}>
          <strong>{blog.title}</strong> {blog.author.name}
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [session, setSession] = useState({ state: "loading" });
  const [popup, setPopup] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const timeout = useRef(null);

  useEffect(() => {
    api.blogs.all().then(setBlogs);
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

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setSession({ state: "signed-in", token });
    } else {
      setSession({ state: "not-signed-in" });
    }
  }, []);

  const onLogin = (token) => {
    localStorage.setItem("token", token);
    setSession({ state: "signed-in", token });
  };

  const logout = () => {
    localStorage.removeItem("token");
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
          <Blogs blogs={blogs} />
          <AddBlog token={session.token} onAddBlog={onAddBlog} />
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
