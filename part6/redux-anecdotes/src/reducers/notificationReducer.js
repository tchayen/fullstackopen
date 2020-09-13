const initialState = { message: "" };

export const set = (message) => {
  return {
    type: "SET",
    message,
  };
};

const reducer = (state = initialState, action) => {
  console.log("state now: ", state);
  console.log("action", action);

  switch (action.type) {
    case "SET":
      return { message: action.message };
    default:
      return state;
  }
};

export default reducer;
