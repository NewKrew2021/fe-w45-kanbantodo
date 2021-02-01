import * as _dom from '../src/util.js';

/* 모달 뷰 */
/* ListView에 있는 모달 관련 코드를 여기로 분리할 예정 */

class ListModalView {
    constructor(model) {
        this.model = model;
        this.model.subscribe(this.update.bind(this));
    }

    update() {
        console.log(this.model.state);
    }
}
export default ListModalView;