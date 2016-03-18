import * as Constains from '../util/Constains';
import Element from './Element';
import LinkPointElement from './LinkPointElement';
import ResizePointElement from './ResizePointElement';
/**
 * 普通节点类
 * @author Tiny
 */
export default class extends Element {
    constructor(raphael, w, h, x, y) {
        super(raphael, w, h, x, y);
        // 节点数据
        this._data = new Map();
        // 点的半径大小
        this._pointRadius = 4;
        // 点的边框宽度
        this._pointBorderWidth = 2;
        // 连接点集合
        this._linkPointMap = new Map();
        // 变形点集合
        this._resizePointMap = new Map();
        // 初始化
        this.init();
        // 创建连接点
        this._createLinkPointElement();
        // 创建变形点
        this._createResizeElement();
    }

    // Method

    /**
     * 初始化节点
     */
    init() {
        this._element = this._paper.rect(this._x, this._y, this._w, this._h, this._radius);
        this._element.attr({
            'fill': this._backgroundColor,
            'stroke': this._borderColor,
            'stroke-width': this._borderWidth,
            'cursor': Constains.CURSOR_DEFAULT
        });
        this._element.toBack();
    }

    /**
     * 移动节点
     * @param x {X轴}
     * @param y {Y轴}
     */
    move(x, y) {}

    /**
     * 调整节点
     * @param {int} w 宽度
     * @param {int} h 高度
     */
    resize(w, h) {}

    /**
     * 注册移动事件
     * @param callback {回调方法}
     */
    onMove(callback) {
        this.on(Constains.EVENT_MOVE, callback);
    }

    /**
     * 注册变形事件
     * @param callback  {回调方法}
     */
    onResize(callback) {
        this.on(Constains.EVENT_RESIZE, callback);
    }

    /**
     * 创建4个连接点
     */
    _createLinkPointElement() {
        // 计算连接点位置
        let positionMap = new Map();
        let offset = (this._pointBorderWidth * 2 + this._pointRadius) / 2;
        // 左边连接点
        positionMap.set(Constains.POSITION_LEFT, [this._x, this._y + this._h / 2]);
        // 上面连接点
        positionMap.set(Constains.POSITION_TOP, [this._x + this._w / 2, this._y]);
        // 右边连接点
        positionMap.set(Constains.POSITION_RIGHT, [this._x + this._w, this._y + this._h / 2]);
        // 下边连接点
        positionMap.set(Constains.POSITION_BOTTOM, [this._x + this._w / 2, this._y + this._h]);
        // 循环创建连接点
        for (let key of positionMap.keys()) {
            let position = positionMap.get(key),
                x = position[0] - offset,
                y = position[1] - offset;
            let pointElement = new LinkPointElement(this._paper, this._pointRadius, x, y);
            pointElement.borderWidth = this._pointBorderWidth;
            this._linkPointMap.set(key, pointElement);
        }
    }

    /**
     * 显示连接点
     */
    _showLinkElement() {}

    /**
     * 隐藏连接点
     */
    _hideLinkElment() {}

    /**
     * 创建4个变形点
     */
    _createResizeElement() {
        // 计算变形点位置
        let positionMap = new Map();
        let offset = (this._pointBorderWidth * 2 + this._pointRadius) / 2;
        // 左上变形点
        positionMap.set(Constains.POSITION_TOP_LEFT, [this._x, this._y, Constains.CURSOR_NW_RESIZE]);
        // 右上变形点
        positionMap.set(Constains.POSITION_TOP_RIGHT, [this._x + this._w, this._y, Constains.CURSOR_NE_RESIZE]);
        // 左下变形点
        positionMap.set(Constains.POSITION_BOTTOM_LEFT, [this._x, this._y + this._h, Constains.CURSOR_SW_RESIZE]);
        // 右下变形点
        positionMap.set(Constains.POSITION_BOTTOM_RIGHT, [this._x + this._w, this._y + this._h, Constains.CURSOR_SE_RESIZE]);
        // 循环创建连接点
        for (let key of positionMap.keys()) {
            let position = positionMap.get(key),
                x = position[0] - offset,
                y = position[1] - offset;
            let pointElement = new ResizePointElement(this._paper, this._pointRadius, x, y);
            pointElement.borderWidth = this._pointBorderWidth;
            pointElement.cursor = position[2];
            this._resizePointMap.set(key, pointElement);
        }
    }

    /**
     * 显示变形点
     */
    _showResizeElement() {}

    /**
     * 隐藏连接点
     */
    _hideResizeElement() {}

    // Properties
    get data() {
        return this._data
    }
    set data(value) {
        this._data = value;
    }
}
