const defaultConfig = {
    id:"modal",
    title:"",
    buttonText: ["Save"],
    renderContent: () => {return '<label>name</label><input type="text" placeholder="이름을 입력하세요."></input>'},
    onClickButton: [()=>{console.log('button clicked')}],
}

class ModalView {
    constructor (config = defaultConfig) {
        const {id, title, buttonText, onClickButton, renderContent} = config;
        this.id = id;
        this.title = title;
        this.buttonText  = buttonText;
        this.onClickButton = onClickButton;
        this.renderContent = renderContent;
        this.render();
    
    }
    onClickCloseButton() {
        const modalEle = document.querySelector('.modal-container');
        modalEle.classList.add('hidden');
    }
    show() {
        const modalEle = document.querySelector('.modal-container');
        modalEle.classList.remove('hidden');
    }

    render() {
        const {id, title, buttonText, renderContent} = this;
        const modalEle = document.querySelector('.modal-container');
        modalEle.id = id;
        const innerHtml = `    <div class="modal-background"></div>
            <div class="modal">
                <div class="modal-header">
                    <div class="modal-title">
                        ${title}
                    </div>
                    <div class="close-button">
                        ✕
                    </div>
                </div>
                <div class="modal-content">
                    ${renderContent()}
                </div>
                <div class="modal-buttons">
                    <button class="modal-button">
                        ${buttonText[0]}
                    </button>
                </div>
            </div>`
        modalEle.innerHTML = innerHtml;
        this.ele = modalEle;
        modalEle.querySelector('.close-button').addEventListener('click', this.onClickCloseButton)
        modalEle.querySelector('.modal-buttons').firstElementChild.addEventListener('click', () => {
            this.onClickButton[0]();
            this.onClickCloseButton();
        })
    }
}

export default ModalView;