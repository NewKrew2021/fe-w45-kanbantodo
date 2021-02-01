import "./public/stylesheet/style.sass";
import "./public/stylesheet/main";
import "./public/stylesheet/normalize";

import { TodoController } from "./public/js/controllers/todo.controller";
import { TodoModel } from "./public/js/models/todo.model";
import { TodoView } from "./public/js/views/todo.view";
import { PopUpView } from "./public/js/views/pop-up.view";
import { PopUpMenuView } from "./public/js/views/pop-up-menu.view"

document.addEventListener("DOMContentLoaded", async (event) => {
  const todoController = new TodoController();

  const todoModel = new TodoModel();
  const todoCardList = await todoModel.initData();

  const popUpView = new PopUpView();
  const popUpMenuView = new PopUpMenuView().init();
  
  popUpView.render();

  todoController.init(todoCardList, TodoView, todoModel);
});
