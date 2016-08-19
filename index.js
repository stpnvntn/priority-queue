const MaxHeap = require('./src/max-heap');
const Node = require('./src/node');
const Queue = require('./src/queue');


const h = new MaxHeap();
window.h = h;

window.MaxHeap =  MaxHeap;
window.Node =  Node;
window.Queue =  Queue;

