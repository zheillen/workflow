import * as Constains from '../util/Constains';
/**
 * 所有节点的基础类
 * 描述了节点的基本属性和动作
 * @author Tiny
 */
export default class {
    /**
     * @param  {int} w 宽度
     * @param  {int} h 高度
     * @param  {int} x X轴位置
     * @param  {int} y Y轴位置
     */
    constructor(raphael, w, h, x, y) {
        // 节点ID，自动生成
        this._id = (new Date()).getTime();
        this._w = w;
        this._h = h;
        this._x = x;
        this._y = y;
        this._text = '';
        this._fontSize = 12;
        this._fontColor = '#333';
        this._borderColor = '#333';
        this._borderWidth = 1;
        this._backgroundColor = '#fff';
        this._cursor = Constains.CURSOR_DEFAULT;
        // 节点图像绘制对象
        this._paper = raphael;
        // 节点图像对象
        this._element = null;
        // 节点状态，0为未选中，1为选中
        this._state = 0;
        // 事件集合
        this._eventMap = new Map();
    }

    // Mehods

    /**
     * 节点注册事件方法
     * @param  {事件名称}
     * @param  {事件回调方法}
     */
    on(event, callback) {
        // 检查事件是否在常量里面
        if (event in Constains) {
            let eventSet = new Set();
            if (this._eventMap.has(event)) {
                eventSet = this._eventMap.get(event);
                if (eventSet instanceof Set) {
                    eventSet.add(callback);
                } else {
                    throw new Error('Element add event failure.');
                }
            } else {
                eventSet.add(callback);
            }
            this._eventMap.set(event, eventSet);
        }else{
            throw new Error('Event ' + event + ' is not a reasonable event');
        }
    }

    /**
     * 取消事件绑定
     * @param  {事件}
     */
    un(event) {
        if (this._eventMap.has(event)) {
            this._eventMap.delete(event);
        }
    }

    /**
     * 注册单击事件
     * @param  {回调方法}
     */
    onClick(callback) {
        this.on(Constains.EVENT_CLICK, callback);
    }

    // Properties
    get id() {
        return this._id;
    }
    get width() {
        return this._w;
    }
    get height() {
        return this._h;
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    get text() {
        return this._text;
    }
    get fontSize() {
        return this._fontSize;
    }
    get fontColor() {
        return this._fontColor;
    }
    get borderColor() {
        return this._borderColor;
    }
    get borderWidth() {
        return this._borderWidth;
    }
    get backgroundColor() {
        return this._backgroundColor;
    }
    get state() {
        return this._state;
    }
    get cursor() {
        return this._cursor;
    }


    set width(value) {
        this._w = value;
        this._element.attr('width', value);
    }
    set height(value) {
        this._h = value;
        this._element.attr('height', value);
    }
    set x(value) {
        this._x = value;
        this._element.attr('x', value);
    }
    set y(value) {
        this._y = value;
        this._element.attr('y', value);
    }
    set text(value) {
        this._text = value;
    }
    set fontSize(value) {
        this._fontSize = value;
    }
    set fontColor(value) {
        this._fontColor = value;
    }
    set borderColor(value) {
        this._borderColor = value;
        this._element.attr('stroke', value);
    }
    set borderWidth(value) {
        this._borderWidth = value;
        this._element.attr('stroke-width', value);
    }
    set backgroundColor(value) {
        this._backgroundColor = value;
        this._element.attr('fill', value);
    }
    set state(value) {
        this._state = value;
    }
    set cursor(value) {
        this._cursor = value;
        this._element.attr('cursor', value);
    }
}
