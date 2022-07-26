import React from "react";
import "./styles.scss";

interface ITodoItemParams {
  task: string;
  changeComplited: () => void;
  checked: boolean;
  deleteTask: () => void;
}

const TodoItem: React.FC<ITodoItemParams> = ({changeComplited, checked, task, deleteTask}) => {
  const completedStyle = {
    backgroundColor: "rgba(73, 140, 248, .6)",
    textDecoration: "line-through"
  }
  return (
    <div className="item-wrapper" style={checked ? completedStyle : {}}>
      <input type="checkbox" onChange={changeComplited} defaultChecked={checked}/>
      <p>{task}</p>
      <div className="btn-delete" onClick={deleteTask}></div>
    </div>
  );
};

export default TodoItem;