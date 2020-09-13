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
};
