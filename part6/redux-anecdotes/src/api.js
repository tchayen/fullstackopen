import axios from "axios";

export default {
  all: async () => {
    return await axios.get("http://localhost:3001/anecdotes");
  },
  create: async (content) => {
    return await axios.post("http://localhost:3001/anecdotes", {
      content,
      votes: 0,
    });
  },
  update: async (anecdote) => {
    return await axios.put(
      `http://localhost:3001/anecdotes/${anecdote.id}`,
      anecdote
    );
  },
};
