import React from "react";
import { create } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    event.target.content.value = "";
    dispatch(create({ content }));
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
