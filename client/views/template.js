
export const domTpl = {
    NewColumn() {
        return `<p>&#43; Add column</p>`
    },
    InitListView({ id, author, name, data }) {
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
    ADD_CARD({ action, afterTitle, beforeTitle, cardName, writeTime }) {
        return `<div class="menu-item relative"><img class="profile" src="images/jackson.png">
        <p class="menu-text history">Add <span class="menu-accent">${cardName}</span> card</p>
        <p class="menu-text time">${writeTime} seconds ago</p>
        </div>`
    },
    REMOVE_CARD({ action, afterTitle, beforeTitle, cardName, writeTime }) {
        return `<div class="menu-item relative"><img class="profile" src="images/jackson.png">
        <p class="menu-text history">Remove <span class="menu-accent">${cardName}</span> card</p>
        <p class="menu-text time">${writeTime} seconds ago</p>
        </div>`
    },
    ADD_NOTE({ action, afterTitle, beforeTitle, cardName, writeTime }) {
        return `<div class="menu-item relative"><img class="profile" src="images/jackson.png">
        <p class="menu-text history">Add <span class="menu-accent">${afterTitle}</span> to <span class="menu-accent">${cardName}</span> card</p>
        <p class="menu-text time">${writeTime} seconds ago</p>
        </div>`
    },
    REMOVE_NOTE({ action, afterTitle, beforeTitle, cardName, writeTime }) {
        return `<div class="menu-item relative"><img class="profile" src="images/jackson.png">
        <p class="menu-text history">Remove <span class="menu-accent">${afterTitle}</span> from <span class="menu-accent">${cardName}</span> card</p>
        <p class="menu-text time">${writeTime} seconds ago</p>
        </div>`
    },
    EDIT_CARD({ action, afterTitle, beforeTitle, cardName, writeTime }) {
        return `<div class="menu-item relative"><img class="profile" src="images/jackson.png">
        <p class="menu-text history">Edit title : <span class="menu-accent">${cardName}</span> card &#8594; <span class="menu-accent">${afterTitle}</span> card</p>
        <p class="menu-text time">${writeTime} seconds ago</p>
        </div>`
    },
    EDIT_NOTE({ action, afterTitle, beforeTitle, cardName, writeTime }) {
        return `<div class="menu-item relative"><img class="profile" src="images/jackson.png">
        <p class="menu-text history">Edit title : <span>${cardName}</span>><span class="menu-accent">${beforeTitle}</span> &#8594; <span class="menu-accent">${afterTitle}</span></p>
        <p class="menu-text time">${writeTime}초 전</p>
        </div>`
    }
};