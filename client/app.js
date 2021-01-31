import './normalize.css';
import './index.css';
import TodoController from './controller/TodoController';
import TodoModel from './model/TodoModel';
import TodoView from './view/TodoView';

function initProject() {
    const todoModel = new TodoModel();
    const todoView = new TodoView();
    const todoController = new TodoController(todoView, todoModel);
    todoController.init();
}

initProject();