import {Observable} from "../common.js";

class TodoModel extends Observable {
  constructor(initialUrl) {
    super();
    this.todos = [];
    this.url = initialUrl;
  }
  addTodo(todo) {
    this.todos = [...this.todos, todo];
    this.notify(this.todos);
  }
  removeTodo(todo) {
    
  }
  getInitialData() {
    this.saveInitTodo([1, 2, 3, 4]);
    // fetch(this.url)
    // .then(res => res.json())
    // .then(data => this.saveInitTodo(data))
  }
  saveInitTodo(data){
    this.todos = data;
    this.notify(this.todos);
  }

}

export {TodoModel};