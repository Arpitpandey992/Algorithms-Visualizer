export const timer = (ms) => new Promise((res) => setTimeout(res, ms));

export const getCoor = (i, col) => {
    let x = Math.floor(i / col);
    let y = i % col;
    return [x, y];
};
export const getIndex = (i, j, col) => {
    return col * i + j;
}; 

export const findDistance = (i1, i2, col) => {
    let [x1, y1] = getCoor(i1, col);
    let [x2, y2] = getCoor(i2, col);
    // return Math.sqrt((y2 - y1) * (y2 - y1) + (x2 - x1) * (x2 - x1));
    return Math.abs(y2 - y1) + Math.abs(x2 - x1);
};

export const shuffleArr = (array) => {
    for (var i = array.length - 1; i > 0; i--) {
        var rand = Math.floor(Math.random() * (i + 1));
        [array[i], array[rand]] = [array[rand], array[i]];
    }
};

export const restoreGrid = (newArr, row, col) => {
    for (let i = 0; i < row * col; i++) {
        newArr[i].visited = false;
        if (newArr[i].type !== "wall") newArr[i].type = "empty";
        newArr[i].par = -1;
    }
};

class Node {
    constructor(val, priority) {
        this.val = val;
        this.priority = priority;
    }
}

export class PriorityQueue {
    constructor() {
        this.values = [];
    }
    enqueue(val, priority) {
        let newNode = new Node(val, priority);
        this.values.push(newNode);
        this.bubbleUp();
    }
    bubbleUp() {
        let idx = this.values.length - 1;
        const element = this.values[idx];
        while (idx > 0) {
            let parentIdx = Math.floor((idx - 1) / 2);
            let parent = this.values[parentIdx];
            if (element.priority >= parent.priority) break;
            this.values[parentIdx] = element;
            this.values[idx] = parent;
            idx = parentIdx;
        }
    }
    dequeue() {
        const min = this.values[0];
        const end = this.values.pop();
        if (this.values.length > 0) {
            this.values[0] = end;
            this.sinkDown();
        }
        return min;
    }
    sinkDown() {
        let idx = 0;
        const length = this.values.length;
        const element = this.values[0];
        while (true) {
            let leftChildIdx = 2 * idx + 1;
            let rightChildIdx = 2 * idx + 2;
            let leftChild, rightChild;
            let swap = null;

            if (leftChildIdx < length) {
                leftChild = this.values[leftChildIdx];
                if (leftChild.priority < element.priority) {
                    swap = leftChildIdx;
                }
            }
            if (rightChildIdx < length) {
                rightChild = this.values[rightChildIdx];
                if (
                    (swap === null && rightChild.priority < element.priority) ||
                    (swap !== null && rightChild.priority < leftChild.priority)
                ) {
                    swap = rightChildIdx;
                }
            }
            if (swap === null) break;
            this.values[idx] = this.values[swap];
            this.values[swap] = element;
            idx = swap;
        }
    }
}
