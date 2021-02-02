/*
    ListView.js : card에 존재하는 여러 개의 아이템들
    모델을 구독하는 Observer
    구독중인 모델의 어떤 상태가 변경되면 -> 화면의 변화 발생(렌더링)
    데이터가 새롭게 추가되면, 구독 중인 ListView가 감지한다.
*/
import { domTpl } from './template.js';
import * as _dom from '../src/util';

/* TodoModel을 구독하는 Observer */
class ListView {
    constructor(model) {
        this.cardsTitle = _dom.queryAll('.list-title')
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
        const data = await this.model.getInitialData(); // 초기 데이터를 가져온다.
        const createHTML = ({ data, type }) => data.reduce((acc, { id, name, author, data }) => {
            return acc + domTpl[type]({ id, name, author, data });
        }, ``);
        data.forEach(element => {
            const allObj = { data: element, type: 'InitListView' };
            _dom.html(_dom.query('.card-wrapper'), createHTML(allObj));
        });
        this.cardsTitle = _dom.queryAll('.list-title')

        // 맨 끝에 컬럼 추가기능 area 구현하기
        const addNewCard = _dom.create({ type: 'div', className: ['card-new', 'bold'] });
        _dom.html(addNewCard, domTpl['NewColumn']());
        _dom.query('.card-wrapper').appendChild(addNewCard);
    }

    /* drag and drop */
    /* (1) mousedown - 움직이는 대상 준비
       (2) mousemove - position:absolute, left-top 변경
       (3) mouseup - 드래그 앤 드롭 완료 후 관련 작업 수행
    */
    dragDownHandler(e) {
        if (e.target !== e.currentTarget) return;
        let curTarget = e.currentTarget;
        const copiedNode = e.currentTarget.cloneNode(true);
        copiedNode.style.opacity = 0.4;
        curTarget.parentNode.insertBefore(copiedNode, curTarget); // 기존 자리 잔상

        this.curTarget = curTarget;
        this.copiedNode = copiedNode;
        const eleInfo = e.currentTarget.getBoundingClientRect();
        let shiftX = e.clientX - eleInfo.left;
        let shiftY = e.screenY - eleInfo.bottom;
        e.target.style.position = 'absolute';
        e.target.style.zIndex = 1000;
        e.target.style.opacity = 0.7;
        document.body.append(e.target);

        moveAt(e.pageX, e.pageY);
        function moveAt(pageX, pageY) {
            e.target.style.left = pageX - shiftX + 'px';
            e.target.style.top = pageY - shiftY + 'px';
        }
        function onMouseMove(event) {
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
                    enterDroppable(currentDroppable, elemBelow, copiedNode);
                }
            }
        }
        // elem은 가장 많이 겹치는 노드
        function enterDroppable(elem, elemBelow, copiedNode) {
            let parentNode, targetNode;
            const [listWrapper, listViewWrapper] = ['list-wrapper', 'list-view-wrapper'];

            if (!!elem.nextSibling && !elem.parentNode.classList.contains('card-wrapper')) {
                elem.parentNode.insertBefore(copiedNode, elem);
            }
            if (elemBelow.classList.contains('card')) {
                elemBelow.children.forEach(function (elem) {
                    if (elem.classList.contains(listWrapper))
                        parentNode = elem;
                })
                parentNode.children.forEach(function (elem) {
                    if (elem.className === listViewWrapper)
                        targetNode = elem;
                })
                targetNode.appendChild(copiedNode);
            }
        }
        function leaveDroppable(elem) {
            elem.style.background = '';
        }
        // mousemove -> 드래그하면서 움직이기
        this.onMouseMoveHandler = onMouseMove;
        document.addEventListener('mousemove', this.onMouseMoveHandler);
    }

    dropUpHandler(e) {
        if (this.curTarget === undefined) return;
        this.curTarget.remove();
        this.copiedNode.style.opacity = "1.0";
        document.removeEventListener('mousemove', this.onMouseMoveHandler);
        this.copiedNode.addEventListener('mousedown', this.dragDownHandler.bind(this));
        this.copiedNode.addEventListener('mouseup', this.dropUpHandler.bind(this));
        this.cardsTitle = _dom.queryAll('.list-title');
    }

    async dragAndDrop() {
        const { } = await this.model.getInitialData();
        const note = _dom.queryAll('.list-view');
        note.forEach(element => {
            element.addEventListener('mousedown', this.dragDownHandler.bind(this));
            element.addEventListener('mouseup', this.dropUpHandler.bind(this));
        })
    }

    // filter cards
    async findListsHandler(e) {
        const { } = await this.model.getInitialData();
        const value = e.target.value;
        const cardsTitleArr = this.cardsTitle.reduce((acc, item, idx) => {
            let obj = {};
            obj[idx] = {
                current: item, title: item.textContent
            }
            acc = [...acc, obj];
            return acc;
        }, []);
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
        const searchBox = _dom.query('.search-input');
        searchBox.addEventListener('input', this.findListsHandler.bind(this));
    }

}

export default ListView;