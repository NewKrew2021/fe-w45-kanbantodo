import {Observable} from "../common";
import {URL} from "../utils/url"

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
    this.saveTodo(data);
  }

  async modifyTodoTitle( prevTitle:string, curTitle:string) {
    const res = await fetch(URL+`/todos?prevTitle=${prevTitle}&curTitle=${curTitle}`, {
      method: "POST",
    })
    const data = await res.json();
    this.saveTodo(data);
    return data;
  }

  saveTodo(todo: Array<any>){
    this.todos = todo;
    this.notify(this.todos);
  }
}

export { TodoModel };