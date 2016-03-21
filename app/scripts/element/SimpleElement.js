import * as Constains from '../util/Constains';
import Element from './Element';
import LinkPointElement from './LinkPointElement';
import ResizePointElement from './ResizePointElement';
/**
 * 普通节点类
 * @author Tiny
 */
export default class extends Element {
    /**
     * 构造函数
     * @param {Raphel} raphael 画图对象
     * @param {int} w 宽度
     * @param {int} h 高度
     * @param {int} x X轴位置
     * @param {int} y Y轴位置
     */
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
     * 创建4个连接点
     */
    _createLinkPointElement() {
        let positionMap = this._getLinkPointPositions();
        // 循环创建连接点
        for (let key of positionMap.keys()) {
            let position = positionMap.get(key),
                pointElement = new LinkPointElement(this._paper, this._pointRadius, position[0], position[1]);
            pointElement.borderWidth = this._pointBorderWidth;
            pointElement.parent = this;
            pointElement.position = key;
            this._linkPointMap.set(key, pointElement);
        }
    }

    /**
     * 重新绘制连接点位置
     */
    _renderLinkPointElement() {
        let positionMap = this._getLinkPointPositions();
        // 循环连接点位置
        for (let key of this._linkPointMap.keys()) {
            let position = positionMap.get(key),
                pointElement = this._linkPointMap.get(key);
            pointElement.x = position[0];
            pointElement.y = position[1];
        }
    }

    /**
     * 计算连接点位置
     * @return {Map} 连接点位置集合
     */
    _getLinkPointPositions() {
        let positionMap = new Map();
        // 左边连接点
        positionMap.set(Constains.POSITION_LEFT, [this._x, this._y + this._h / 2]);
        // 上面连接点
        positionMap.set(Constains.POSITION_TOP, [this._x + this._w / 2, this._y]);
        // 右边连接点
        positionMap.set(Constains.POSITION_RIGHT, [this._x + this._w, this._y + this._h / 2]);
        // 下边连接点
        positionMap.set(Constains.POSITION_BOTTOM, [this._x + this._w / 2, this._y + this._h]);
        return this._cleanPointPositionOffset(positionMap);
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
        let positionMap = this._getResizePointPositions();
        let offset = (this._pointBorderWidth * 2 + this._pointRadius) / 2;
        // 循环创建连接点
        for (let key of positionMap.keys()) {
            let position = positionMap.get(key),
                pointElement = new ResizePointElement(this._paper, this._pointRadius, position[0], position[1]);
            pointElement.borderWidth = this._pointBorderWidth;
            pointElement.cursor = position[2];
            pointElement.parent = this;
            pointElement.position = key;
            this._resizePointMap.set(key, pointElement);
        }
    }

    /**
     * 重新绘制变形点位置
     */
    _renderResizeElement() {
        let positionMap = this._getResizePointPositions();
        // 循环连接点位置
        for (let key of this._resizePointMap.keys()) {
            let position = positionMap.get(key),
                pointElement = this._resizePointMap.get(key);
            pointElement.x = position[0];
            pointElement.y = position[1];
        }
    }

    /**
     * 计算变形点位置
     * @return {Map} 变形点位置集合
     */
    _getResizePointPositions() {
        let positionMap = new Map();
        // 左上变形点
        positionMap.set(Constains.POSITION_TOP_LEFT, [this._x, this._y, Constains.CURSOR_NW_RESIZE]);
        // 右上变形点
        positionMap.set(Constains.POSITION_TOP_RIGHT, [this._x + this._w, this._y, Constains.CURSOR_NE_RESIZE]);
        // 左下变形点
        positionMap.set(Constains.POSITION_BOTTOM_LEFT, [this._x, this._y + this._h, Constains.CURSOR_SW_RESIZE]);
        // 右下变形点
        positionMap.set(Constains.POSITION_BOTTOM_RIGHT, [this._x + this._w, this._y + this._h, Constains.CURSOR_SE_RESIZE]);
        return this._cleanPointPositionOffset(positionMap);
    }

    /**
     * 显示变形点
     */
    _showResizeElement() {}

    /**
     * 隐藏连接点
     */
    _hideResizeElement() {}

    /**
     * 清除点节点的偏移量
     * @param  {Map} map 点节点集合
     * @param  {int} offset 偏移量
     * @return {Map} 清除后的集合
     */
    _cleanPointPositionOffset(map) {
        let offset = (this._pointBorderWidth * 2 + this._pointRadius) / 2;
        for (let [key, value] of map) {
            let newValue = new Array();
            value.map(v => value.indexOf(v) < 2 ? newValue.push(v - offset) : newValue.push(v));
            map.set(key, newValue);
        }
        return map;
    }

