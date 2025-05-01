import { CLEAR_USER, SET_USER } from "../Actions/authAction";

const initialState = {
  user: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case CLEAR_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default authReducer;
