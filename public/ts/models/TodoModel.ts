// @ts-ignore next-line
import {Observable} from "../common.ts";
// @ts-ignore next-line
import {URL} from "../utils/url.ts"

class TodoModel extends Observable {
  todos: Array<any>;
  notify: any;
  constructor() {
    super();
    this.todos = [];
  }
  addTodo(newTodo: object) {
    this.todos = [...this.todos, newTodo];
    this.notify(this.todos);
  }
  deleteTodo(newTodo: object) {
    this.todos = [...this.todos].filter(todo => todo !== newTodo);
    this.notify(this.todos);
  }
  async getInitialData() {
    const res = await fetch(URL+"/cards",{
      method: "GET",
    });
    const data = await res.json();
    this.saveInitTodo(data);
  }
  saveInitTodo(todo: Array<any>){
    this.todos = todo;
    this.notify(this.todos);
  }

}

export { TodoModel };