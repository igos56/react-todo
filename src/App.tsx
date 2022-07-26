import React from 'react';
import todoData from './store/todoData';
import { observer } from 'mobx-react-lite';
import TodoItem from './components/TodoItem/TodoItem';
import { ITask } from './types/ITask';
import './App.scss';


const App = observer(() => {
  const getInput = (event: React.FormEvent<HTMLInputElement>): void => {
    todoData.setNewContent(event.currentTarget.value);
  }

  const addTask = () => {
    todoData.addTask(todoData.newContent)
    todoData.clearInput();
  }

  const handleChecked = (event: React.FormEvent<HTMLInputElement>) => {
    todoData.handleFilter(event.currentTarget.value);
  }

  let all: ITask[] = [];
  let completed: ITask[] = [];
  let current: ITask[] = [];
  let finalList: ITask[] = [];

  if (todoData.all) all = todoData.itemsList;
  if (todoData.completed) completed = todoData.itemsList.filter(item => item.isCompleted === true);
  if (todoData.current) current = todoData.itemsList.filter(item => item.isCompleted === false);
    
  if (todoData.all) finalList = all;
  if (todoData.completed) finalList = completed;
  if (todoData.current) finalList = current;
    
  const allTasks = finalList.map(item => {
    return (
      <TodoItem
        key={item.id}
        task={item.task}
        deleteTask={() => todoData.deleteTask(item.id)}
        checked={item.isCompleted}
        changeComplited={() => todoData.handleChecked(item)}
      />
    );
  });

  return (
    <div className="App">
      <h1 className="app-title">Just <span>Do</span> It</h1>
      <div className="inputs-wrapper">
        <input onChange={(event) => handleChecked(event)} type="radio" name="filter" value="all" id="all" defaultChecked/>
        <label htmlFor="all">Все задачи</label>

        <input onChange={(event) => handleChecked(event)} type="radio" name="filter" value="completed" id="completed"/>
        <label htmlFor="completed">Завершенные</label>

        <input onChange={(event) => handleChecked(event)} type="radio" name="filter" value="current" id="current"/>
        <label htmlFor="current">Текущие</label>

        <input className="task-input" onChange={(event) => getInput(event)} type="text" value={todoData.newContent} placeholder="Моя новая задача ..."/>

        <button className="btn-add" onClick={() => addTask()}>Добавить задачу</button>
      </div>
      <div className="list-wrapper">
        {allTasks}
      </div>
    </div>
  );
})

export default App;
