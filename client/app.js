import './normalize.css';
import './index.css';
import TodoView from './view/TodoView';

function initProject() {
    new TodoView().init();
}

initProject();