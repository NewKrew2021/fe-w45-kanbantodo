import ColumnModel from "../model/ColumnModel";
import ColumnView from "../view/ColumnView";
import ColumnController from '../controller/ColumnController';

class TodoController {
    constructor(view, model){
        this.view = view;
        this.model = model;
    }
    
    init() {
        this.model.subscribe((data) => {
            this.view.render(data);
            const addColumnEle = document.querySelector('.add-column')
            const filterEle = document.querySelector('.filter-cards > input');
            filterEle.addEventListener('input', this.model.onChangeFilter);
            addColumnEle.addEventListener('click', this.model.showAddColumnModal);
        });
        // 하위 모델이 상위 모델을 subscribe 한다.
        this.model.subscribe((data) => {
            data.forEach((colData) => {
                const columnView = new ColumnView();
                const columnModel = new ColumnModel(colData);
                const columnController = new ColumnController(columnView, columnModel);
                columnController.init();
                columnModel.notify(colData);

                const columnEle = document.getElementById(colData.id);
                const columnDeleteButton = columnEle.querySelector('.column__header__buttons > .remove-button')
                
                columnDeleteButton.addEventListener('click', this.model.showDeleteColumnModal);
            });
        })
        this.model.getData();
    }
}

export default TodoController;