const initialState = { message: "", timeout: null };

export const set = (message, time) => async (dispatch, getState) => {
  const state = getState();

  if (state.notification.timeout !== null) {
    clearTimeout(state.notification.timeout);
  }

  const timeout = setTimeout(() => {
    dispatch({ type: "SET", message: "", timeout: null });
  }, time * 1000);

  dispatch({ type: "SET", message, timeout });
};

const reducer = (state = initialState, action) => {
  console.log("state now: ", state);
  console.log("action", action);

  switch (action.type) {
    case "SET":
      return { message: action.message, timeout: action.timeout };
    default:
      return state;
  }
};

export default reducer;
