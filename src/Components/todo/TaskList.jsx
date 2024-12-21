import { useContext, useEffect } from "react";
import { DataContext, FilterMapContext } from "../utils/Context";
import Task from "./Task";

export default function TaskList(props) {
  const filterMap = useContext(FilterMapContext);
  const { tasks } = useContext(DataContext);

  useEffect(() => {
    console.log("setting to local storage tasks", tasks);
    localStorage.setItem("todos", JSON.stringify(tasks));
  }, [tasks]);

  console.log("TaskList tasks: " + tasks);
  return (
    <ul
      role="list"
      className="todo-list stack-large stack-exception"
      aria-labelledby="list-heading"
    >
      {tasks.filter(filterMap[props.filter]).map((task) => (
        <li className="todo stack-small" key={task.id}>
          <Task
            taskName={task.taskName}
            completed={task.completed}
            id={task.id}
          />
        </li>
      ))}
    </ul>
  );
}
