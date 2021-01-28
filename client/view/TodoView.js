import ColumnView from "./ColumnView";

class TodoView {
    constructor() {
        this.render = this.render.bind(this);
    }

    init() {
    }

    renderAddColumnElement() {
        const addColumnEle = document.createElement('div');
        addColumnEle.innerText = 'Click to add column.';
        addColumnEle.className = 'add-column';
        document.querySelector('.container').appendChild(addColumnEle);
    }

    render(data) {
        const container = document.querySelector('.container');
        container.innerHTML = '';
        data.forEach((data)=>{
            const columnView = new ColumnView(data);
            columnView.init();
        })
        this.renderAddColumnElement();
    }
}

export default TodoView;