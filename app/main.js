import * as Constains from './scripts/util/Constains';
import FlowElement from './scripts/element/FlowElement';
import EdgeElement from './scripts/element/EdgeElement';
import LinkPointElement from './scripts/element/LinkPointElement';
require('./styles/main.css');

let val = 60,
    w = paper.offsetWidth - 2,
    h = paper.offsetHeight - 36,
    raphael = new Raphael(paperCanvas, w, h);


let startElement = new FlowElement(raphael, val * 2, val, val * 3, val * 2);
startElement.on(Constains.EVENT_CLICK, function() {
    console.log('click a element');
});
