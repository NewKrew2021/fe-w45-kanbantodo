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
  async getInitialData() {
    const res = await fetch(URL+"/todos");
    const data = await res.json();
    this.saveInitTodo(data);
  }
  saveInitTodo(todo){
    this.todos = todo;
    this.notify(this.todos);
  }

}

export {TodoModel};