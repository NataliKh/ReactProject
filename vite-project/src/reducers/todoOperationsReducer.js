import {
  INITIALIZE_OPERATIONS,
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

const todoOperationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_OPERATIONS:
      return {
        ...state,
        allTodos: action.payload,
        todos: action.payload,
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

export default todoOperationsReducer;
