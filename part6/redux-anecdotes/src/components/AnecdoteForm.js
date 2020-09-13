import React from "react";
import { create } from "../reducers/anecdoteReducer";
import { set } from "../reducers/notificationReducer";
import { connect } from "react-redux";

const mapDispatchToProps = (dispatch) => {
  return {
    create: (anecdote) => dispatch(create(anecdote)),
    set: (message, time) => dispatch(set(message, time)),
  };
};

const AnecdoteForm = ({ create, set }) => {
  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    event.target.content.value = "";
    create({ content });
    set(`New anecdote: '${content}'`, 3);
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

export default connect(null, mapDispatchToProps)(AnecdoteForm);
