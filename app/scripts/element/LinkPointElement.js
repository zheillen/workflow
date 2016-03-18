import * as Constains from '../util/Constains';
import PointElement from './PointElement';
/**
 * 连接点
 * @author Tiny
 */
export default class extends PointElement {
    constructor(raphael, radius, x, y) {
        super(raphael, radius, x, y);
        this._radius = radius;
        this._cursor = Constains.CURSOR_CROSSHAIR;
        this._element.attr({
            'r': this._radius,
            'cursor': this._cursor
        });
    }
}
