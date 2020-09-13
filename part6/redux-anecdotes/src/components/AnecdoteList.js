import React from "react";
import { connect } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import { set } from "../reducers/notificationReducer";
import Filter from "./Filter";

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    vote: (anecdote) => dispatch(vote(anecdote)),
    set: (message, time) => dispatch(set(message, time)),
  };
};

const AnecdoteList = ({ anecdotes, filter, vote, set }) => {
  const byVotes = (a, b) => b.votes - a.votes;

  const onVote = (anecdote) => {
    vote(anecdote);
    set(`You voted for: '${anecdote.content}'`, 3);
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      {anecdotes
        .sort(byVotes)
        .filter((anecdote) =>
          anecdote.content.toLocaleLowerCase().match(filter.toLocaleLowerCase())
        )
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => onVote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);
