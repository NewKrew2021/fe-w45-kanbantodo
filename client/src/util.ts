/*
    util.js
*/

function addHTML(node, text) {
    node.innerHTML += text;
}
function html(node, text) {
    node.innerHTML = text;
}
function create({type, className}){
    const res = document.createElement(type);
    res.classList.add(...className);
    return res;
}
function getAttr({nodeList, attr}){
    return nodeList.getAttribute(attr);
}

function addClass({nodeList, className}){
    nodeList.forEach(element =>{
        element.classList.add(className);
    })
}
function removeClass({nodeList, className}){
    nodeList.forEach(element => {
        element.classList.remove(className);
    });
}

function getCardName({cardId}){
    const cardname = queryAll('.card-name');
    let result = '';
    cardname.forEach(element => {
        if (element.getAttribute('data') === cardId){
            result = element.textContent;
        }
    });
    return result;
}
function getNoteTitle({cardId, id}){
    const noteTitle = queryAll('.list-title');
    let result = '';
    noteTitle.forEach(element=>{
        if (element.getAttribute('data-idx') === id){
            result = element.textContent;
        }
    }) 
    return result;
}

function dfs_q(node, target) {
    let returnVal;
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

function dfs_q_all(nodeList, node, target){
    for (let element of node.children) {
        if (element.matches(target))
            nodeList.push(element);
        if (element.hasChildNodes())
            dfs_q_all(nodeList, element, target);
    }
    return nodeList;
}

function query(target) {
    return dfs_q(document.body, target)
}
function queryAll(target) {
    return dfs_q_all([], document.body, target)
}

export { addHTML, html, create, getAttr, getCardName, getNoteTitle,
    addClass, removeClass, query, queryAll};