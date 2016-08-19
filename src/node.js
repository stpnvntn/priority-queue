class Node {
	constructor(data, priority) {
		this.data = data;
        this.priority = priority;
        this.parent = null;
        this.left = null;
        this.right = null;
	}

	appendChild(node) {
	    if (this.left == null) {
	        this.left = node;
            this.left.parent = this;
        } else if (this.right == null) {
            this.right = node;
            this.right.parent = this;
        }
	}

	removeChild(node) {
	    if (this.left === node) {
	        this.left = null;
        } else if (this.right === node) {
            this.right = null;
        } else {
            throw " node is not a child of this node";
        }
        node.parent = null;
	}

	remove() {
        if (this.parent != null) {
            this.parent.removeChild(this);
        }
	}

    swapWithParent() {
        if (this.parent != null) {
            const parent = this.parent;
            const child = this;
            const parentOfParent = this.parent.parent;

            //1
            if (parent.left === child && parent.right != null) {
                parent.right.parent = child;
            }
            if (parent.right === child && parent.left != null) {
                parent.left.parent = child;
            }

            //2
            if (child.left != null) {
                child.left.parent = parent;
            }
            if (child.right != null) {
                child.right.parent = parent;
            }


            //3
            if (parentOfParent != null) {
                if (parentOfParent.left === parent ) {
                    parentOfParent.left = child;
                }
                if (parentOfParent.right === parent) {
                    parentOfParent.right = child;
                }
            }


            //4
            parent.parent = child;


            let childLeft = child.left;
            let childRight = child.right;

            //5
            if (parent.left === child) {
                child.right = parent.right;
                child.left = parent;
            }
            if (parent.right === child) {
                child.left = parent.left;
                child.right = parent;
            }

            //6
            parent.left = childLeft;
            parent.right = childRight;

            child.parent = parentOfParent;
        }
    }
}

module.exports = Node;

