import {Observable} from "../common.js";
import {URL} from "../utils/url.js"

class InputModel extends Observable {
  constructor() {
    super();
    this.inputValue = "";
    this.isDisplay = false;
    this.cards = [];
  }
  displayInputWindow(displayFunc, element) {
    this.isDisplay = true;
    this.subscribe(displayFunc);
    this.notify(element);
    this.unSubscribe(displayFunc);
  }

  cancelBtn(nonDisplayFunc, element){
    this.isDisplay = false;
    this.subscribe(nonDisplayFunc);
    this.notify(element);
    this.unSubscribe(nonDisplayFunc);
  }

  async getData() {
    const res = await fetch(URL+"/todos");
    const data = await res.json();
    this.saveInput(data);
  }

  async putData() {}
  async deleteData() {}

  addCards(idx, newCard) {
    this.cards[idx].items.push({"title":newCard, author: "kevin"});
    this.notify(this.cards);
  }
  deleteCard(newCard) {
    this.todos = [...this.cards].filter(card => card !== newCard);
    this.notify(this.cards);
  }
  async getInitialData() {
    const res = await fetch(URL+"/todos");
    const data = await res.json();
    this.saveInitCard(data);
  }
  saveInitCard(data){
    this.cards = data;
    this.notify(this.cards);
  }

}

export {InputModel};