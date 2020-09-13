const initialState = "";

export const filter = (filter) => {
  return {
    type: "FILTER",
    filter,
  };
};

const reducer = (state = initialState, action) => {
  console.log("state now: ", state);
  console.log("action", action);

  switch (action.type) {
    case "FILTER":
      return action.filter;
    default:
      return state;
  }
};

export default reducer;
