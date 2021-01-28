import './normalize.css';
import './index.css';
import TodoController from './controller/TodoController';

function initProject() {
    const todoController = new TodoController();
    todoController.init();
}

initProject();