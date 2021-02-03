/*

  common types

*/

interface id {
  id: string
}

interface _id {
  _id: string
}

interface title {
  title: string
}

/*

  types for rendering

*/

export interface KanbanData extends id {}

export interface ColumnData extends id, title {}

export interface NoteData extends id, title {}

export interface TaskData extends id, title {}

/*

  types for fetched data

*/

export interface KanbanFetchedData extends _id {
  columns: Array<ColumnFetchedData>
}

export interface ColumnFetchedData extends _id, title {
  notes: Array<NoteFetchedData>
}

export interface NoteFetchedData extends _id, title {
  tasks: Array<TaskFetchedData>
}

export interface TaskFetchedData extends _id, title {
  tasks: Array<TaskFetchedData>
}
