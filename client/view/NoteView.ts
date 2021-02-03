import { NoteData } from "../utils/types";

interface NoteView {
    title: string;
    id: string;
}

class NoteView {
    constructor({title, id, data}: NoteData) {
        this.title = title;
        this.id = id;
    }

    render(){
        const innerHtml = `<li class="note" id="${this.id}">
            <div class="title">${this.title}</div>
            <div class="description">Added by nina</div>
            <div class="delete-button">✕</div>
        </li>`;
        return innerHtml;
    }
}

export default NoteView;