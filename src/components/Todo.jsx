import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import TodoItems from "./TodoItems";

const Wrapper = styled.div`
  width: 600px;
  min-height: 732px;
  border-radius: 20px;
  background: #fff;
  margin: auto;
  margin-top: 174px;
  display: flex;
  flex-direction: column;
  padding: 0px 44px;
  padding-bottom: 30px;
  margin-bottom: 100px;

  .todo-header {
    margin-top: 84px;
    color: #002765;
    font-size: 36px;
    font-weight: 600;
    line-height: 34px;
  }
  .todo-add {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 45px;
  }
  .todo-input {
    border-radius: 50px;
    background: #edeef0;
    border: none;
    outline: none;
    width: 576px;
    height: 80px;
    padding-left: 35px;
    font-size: 20px;
  }

  .todo-add-btn {
    border-radius: 50px;
    background: #ff6739;
    width: 187px;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: -100px;
    color: #fff;
    font-size: 26px;
    font-weight: 600;
    cursor: pointer;
  }

  .todo-list {
    margin-top: 30px;
    width: 100%;
  }
`;

const Todo = () => {
  const [todo, setTodo] = useState([]);
  const inputRef = useRef(null);
  const [count, setCount] = useState(0); // Add count as state

  // Add new todo
  const add = () => {
    if (inputRef.current.value.trim() !== "") {
      const newTodo = { no: count, text: inputRef.current.value, display: "" };
      const updatedTodos = [...todo, newTodo];

      setTodo(updatedTodos);
      setCount(count + 1); // Increment count

      inputRef.current.value = "";
      localStorage.setItem("todo", JSON.stringify(updatedTodos));
      localStorage.setItem("todo_count", count + 1); // Save updated count
    }
  };

  // Load todos and count from localStorage on mount
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todo")) || [];
    const savedCount = parseInt(localStorage.getItem("todo_count")) || 0;
    setTodo(savedTodos);
    setCount(savedCount);
  }, []);

  useEffect(() => {
    if (todo.length > 0) {
      localStorage.setItem("todo", JSON.stringify(todo)); // Save todos in localStorage
    }
  }, [todo]);

  return (
    <Wrapper>
      <div className="todo-header">Todo List</div>
      <div className="todo-add">
        <input
          ref={inputRef}
          type="text"
          placeholder="Add Task"
          className="todo-input"
        />
        <div onClick={add} className="todo-add-btn">
          Add
        </div>
      </div>
      <div className="todo-list">
        {todo.map((item) => (
          <TodoItems
            key={item.no}
            setTodo={setTodo}
            no={item.no}
            display={item.display}
            text={item.text}
          />
        ))}
      </div>
    </Wrapper>
  );
};

export default Todo;
