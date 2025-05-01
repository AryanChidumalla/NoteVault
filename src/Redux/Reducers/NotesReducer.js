// import { CLEAR_NOTES, SET_NOTES } from "../Actions/notesAction";

// // reducers/counterReducer.js
// const initialState = {
//   notes: [],
// };

// const notesReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case SET_NOTES:
//       return { ...state, notes: action.payload };
//     case CLEAR_NOTES:
//       return { ...state, notes: null };
//     default:
//       return state;
//   }
// };

// export default notesReducer;

import { createSlice } from "@reduxjs/toolkit";

const notes = createSlice({
  name: "notes",
  initialState: {
    notes: [],
  },
  reducers: {
    setNotes(state, action) {
      state.notes = action.payload;
    },
  },
});

export const { setNotes } = notes.actions;
export default notes.reducer;
