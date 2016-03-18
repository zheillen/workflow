import * as Constains from '../util/Constains';
import SimpleElement from './SimpleElement';
export default class extends SimpleElement {
    constructor(raphael, w, h, x, y) {
        super(raphael, w, h, x, y);
    }

    init() {
        super.init();
        this._element.click(this._callClickEvent.bind(this));
    }

    /**
     * 处理节点的单击事件
     */
    _callClickEvent() {
        let callSet = this._eventMap.get(Constains.EVENT_CLICK);
        callSet instanceof Set && callSet.forEach(item => typeof item === 'function' && item());
    }
}
