import "./public/stylesheet/style.sass";
import "./public/stylesheet/main.css";
import "./public/stylesheet/normalize.css";

import { TodoController } from "./public/js/controllers/todo.controller";
import { TodoModel } from "./public/js/models/todo.model";
import { TodoView } from "./public/js/views/todo.view";

document.addEventListener("DOMContentLoaded", async (event) => {
  const todoModel = new TodoModel("할 일");
  const todoView = new TodoView().init();
  const todoController = new TodoController();

  let cardList = await todoModel.initData();

  todoController.subscribe({
    render: todoView.render,
  });
  todoController.notify(cardList, "할 일");
});
