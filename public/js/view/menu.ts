export function initMenu(){

    render();
    initEvents();
    //renderList();

}
function initEvents(){
    const menuBtn=document.querySelector("#menu");
    const sideBar=document.querySelector("#side-bar");
    menuBtn.addEventListener("click",()=>{
        const cl=sideBar.classList;
        if(cl.contains("sb-close")){
            cl.add("sb-open");
            cl.remove("sb-close");
        }else if(cl.contains("sb-open")){
            cl.remove("sb-open");
            cl.add("sb-close");
        }
    });
    const closeBtn=sideBar.querySelector("#close-btn");
    closeBtn.addEventListener("click",()=>{
        sideBar.classList.remove("sb-open");
        sideBar.classList.add("sb-close");
    });

}
function render(){
    const sideBar=document.querySelector("#side-bar");
    sideBar.classList.add("sb-close")
    const html=
    `
    <div id="title">
        <span>Menu</span>
        <span id="close-btn">X</span>
    </div>
    <div id="sub">Activity</div>
    <div id="activity-list"></div>
    `;

    sideBar.innerHTML=html;

}