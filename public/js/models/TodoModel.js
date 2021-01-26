import {Observable} from "../common.js";

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
    this.saveInitTodo(["해야할일", "하는중", "다했어"]);
    // fetch(this.url)
    // .then(res => res.json())
    // .then(data => this.saveInitTodo(data))
    
  }
  saveInitTodo(todo){
    this.todos = todo;
    this.notify(this.todos);
  }

}

export {TodoModel};