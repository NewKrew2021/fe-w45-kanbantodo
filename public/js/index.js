import {TodoModel} from "./models/TodoModel.js"
import {TodoView} from "./views/TodoView.js"
import {CardModel} from "./models/CardModel.js"
import {CardView} from "./views/CardView.js"


window.addEventListener("DOMContentLoaded", init)

async function init() {
  const todoModel = new TodoModel();
  const cardModel = new CardModel();
  const todoView =  new TodoView(todoModel);
  const cardView =  new CardView(cardModel);

  todoView.init();
  cardView.init();
}