
class TodoView {
    constructor() {
        this.render = this.render.bind(this);
    }

    init() {
    }

    renderAddColumnElement(columnsContainer: Element) {
        const addColumnEle = document.createElement('div');
        addColumnEle.innerText = 'Click to add column.';
        addColumnEle.className = 'add-column';
        columnsContainer.appendChild(addColumnEle);
    }

    render() {
        const columnsContainer = document.querySelector('.container');
        if(columnsContainer) {
            columnsContainer.innerHTML = '';
            this.renderAddColumnElement(columnsContainer);
        }
    }
}

export default TodoView;