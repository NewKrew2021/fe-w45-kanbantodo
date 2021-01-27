import "./public/stylesheet/style.sass";
import "./public/stylesheet/main.css";
import "./public/stylesheet/normalize.css";

import { TodoController } from "./public/js/controllers/todo.controller";
import { TodoModel } from "./public/js/models/todo.model";
import { TodoView } from "./public/js/views/todo.view";

const TODO = "할 일";
const DONE = "마친 일";

const addButtonEvent = (model, view, controller, status) => {
  view.getNewTodoData(async (cardData) => {
    await model.addCard(cardData);
    controller.notify(model.todoCardList, status);
  });

  view.deleteTodo(async (cardData) => {
    await model.deleteTodo(cardData);
    controller.notify(model.todoCardList, status);
  });
};

document.addEventListener("DOMContentLoaded", async (event) => {
  const todoModel = new TodoModel();
  const todoView = new TodoView(TODO).init();
  const doneView = new TodoView(DONE).init();

  const todoController = new TodoController();

  let todoCardList = await todoModel.initData();

  todoController.subscribe({
    render: todoView.render,
    status: todoView.status,
  });

  todoController.subscribe({
    render: doneView.render,
    status: doneView.status,
  });

  todoController.notify(todoCardList, TODO);
  todoController.notify(todoCardList, DONE);

  todoController.addButtonEvent(todoModel, todoView, TODO);
  todoController.addButtonEvent(todoModel, doneView, DONE);
});
