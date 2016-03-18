import * as Constains from '../util/Constains';
import SimpleElement from './SimpleElement';
export default class extends SimpleElement{
    constructor(r, w, h, x, y) {
        super(w, h, x, y);
        this._r = r;
    }
}