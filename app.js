import "./public/stylesheet/style.sass";
import "./public/stylesheet/main.css";
import "./public/stylesheet/normalize.css";

import { TodoController } from "./public/js/controllers/todo.controller";
import { TodoModel } from "./public/js/models/todo.model";
import { TodoView } from "./public/js/views/todo.view";

document.addEventListener("DOMContentLoaded", (event) => {
  const todoController = new TodoController();
  const todoModel = new TodoModel("할 일").init();
  const todoView = new TodoView().init();

  todoController.subscribe({
    render: todoView.render,
  });
  todoController.notify(todoModel.cardList, "할 일");
});
