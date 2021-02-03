/*
    util.ts
    js -> typescript로 정의(완료)
*/

function addHTML(node : HTMLElement, text : string) {
    node.innerHTML += text;
}
function html(node : HTMLElement, text : string) {
    node.innerHTML = text;
}
function create({type, className} : {type : string, className : Array<string>}){
    const res = document.createElement(type);
    res.classList.add(...className);
    return res;
}
function addClass({nodeList, className} : {nodeList : Array<HTMLElement>, className : string}){
    nodeList.forEach(element =>{
        element.classList.add(className);
    })
}
function removeClass({nodeList, className} : {nodeList : Array<HTMLElement>, className : string}){
    nodeList.forEach(element => {
        element.classList.remove(className);
    });
}

function getCardName({cardId} : {cardId : string}): string{
    const cardname = queryAll('.card-name');
    let result : string | null = '';
    cardname.forEach((element : Element) => {
        if (element.getAttribute('data') === cardId){
            result = element.textContent;
        }
    });
    return result;
}
function getNoteTitle({cardId, id} : {cardId : string, id : string}) : string{
    let result : string | null = '';
    const noteTitle = queryAll('.list-title');
    noteTitle.forEach((element : Element)=>{
        if (element.getAttribute('data') === cardId && 
                element.getAttribute('data-idx') === id){
            result = element.textContent;
        }
    })
    return result;
}

function dfs_q(node : Element, target : string): any{
    let returnVal = undefined;
    /* dfs 탐색 */
    for (let element of node.children) {
        if (element.matches(target))
            return element;
        if (element.hasChildNodes()) {
            let result = dfs_q(element, target);
            if (result !== undefined)  /* 찾았을 경우 */
                returnVal = result;
        }
    }
    return returnVal;
}

function dfs_q_all(nodeList : Array<Element>, node : Element, target : string){
    for (let element of node.children) {
        if (element.matches(target))
            nodeList.push(element);
        if (element.hasChildNodes())
            dfs_q_all(nodeList, element, target);
    }
    return nodeList;
}

function query(target : string) {
    return dfs_q(document.body, target)
}
function queryAll(target : string) {
    return dfs_q_all([], document.body, target)
}

export { addHTML, html, create, getCardName, getNoteTitle,
    addClass, removeClass, query, queryAll};