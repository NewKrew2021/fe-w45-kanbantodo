// @ts-nocheck
import {TodoModel} from "./models/TodoModel.ts"
import {TodoView} from "./views/TodoView.ts"
import {CardModel} from "./models/CardModel.ts"
import {CardView} from "./views/CardView.ts"
import {ActivityModel} from "./models/ActivityModel.ts"
import {ActivityView} from "./views/ActivityView.ts"


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