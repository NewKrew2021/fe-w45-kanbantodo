import { initTotoController } from "./js/controller/todoController";
import { initHeader } from "./js/view/Header";
import { initTodoSection } from "./js/view/TodoSection";
import { initDoingSection } from "./js/view/DoingSection";
import { initDoneSection } from "./js/view/DoneSection";
import { initSearchBar } from "./js/view/SearchBar";
(function initApp() {
    initHeader();
    initSearchBar();
    initTodoSection();//view
    initTotoController();//controller
    initDoingSection();
    initDoneSection();
})();