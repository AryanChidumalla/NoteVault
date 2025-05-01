// reducers/index.js
import { combineReducers } from "redux";
import authReducer from "./authReducer";
import notesReducer from "./NotesReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  notes: notesReducer,
});

export default rootReducer;
