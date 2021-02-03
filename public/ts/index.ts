import {TodoModel} from "./models/TodoModel"
import {TodoView} from "./views/TodoView"
import {CardModel} from "./models/CardModel"
import {CardView} from "./views/CardView"
import {ActivityModel} from "./models/ActivityModel"
import {ActivityView} from "./views/ActivityView"


window.addEventListener("DOMContentLoaded", init)

async function init() {
  const todoModel = new TodoModel();
  const cardModel = new CardModel();
  const activityModel = new ActivityModel();
  const todoView =  new TodoView(todoModel);
  const cardView =  new CardView(cardModel, activityModel);
  const activityView = new ActivityView(activityModel);

  todoView.init();
  cardView.init();
  activityView.init();
}