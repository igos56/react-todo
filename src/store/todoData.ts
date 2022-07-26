import { makeAutoObservable } from "mobx";
import { ITask } from "../types/ITask";

class todoData {
  itemsList = [
    {id: 1, task: "Покормить кота", isCompleted: true},
    {id: 2, task: "Погулять с собакой", isCompleted: false},
    {id: 3, task: "Приготовить  обед", isCompleted: true},
    {id: 4, task: "Поспать", isCompleted: false},
  ];

  newContent = "";

  all = true;
  completed = false;
  current = false;

  constructor() {
    makeAutoObservable(this);
  }

  handleFilter(nameFilter: string) {
    this.all = false;
    this.completed = false;
    this.current = false;
    
    switch (nameFilter) {
      case "all" :
        this.all = !this.all;
        break;
      case "completed" :
        this.completed = !this.completed;
        break;
      case "current" :
        this.current = !this.current;
        break;
      default:
        console.log("Возникла ошибка!");
    }
  }

  addTask(taskContent: string) {
    const itemsId = this.itemsList.map(item => item.id);
    const maxId = Math.max(...itemsId);
  
    const newTask = {
      id: maxId + 1,
      task: taskContent,
      isCompleted: false
    };

    this.itemsList.push(newTask);
  }

  setNewContent(content: string) {
    this.newContent = content;
  }

  clearInput() {
    this.newContent = "";
  }

  deleteTask(id: number) {;
    this.itemsList = this.itemsList.filter(item => item.id !== id);
  }

  handleChecked(task: ITask) {
    task.isCompleted = !task.isCompleted;
  }
};

export default new todoData();