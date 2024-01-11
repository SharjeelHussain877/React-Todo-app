import { useState } from "react";
import './style.css'
import swal from 'sweetalert';

function Todo() {
  const [todos, setTodos] = useState([
    { taskText: "Sharjeel", disabled: true },
  ]);

  const [value, setValue] = useState("");

  const addTask = (e) => {
    e.preventDefault()
    setTodos([...todos, { taskText: value, disabled: true }]);
    setValue("");
  };

  function setTask(e) {
    setValue(e.target.value);
  }

  function allDelete () {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover all tasks!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        setTodos([])
        swal("Your tasks have been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your tasks are safe!");
      }
    });
  }

  return (
    <div className="main">
      <h1 className="head">Sharjeel's Todo Application </h1>
      <form>
        <input
          className="task-input"
          type="text"
          placeholder="Type your task"
          value={value}
          onChange={setTask}
        />

        <button className="addTask-btn" onClick={addTask}>Add task</button>
      </form>
      <br />

      {todos.length > 0 ? (
        <ul className="tasks">
          <button onClick={allDelete} className="delete-all">Delete All</button>
          {todos.map((v, i) => (
            <li key={i}>
              <div>
                <input
                  type="text"
                  defaultValue={v.taskText}
                  disabled={v.disabled}
                  onChange={(e) => {
                    v.value = e.target.value;
                  }}
                />
              </div>

              <div>
                {v.disabled ? (
                  <button
                    onClick={() => {
                      todos.splice(i, 1, { ...v, disabled: false });
                      setTodos([...todos]);
                    }}
                  >
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      v.disabled = true;
                      setTodos([...todos]);
                    }}
                  >
                    <span className="material-symbols-outlined">sync_alt</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    console.log('Index to delete:', i);
                    const todosArr = [...todos];
                    todosArr.splice(i, 1);
                    setTodos(todosArr);
                  }}
                >
                  <span className="material-symbols-outlined">delete_forever</span>
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks available.</p>
      )}
    </div>
  );
}

export default Todo;
