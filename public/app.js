import { initHeader } from "./js/view/Header";
import { initKanban } from "./js/view/Kanban";
import { initSearchBar } from "./js/view/SearchBar";
import { initActivity } from "./js/view/SideBar.ts";
(function initApp() {
    initHeader();
    initActivity();
    initSearchBar();
    initKanban();
})();