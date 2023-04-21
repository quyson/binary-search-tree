class Node {
  constructor(data) {
    (this.data = data), (this.right = null), (this.left = null);
  }
}

class Tree {
  constructor() {
    this.root = null;
  }

  buildTree = (array) => {
    const uniqueSortedData = [...new Set(array)].sort((a, b) => a - b);
    const root = this.buildTreeRecursive(
      uniqueSortedData,
      0,
      uniqueSortedData.length - 1
    );
    this.root = root;
    return this.root;
  };

  buildTreeRecursive = (array, start, end) => {
    if (start > end) {
      return null;
    }
    const middle = Math.floor((start + end) / 2);
    const newNode = new Node(array[middle]);
    newNode.left = this.buildTreeRecursive(array, start, middle - 1);
    newNode.right = this.buildTreeRecursive(array, middle + 1, end);
    return newNode;
  };
}

const tree = new Tree();
tree.buildTree([55, 2, 6, 6, 9, 8, 11, 3, 15, 49]);
console.log(tree.root);
