import { useContext, useState } from "react";
import { DataContext, FilterNamesContext } from "../utils/Context";
import FilterButton from "./FilterButton";
import Form from "./Form";
import TaskList from "./TaskList";

export default function Main() {
  const { tasks } = useContext(DataContext);

  const [filter, setFilter] = useState("All");
  const filterNames = useContext(FilterNamesContext);

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>

      <Form />

      <div className="filters btn-group stack-exception">
        {filterNames.map((type) => (
          <FilterButton
            key={type}
            type={type}
            isPressed={type === filter}
            setFilter={setFilter}
          />
        ))}
      </div>

      <h2 id="list-heading">{tasks.length} tasks remaining</h2>
      <TaskList filter={filter} />
    </div>
  );
}
