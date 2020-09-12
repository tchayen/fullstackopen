import React, { useState } from "react";

const AddBlog = ({ onAddBlog }) => {
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

    setTitle("");
    setUrl("");
    onAddBlog({ url, title });
  };

  if (!show) {
    return (
      <button className="show" onClick={() => setShow(true)}>
        Add blog
      </button>
    );
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        id="title"
        placeholder="Title"
        onChange={onTitleChange}
        value={title}
      />
      <input id="url" placeholder="Url" onChange={onUrlChange} value={url} />
      <button id="submit" type="submit">
        Add
      </button>
      <button onClick={() => setShow(false)}>Cancel</button>
    </form>
  );
};

export default AddBlog;
