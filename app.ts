import "./public/stylesheet/style.sass";
import "./public/stylesheet/main";
import "./public/stylesheet/normalize";

import { TodoController } from "@public/js/controllers/todo.controller";
import { TodoModel } from "@public/js/models/todo.model";
import { TodoView } from "@public/js/views/todo.view";
import { PopUpView } from "@public/js/views/pop-up.view";
import { PopUpMenuView } from "@public/js/views/pop-up-menu.view";
import { PopUpMenuModel } from "@public/js/models/pop-up-menu.model";

document.addEventListener("DOMContentLoaded", async (event) => {
  const popUpMenuView = new PopUpMenuView().init();
  const popUpMenuModel = new PopUpMenuModel();

  const todoController = new TodoController(popUpMenuView);

  const todoModel = new TodoModel();
  const todoCardList = await todoModel.initData();

  const popUpView = new PopUpView();

  popUpView.render();

  todoController.init(todoCardList, TodoView, todoModel, popUpMenuModel);
});
