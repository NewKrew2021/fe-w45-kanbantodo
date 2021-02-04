/*
    ListView.ts : card에 존재하는 여러 개의 아이템들에 대한 뷰
*/
import { domTpl } from 'client/views/template';
import * as dom from 'client/src/util';
import TodoModel from 'client/models/TodoModel';
import { InitData, ObjIndex, Droppable, MovedData } from 'client/src/interface'

/* TodoModel을 구독하는 Observer */
class ListView {
    model: TodoModel
    cardsTitle: Array<Element>
    onMouseMoveHandler: any
    curTarget: any
    copiedNode: any
    constructor(model: TodoModel) {
        this.cardsTitle = dom.queryAll('.list-title')
        this.onMouseMoveHandler;
        this.curTarget;
        this.copiedNode;
        this.model = model; // 생성 시 구독할 model(여기서는 TodoModel)을 주입받고 구독한다.
        this.model.subscribe(this.update.bind(this))
    }

    // 이벤트 등록
    onEvents() {
        this.render();
        this.dragAndDrop();
        this.findListView();
    }

    update() {
        this.onEvents();
    }
    init() {
        this.onEvents();
    }

    // template로 초기 html 넣기
    async render() {
        const data: Array<Array<InitData>> = await this.model.getInitialData(); // 초기 데이터를 가져온다.
        const createHTML = ({ data, type }: { data: Array<InitData>, type: string }) =>
            data.reduce((acc: string, { id, name, author, data }: InitData) => {
                return acc + domTpl[type]({ id, name, author, data });
            }, ``);
        data.forEach((element) => {
            const allObj = { data: element, type: 'InitListView' };
            dom.html(dom.query('.card-wrapper'), createHTML(allObj));
        });
        this.cardsTitle = dom.queryAll('.list-title')

        // 맨 끝에 컬럼 추가기능 area 구현하기
        const addNewCard = dom.create({ type: 'div', className: ['card-new', 'bold'] });
        dom.html(addNewCard, domTpl['NewColumn']());
        dom.query('.card-wrapper').appendChild(addNewCard);
    }

    /* drag and drop */
    /* (1) mousedown - 움직이는 대상 준비
       (2) mousemove - position:absolute, left-top 변경
       (3) mouseup - 드래그 앤 드롭 완료 후 관련 작업 수행
    */
    dragDownHandler(e: Event) {
        if (e.target !== e.currentTarget) return;
        let curTarget = e.currentTarget as HTMLElement;
        const copiedNode = ((e.currentTarget as Element).cloneNode(true)) as HTMLElement;
        copiedNode.style.opacity = '0.4';
        curTarget.parentNode!.insertBefore(copiedNode, curTarget); // 기존 자리 잔상

        this.curTarget = curTarget;
        this.copiedNode = copiedNode;
        const eleInfo = (e.currentTarget as Element).getBoundingClientRect();
        let shiftX = (e as MouseEvent).clientX - eleInfo.left;
        let shiftY = (e as MouseEvent).screenY - eleInfo.bottom;
        (e.target as HTMLElement).style.position = 'absolute';
        (e.target as HTMLElement).style.zIndex = '1000';
        (e.target as HTMLElement).style.opacity = '0.7';
        document.body.append(e.target as HTMLElement);

        moveAt((e as MouseEvent).pageX, (e as MouseEvent).pageY);
        function moveAt(pageX: number, pageY: number) { // transform으로 수정할 예정
            (e.target as HTMLElement).style.left = pageX - shiftX + 'px';
            (e.target as HTMLElement).style.top = pageY - shiftY + 'px';
        }
        function onMouseMove(event: MouseEvent) {
            moveAt(event.pageX, event.pageY);
            curTarget.hidden = true;
            let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
            curTarget.hidden = false;
            if (!elemBelow) return;

            // 드랍 가능한 요소를 droppable 클래스로 지정
            let currentDroppable = null;
            let droppableBelow = elemBelow.closest('.droppable');
            if (currentDroppable != droppableBelow) {
                if (currentDroppable) {
                    leaveDroppable(currentDroppable);
                }
                currentDroppable = droppableBelow;
                if (currentDroppable) {
                    enterDroppable({
                        elem: currentDroppable, elemBelow, copiedNode
                    });
                }
            }
        }
        // elem은 가장 많이 겹치는 노드
        function enterDroppable({ elem, elemBelow, copiedNode }: Droppable) {
            let parentNode: Element, targetNode: Element;
            const [listWrapper, listViewWrapper] = ['list-wrapper', 'list-view-wrapper'];

            if (!!elem.nextSibling && !(elem.parentNode as Element).classList.contains('card-wrapper')) {
                (elem.parentNode as Element).insertBefore(copiedNode, elem);
            }
            if (elemBelow.classList.contains('card')) {
                Array.from(elemBelow.children).forEach(function (elem) {
                    if (elem.classList.contains(listWrapper))
                        parentNode = elem;
                })
                Array.from(parentNode!.children).forEach(function (elem) {
                    if (elem.className === listViewWrapper)
                        targetNode = elem;
                })
                targetNode!.appendChild(copiedNode);
            }
        }
        function leaveDroppable(elem: HTMLElement) {
            elem.style.background = '';
        }
        // mousemove -> 드래그하면서 움직이기
        this.onMouseMoveHandler = onMouseMove;
        document.addEventListener('mousemove', this.onMouseMoveHandler);
    }

