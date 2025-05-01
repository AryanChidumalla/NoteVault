// // notesSlice.js
// import { createSlice } from "@reduxjs/toolkit";

// const notesSlice = createSlice({
//   name: "notes",
//   initialState: [],
//   reducers: {
//     setNotes(state, action) {
//       return action.payload;
//     },
//     addNote(state, action) {
//       state.push(action.payload);
//     },
//     updateNote(state, action) {
//       const index = state.findIndex((note) => note.id === action.payload.id);
//       if (index !== -1) {
//         state[index] = { ...state[index], ...action.payload };
//       }
//     },
//     removeNote(state, action) {
//       return state.filter((note) => note.id !== action.payload.id);
//     },
//   },
// });

// export const { setNotes, addNote, updateNote, removeNote } = notesSlice.actions;
// export default notesSlice.reducer;
