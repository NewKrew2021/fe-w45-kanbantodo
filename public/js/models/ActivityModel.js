import {Observable} from "../common.js";
import {URL} from "../utils/url.js"

class ActivityModel extends Observable {
  constructor() {
    super();
    this.activities = [];
  }
  addActivity(newActivity) {
    this.activities = [...this.activities, newActivity];
    this.notify(this.activities);
  }
  async getData() {
    const res = await fetch(URL+"/activity",{
      method: "GET",
    });
    const data = await res.json();
    this.saveInitActivity(data);
  }
  saveInitActivity(activity){
    this.activities = activity;
    this.notify(this.activities);
  }
}

export {ActivityModel};