import { useContext, useState } from "react";
import { DataContext, DispatchContext } from "../utils/Context";

export default function Form() {
  const [name, setName] = useState("name");
  const { tasks } = useContext(DataContext);
  const dispatch = useContext(DispatchContext);
  const addTask = (value) => {
    dispatch({
      type: "add_task",
      value: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let count = 0;
    tasks.forEach((item) => {
      if (item.taskName === name) {
        alert("Task already exists!");
        count = 1;
      }
    });
    if (count == 0) {
      // props.addTask(e.target.elements.text.value)

      addTask(name);
    }
  };
  const handleChange = (e) => {
    setName(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
        </label>
      </h2>
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange}
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>
    </form>
  );
}
