import { initTotoController } from "./js/controller/todoController";
import { initHeader } from "./js/view/Header";
import { initTodoSection } from "./js/view/TodoSection";
(function initApp() {
    initHeader();
    initTodoSection();//view
    initTotoController();//controller
})();