
export const domTpl = {
    AddListView({idx, eidx, author, title, tasks = ''}) {
        return `<div class="list-view" data=${idx} data-idx=${eidx}>
        <p class="title"><img class="mg-right-6" src="/images/list_btn.png">${title}</p>
        <ul class="task sub-title font-15">
            ${tasks && tasks.map(element =>
                `<li>${element.title}</li>`
            ).join('')}
        </ul>
        <p class="author sub-title font-14">Added by ${author}</p>
        <button class="card-btn" data=${idx} data-idx=${eidx}><img src="/images/close_btn.png"></button>
        </div>`
    }
    ,
    InitListView({ id, author, name, data }, idx) {
        return `
        <div class="card" data=${idx}>

        <div class="card-header">
            <span class="card-count bold" data=${id}>${data.length}</span>
            <span class="title bold">${name}</span>
                <button class="card-btn htop-add">
                <img class="card-plus" data=${id} src="/images/plus_btn.png">
                </button>
                <button class="card-btn htop">
                <img class="card-remove" data=${id} src="/images/close_btn.png">
                </button>
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
            <div class="list-view-wrapper" data=${idx}>
            ${data.map((element, eidx) =>
            `<div class="list-view" data=${idx} data-idx=${eidx}>
                <p class="title"><img class="mg-right-6" src="/images/list_btn.png">${element.title}</p>
                <ul class="task sub-title font-15">
                ${element.tasks && element.tasks.map(element =>
                    `<li>${element.title}</li>`
                ).join('')} 
                </ul>
                    <p class="author sub-title font-14">Added by ${author}</p>
                    <button class="card-btn" data=${idx} data-idx=${eidx}><img src="/images/close_btn.png"></button>
                    </div>`
        ).join('')}
            </div>
            </div>
            </div>
        `
    }
};