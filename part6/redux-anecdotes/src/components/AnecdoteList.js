import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import { set } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const dispatch = useDispatch();
  const byVotes = (a, b) => b.votes - a.votes;

  const onVote = (anecdote) => {
    dispatch(vote(anecdote.id));
    dispatch(set(`You voted for: '${anecdote.content}'`));
    setTimeout(() => {
      dispatch(set(""));
    }, 5000);
  };

  return anecdotes.sort(byVotes).map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => onVote(anecdote)}>vote</button>
      </div>
    </div>
  ));
};

export default AnecdoteList;
