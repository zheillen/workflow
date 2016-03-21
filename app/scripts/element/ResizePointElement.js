import * as Constains from '../util/Constains';
import PointElement from './PointElement';
/**
 * 连接点
 * @author Tiny
 */
export default class extends PointElement {
    constructor(raphael, radius, x, y) {
        super(raphael, radius, x, y);
        this._element.drag(this._move.bind(this), this._beginMove.bind(this));
    }

    /**
     * 变形点移动方法，双轴
     * @param  {int} dx x轴移动距离
     * @param  {int} dy Y轴移动距离
     */
    _move(dx, dy) {
        let x = this._ox + dx, //移动后的X轴
            y = this._oy + dy, //移动后的Y轴
            minX = 0, //X轴最小值
            minY = 0, //Y轴最小值
            maxX = 0, //X轴最大值
            maxY = 0, //Y轴最大值
            parentX = this._parent.x, //父节点X轴
            parentY = this._parent.y, //父节点Y轴
            parentW = this._parent.width, //连接点的父节点宽度
            parentH = this._parent.height, //连接点的父节点高度
            panelW = this._parent.paper.width, //面板的宽度
            panelH = this._parent.paper.height; //面板的高度

        // 计算可移动区域
        switch (this._position) {
            case Constains.POSITION_TOP_LEFT:
                minX = 0;
                maxX = parentX + parentW - Constains.ELEMENT_MIN_WIDTH;
                minY = 0;
                maxY = parentY + parentH - Constains.ELEMENT_MIN_HEIGHT;
                break;
            case Constains.POSITION_TOP_RIGHT:
                minX = parentX + Constains.ELEMENT_MIN_WIDTH;
                maxX = panelW;
                minY - 0;
                maxY = parentY + parentH - Constains.ELEMENT_MIN_HEIGHT;
                break;
            case Constains.POSITION_BOTTOM_LEFT:
                minX = 0;
                maxX = parentX + parentW - Constains.ELEMENT_MIN_WIDTH;
                minY = parentY + Constains.ELEMENT_MIN_HEIGHT;
                maxY = panelH;
                break;
            case Constains.POSITION_BOTTOM_RIGHT:
                minX = parentX + Constains.ELEMENT_MIN_WIDTH;
                maxX = panelW;
                minY = parentY + Constains.ELEMENT_MIN_HEIGHT;
                maxY = panelH;
                break;
        }
        // 双轴都在可移动范围
        if (x >= minX && x <= maxX && y >= minY && y <= maxY) {
            // nothing
        }
        // X轴超出范围，Y轴木有
        else if ((x < minX || x > maxX) && (y >= minY && y <= maxY)) {
            x = x < minX ? minX : maxX;
            this.move(x, y);
        }
        // Y轴超出范围，X轴木有 
        else if ((y < minY || y > maxY) && (x >= minX && x <= maxX)) {
            y = y < minY ? minY : maxY;
        }
        // 双轴超出范围
        else {
            x = x < minX ? minX : maxX;
            y = y < minY ? minY : maxY;
        }
        this.move(x, y);
    }

    /**
     * 变形点开始移动事件
     */
    _beginMove() {
        this._ox = this._x;
        this._oy = this._y;
        this._parent.beginResize();
    }

    /**
     * 重载函数，添加操作父节点的变形操作
     * @param  {int} x 变形点X轴坐标
     * @param  {int} y 变形点Y轴坐标
     */
    move(x, y) {
        super.move(x, y);
        let dx = x - this._ox - this._borderWidth,
            dy = y - this._oy;
        this._parent.resize(this._position, dx, dy);
    }
}