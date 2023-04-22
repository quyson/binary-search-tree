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

  find = (value) => {
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
  };

  delete = (value) => {};

  levelOrder = (callback = null) => {
    if (!this.root) {
      return [];
    }

    const queue = [this.root];
    const values = [];

    while (queue.length > 0) {
      const node = queue.shift();
      values.push(node.data);

      if (callback) {
        callback(node);
      }

      if (node.left) {
        queue.push(node.left);
      }

      if (node.right) {
        queue.push(node.right);
      }
    }

    if (callback) {
      return;
    }

    return values;
  };

  preorder = () => {
    const nodes = [];

    const traverse = (node) => {
      nodes.push(node.data);
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    };

    traverse(this.root);

    return nodes;
  };

  inorder = () => {
    const nodes = [];

    const traverse = (node) => {
      if (node.left) traverse(node.left);
      nodes.push(node.data);
      if (node.right) traverse(node.right);
    };

    traverse(this.root);

    return nodes;
  };

  postorder = () => {
    const nodes = [];

    const traverse = (node) => {
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
      nodes.push(node.data);
    };

    traverse(this.root);

    return nodes;
  };

  height = (node) => {
    if (!node) {
      return -1;
    }
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    return 1 + Math.max(leftHeight, rightHeight);
  };

  findDepth(node) {
    if (!node) {
      return 0;
    }
    const leftDepth = this.findDepth(node.left);
    const rightDepth = this.findDepth(node.right);
    return Math.max(leftDepth, rightDepth) + 1;
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
console.log(tree.height(tree.root));
console.log(tree.findDepth(tree.root));
