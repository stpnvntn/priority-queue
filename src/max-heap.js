const Node = require('./node');

class MaxHeap {
    constructor() {
        this.root = null;
        this.parentNodes = [];
        this.heapSize = 0;
    }

    push(data, priority) {
        const node = new Node(data, priority);
        this.insertNode(node);
        this.shiftNodeUp(node);
    }

    pop() {
        if (!this.isEmpty()) {
            const detached = this.detachRoot();
            if (this.parentNodes[this.parentNodes.length - 1]) {
                this.restoreRootFromLastInsertedNode(detached);
                this.shiftNodeDown(this.root);

            }
            return detached.data;
        }
    }

    detachRoot() {
        const detached = this.root;
        if (this.parentNodes.indexOf(this.root) != -1) {
            this.parentNodes.shift();
        }
        if (detached.left != null) {
            detached.left.parent = null;
        }
        if (detached.right != null) {
            detached.right.parent = null;
        }
        this.root = null;
        this.heapSize = this.heapSize - 1;
        return detached;
    }

    restoreRootFromLastInsertedNode(detached) {
        //последний становится корнем кучи
        this.root = this.parentNodes[this.parentNodes.length - 1];
        //удаляемся из родителя т.к у нас его нет если у нас есть родители
        if (this.root.parent != null) {
            if (this.root.parent.left === this.root) {
                this.root.parent.left = null;
                // и добавляет роделя в очерь если его там еще нет
                if (this.parentNodes.indexOf(this.root.parent) === -1) {
                    this.parentNodes.unshift(this.root.parent);
                }

            }
            if (this.root.parent.right === this.root) {
                this.root.parent.right = null;
                // и добавляет роделя в очерь
                if (this.parentNodes.indexOf(this.root.parent) === -1) {
                    this.parentNodes.unshift(this.root.parent);
                }
            }
        }
        //убираем родителя у нового коря
        this.root.parent = null;
        //забираем старых детей у старого корня только если это не мы сами
        if (detached.left != this.root) {
            this.root.left = detached.left;
            // сообщаем ему что его мы их родитель если он конечно есть
            if (this.root.left != null) {
                this.root.left.parent = this.root;
            }
            this.parentNodes.unshift(this.root);
        }
        if (detached.right != this.root) {
            this.root.right = detached.right;
            // сообщаем ему что его мы их родитель если он конечно есть
            if (this.root.right != null) {
                this.root.right.parent = this.root;
            }
            this.parentNodes.shift();
        }
        // и не забываем убрать себя из очереди
        this.parentNodes.pop();
    }

    size() {
        return this.heapSize;
    }

    isEmpty() {
        return this.root === null;
    }

    clear() {
        this.root = null;
        this.parentNodes = [];
        this.heapSize = 0;
    }

    insertNode(node) {
        if (this.isEmpty()) {
            this.root = node;
            this.parentNodes.push(node);
        } else {
            while (true) {
                if (this.parentNodes[0].left === null || this.parentNodes[0].right === null) {
                    this.parentNodes[0].appendChild(node);
                    this.parentNodes.push(node);
                    if (this.parentNodes[0].right === node) {
                        this.parentNodes.shift();
                    }
                    break;
                } else {
                    this.parentNodes.shift();
                }
            }
        }
        this.heapSize = this.heapSize + 1;
    }

    shiftNodeUp(node) {
        if (node.parent != null && node.priority > node.parent.priority) {
            let tempNodeParentPosition = this.parentNodes.indexOf(node.parent);
            let tempNodePosition = this.parentNodes.indexOf(node);
            if (tempNodeParentPosition != -1) {
                this.parentNodes[tempNodeParentPosition] = node;
            }
            if (tempNodePosition != -1) {
                this.parentNodes[tempNodePosition] = node.parent;
            }
            node.swapWithParent();
            this.shiftNodeUp(node);
        } else if (node.parent === null) {
            this.root = node;
        }
    }

    shiftNodeDown(node) {
        if (node.left != null &&
            node.left.priority > node.priority &&
            (node.right === null || node.left.priority > node.right.priority)) {
            this.shiftNodeUp(node.left);
            this.shiftNodeDown(node);
        } else if (node.right != null &&
            node.right.priority > node.priority &&
            (node.left === null || node.right.priority > node.left.priority)) {
            this.shiftNodeUp(node.right);
            this.shiftNodeDown(node);
        }
    }
}

// if (node.left != null &&
//     node.left.priority > node.priority &&
//     node.left.priority > node.right.priority) {
//     this.shiftNodeUp(node.left);
//     this.shiftNodeDown(node);
// } else if (node.right != null &&
//     node.right.priority > node.priority &&
//     node.left.priority > node.right.priority) {
//     this.shiftNodeUp(node.right);
//     this.shiftNodeDown(node);
// }

module.exports = MaxHeap;
