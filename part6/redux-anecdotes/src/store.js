import { createStore, combineReducers } from "redux";
import anecdotes from "./reducers/anecdoteReducer";
import notification from "./reducers/notificationReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(
  combineReducers({ anecdotes, notification }),
  composeWithDevTools()
);

export default store;
