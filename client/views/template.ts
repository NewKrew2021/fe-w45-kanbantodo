
interface History{
    action: string
    afterTitle: string
    beforeTitle: string
    cardName: string
    writeTime: number
}

interface InitData{
    id : string
    author : string
    name : string
    data : string
}

interface MethodDictionary{
    [index: string] : any
} // Object[key] 형태로 접근 시, 타입스크립트에서는 인덱싱 가능한 타입으로 정의해야 함

export const domTpl : MethodDictionary = {
    NewColumn() : string{
        return `<p>&#43; Add column</p>`
    },
    InitListView({ id, author, name, data } : InitData) {
        return `
        <div class="card droppable" data=${id}>
        <div class="card-header" data=${id} data-idx=-1>
            <span class="card-count bold" data=${id}>${data.length}</span>
            <span class="title bold card-name" data=${id} data-idx=-1>${name}</span>
                <button class="card-btn htop-add" data=${id}>&#43;</button>
                <button class="card-btn htop-remove" data=${id}>&times;</button>
        </div>
        <div class="list-wrapper" data=${id}>
            <div class="input-list-view none" data=${id}>
                <div class="list-input-wrapper">
                    <textarea class="list-input" data=${id} type="text" maxlength="500"
                        placeholder="Enter a note"></textarea>
                 </div>
                <button class="btn-add-list" data=${id}>Add</button>
                <button class="btn-cancel-list" data=${id}>Cancel</button>
            </div>
            <div class="list-view-wrapper" data=${id}>
            ${data.map((element) =>
            `<div class="list-view droppable" data=${id} data-idx=${element.id}>
                <p class="title list-title inline-block" data=${id} data-idx=${element.id}><img class="mg-right-6" src="/images/list_btn.png">${element.title}</p>
                <ul class="task sub-title font-15">
                ${element.tasks && element.tasks.map(element =>
                `<li>${element.title}</li>`
            ).join('')} 
                </ul>
                    <p class="author sub-title font-14"><span class="gray">Added by</span> ${author}</p>
                    <button class="card-btn list-remove" data=${id} data-idx=${element.id}>&times;</button>
                    </div>`
        ).join('')}
            </div>
            </div>
            </div>
        `
    },
    ADD_CARD({ action, afterTitle, beforeTitle, cardName, writeTime } : History) {
        return `<img class="profile" src="images/jackson.png">
        <p class="menu-text history"><span class="menu-accent">${cardName}</span> 카드를 만들었습니다.</p>
        <p class="menu-text time">${writeTime}</p>
        `
    },
    REMOVE_CARD({ action, afterTitle, beforeTitle, cardName, writeTime } : History) {
        return `<img class="profile" src="images/jackson.png">
        <p class="menu-text history"><span class="menu-accent">${cardName}</span> 카드를 <span class="red">삭제</span>하였습니다.</p>
        <p class="menu-text time">${writeTime}</p>
        `
    },
    ADD_NOTE({ action, afterTitle, beforeTitle, cardName, writeTime } : History) {
        return `<img class="profile" src="images/jackson.png">
        <p class="menu-text history"><span class="menu-accent">${afterTitle}</span> 노트를 <span class="menu-accent">${cardName}</span> 카드에 추가하였습니다.</p>
        <p class="menu-text time">${writeTime}</p>
        `
    },
    REMOVE_NOTE({ action, afterTitle, beforeTitle, cardName, writeTime } : History) {
        return `<img class="profile" src="images/jackson.png">
        <p class="menu-text history"><span class="menu-accent">${afterTitle}</span> 노트를 <span class="menu-accent">${cardName}</span> 카드에서 <span class="red">삭제</span>하였습니다.</p>
        <p class="menu-text time">${writeTime}</p>
        `
    },
    EDIT_CARD({ action, afterTitle, beforeTitle, cardName, writeTime } : History) {
        return `<img class="profile" src="images/jackson.png">
        <p class="menu-text history"><span class="menu-accent">${cardName}</span> 카드의 제목을 <span class="menu-accent">${afterTitle}</span>(으)로 변경하였습니다.</p>
        <p class="menu-text time">${writeTime}</p>
        `
    },
    EDIT_NOTE({ action, afterTitle, beforeTitle, cardName, writeTime } : History) {
        return `<img class="profile" src="images/jackson.png">
        <p class="menu-text history"><span>${cardName}</span> 카드의 <span class="menu-accent">${beforeTitle}</span> 노트를 <span class="menu-accent">${afterTitle}</span>(으)로 변경하였습니다.</p>
        <p class="menu-text time">${writeTime}</p>
        `
    }
};