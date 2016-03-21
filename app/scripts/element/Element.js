import * as Constains from '../util/Constains';
/**
 * 所有节点的基础类
 * 描述了节点的基本属性和动作
 * @author Tiny
 */
export default class {
    /**
     * 构造函数
     * @param {Raphel} raphael 画图对象
     * @param {int} w 宽度
     * @param {int} h 高度
     * @param {int} x X轴位置
     * @param {int} y Y轴位置
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
     * @param {string} event 事件名称
     * @param {function} callback 回调方法
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
        } else {
            throw new Error('Event ' + event + ' is not a reasonable event');
        }
    }

    /**
     * 取消事件绑定
     * @param {function} callback 回调方法
     */
    un(event) {
        if (this._eventMap.has(event)) {
            this._eventMap.delete(event);
        }
    }

    /**
     * 执行事件的回调事件
     * @param  {string} event 事件名称，只允许定义于常量文件的名称
     */
    execEventCallback(event) {
        if (!event) {
            throw new Error('Argument event is miss.');
        }
        if (event in Constains) {
            let callSet = this._eventMap.get(event);
            callSet instanceof Set && callSet.forEach(item => typeof item === 'function' && item.call(this, event));
        } else {
            throw new Error("Can't find event " + event + ".");
        }
    }

    /**
     * 节点移动方法
     * @param  {int} x X轴最终点
     * @param  {int} y Y轴最终点
     */
    move(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * 注册单击事件
     * @param {function} callback 回调方法
     */
    onClick(callback) {
        this.on(Constains.EVENT_CLICK, callback);
    }

    /**
     * 注册移动事件
     * @param {function} callback 回调方法
     */
    onMove(callback) {
        this.on(Constains.EVENT_MOVE, callback);
    }

    /**
     * 节点动画效果
     * @param  {Object} attrs 节点样式属性对象
     * @param  {int} time  执行时间
     */
    animate(attrs, time) {
        this._element.animate(attrs, time);
    }

    // Properties
    get id() {
        return this._id;
    }

    get width() {
        return this._w;
    }
    set width(value) {
        this._w = value;
        this._element.attr('width', value);
    }

    get height() {
        return this._h;
    }
    set height(value) {
        this._h = value;
        this._element.attr('height', value);
    }

    get x() {
        return this._x;
    }
    set x(value) {
        this._x = value;
        this._element.attr('x', value);
    }

    get y() {
        return this._y;
    }
    set y(value) {
        this._y = value;
        this._element.attr('y', value);
    }

    get text() {
        return this._text;
    }
    set text(value) {
        this._text = value;
    }

    get fontSize() {
        return this._fontSize;
    }
    set fontSize(value) {
        this._fontSize = value;
    }

    get fontColor() {
        return this._fontColor;
    }
    set fontColor(value) {
        this._fontColor = value;
    }

    get borderColor() {
        return this._borderColor;
    }
    set borderColor(value) {
        this._borderColor = value;
        this._element.attr('stroke', value);
    }

    get borderWidth() {
        return this._borderWidth;
    }
    set borderWidth(value) {
        this._borderWidth = value;
        this._element.attr('stroke-width', value);
    }

    get backgroundColor() {
        return this._backgroundColor;
    }
    set backgroundColor(value) {
        this._backgroundColor = value;
        this._element.attr('fill', value);
    }

    get state() {
        return this._state;
    }
    set state(value) {
        this._state = value;
    }

    get cursor() {
        return this._cursor;
    }
    set cursor(value) {
        this._cursor = value;
        this._element.attr('cursor', value);
    }

    get paper() {
        return this._paper;
    }

}