import * as Constains from '../util/Constains';
import Element from './Element';
/**
 * 普通节点类
 * @author Tiny
 */
export default class extends Element {
    constructor(w, h, x, y) {
        super(w, h, x, y);
        // 节点数据
        this._data = new Map();
        // 图像绘制对象
        this._raphael = null;
        // 节点图像对象
        this._picture = null;
        // 创建连接点
        this._createLinkElement();
        // 创建变形点
        this._createResizeElement();
    }

    onClick() {
        console.log(this._r);
    }

    // Method
    /**
     * 移动节点
     * @param  {X轴}
     * @param  {Y轴}
     */
    move(x, y) {}

    /**
     * @param  {高度}
     */
    resize(w, h) {}

    /**
     * 注册移动事件
     * @param  {回调方法}
     */
    onMove(callback) {}

    /**
     * 注册变形事件
     * @param  {回调方法}
     */
    onResize(callback) {}

    /**
     * 创建4个连接点
     */
    _createLinkElement() {}

    /**
     * 创建4个变形点
     */
    _createResizeElement() {}

    // Properties
    get data() {
        return this._data
    }
    set data(value) {
        this._data = value;
    }
}
