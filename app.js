import "./public/stylesheet/style.sass";
import "./public/stylesheet/main.css";
import "./public/stylesheet/normalize.css";

import { TodoController } from "./public/js/controllers/todo.controller";
import { TodoModel } from "./public/js/models/todo.model";
import { TodoView } from "./public/js/views/todo.view";

document.addEventListener("DOMContentLoaded", async (event) => {
  const todoModel = new TodoModel();
  const todoView = new TodoView("할 일").init();
  const todoController = new TodoController();

  let todoCardList = await todoModel.initData();

  todoController.subscribe({
    render: todoView.render,
  });

  todoController.notify(todoCardList, "할 일");

  todoView.getNewTodoData(async (cardData) => {
    await todoModel.addCard(cardData);
    todoController.notify(todoModel.todoCardList, "할 일");
  });

  todoView.deleteTodo(async (cardData) => {
    await todoModel.deleteTodo(cardData);
    todoController.notify(todoModel.todoCardList, "할 일");
  });
});
