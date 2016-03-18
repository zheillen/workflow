import * as Constains from '../util/Constains';
/**
 * 所有节点的基础类
 * 描述了节点的基本属性和动作
 * @author Tiny
 */
export default class {
    /**
     * @param  {宽度}
     * @param  {长度}
     * @param  {X轴位置}
     * @param  {Y轴位置}
     * @return {对象}
     */
    constructor(w, h, x, y) {
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
        this._backgroundColor = '#fff';
        //节点状态，0为未选中，1为选中
        this._state = 0;
        //事件集合
        this._eventMap = new Map();
    }

    // Mehods

    /**
     * 节点注册事件方法
     * @param  {事件名称}
     * @param  {事件回调方法}
     */
    on(event, callback) {
        let eventSet = new Set();
        if (this._eventMap.has(event)) {
            eventSet = this._eventMap.get(event);
            if (eventSet instanceof Set) {
                eventSet.add(callback);
            } else {
                throw new Exception('Element add event failure.');
            }
        } else {
            eventSet.add(callback);
        }
        this._eventMap.set(event, eventSet);
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
        console.log('this element click');
    }

    /**
     * 创建Raphael对象
     */
    _createElement() {}

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
        return this._fontSize
    }
    get fontColor() {
        return this._fontColor
    }
    get borderColor() {
        return this._borderColor
    }
    get backgroundColor() {
        return this._backgroundColor
    }
    get state() {
        return this._state
    }

    set width(value) {
        this._w = value;
    }
    set height(value) {
        this._h = value;
    }
    set x(value) {
        this._x = value;
    }
    set y(value) {
        this._y = value;
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
    }
    set backgroundColor(value) {
        this._backgroundColor = value;
    }
    set state(value) {
        this._state = value;
    }
}
