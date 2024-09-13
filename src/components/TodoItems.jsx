import styled from "styled-components";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ImRadioUnchecked } from "react-icons/im";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 0px;
  align-items: center;

  .items-container {
    display: flex;
    align-items: center;
  }

  .todoItems-text {
    padding-left: 16px;
    color: #404040;
    font-size: 22px;
  }

  .delete {
    cursor: pointer;
    padding-right: 25px;
  }

  .line-through {
    text-decoration: line-through solid #adadad 3px;
  }
`;

const TodoItems = ({ no, display, text, setTodo }) => {
  // Delete Todo Function
  const deleteTodo = (no) => {
    let data = JSON.parse(localStorage.getItem("todo")) || [];
    data = data.filter((todo) => todo.no !== no);
    localStorage.setItem("todo", JSON.stringify(data));
    setTodo(data);
  };

  // Toggle Line-through
  const toggle = () => {
    let data = JSON.parse(localStorage.getItem("todo")) || [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].no === no) {
        data[i].display = data[i].display === "" ? "line-through" : "";
        break;
      }
    }
    localStorage.setItem("todo", JSON.stringify(data));
    setTodo(data);
  };

  return (
    <Wrapper>
      <div className={`items-container ${display}`} onClick={() => toggle(no)}>
        {display === "" ? <ImRadioUnchecked /> : <IoCheckmarkDoneSharp />}
        <div className="todoItems-text"> {text}</div>
      </div>
      <RiDeleteBin6Line className="delete" onClick={() => deleteTodo(no)} />
    </Wrapper>
  );
};

export default TodoItems;
