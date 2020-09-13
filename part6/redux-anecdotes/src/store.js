import { createStore, combineReducers, applyMiddleware } from "redux";
import anecdotes from "./reducers/anecdoteReducer";
import notification from "./reducers/notificationReducer";
import filter from "./reducers/filterReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const store = createStore(
  combineReducers({ anecdotes, notification, filter }),
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
