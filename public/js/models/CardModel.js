import {Observable} from "../common.js";
import {URL} from "../utils/url.js"

class CardModel extends Observable {
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

  async getCardData() {
    const res = await fetch(URL+"/cards",{
      method: "GET",
    });
    const data = await res.json();
    this.saveCard(data);
  }

  async putCardData(idx, newCard) {
    const res = await fetch( URL + `/cards?id=${idx+1}&title=${newCard}`, {
      method: "PUT",
    });
    const data = await res.json();
    this.saveCard(data);
  }

  async deleteCardData(idx, newCard) {
    const res = await fetch( URL + `/cards?id=${idx+1}&title=${newCard}`, {
      method: "DELETE",
    });
    const data = await res.json();
    this.saveCard(data);
  }

  async getCardInit() {
    await this.getCardData();
    await this.notify(this.cards);
  }

  async addCards(idx, newCard) {
    await this.putCardData(idx, newCard);
    await this.notify(this.cards);
  }
  async deleteCard(idx, card) {
    await this.deleteCardData(idx, card)
    await this.notify(this.cards);
  }
  async moveCards(prevIdx, curIdx, card){
    await this.deleteCardData(prevIdx, card);
    await this.putCardData(curIdx, card);
    console.log(this.cards);
    await this.notify(this.cards);
  }

  saveCard(data){
    this.cards = data;
  }

}

export {CardModel};