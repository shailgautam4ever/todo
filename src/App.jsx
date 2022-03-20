import { useState } from "react";
import "./App.css";
import ActionButton from "./components/ActionButton";

function App() {
  const [currentTodo, setCurrentTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const addTodo = () => {
    if (!currentTodo) {
      alert("Not a Valid Task");
      return;
    }
    todos.push({
      name: currentTodo,
      id: todos.length + 1,
      isCompleted: false,
    });
    setTodos([...todos]);
    setCurrentTodo("");
    setFilter("all");
    console.log("Add");
  };

  const handleOnChange = (e) => {
    setCurrentTodo(e.target.value);
  };
  console.log("Filet", filter);

  const toggle = (e, id) => {
    e.stopPropagation();

    const index = todos.findIndex((v) => v.id == id);
    const temp = todos[index];
    temp.isCompleted = temp.isCompleted == true ? false : true;
    todos.splice(index, 1, temp);
    setTodos([...todos]);
    console.log("toggle");
  };

  const handleOnDelete = (i, e) => {
    e.stopPropagation();
    todos.splice(i, 1);
    setTodos([...todos]);
    console.log("Delete");
  };
  console.log("todo", todos);
  return (
    <div className="main">
      <h1 className="title">Todos</h1>
      <div className="card">
        <div className="todo-form">
          <input
            value={currentTodo}
            type="text"
            placeholder="Enter task"
            onChange={handleOnChange}
          />
          <button className="add-btn" onClick={addTodo}>
            Add
          </button>
        </div>
        <div className="btn-wrapper">
          <ActionButton
            filter={filter}
            setFilter={setFilter}
            action="all"
            label="All"
          />
          <ActionButton
            filter={filter}
            setFilter={setFilter}
            action="active"
            label="Active"
          />
          <ActionButton
            filter={filter}
            setFilter={setFilter}
            action="completed"
            label="Completed"
          />
          <button onClick={() => setTodos([])}>Clear All</button>
        </div>
        {todos
          .filter((v) => {
            if (filter === "all") {
              return true;
            }
            if (filter === "active") {
              return v.isCompleted === false;
            }
            if (filter === "completed") {
              return v.isCompleted === true;
            }
          })
          .map((v, i) => (
            <div className="list-item" key={v.id}>
              <span className="todo-name" onClick={(e) => toggle(e, v.id)}>
                {v.name}
              </span>
              {v.isCompleted == true ? <span> ✅</span> : null}
              <button onClick={(e) => handleOnDelete(i, e)}>-</button>
            </div>
          ))}
        {todos.length == 0 ? <h1 className="no-todo">Plan your day!</h1> : null}
      </div>
    </div>
  );
}

export default App;
