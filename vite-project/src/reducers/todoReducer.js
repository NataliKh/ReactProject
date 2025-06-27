import {
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
} from "../action/action.js";

const initialState = {
  todos: [],
  isProcessing: false,
  error: null,
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_REQUEST:
      return {
        ...state,
        isProcessing: true,
      };
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        isProcessing: false,
        todos: action.payload,
      };
    case FETCH_DATA_FAILURE:
      return {
        ...state,
        isProcessing: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default todoReducer;
