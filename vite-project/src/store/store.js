import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import todoReducer from "../reducers/todoReducer";
import todoOperationsReducer from "../reducers/todoOperationsReducer";

const rootReducer = combineReducers({
  todos: todoReducer,
  operations: todoOperationsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