    /**
     * 节点移动方法
     * @param  {int} dx x轴移动距离
     * @param  {int} dy Y轴移动距离
     */
    _move(dx, dy) {
        this.x = this._ox + dx;
        this.y = this._oy + dy;
        // 重新绘制连接点
        this._renderLinkPointElement();
        // 重新绘制变形点
        this._renderResizeElement();

        this.execEventCallback(Constains.EVENT_MOVE);
    }

    /**
     * 节点开始移动事件
     */
    _beginMove() {
        this._ox = this._x;
        this._oy = this._y;
        this.animate({ "fill-opacity": .2 }, 100);
        this.execEventCallback(Constains.EVENT_BEGIN_MOVE);
    }

    /**
     * 节点结束移动事件
     */
    _endMove() {
        this.animate({ "fill-opacity": 1 }, 100);
        this.execEventCallback(Constains.EVENT_END_MOVE);
    }

    /**
     * 初始化节点
     */
    init() {
        // 创建实际节点
        this._element = this._paper.rect(this._x, this._y, this._w, this._h, this._radius);
        // 给实际节点赋值
        this._element.attr({
            //'fill': this._backgroundColor,
            'fill': '#34b0df',
            'stroke': this._borderColor,
            'stroke-width': this._borderWidth,
            'cursor': Constains.CURSOR_DEFAULT
        });
        // 实际节点移动事件
        this._element.drag(this._move.bind(this), this._beginMove.bind(this), this._endMove.bind(this));
        // 实际节点添加点击事件
        this._element.click(function() {
            this.execEventCallback(Constains.EVENT_CLICK);
        }.bind(this));
        // 实际节点放到最后面，防止挡住变形点和连接点
        this._element.toBack();
    }

    /**
     * 根据变形点移动的位置对节点的大小进行调整
     * @param  {int} position 移动点方位
     * @param  {int} dx 移动点X轴偏移量
     * @param  {int} dy 移动点Y轴偏移量
     */
    resize(position, dx, dy) {
        let ox = 0, // 节点X轴偏移量
            oy = 0, // 节点Y轴偏移量
            ow = 0, // 节点宽度偏移量
            oh = 0; // 节点高度偏移量
        // 重新计算坐标，当变形点有右下是坐标不变
        switch (position) {
            case Constains.POSITION_TOP_LEFT:
                ox = dx;
                oy = dy;
                ow = -dx;
                oh = -dy;
                break;
            case Constains.POSITION_TOP_RIGHT:
                ox = 0;
                oy = dy;
                ow = dx;
                oh = -dy;
                break;
            case Constains.POSITION_BOTTOM_LEFT:
                ox = dx;
                oy = 0;
                ow = -dx;
                oh = dy;
                break;
            case Constains.POSITION_BOTTOM_RIGHT:
                ox = 0;
                oy = 0;
                ow = dx;
                oh = dy;
                break;
        }
        this.x = this._ox + ox;
        this.y = this._oy + oy;
        this.width = this._ow + ow;
        this.height = this._oh + oh;
        // 重新绘制连接点
        this._renderLinkPointElement();
        // 重新绘制变形点
        this._renderResizeElement();
        // 执行变形事件
        this.execEventCallback(Constains.EVENT_RESIZE);
    }

    /**
     * 节点大小变形前方法，记录变形前的坐标和宽高
     */
    beginResize() {
        this._ox = this._x;
        this._oy = this._y;
        this._ow = this._w;
        this._oh = this._h;
        // 执行变形前事件
        this.execEventCallback(Constains.EVENT_ENGIN_RESIZE);
    }

    /**
     * 节点大小变形前后方法
     */
    endResize() {
        // 执行变形前事件
        this.execEventCallback(Constains.EVENT_END_RESIZE);
    }

    /**
     * 注册变形事件
     * @param {function} callback 回调方法
     */
    onResize(callback) {
        this.on(Constains.EVENT_RESIZE, callback);
    }

    /**
     * 注册变形前事件
     * @param {function} callback 回调方法
     */
    onBeginResize(callback) {
        this.on(Constains.EVENT_ENGIN_RESIZE, callback);
    }

    // Properties
    get data() {
        return this._data
    }
    set data(value) {
        this._data = value;
    }
}