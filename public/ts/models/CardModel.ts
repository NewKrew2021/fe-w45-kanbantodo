import {Observable} from "../common";
import {URL} from "../utils/url"

class CardModel extends Observable {
  inputValue: string;
  isDisplay: boolean;
  cards: Array<any>;
  notify: any;
  constructor() {
    super();
    this.inputValue = "";
    this.isDisplay = false;
    this.cards = [];
  }
  displayInputWindow(element:Element) {
    this.isDisplay = true;
    this.notify(element);
  }
  cancelBtn(element:Element){
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

  async putCardData(todoTitle:string, newCard:string) {
    try {
      const res = await fetch( URL + `/cards?todoTitle=${todoTitle}&cardTitle=${newCard}`, {
        method: "PUT",
      });
      const data = await res.json();
      this.saveCard(data);
    } catch(err) {
      throw err;
    }
  }

  async deleteCardData(todoTitle:string, newCard:string) {
    try {
      const res = await fetch( URL + `/cards?todoTitle=${todoTitle}&cardTitle=${newCard}`, {
        method: "DELETE",
      });
      const data = await res.json();
      this.saveCard(data);
    } catch(err) {
      throw err;
    }
  }

  async getCard() {
    await this.getCardData();
    await this.notify(this.cards);
  }

  async addCards(todoTitle:string, newCard:string) {
    await this.putCardData(todoTitle, newCard);
    await this.notify(this.cards);
  }
  async deleteCard(todoTitle:string, card:string) {
    await this.deleteCardData(todoTitle, card)
    await this.notify(this.cards);
  }
  async moveCards(prevTitle:string, curTitle:string, card:string){
    await this.deleteCardData(prevTitle, card);
    await this.putCardData(curTitle, card);
    await this.notify(this.cards);
  }

  saveCard(data:Array<any>){
    this.cards = data;
  }

}

export {CardModel};