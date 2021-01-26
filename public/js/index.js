import {TodoModel} from "./models/TodoModel.js"
import {TodoView} from "./views/TodoView.js"

window.addEventListener("DOMContentLoaded", () => {
  const todoModel = new TodoModel();
  const todoView = new TodoView();

  const a = (data) => {
    console.log(data);
  } 
  todoModel.subscribe(a);
  todoModel.notify(1);
})
