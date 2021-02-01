import {Observable} from "../common.js";
import {URL} from "../utils/url.js"

class CardModel extends Observable {
  constructor() {
    super();
    this.inputValue = "";
    this.isDisplay = false;
    this.cards = [];
  }
  displayInputWindow(element) {
    this.isDisplay = true;
    this.notify(element);
  }

  cancelBtn(element){
    this.isDisplay = false;
    this.notify(element);
  }

  async getCardData() {
    try {
      const res = await fetch(URL+"/cards",{
        method: "GET",
      });
      const data = await res.json();
      this.saveCard(data);
    } catch(err) {
      throw err;
    }
  }

  async putCardData(idx, newCard) {
    try {
      const res = await fetch( URL + `/cards?id=${idx+1}&title=${newCard}`, {
        method: "PUT",
      });
      const data = await res.json();
      this.saveCard(data);
    } catch(err) {
      throw err;
    }
  }

  async deleteCardData(idx, newCard) {
    try {
      const res = await fetch( URL + `/cards?id=${idx+1}&title=${newCard}`, {
        method: "DELETE",
      });
      const data = await res.json();
      this.saveCard(data);
    } catch(err) {
      throw err;
    }
  }

  async putActivity(type, from, to, text, author, time) {
    try{
      const res = await fetch( URL + `/activity?type=${type}&from=${from}&to=${to}&text=${text}&author=${author}&time=${time}`, {
        method: "PUT",
      });
      const data = await res.json();
      // Activity
    } catch(err) {
      throw err;
    }

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
    await this.notify(this.cards);
  }

  saveCard(data){
    this.cards = data;
  }

}

export {CardModel};