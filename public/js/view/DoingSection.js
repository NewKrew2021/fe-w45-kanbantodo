import { createElementFromHTML } from "../util.js";
function initDoingSection() {
    const container = document.querySelector("#container");
    const todoSection = createElementFromHTML(`<div id="doing-section" class="section">
        하는 중
        <button id="add-btn">+</button>
        <div id="doing-list"></div>
    </div>`);
    container.appendChild(todoSection);

}
export{initDoingSection};