import * as Constains from './scripts/util/Constains';
import FlowElement from './scripts/element/FlowElement';
import EdgeElement from './scripts/element/EdgeElement';
import LinkPointElement from './scripts/element/LinkPointElement';
require('./styles/main.css');

let val = 120,
    padding = 0,
    w = paper.offsetWidth - 2 - padding * 2,
    h = paper.offsetHeight - 36 - padding * 2,
    raphael = new Raphael(paperCanvas, w, h);

paperCanvas.style.padding = padding + 'px';

let startElement = new FlowElement(raphael, val * 1.5, val, val, val);
startElement.on(Constains.EVENT_CLICK, function(event) {
    console.log('element id: ', this.id, event);
});


startElement.on(Constains.EVENT_MOVE, function(event) {
    console.log('element id: ', this.id, event);
});

startElement.on(Constains.EVENT_BEGIN_MOVE, function(event) {
    console.log('element id: ', this.id, event);
});

startElement.on(Constains.EVENT_END_MOVE, function(event) {
    console.log('element id: ', this.id, event);
});

startElement.on(Constains.EVENT_RESIZE, function(event) {
    console.log('element id: ', this.id, event);
});

startElement.on(Constains.EVENT_ENGIN_RESIZE, function(event) {
    console.log('element id: ', this.id, event);
});

startElement.on(Constains.EVENT_END_RESIZE, function(event) {
    console.log('element id: ', this.id, event);
});