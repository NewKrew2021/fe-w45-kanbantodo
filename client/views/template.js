
export const domTpl = {
    AddListView({idx, eidx, author, title, tasks = ''}) {
        return `<div class="list-view" data=${idx} data-idx=${eidx}>
        <p class="title"><img class="mg-right-6" src="/images/list_btn.png">${title}</p>
        <ul class="task sub-title font-15">
            ${tasks && tasks.map(element =>
                `<li>${element.title}</li>`
            ).join('')}
        </ul>
        <p class="author sub-title font-14"><span class="gray">Added by </span>${author}</p>
        <button class="card-btn list-remove" data=${idx} data-idx=${eidx}>&times;</button>
        </div>`
    }
    ,
    InitListView({ id, author, name, data }) {
        return `
        <div class="card" data=${id}>
        <div class="card-header">
            <span class="card-count bold" data=${id}>${data.length}</span>
            <span class="title bold">${name}</span>
                <button class="card-btn htop-add" data=${id}>&#43;</button>
                <button class="card-btn htop" data=${id}>&times;</button>
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
            `<div class="list-view" data=${id} data-idx=${element.id}>
                <p class="title inline-block"><img class="mg-right-6" src="/images/list_btn.png">${element.title}</p>
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
    }
};