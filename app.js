import "./public/stylesheet/style.sass";
import "./public/stylesheet/main.css";
import "./public/stylesheet/normalize.css";

import { TodoController } from "./public/js/controllers/todo.controller";
import { TodoModel } from "./public/js/models/todo.model";
import { TodoView } from "./public/js/views/todo.view";

const TODO = "할 일";
const DONE = "마친 일";

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

  todoView.getNewTodoData(async (cardData) => {
    await todoModel.addCard(cardData);
    todoController.notify(todoModel.todoCardList, TODO);
  });

  doneView.getNewTodoData(async (cardData) => {
    await todoModel.addCard(cardData);
    todoController.notify(todoModel.todoCardList, DONE);
  });

  todoView.deleteTodo(async (cardData) => {
    await todoModel.deleteTodo(cardData);
    todoController.notify(todoModel.todoCardList, TODO);
  });

  doneView.deleteTodo(async (cardData) => {
    await todoModel.deleteTodo(cardData);
    todoController.notify(todoModel.todoCardList, DONE);
  });
});
