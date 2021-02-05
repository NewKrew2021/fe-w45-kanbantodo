import { ILog } from "@public/js/variables/interface";
import { TODO_API_HOST, LOG_TYPE } from "@public/js/variables/config";

class PopUpMenuModel {
  logList: ILog[];

  constructor() {
    this.logList = [];
  }

  async getLogData() {
    let res = await fetch(TODO_API_HOST);
    return await res.json();
  }

  async addLog(logData: object) {
    let res = await this.postLogData(logData);
    let newLog = await res.json();

    this.logList = [...this.logList, newLog];

    return this.logList;
  }

  postLogData(logData: any): any {
    return fetch(TODO_API_HOST, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(logData),
    });
  }

  clusterLogData(logData: ILog[]) {
    return logData.filter((log) => {
      return log.type === LOG_TYPE;
    });
  }

  async initData() {
    let res = await this.getLogData();

    this.logList = this.clusterLogData(res);
    return this.logList;
  }
}

export { PopUpMenuModel };
