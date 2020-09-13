import api from "../api";

const anecdotesAtStart = [];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

export const vote = (id) => {
  return {
    type: "VOTE",
    id,
  };
};

export const create = ({ content }) => async (dispatch) => {
  const anecdote = await api.create(content);
  dispatch({
    type: "CREATE",
    data: anecdote.data,
  });
};

export const initialize = () => async (dispatch) => {
  const anecdotes = await api.all();
  dispatch({ type: "INIT", anecdotes: anecdotes.data });
};

const initialState = anecdotesAtStart.map(asObject);

const reducer = (state = initialState, action) => {
  console.log("state now: ", state);
  console.log("action", action);

  switch (action.type) {
    case "INIT":
      return action.anecdotes;
    case "VOTE":
      const updated = state.find((anecdote) => anecdote.id === action.id);
      const next = [
        ...state.filter((anecdote) => anecdote.id !== action.id),
        { ...updated, votes: updated.votes + 1 },
      ];
      return next;
    case "CREATE":
      return [...state, action.data];
    default:
      return state;
  }
};

export default reducer;
