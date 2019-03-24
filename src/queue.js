const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize = 30) {
		this.maxSize = maxSize;
	}

	push(data, priority) {

	}

	shift() {

	}

	size() {
		return this.length;

	}

	isEmpty() {
		return this.length === 0;		
	}
}

module.exports = PriorityQueue;