    async dropUpHandler(e: Event) {
        if (this.curTarget === undefined) return;
        this.curTarget.remove();
        this.copiedNode.style.opacity = "1.0";
        document.removeEventListener('mousemove', this.onMouseMoveHandler);
        this.cardsTitle = dom.queryAll('.list-title');

        const copiedParent = this.copiedNode.parentNode;
        const movedIdx = Array.from(copiedParent.children).indexOf(this.copiedNode);
        const cardId = this.copiedNode.getAttribute('data'); // before
        const copiedCardId = copiedParent.getAttribute('data'); // after
        const copiedListId = this.copiedNode.getAttribute('data-idx');
        const beforeCardName = dom.getCardName({cardId});
        const afterCardName = dom.getCardName({cardId : copiedCardId});

        // 기존 데이터(잔상) 삭제
        await this.model.removeTodo({cardId, id: copiedListId});
        let data = this.model.todos;
        let title : string = '';
        let beforeData : Array<MovedData>;
        data[data.length-1].forEach((element : InitData) => {
            if (element.id == copiedCardId){
                beforeData = element.data;
            }
        }); // 옮겨간 카드의 이전 데이터 가져옴

        this.copiedNode.children.forEach((element : Element) => {
            if(element.classList.contains('list-title'))
                title = element.textContent!;
        });
        const moveData : MovedData = {
            id: copiedListId, title : title, tasks: []
        }
        beforeData!.splice(movedIdx, 0, moveData); // 옮겨진 데이터 넣기
        this.model.movingTodo({cardId : copiedCardId, input: beforeData!});
        this.curTarget = undefined; // dropUP 로직 종료

        const historyState = {
            cardName: beforeCardName, beforeTitle: title,
            afterTitle: afterCardName, writeTime: Date.now(),
            action: 'MOVE_NOTE'
        }
        this.model.setHistoryState(historyState);
        this.model.addHistory({ input: historyState });
    }

    async dragAndDrop() {
        await this.model.getInitialData();
        const note = dom.queryAll('.list-view');
        note.forEach(element => {
            element.addEventListener('mousedown', this.dragDownHandler.bind(this));
            element.addEventListener('mouseup', this.dropUpHandler.bind(this));
        })
    }

    // filter cards
    async findListsHandler(e: InputEvent) {
        const { } = await this.model.getInitialData();
        const value = (e.target as HTMLInputElement).value;
        const cardsTitleArr: Array<any> = this.cardsTitle.reduce((acc, item, idx) => {
            let obj: ObjIndex = {};
            obj[idx] = { current: item, title: item.textContent }
            acc = [...acc, obj];
            return acc;
        }, [] as Array<object>);
        console.log(cardsTitleArr);
        cardsTitleArr.forEach((item, idx) => {
            if (!item[idx].title.match(value)) {
                item[idx].current.parentNode.classList.add('none');
            } else {
                item[idx].current.parentNode.classList.remove('none');
            }
        })
    }

    // 검색으로 리스트를 찾기
    findListView() {
        const searchBox = dom.query('.search-input');
        searchBox.addEventListener('input', this.findListsHandler.bind(this));
    }
}

export default ListView;