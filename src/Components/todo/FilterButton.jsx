export default function FilterButton(props) {
  return (
    <button
      type="button"
      className="btn toggle-btn"
      aria-pressed={props.isPressed}
      onClick={() => props.setFilter(props.type)}
    >
      <span className="visually-hidden">Show </span>
      <span>{props.type}</span>
      <span className="visually-hidden"> tasks</span>
    </button>
  );
}
