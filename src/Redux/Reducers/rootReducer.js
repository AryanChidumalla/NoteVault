// reducers/index.js
import { combineReducers } from "redux";
import counterReducer from "./CounterReducer";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
