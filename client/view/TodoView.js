import ColumnView from "./ColumnView";

const { default: API } = require("../utils/api");

class TodoView {
    constructor() {
    }

    async init() {
        const colData = await API.getTodoData();
        colData.data.forEach((data)=>{
            const columnView = new ColumnView(data);
            columnView.init();
        })
    }
    
    async getData() {
    }


}

export default TodoView;