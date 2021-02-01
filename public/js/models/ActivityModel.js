import {Observable} from "../common.js";
import {URL} from "../utils/url.js"

class ActivityModel extends Observable {
  constructor() {
    super();
    this.activities = [];
  }
  
  async getData() {
    const res = await fetch(URL+"/activity",{
      method: "GET",
    });
    const data = await res.json();
    this.saveInitActivity(data);
  }

  async putActivity(type, from, to, text, author, time) {
    try{
      const res = await fetch( URL + `/activity?type=${type}&from=${from}&to=${to}&text=${text}&author=${author}&time=${time}`, {
        method: "PUT",
      });
      const data = await res.json();
      return data;
    } catch(err) {
      throw err;
    }
  }

  async deleteActivity() {
    try{
      const res = await fetch( URL + `/activity`, {
        method: "DELETE",
      });
      const data = await res.json();
      return data;
    } catch(err) {
      throw err;
    }
  }

  addActivity(type, from, to, text, author, time) {
    this.putActivity(type, from, to, text, author, time)
    .then( data => {
      this.activities = data;
      this.notify(this.activities);
    })
  }

  clearActivity(){
    this.deleteActivity()
    .then( data => {
      this.activities = data;
      this.notify(this.activities);
    })
  }

  saveInitActivity(activity){
    this.activities = activity;
    this.notify(this.activities);
  }
}

export {ActivityModel};