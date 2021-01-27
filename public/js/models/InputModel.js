import {Observable} from "../common.js";

class InputModel extends Observable {
  constructor() {
    super();
    this.element = "";
    this.inputValue = "";
    this.isDisplay = false;
  }
  displayInputWindow(displayFunc, addCard, element) {
    this.isDisplay = true;
    this.subscribe(displayFunc);
    this.notify(element);
    this.unSubscribe(displayFunc);
    this.subscribe(addCard);
  }

  addBtn(element, inputValue){
    this.element = element;
    this.inputValue = inputValue;
    this.notify(this.element, this.inputValue);
  }

  cancelBtn(nonDisplayFunc, addCard, element){
    this.unSubscribe(addCard)
    this.subscribe(nonDisplayFunc);
    this.notify(element);
    this.unSubscribe(nonDisplayFunc);
  }

  async getData() {
    const res = await fetch(URL+"/todos");
    const data = await res.json();
    this.saveInput(data);
  }

  async putData() {

  }

  async deleteData() {
    
  }

  saveInput(todo){
    this.todos = todo;
    // this.notify(this.todos);
  }

}

export {InputModel};