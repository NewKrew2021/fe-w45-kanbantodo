import {Observable} from "../common.js";
import {URL} from "../utils/url.js"

class TodoModel extends Observable {
  constructor() {
    super();
    this.todos = [];
  }
  addTodo(newTodo) {
    this.todos = [...this.todos, newTodo];
    this.notify(this.todos);
  }
  deleteTodo(newTodo) {
    this.todos = [...this.todos].filter(todo => todo !== newTodo);
    this.notify(this.todos);
  }
  getInitialData() {
    fetch(URL+"/todos")
    .then(res => res.json())
    .then(data => this.saveInitTodo(data))
  }
  saveInitTodo(todo){
    this.todos = todo;
    this.notify(this.todos);
  }

}

export {TodoModel};