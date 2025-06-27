export const FETCH_DATA_REQUEST = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_FAILURE = "FETCH_DATA_FAILURE";

// Синхронные действия
export const fetchDataRequest = () => ({
  type: FETCH_DATA_REQUEST,
});

export const fetchDataSuccess = (data) => ({
  type: FETCH_DATA_SUCCESS,
  payload: data,
});

export const fetchDataFailure = (error) => ({
  type: FETCH_DATA_FAILURE,
  payload: error,
});

// Асинхронное действие с Thunk
export const loadedTodos = () => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      const response = await fetch("http://localhost:3003/todos");
      const todos = await response.json();
      dispatch(fetchDataSuccess(todos));
    } catch (error) {
      dispatch(fetchDataFailure(error.message));
    }
  };
};

export const addNewTodo = (todoInput) => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      await fetch("http://localhost:3003/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=UTF-8" },
        body: JSON.stringify({
          title: todoInput,
          completed: false,
        }),
      });
      const response = await fetch("http://localhost:3003/todos");
      const refreshTodo = await response.json();
      dispatch(fetchDataSuccess(refreshTodo));
    } catch (error) {
      dispatch(fetchDataFailure(error.message));
    }
  };
};

export const deleteTodo = (todoId) => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      await fetch(`http://localhost:3003/todos/${todoId}`, {
        method: "DELETE",
      });
      const response = await fetch("http://localhost:3003/todos");
      const refreshTodo = await response.json();
      dispatch(fetchDataSuccess(refreshTodo));
    } catch (error) {
      dispatch(fetchDataFailure(error.message));
    }
  };
};

export const updateComplatedTodo = (todoId, newCompleted) => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      await fetch(`http://localhost:3003/todos/${todoId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json;charset=UTF-8" },
        body: JSON.stringify({
          completed: newCompleted,
        }),
      });
      const response = await fetch("http://localhost:3003/todos");
      const refreshTodo = await response.json();
      dispatch(fetchDataSuccess(refreshTodo));
    } catch (error) {
      dispatch(fetchDataFailure(error.message));
    }
  };
};

export const editTodo = (todoId, todoInput) => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      await fetch(`http://localhost:3003/todos/${todoId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json;charset=UTF-8" },
        body: JSON.stringify({
          title: todoInput,
        }),
      });
      const response = await fetch("http://localhost:3003/todos");
      const refreshTodo = await response.json();
      dispatch(fetchDataSuccess(refreshTodo));
    } catch (error) {
      dispatch(fetchDataFailure(error.message));
    }
  };
};
