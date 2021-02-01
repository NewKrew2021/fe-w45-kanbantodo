import {TodoModel} from "./models/TodoModel.js"
import {TodoView} from "./views/TodoView.js"
import {CardModel} from "./models/CardModel.js"
import {CardView} from "./views/CardView.js"
import {ActivityModel} from "./models/ActivityModel.js"
import {ActivityView} from "./views/ActivityView.js"


window.addEventListener("DOMContentLoaded", init)

async function init() {
  const todoModel = new TodoModel();
  const cardModel = new CardModel();
  const activityModel = new ActivityModel();
  const todoView =  new TodoView(todoModel);
  const cardView =  new CardView(cardModel);
  const activityView = new ActivityView(activityModel);

  todoView.init();
  cardView.init();
  activityView.init();
}