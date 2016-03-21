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

    _move(dx, dy, qx, qy) {
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
                maxX = parentX + parentW - Constains.ELEMENT_MIN_WIDTH;
                maxY = parentY + parentH - Constains.ELEMENT_MIN_HEIGHT;
                break;
            case Constains.POSITION_TOP_RIGHT:
                minX = parentX + Constains.ELEMENT_MIN_WIDTH;
                maxX = panelW;
                maxY = parentY + parentH - Constains.ELEMENT_MIN_HEIGHT;
                break;
            case Constains.POSITION_BOTTOM_LEFT:
                maxX = parentX + parentW - Constains.ELEMENT_MIN_WIDTH;
                minX = parentY - parentH + Constains.ELEMENT_MIN_HEIGHT;
                maxY = panelH;
                break;
            case Constains.POSITION_BOTTOM_RIGHT:
                minX = parentX + Constains.ELEMENT_MIN_WIDTH;
                maxX = panelW;
                minY = parentY + Constains.ELEMENT_MIN_HEIGHT;
                maxY = panelH;
                break;
        }
        console.log('-------------------------');
        console.log(x, minX, maxX, y, minY, maxY);
        console.log(parentX, parentY, parentW, parentH, panelW, panelH);
        // 可移动区域
        if ((x >= minX && x <= maxX) && (y >= minY && y <= maxY)) {
            this.moveTo(x, y);
            //this._parent.resize(this, , dx, dy);
        }

    }

    _beginMove() {
        this._ox = this._x;
        this._oy = this._y;
        this._parent.beginResize();
    }
}
