import { initHeader } from "./js/view/Header";
import { initKanban } from "./js/view/Kanban";
import { initSearchBar } from "./js/view/SearchBar";
import { initMenu } from "./js/view/menu.ts";
(function initApp() {
    initHeader();
    initMenu();
    initSearchBar();
    initKanban();
})();