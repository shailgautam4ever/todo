function ActionButton({ filter, setFilter, action, label }) {
  return (
    <button
      className={filter === action ? "active" : ""}
      onClick={() => setFilter(action)}
    >
      {label}
    </button>
  );
}
export default ActionButton;
