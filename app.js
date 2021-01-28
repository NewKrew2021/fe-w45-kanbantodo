import "./public/stylesheet/style.sass";
import "./public/stylesheet/main.css";
import "./public/stylesheet/normalize.css";

import { TodoController } from "./public/js/controllers/todo.controller";
import { TodoModel } from "./public/js/models/todo.model";
import { TodoView } from "./public/js/views/todo.view";
import { PopUpView } from "./public/js/views/pop-up.view";

document.addEventListener("DOMContentLoaded", async (event) => {
  const todoController = new TodoController();

  const todoModel = new TodoModel();
  const todoCardList = await todoModel.initData();

  const popUpView = new PopUpView();
  popUpView.render();

  todoController.init(todoCardList, TodoView, todoModel, popUpView.handlePopUpEvent);
});
