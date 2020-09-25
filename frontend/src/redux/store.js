import { createStore, applyMiddleware, combineReducers } from "redux";
import passReducer from "./reducer/passReducer";
import userReducer from "./reducer/userReducer";
const thunkMiddleware = require("redux-thunk").default;

const mainReducers = combineReducers({
  pass: passReducer,
  user: userReducer,
});

const store = createStore(mainReducers, applyMiddleware(thunkMiddleware));

export default store;
