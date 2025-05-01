// Action Types
export const SET_NOTES = "SET_NOTES";
export const CLEAR_NOTES = "CLEAR_NOTES";

// Action Creators
export const setNotes = (notes) => ({ type: SET_NOTES, payload: notes });
export const clearNotes = () => ({ type: CLEAR_NOTES });
