import React from "react";
import { create } from "../reducers/anecdoteReducer";
import { set } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    event.target.content.value = "";
    dispatch(create({ content }));
    dispatch(set(`New anecdote: '${content}'`));
    setTimeout(() => {
      dispatch(set(""));
    }, 5000);
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={onCreate}>
        <input name="content" />
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
