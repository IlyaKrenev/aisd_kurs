type Coords = {
    x: number;
    y: number;
}

class TreeNode<T> {
    public childA: TreeNode<T> | null = null;
    public childB: TreeNode<T> | null = null;
    public parent: TreeNode<T> | null = null;
    public data: T;

    // used for UI
    public position: Coords;

    constructor (data: T) {
        this.data = data;
        this.position = {x: 0, y: 0}
    }

    findMin() {
        if (!this.childA) {
            return this;
        }

        return this.childA.findMin();
    }
}

class BinSearchTree<T extends any = number> {
    public rootNode: TreeNode<T> | null = null;
    public startPosition: Coords;
    public axisX: number;
    public axisY: number;

    constructor () {
        this.startPosition = {x: 800, y: 44}
        this.axisX = 350
        this.axisY = 80
    }

    getPosition ({x , y}, ischildA = false){
        return { x: ischildA ? x - this.axisX + y : x + this.axisX - y, y: y + this.axisY }
    }

    insertNode (node: TreeNode<T>) {
        if (this.rootNode === null) {
            node.position = this.startPosition
            this.rootNode = node;
        } else {
            this.insertNodeDeep(this.rootNode, node);
        }
    }

    insertNodeDeep (parentNode: TreeNode<T>, childNode: TreeNode<T>) {
        if (parentNode.data > childNode.data) {
            if (parentNode.childA === null) {
                childNode.position = this.getPosition(parentNode.position, true);
                childNode.parent = parentNode;
                parentNode.childA = childNode;
            } else {
                this.insertNodeDeep(parentNode.childA, childNode);
            }
        } else {
            if (parentNode.childB === null) {
                childNode.position = this.getPosition(parentNode.position);
                childNode.parent = parentNode;
                parentNode.childB = childNode;
            } else {
                this.insertNodeDeep(parentNode.childB, childNode);
            }
        }
    }

    findNext (x: TreeNode<T>) {
        if (x.childB !== null) {
            return this.findMin(x.childB);
        }

        let y = x.parent;

        while (y !== null && x === y.childB) {
            x = y;
            y = y.parent;
        }

        return y;
    }

    findPrev (x: TreeNode<T>) {
        if (x.childA !== null) {
            return this.findMax(x.childA);
        }

        let y = x.parent;

        while (y !== null && x === y.childA) {
            x = y;
            y = y.parent;
        }

        return y;
    }

    findMin (node: TreeNode<T>) {
        if (node.childA === null) {
            return node;
        }

        return this.findMin(node.childA)
    }

    findMax (node: TreeNode<T>) {
        if (node.childB === null) {
            return node;
        }

        return this.findMax(node.childB)
    }

    inOrder (node: TreeNode<T>, callback: (node: TreeNode<T>) => void) {
        if (node != null) {
            this.inOrder(node.childA, callback);

            callback(node);

            this.inOrder(node.childB, callback);
        }
    }

    preOrder (node: TreeNode<T>, callback: (node: TreeNode<T>) => void) {
        if (node != null) {
            callback(node);

            this.preOrder(node.childA, callback);
            this.preOrder(node.childB, callback);
        }
    }

    postOrder (node: TreeNode<T>, callback: (node: TreeNode<T>) => void) {
        if (node != null) {
            this.postOrder(node.childA, callback);
            this.postOrder(node.childB, callback);

            callback(node);
        }
    }

    searchNumData (node: TreeNode<T>, searchData: number): TreeNode<T> | null {
        if (node === null) {
            return null;
        }

        if (node.data > searchData) {
            return this.searchNumData(node.childA, searchData);
        }

        if (node.data < searchData) {
            return this.searchNumData(node.childB, searchData);
        }

        if (node.data === searchData) {
            return node;
        }

        return null;
    }

    remove (root : TreeNode<T>, z: number) {
        if (z < root.data) {
            root.childA = this.remove(root.childA, z)
        } else if (z > root.data) {
            root.childB = this.remove(root.childB, z)
        } else if (root.childA !== null && root.childB !== null) {
            const min = this.findMin(root.childB);
            root.data = min?.data
            root.childB = this.remove(root.childB, root.data as number)
        } else {
            if (root.childA !== null) {
                root = root.childA
            } else if (root.childB !== null) {
                root = root.childB
            } else {
                root = null;
            }
        }

        return root;
    }

