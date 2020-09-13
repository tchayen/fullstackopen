import { createStore, combineReducers } from "redux";
import anecdotes from "./reducers/anecdoteReducer";
import notification from "./reducers/notificationReducer";
import filter from "./reducers/filterReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(
  combineReducers({ anecdotes, notification, filter }),
  composeWithDevTools()
);

export default store;
