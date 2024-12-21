import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Employee from "./Components/employee/Employee";
import Main from "./Components/todo/Main";
import {
  DataContext,
  DispatchContext,
  FilterMapContext,
  FilterNamesContext,
} from "./Components/utils/Context";
import { Reducer, useReducerWithThunk } from "./Components/utils/Reducer";
import Layout from "./Layout";

export default function App() {
  const initialState = {
    employees: [],
    loading: false,
    error: null,
    tasks: [
      { taskName: "Task 1", completed: true, id: "task-1" },
      { taskName: "Task 2", completed: false, id: "task-2" },
      { taskName: "Task 3", completed: false, id: "task-3" },
    ],
  };
  const [state, dispatch] = useReducerWithThunk(Reducer, initialState);

  const filterMap = {
    All: () => true,
    Active: (task) => !task.completed,
    Completed: (task) => task.completed,
  };
  const filterNames = Object.keys(filterMap);

  return (
    <Router>
      <main>
        <DataContext.Provider value={state}>
          <DispatchContext.Provider value={dispatch}>
            <FilterMapContext.Provider value={filterMap}>
              <FilterNamesContext.Provider value={filterNames}>
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route path="" element={<Main />} />
                    <Route path="/employee" element={<Employee />} />
                  </Route>
                </Routes>
              </FilterNamesContext.Provider>
            </FilterMapContext.Provider>
          </DispatchContext.Provider>
        </DataContext.Provider>
      </main>
    </Router>
  );
}
