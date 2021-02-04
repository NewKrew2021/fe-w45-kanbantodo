export interface Input{
    input:{
        title : string
    }
}
export interface HistoryState {
    action: string
    afterTitle: string
    beforeTitle: string
    cardName: string
    writeTime: number
}
export interface NewCardState{
    id: string,
    name: string,
    author: string
}
export interface NewNoteState{
    cardId: string
    listId: string
    title: string
}
export interface ModalState {
    cardId: string
    id: string
}
export interface MovedData{
    id: string
    title: string
    tasks: Array<any>
}
export interface InitData{
    id : string
    author : string
    name : string
    data : Array<any>
}
export interface Droppable{
    elem : Element
    elemBelow : Element
    copiedNode : Element
}
export interface ObjIndex{
    [index: number]: any
}