const defaultConfig = {
    id:"modal",
    title:"",
    buttonText: ["Save"],
    showInputLabel: false,
    defaultValue: '',
    labelName: '',
    onClickButton: [()=>{console.log('button clicked')}],
}

class ModalView {
    constructor (config = defaultConfig) {
        this.config = config
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
        const {id, title, buttonText, showInputLabel, labelName, onClickButton, defaultValue} = this.config;
        const modalEle = document.querySelector('.modal-container');
        modalEle.id = id;
        const innerHtml = `<div class="modal-background"></div>
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
                    ${showInputLabel? `<label>${labelName}</label><input type="text" placeholder="이름을 입력하세요." value="${defaultValue?defaultValue:''}"></input>`:``}
                </div>
                <div class="modal-buttons">
                    <button class="modal-button">
                        ${buttonText[0]}
                    </button>
                </div>
            </div>`
        modalEle.innerHTML = innerHtml;
        modalEle.querySelector('.close-button').addEventListener('click', this.onClickCloseButton)
        modalEle.querySelector('.modal-buttons').firstElementChild.addEventListener('click', () => {
            const inputEle = modalEle.querySelector('input');
            if (inputEle) {
                const { value } = inputEle;
                onClickButton[0](value);
                inputEle.value = '';
            } else {
                onClickButton[0]();
            }
            this.onClickCloseButton();
        })
    }
}

export default ModalView;