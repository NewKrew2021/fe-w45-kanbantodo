class NoteView {
    constructor({title, id, data}) {
        this.title = title;
        this.id = id;
    }

    render(){
        const innerHtml = `<li class="note" id="${this.id}">
            <div class="title">${this.title}</div>
            <div class="description">2</div>
            <div class="delete-button">✕</div>
        </li>`;
        return innerHtml;
    }
}

export default NoteView;