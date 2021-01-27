import {TodoModel} from "./models/TodoModel.js"
import {TodoView} from "./views/TodoView.js"
import {InputModel} from "./models/InputModel.js"
import {InputView} from "./views/InputView.js"

window.addEventListener("DOMContentLoaded", init)

async function init() {
  const todoModel = new TodoModel();
  const inputModel = new InputModel();
  const todoView =  new TodoView(todoModel);
  const inputView =  new InputView(inputModel);

  
  todoView.init(inputView);
  inputView.init();
  
}