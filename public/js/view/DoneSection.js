import { createElementFromHTML } from "../util.js";
function initDoneSection() {
    const container = document.querySelector("#container");
    const doneSection = createElementFromHTML(`<div id="done-section" class="section">
        다했어
        <button id="add-btn">+</button>
        <div id="done-list"></div>
    </div>`);
    container.appendChild(doneSection);

}
export{initDoneSection};