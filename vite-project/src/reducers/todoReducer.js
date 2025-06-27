import {
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  UPDATE_TODOS,
  UPDATE_SEARCH_SORT_STATE,
} from "../action/action.js";

const initialState = {
  todos: [],
  allTodos: [],
  searchInput: "",
  isSorted: false,
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
        allTodos: action.payload,
      };
    case FETCH_DATA_FAILURE:
      return {
        ...state,
        isProcessing: false,
        error: action.payload,
      };

    case UPDATE_TODOS:
      return {
        ...state,
        todos: action.payload,
      };

    case UPDATE_SEARCH_SORT_STATE:
      return {
        ...state,
        searchInput: action.payload.searchInput,
        isSorted: action.payload.isSorted,
      };
    default:
      return state;
  }
};

export default todoReducer;
