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

  insert = (data) => {
    const node = new Node(data);
    if (!this.root) {
      this.root = node;
    }
    let current = this.root;
    while (current) {
      if (data < current.data) {
        if (!current.left) {
          current.left = node;
          return;
        }
        current = current.left;
      }
      if (data > current.data) {
        if (!current.right) {
          current.right = node;
          return;
        }
        current = current.right;
      }
    }
  };

  find(value) {
    let current = this.root;
    while (current !== null) {
      if (value === current.data) {
        return current;
      } else if (value < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return null;
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const tree = new Tree();
tree.buildTree([55, 2, 6, 6, 9, 8, 11, 3, 15, 49]);
console.log(tree.root);
prettyPrint(tree.root);
tree.insert(26);
prettyPrint(tree.root);
console.log(tree.find(26));