    width (root: TreeNode<T>, callback: (root: TreeNode<T>) => void) {
        let nodeQueue = new Queue();
        nodeQueue.enqueue(root);

        while (!nodeQueue.isEmpty()) {
            let currentNode = nodeQueue.dequeue();

            callback(currentNode);

            if (currentNode.childA) {
                nodeQueue.enqueue(currentNode.childA);
            }

            if (currentNode.childB) {
                nodeQueue.enqueue(currentNode.childB);
            }
        }
    }
}

class NotationTree extends BinSearchTree<string | number> {
    public init (str: string) {
        function newNode(c)
        {
            let n = new TreeNode(c);
            return n;
        }

        let s;

        // Stack to hold nodes
        let stN = [];

        // Stack to hold chars
        let stC = [];
        let t, t1, t2;

        // Prioritising the operators
        let p = new Array(123);
        p['+'.charCodeAt(0)] = p['-'.charCodeAt(0)] = 1;
        p['/'.charCodeAt(0)] = p['*'.charCodeAt(0)] = 2;
        p['^'.charCodeAt(0)] = 3;
        p[')'.charCodeAt(0)] = 0;

        const signs = ['-', '+', '*', '/', '^'];

        if (signs.includes(str[0])) {
            s = InfixNotation.fromPrefix(str)
        } else if (signs.includes(str[str.length - 1])) {
            s = InfixNotation.fromPostfix(str)
        } else {
            s = str;
        }

        s = "(" + s;
        s += ")";

        for (let i = 0; i < s.length; i++)
        {
            if (s[i] == '(')
            {

                // Push '(' in char stack
                stC.push(s[i]);
            }

            // Push the operands in node stack
            else if ((/[a-zA-Z]/).test(s[i]))
            {
                t = newNode(s[i]);
                stN.push(t);
            }
            else if (p[s[i].charCodeAt(0)] > 0)
            {

                // If an operator with lower or
                // same associativity appears
                while (stC.length != 0 && stC[stC.length - 1] != '('
                && ((s[i] != '^' &&
                        p[stC[stC.length - 1].charCodeAt(0)] >=
                        p[s[i].charCodeAt(0)])
                    || (s[i] == '^'&&
                        p[stC[stC.length - 1].charCodeAt(0)] >
                        p[s[i].charCodeAt(0)])))
                {

                    // Get and remove the top element
                    // from the character stack
                    t = newNode(stC[stC.length - 1]);
                    stC.pop();

                    // Get and remove the top element
                    // from the node stack
                    t1 = stN[stN.length - 1];
                    stN.pop();

                    // Get and remove the currently top
                    // element from the node stack
                    t2 = stN[stN.length - 1];
                    stN.pop();

                    // Update the tree
                    t.childA = t2;
                    t.childB = t1;

                    // Push the node to the node stack
                    stN.push(t);
                }

                // Push s[i] to char stack
                stC.push(s[i]);
            }
            else if (s[i] == ')')
            {
                while (stC.length != 0 &&
                stC[stC.length - 1] != '(')
                {
                    t = newNode(stC[stC.length - 1]);
                    stC.pop();
                    t1 = stN[stN.length - 1];
                    stN.pop();
                    t2 = stN[stN.length - 1];
                    stN.pop();
                    t.childA = t2;
                    t.childB = t1;
                    stN.push(t);
                }
                stC.pop();
            }
        }
        t = stN[stN.length - 1];

        this.rootNode = t;
    }

    public toPrefix () {
        let str = [];

        const callback = (node: TreeNode<string | number>) => {
            str.push(node.data);
        }

        this.postOrder(this.rootNode, callback);

        return str.reverse().join('');
    }

    public toPostfix () {
        let str = [];

        const callback = (node: TreeNode<string | number>) => {
            str.push(node.data);
        }

        this.postOrder(this.rootNode, callback);

        return str.join('');
    }

    public toInfix () {
        let str = [];

        const callback = (node: TreeNode<string | number>) => {
            str.push(node.data);
        }

        this.inOrder(this.rootNode, callback);

        return str.join('');
    }
}