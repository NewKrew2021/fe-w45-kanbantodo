import {TodoModel} from "./models/TodoModel.js"
import {TodoView, createTodoBoard} from "./views/TodoView.js"

window.addEventListener("DOMContentLoaded", () => {
  const todoModel = new TodoModel();
  const todoView = new TodoView();
  todoModel.subscribe(createTodoBoard);
  todoModel.getInitialData();
})
