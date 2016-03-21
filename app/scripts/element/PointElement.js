import * as Constains from '../util/Constains';
import Element from './Element';
/**
 * 连接点
 * @author Tiny
 */
export default class extends Element {
    constructor(raphael, radius, x, y) {
        super(raphael, radius * 2, radius * 2, x, y);
        this._radius = 0;
        this._borderColor = '#bf0000';
        this._borderWidth = 2;
        this._parent = null;
        this._position = null;
        // 初始化
        this.init();
    }

    /**
     * 初始化
     */
    init() {
        this._element = this._paper.rect(this._x, this._y, this._w, this._h, this._radius);
        this._element.attr({
            'fill': this._backgroundColor,
            'stroke': this._borderColor,
            'stroke-width': this._borderWidth,
            'cursor': this._cursor
        });
    }

    /**
     * 移动节点
     * @ox  {x轴偏移量}
     * @oy  {y轴偏移量}
     */
    move(ox, oy) {
        let x = this._element.attr('x'),
            y = this._element.attr('y');
        this.moveTo(ox + x, oy + y);
    }

    /**
     * 移动节点到某个地方
     * @x  {x轴坐标}
     * @y  {y轴坐标}
     */
    moveTo(x, y) {
        this.x = x;
        this.y = y;
    }

    // Prototies

    get parent() {
        return this._parent;
    }

    set parent(value) {
        this._parent = value;
    }

    get position() {
        return this._position;
    }

    set position(value) {
        this._position = value;
    }


}
