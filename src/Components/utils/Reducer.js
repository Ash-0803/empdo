import axios from "axios";
import { nanoid } from "nanoid";
import { useReducer } from "react";

export function Reducer(state, action) {
  console.log("Reducer action:", action, state);
  switch (action.type) {
    case "initialize_tasks": {
      console.log("initialize", action.tasks);
      return { ...state, tasks: action.tasks };
    }
    case "add_task": {
      return {
        ...state,
        tasks: [
          ...state.tasks,
          { taskName: action.value, completed: false, id: `todo-${nanoid()}` },
        ],
      };
    }
    case "delete_task": {
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.id),
      };
    }
    case "toggle_task_completed": {
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (action.id === task.id) {
            return { ...task, completed: action.checked };
          } else {
            return task;
          }
        }),
      };
    }
    case "handle_submit": {
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (action.id === task.id) {
            return { ...task, taskName: action.editTaskName };
          } else return task;
        }),
      };
    }
    case "FETCH_EMPLOYEES": {
      console.log("loading");
      return { ...state, loading: true };
    }
    case "FETCH_EMPLOYEES_SUCCESS": {
      console.log("success");
      return { ...state, loading: false, employees: action.data };
    }
    case "FETCH_EMPLOYEES_FAILURE": {
      console.log("failure");
      return { ...state, loading: false, error: action.error };
    }
    default:
      return state;
  }
}

export const fetchEmployees = () => async (dispatch) => {
  dispatch({ type: "FETCH_EMPLOYEES" });
  try {
    const response = await axios.get("https://api.restful-api.dev/objects");

    dispatch({ type: "FETCH_EMPLOYEES_SUCCESS", response });
  } catch (error) {
    dispatch({ type: "FETCH_EMPLOYEES_FAILURE", error });
  }
};

export function useReducerWithThunk(reducer, initialState) {
  const [state, dispatch] = useReducer(reducer, initialState);

  let customDispatch = (action) => {
    if (typeof action === "function") {
      action(customDispatch);
    } else {
      dispatch(action);
    }
  };

  return [state, customDispatch];
}
