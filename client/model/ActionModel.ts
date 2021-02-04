import Observable from "../utils/Observable";
import { ActionData } from "../utils/types";

class ActionModel extends Observable{
    data: ActionData[];
    constructor() {
        super();
        this.data = [];
    }
    init() {
    }
    addActionHistory(contentHtml: string) {
        this.data = [...this.data, {contentHtml, timestamp: Date.now()}];
        this.notify(this.data);
    }
}

export default ActionModel;