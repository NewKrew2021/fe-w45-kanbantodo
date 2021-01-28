import { initHeader } from "./js/view/Header";
import { initKanban } from "./js/view/Kanban";
import { initSearchBar } from "./js/view/SearchBar";
(function initApp() {
    initHeader();
    initSearchBar();
    initKanban();
})();