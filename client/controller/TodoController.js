import TodoModel from "../model/TodoModel";
import TodoView from "../view/TodoView";

class TodoController {
    constructor(){
        this.model = new TodoModel();
        this.view = new TodoView();
        this.manageFilter = this.manageFilter.bind(this)
    }
    
    init() {
        this.model.subscribe(async (data) => {
            this.view.render(data);
            this.manageColumnAdd();
            this.manageColumnDelete();
            this.manageFilter();
        });
        this.model.getData();
    }

    manageColumnAdd () {
        const addColumnEle = document.querySelector('.add-column')
        addColumnEle.addEventListener('click', this.model.addColumn);
    }

    manageColumnDelete () {

    }

    manageFilter(){
        console.log('h')
        const filterEle = document.querySelector('.filter-cards > input');
        filterEle.addEventListener('input', this.model.onChangeFilter);
    }
}

export default TodoController;