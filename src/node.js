class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if (!this.left) {
			this.left = node;
			node.parent = this;
		} else if (!this.right) {
			this.right = node;
			node.parent = this;
		} 
	}

	removeChild(node) {
		if (this.left === node) {
			this.left.parent = null;
			this.left = null;
		} else if (this.right === node) {
			this.right.parent = null;
			this.right = null;
		} else {
			throw "Passed node is not a child of this node";
		}
	}

	remove() {
		if (this.parent) {
			this.parent.removeChild(this);
		}
	}

	swapWithParent() {
		if (this.parent) {
			if (this.parent.left === this) {
				this.parent.left = null; // 
				
				
				if (this.parent.right) {
					this.right = this.parent.right;
					this.right.parent = this;
				}
				
				this.parent.right = null; //

				if (this.left) {
					this.parent.left = this.left;
					this.left.parent = this.parent;
				}

				if (this.right) {
					this.parent.right = this.right;
					this.right.parent = this.parent;
				}
				
				this.left = this.parent;
			}

			if (this.parent.right === this) {
				this.parent.right = null; // 

				if (this.left) {
					this.parent.left = this.left;
					this.left.parent = this.parent;
				}
				
				if (this.right) {
					this.parent.right = this.right;
					this.right.parent = this.parent;
				}
				
				this.left = this.parent.left;
				this.left.parent = this;
				this.right = this.parent;

				if (this.parent.parent) {
					this.parent.parent.right = this;
				}
			}
			
			[this.parent.parent, this.parent] = [this, this.parent.parent];
			
			
			if (this.parent) {
				if (this.parent.left) {
					if (this.parent.left.parent === this) {
						this.parent.left = this;
					}
				}	
				if (this.parent.right) {
					if (this.parent.right.parent === this) {
						this.parent.right = this;
					}
				}	
			}
		}
	}
}

module.exports = Node;
