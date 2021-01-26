export function initHeader() {
    const title="TODO 서비스";

    const header=document.querySelector("header");

    header.innerHTML=`<nav>
        <span id="title">${title}</span>
        <span id="menu">menu</span>
    </nav>`;

}