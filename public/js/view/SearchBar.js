import { createElementFromHTML } from "../util.js";
export function initSearchBar(){
    const section=document.querySelector("#search-bar-section");
    const searchBarSectionHTML=
    `<div>
        <input placeholder="Filter cards"></input>
    </div>`;

    const searchBar=createElementFromHTML(searchBarSectionHTML);
    section.appendChild(searchBar);


}