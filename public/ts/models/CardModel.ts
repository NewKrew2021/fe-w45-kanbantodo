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

  async putCardData(idx:number, newCard:string) {
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

  async deleteCardData(idx:number, newCard:string) {
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

  async getCardInit() {
    await this.getCardData();
    await this.notify(this.cards);
  }

  async addCards(idx:number, newCard:string) {
    await this.putCardData(idx, newCard);
    await this.notify(this.cards);
  }
  async deleteCard(idx:number, card:string) {
    await this.deleteCardData(idx, card)
    await this.notify(this.cards);
  }
  async moveCards(prevIdx:number, curIdx:number, card:string){
    await this.deleteCardData(prevIdx, card);
    await this.putCardData(curIdx, card);
    await this.notify(this.cards);
  }

  saveCard(data:Array<any>){
    this.cards = data;
  }

}

export {CardModel};