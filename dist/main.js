class Queue {
    constructor() {
        this.arr = [];
        this.arr = [];
    }
    enqueue(value) {
        this.arr.push(value);
    }
    dequeue() {
        return this.arr.shift();
    }
    isEmpty() {
        return this.arr.length == 0;
    }
}
class InfixNotation {
    static isOperator(x) {
        switch (x) {
            case '+':
            case '-':
            case '*':
            case '/':
            case '^':
            case '%':
                return true;
        }
    }
    static isOperand(x) {
        return (x >= 'a' && x <= 'z') ||
            (x >= 'A' && x <= 'Z');
    }
    static fromPrefix(str) {
        let stack = [];
        let l = str.length;
        for (let i = l - 1; i >= 0; i--) {
            let c = str[i];
            if (this.isOperator(c)) {
                let op1 = stack[stack.length - 1];
                stack.pop();
                let op2 = stack[stack.length - 1];
                stack.pop();
                let temp = "(" + op1 + c + op2 + ")";
                stack.push(temp);
            }
            else {
                stack.push(c + "");
            }
        }
        return stack[stack.length - 1];
    }
    static fromPostfix(str) {
        let s = [];
        for (let i = 0; i < str.length; i++) {
            // Push operands
            if (this.isOperand(str[i])) {
                s.push(str[i] + "");
            }
            else {
                let op1 = s.pop();
                let op2 = s.pop();
                s.pop();
                s.push("(" + op2 + str[i] +
                    op1 + ")");
            }
        }
        return s[s.length - 1];
    }
}
function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}
class idGenerator {
    static generateId() {
        let newId;
        while (true) {
            newId = Math.floor(Math.random() * 100);
            if (!this.usedIds.includes(newId)) {
                this.usedIds.push(newId);
                break;
            }
        }
        return newId;
    }
}
idGenerator.usedIds = [];
class TreeNode {
    constructor(data) {
        this.childA = null;
        this.childB = null;
        this.parent = null;
        this.data = data;
        this.position = { x: 0, y: 0 };
    }
    findMin() {
        if (!this.childA) {
            return this;
        }
        return this.childA.findMin();
    }
}
class BinSearchTree {
    constructor() {
        this.rootNode = null;
        this.startPosition = { x: 800, y: 44 };
        this.axisX = 350;
        this.axisY = 80;
    }
    getPosition({ x, y }, ischildA = false) {
        return { x: ischildA ? x - this.axisX + y : x + this.axisX - y, y: y + this.axisY };
    }
    insertNode(node) {
        if (this.rootNode === null) {
            node.position = this.startPosition;
            this.rootNode = node;
        }
        else {
            this.insertNodeDeep(this.rootNode, node);
        }
    }
    insertNodeDeep(parentNode, childNode) {
        if (parentNode.data > childNode.data) {
            if (parentNode.childA === null) {
                childNode.position = this.getPosition(parentNode.position, true);
                childNode.parent = parentNode;
                parentNode.childA = childNode;
            }
            else {
                this.insertNodeDeep(parentNode.childA, childNode);
            }
        }
        else {
            if (parentNode.childB === null) {
                childNode.position = this.getPosition(parentNode.position);
                childNode.parent = parentNode;
                parentNode.childB = childNode;
            }
            else {
                this.insertNodeDeep(parentNode.childB, childNode);
            }
        }
    }
    findNext(x) {
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
    findPrev(x) {
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
    findMin(node) {
        if (node.childA === null) {
            return node;
        }
        return this.findMin(node.childA);
    }
    findMax(node) {
        if (node.childB === null) {
            return node;
        }
        return this.findMax(node.childB);
    }
    inOrder(node, callback) {
        if (node != null) {
            this.inOrder(node.childA, callback);
            callback(node);
            this.inOrder(node.childB, callback);
        }
    }
    preOrder(node, callback) {
        if (node != null) {
            callback(node);
            this.preOrder(node.childA, callback);
            this.preOrder(node.childB, callback);
        }
    }
    postOrder(node, callback) {
        if (node != null) {
            this.postOrder(node.childA, callback);
            this.postOrder(node.childB, callback);
            callback(node);
        }
    }
    searchNumData(node, searchData) {
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
    remove(root, z) {
        if (z < root.data) {
            root.childA = this.remove(root.childA, z);
        }
        else if (z > root.data) {
            root.childB = this.remove(root.childB, z);
        }
        else if (root.childA !== null && root.childB !== null) {
            const min = this.findMin(root.childB);
            root.data = min === null || min === void 0 ? void 0 : min.data;
            root.childB = this.remove(root.childB, root.data);
        }
        else {
            if (root.childA !== null) {
                root = root.childA;
            }
            else if (root.childB !== null) {
                root = root.childB;
            }
            else {
                root = null;
            }
        }
        return root;
    }
    width(root, callback) {
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
class NotationTree extends BinSearchTree {
    init(str) {
        function newNode(c) {
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
            s = InfixNotation.fromPrefix(str);
        }
        else if (signs.includes(str[str.length - 1])) {
            s = InfixNotation.fromPostfix(str);
        }
        else {
            s = str;
        }
        s = "(" + s;
        s += ")";
        for (let i = 0; i < s.length; i++) {
            if (s[i] == '(') {
                // Push '(' in char stack
                stC.push(s[i]);
            }
            // Push the operands in node stack
            else if ((/[a-zA-Z]/).test(s[i])) {
                t = newNode(s[i]);
                stN.push(t);
            }
            else if (p[s[i].charCodeAt(0)] > 0) {
                // If an operator with lower or
                // same associativity appears
                while (stC.length != 0 && stC[stC.length - 1] != '('
                    && ((s[i] != '^' &&
                        p[stC[stC.length - 1].charCodeAt(0)] >=
                            p[s[i].charCodeAt(0)])
                        || (s[i] == '^' &&
                            p[stC[stC.length - 1].charCodeAt(0)] >
                                p[s[i].charCodeAt(0)]))) {
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
            else if (s[i] == ')') {
                while (stC.length != 0 &&
                    stC[stC.length - 1] != '(') {
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
    toPrefix() {
        let str = [];
        const callback = (node) => {
            str.push(node.data);
        };
        this.postOrder(this.rootNode, callback);
        return str.reverse().join('');
    }
    toPostfix() {
        let str = [];
        const callback = (node) => {
            str.push(node.data);
        };
        this.postOrder(this.rootNode, callback);
        return str.join('');
    }
    toInfix() {
        let str = [];
        const callback = (node) => {
            str.push(node.data);
        };
        this.inOrder(this.rootNode, callback);
        return str.join('');
    }
}
class Main {
    constructor() {
        this.binSearchTree = new BinSearchTree();
        this.initTree();
        this.initButtons();
        this.printTree();
        this.initExpTree();
    }
    initTree() {
        const randAmount = randomInteger(5, 25);
        for (let i = 0; i < randAmount; i++) {
            const randNum = idGenerator.generateId();
            const treeNode = new TreeNode(randNum);
            this.binSearchTree.insertNode(treeNode);
        }
        console.log(this.binSearchTree);
    }
    initButtons() {
        const container = document.querySelector('.main');
        const buttons = [
            {
                name: 'Добавить элемент',
                handler: this.handleAddData.bind(this)
            },
            {
                name: 'Поиск данных',
                handler: this.handleSearchData.bind(this)
            },
            {
                name: 'Удалить элемент',
                handler: this.handleRemove.bind(this)
            },
            {
                name: 'Найти следующий',
                handler: this.handleFindNext.bind(this)
            },
            {
                name: 'Найти предыдущий',
                handler: this.handleFindPrev.bind(this)
            },
            {
                name: 'Найти минимум',
                handler: this.handleMin.bind(this)
            },
            {
                name: 'Найти максимум',
                handler: this.handleMax.bind(this)
            },
            {
                name: 'Прямой обход',
                handler: this.handleOrder.bind(this)
            },
            {
                name: 'Центрированный обход',
                handler: this.handlePreorder.bind(this)
            },
            {
                name: 'Обратный обход',
                handler: this.handlePostorder.bind(this)
            },
            {
                name: 'Обход в ширину',
                handler: this.handleWidth.bind(this)
            },
        ];
        buttons.forEach((button) => {
            const buttonEl = document.createElement('button');
            buttonEl.innerText = button.name;
            buttonEl.addEventListener('click', () => {
                this.hideHighlighter();
                button.handler();
            });
            container.appendChild(buttonEl);
        });
    }
    handleAddData() {
        const value = this.getInputValue();
        if (!value) {
            return;
        }
        const node = new TreeNode(value);
        this.binSearchTree.insertNode(node);
        this.redrawTree();
    }
    getInputValue() {
        const input = document.querySelector('.searchInput');
        if (!input) {
            return;
        }
        if (input.value === '') {
            return;
        }
        return parseInt(input.value);
    }
    handleFindNext() {
        const value = this.getInputValue();
        if (!value) {
            return;
        }
        const foundNode = this.binSearchTree.searchNumData(this.binSearchTree.rootNode, value);
        const foundNext = this.binSearchTree.findNext(foundNode);
        if (foundNext) {
            const { x, y } = foundNext.position;
            this.drawHighlighter(x, y);
        }
    }
    handleFindPrev() {
        const value = this.getInputValue();
        if (!value) {
            return;
        }
        const foundNode = this.binSearchTree.searchNumData(this.binSearchTree.rootNode, value);
        const foundNext = this.binSearchTree.findPrev(foundNode);
        if (foundNext) {
            const { x, y } = foundNext.position;
            this.drawHighlighter(x, y);
        }
    }
    handleRemove() {
        const value = this.getInputValue();
        if (!value) {
            return;
        }
        this.binSearchTree.remove(this.binSearchTree.rootNode, value);
        this.redrawTree();
    }
    handleOrder() {
        const callback = (node) => {
            console.log(node.data);
        };
        this.binSearchTree.inOrder(this.binSearchTree.rootNode, callback);
    }
    handlePreorder() {
        const callback = (node) => {
            console.log(node.data);
        };
        this.binSearchTree.preOrder(this.binSearchTree.rootNode, callback);
    }
    handlePostorder() {
        const callback = (node) => {
            console.log(node.data);
        };
        this.binSearchTree.postOrder(this.binSearchTree.rootNode, callback);
    }
    handleWidth() {
        const callback = (node) => {
            console.log(node.data);
        };
        this.binSearchTree.width(this.binSearchTree.rootNode, callback);
    }
    handleMin() {
        const foundNode = this.binSearchTree.findMin(this.binSearchTree.rootNode);
        if (foundNode) {
            const { x, y } = foundNode.position;
            this.drawHighlighter(x, y);
        }
    }
    handleMax() {
        const foundNode = this.binSearchTree.findMax(this.binSearchTree.rootNode);
        if (foundNode) {
            const { x, y } = foundNode.position;
            this.drawHighlighter(x, y);
        }
    }
    handleSearchData() {
        const value = this.getInputValue();
        if (!value) {
            return;
        }
        const foundNode = this.binSearchTree.searchNumData(this.binSearchTree.rootNode, value);
        if (foundNode) {
            const { x, y } = foundNode.position;
            this.drawHighlighter(x, y);
        }
    }
    redrawTree() {
        const myCanvas = document.querySelector('.myCanvas');
        const ctx = myCanvas.getContext('2d');
        ctx.clearRect(0, 0, 1000, 1000);
        this.printTree();
    }
    printTree() {
        const myCanvas = document.querySelector('.myCanvas');
        const ctx = myCanvas.getContext('2d');
        this.drawGraphics(ctx);
    }
    drawGraphics(ctx) {
        const queue = [];
        const black = "#000";
        queue.push(this.binSearchTree.rootNode);
        while (queue.length !== 0) {
            const node = queue.shift();
            const { x, y } = node.position;
            const color = "#" + ((1 << 24) * Math.random() | 0).toString(16);
            ctx.beginPath();
            ctx.strokeStyle = black;
            ctx.fillStyle = color;
            ctx.fill();
            ctx.stroke();
            ctx.strokeStyle = black;
            ctx.strokeText(`${String(node.data)}`, x, y - 5);
            [node.childA, node.childB].forEach((child) => {
                if (child) {
                    const { x: x1, y: y1 } = child.position;
                    ctx.beginPath();
                    ctx.moveTo(x, y + 30);
                    ctx.lineTo(x1, y1 - 30);
                    ctx.stroke();
                    queue.push(child);
                }
            });
        }
    }
    drawHighlighter(x, y) {
        const el = document.querySelector('.highlighter');
        if (el) {
            el.className = 'highlighter';
            el.style.left = `${x + 37}px`;
            el.style.top = `${y + 180}px`;
            el.style.display = 'block';
        }
    }
    hideHighlighter() {
        const el = document.querySelector('.highlighter');
        el.style.display = 'none';
    }
    initExpTree() {
        const button1 = document.querySelector('.expButton1');
        const button2 = document.querySelector('.expButton2');
        const button3 = document.querySelector('.expButton3');
        const result = document.querySelector('.expRes');
        button1.addEventListener('click', () => {
            const expInput = document.querySelector('.expInput');
            const notationTree = new NotationTree();
            if (expInput.value === '') {
                return;
            }
            notationTree.init(expInput.value);
            result.textContent = notationTree.toPostfix();
        });
        button2.addEventListener('click', () => {
            const expInput = document.querySelector('.expInput');
            const notationTree = new NotationTree();
            if (expInput.value === '') {
                return;
            }
            notationTree.init(expInput.value);
            result.textContent = notationTree.toInfix();
        });
        button3.addEventListener('click', () => {
            const expInput = document.querySelector('.expInput');
            const notationTree = new NotationTree();
            if (expInput.value === '') {
                return;
            }
            const reversed = expInput.value.split('').reverse().join('');
            notationTree.init(reversed);
            result.textContent = notationTree.toPrefix();
        });
    }
}
const a = new Main();
