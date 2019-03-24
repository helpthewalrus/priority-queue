const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.length = 0;
	}

	push(data, priority) {
		let node = new Node(data, priority);

		this.insertNode(node);

		this.shiftNodeUp(node);
	}

	pop() {
		if (this.length !== 0) {
			
			let detached = this.detachRoot();
		}
	}

	detachRoot() {
		const detachedRoot = this.root;
		
		if (this.parentNodes[0] === this.root) {
			this.parentNodes.shift();
		}

		this.root = null;

		return detachedRoot;
	}

	restoreRootFromLastInsertedNode(detached) {
		const lastInsertedNode = this.parentNodes[this.parentNodes.length - 1];
		if (this.parentNodes.length === 2) {

			[this.parentNodes[0], this.parentNodes[1]] = [this.parentNodes[1], this.parentNodes[0]];
		} else if (this.parentNodes.length > 2) {
				if (this.parentNodes[0] === lastInsertedNode.parent) {
					this.parentNodes.pop();
			} else if (this.parentNodes[0] !== lastInsertedNode.parent) {
				this.parentNodes.unshift(lastInsertedNode.parent);
				this.parentNodes.pop();
			}
		}
		
		this.root = lastInsertedNode;
		detached.left.parent = lastInsertedNode;
		detached.right.parent = lastInsertedNode;
		lastInsertedNode.left = detached.left;
		lastInsertedNode.right = detached.right;
		lastInsertedNode.parent = null;
	}

	size() {
		return this.length;
		
	}

	isEmpty() {
		return (this.root === null);
		
		
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		
	}

	insertNode(node) {
		if (this.root === null) {
			this.root = node;
			this.parentNodes.push(node);
			this.length++;
		} else {
			this.parentNodes[0].appendChild(node);
			this.parentNodes.push(node);
			this.length++;
			if (node.parent.left !== null && node.parent.right !== null) {
				this.parentNodes.shift();
			}
		}
	}

	shiftNodeUp(node) {
		if (node.parent !== null && node.priority < node.parent.priority ) {
			return node;
		}
		if (node.parent !== null && node.priority > node.parent.priority) {
			if (this.parentNodes.includes(node.parent)) {
				[this.parentNodes[0], this.parentNodes[this.parentNodes.length - 1]] = [this.parentNodes[this.parentNodes.length - 1], this.parentNodes[0]];
			} else if (node === this.parentNodes[0]) {
				this.parentNodes[0] = node.parent;
			}
			node.swapWithParent();
			if (node.parent === null) {
					this.root = node;
			}
			return this.shiftNodeUp(node);
		}
	}
	
	shiftNodeDown(node) {
		if ((node.left === null && node.right === null) || 
		(node.left.priority < node.priority && node.right === null) || 
		(node.left.priority < node.priority && node.right.priority < node.priority)) {
			let current = node;
			while (current.parent) {
				current = current.parent;
			}
			this.root = current;
			return node;
		} 
		if (node.left !== null && node.right !== null) {
			if (node.left.priority > node.priority && node.left.priority > node.right.priority) {
				if (this.parentNodes.includes(node.left)) {
					let nodeLeftPos = this.parentNodes.indexOf(node.left);
					this.parentNodes[nodeLeftPos] = node;
				}
				node.left.swapWithParent();
			} else if (node.right.priority > node.priority && node.right.priority > node.left.priority) {
				if (this.parentNodes.includes(node.right)) {
					let nodeRightPos = this.parentNodes.indexOf(node.right);
					this.parentNodes[nodeRightPos] = node;
				}
				node.right.swapWithParent();
			}
		} else if (node.left.priority > node.priority && node.right === null) {
				[this.parentNodes[0], this.parentNodes[this.parentNodes.length - 1]] = [this.parentNodes[this.parentNodes.length - 1], this.parentNodes[0]];
				node.left.swapWithParent();
			} 
		return this.shiftNodeDown(node);
	}
}

module.exports = MaxHeap;
