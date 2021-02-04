export interface Subtasks {
    title: string;
    subtasks: Subtasks[];
}

export interface NoteData {
    id: string;
    title: string;
    data: Subtasks[];
}

export interface ColumnData {
    id: string;
    title : string;
    notes: NoteData[];
}

export interface TodoData {
    columns: ColumnData;
}

export interface ActionData {
    contentHtml: string;
    timestamp: number;
}
