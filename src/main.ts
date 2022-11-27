
class Main {
    private binSearchTree: BinSearchTree = new BinSearchTree();

    constructor () {
        this.initTree();
        this.initButtons();
        this.printTree();
        this.initExpTree();
    }

    private initTree () {
        const randAmount = randomInteger(5, 25);

        for (let i = 0; i < randAmount; i++) {
            const randNum = idGenerator.generateId();
            const treeNode = new TreeNode(randNum);

            this.binSearchTree.insertNode(treeNode)
        }

        console.log(this.binSearchTree);
    }

    private initButtons () {
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

    private handleAddData () {
        const value = this.getInputValue()

        if (!value) {
            return;
        }

        const node = new TreeNode(value);

        this.binSearchTree.insertNode(node);

        this.redrawTree();
    }

    private getInputValue (): number | undefined {
        const input = document.querySelector('.searchInput') as HTMLInputElement;

        if (!input) {
            return;
        }

        if (input.value === '') {
            return;
        }

        return parseInt(input.value)
    }

    private handleFindNext () {
        const value = this.getInputValue()

        if (!value) {
            return;
        }

        const foundNode = this.binSearchTree.searchNumData(this.binSearchTree.rootNode, value);
        const foundNext = this.binSearchTree.findNext(foundNode);

        if (foundNext) {
            const {x, y} = foundNext.position;

            this.drawHighlighter(x, y);
        }
    }

    private handleFindPrev () {
        const value = this.getInputValue()

        if (!value) {
            return;
        }

        const foundNode = this.binSearchTree.searchNumData(this.binSearchTree.rootNode, value);
        const foundNext = this.binSearchTree.findPrev(foundNode);

        if (foundNext) {
            const {x, y} = foundNext.position;

            this.drawHighlighter(x, y);
        }
    }

    private handleRemove () {
        const value = this.getInputValue()

        if (!value) {
            return;
        }

        this.binSearchTree.remove(this.binSearchTree.rootNode, value);
        this.redrawTree();
    }

    private handleOrder () {
        const callback = (node: TreeNode<number>) => {
            console.log(node.data);
        }

        this.binSearchTree.inOrder(this.binSearchTree.rootNode, callback)
    }

    private handlePreorder () {
        const callback = (node: TreeNode<number>) => {
            console.log(node.data);
        }

        this.binSearchTree.preOrder(this.binSearchTree.rootNode, callback)
    }

    private handlePostorder () {
        const callback = (node: TreeNode<number>) => {
            console.log(node.data);
        }

        this.binSearchTree.postOrder(this.binSearchTree.rootNode, callback)
    }


    private handleWidth () {
        const callback = (node: TreeNode<number>) => {
            console.log(node.data);
        }

        this.binSearchTree.width(this.binSearchTree.rootNode, callback)
    }

    private handleMin () {
        const foundNode = this.binSearchTree.findMin(this.binSearchTree.rootNode);

        if (foundNode) {
            const {x, y} = foundNode.position;

            this.drawHighlighter(x, y);
        }
    }

    private handleMax () {
        const foundNode = this.binSearchTree.findMax(this.binSearchTree.rootNode);

        if (foundNode) {
            const {x, y} = foundNode.position;

            this.drawHighlighter(x, y);
        }
    }

    private handleSearchData () {
        const value = this.getInputValue()

        if (!value) {
            return;
        }

        const foundNode = this.binSearchTree.searchNumData(this.binSearchTree.rootNode, value);

        if (foundNode) {
            const {x, y} = foundNode.position;

            this.drawHighlighter(x, y);
        }
    }

    private redrawTree () {
        const myCanvas = document.querySelector('.myCanvas') as HTMLCanvasElement;
        const ctx = myCanvas.getContext('2d');

        ctx.clearRect(0, 0, 1000, 1000);

        this.printTree();
    }

    private printTree () {
        const myCanvas = document.querySelector('.myCanvas') as HTMLCanvasElement;
        const ctx = myCanvas.getContext('2d');

        this.drawGraphics(ctx)
    }

    private drawGraphics (ctx: CanvasRenderingContext2D) {
        const queue: TreeNode<number>[] = [];
        const black = "#000"
        queue.push(this.binSearchTree.rootNode)

        while (queue.length !== 0) {
            const node = queue.shift()
            const {x, y} = node.position
            const color = "#" + ( (1<<24) * Math.random() | 0 ).toString(16)

            ctx.beginPath()
            ctx.strokeStyle = black
            ctx.fillStyle = color
            ctx.fill()
            ctx.stroke()
            ctx.strokeStyle = black
            ctx.strokeText(`${String(node.data)}`, x, y - 5);

            [node.childA, node.childB].forEach((child) => {
                if (child) {
                    const {x: x1, y: y1} = child.position
                    ctx.beginPath();
                    ctx.moveTo(x, y + 30)
                    ctx.lineTo(x1, y1 - 30)
                    ctx.stroke()
                    queue.push(child)
                }
            })
        }
    }

    private drawHighlighter (x: number, y: number) {
        const el = document.querySelector('.highlighter') as HTMLDivElement

        if (el) {
            el.className = 'highlighter';

            el.style.left = `${x + 37}px`;
            el.style.top = `${y + 180}px`;
            el.style.display = 'block';
        }
    }

    private hideHighlighter () {
        const el = document.querySelector('.highlighter') as HTMLDivElement;

        el.style.display = 'none';
    }

    private initExpTree () {
        const button1 = document.querySelector('.expButton1') as HTMLButtonElement;
        const button2 = document.querySelector('.expButton2') as HTMLButtonElement;
        const button3 = document.querySelector('.expButton3') as HTMLButtonElement;
        const result = document.querySelector('.expRes') as HTMLParagraphElement;


        button1.addEventListener('click', () => {
            const expInput = document.querySelector('.expInput') as HTMLInputElement;
            const notationTree = new NotationTree();

            if (expInput.value === '') {
                return;
            }

            notationTree.init(expInput.value);

            result.textContent = notationTree.toPostfix();
        });

        button2.addEventListener('click', () => {
            const expInput = document.querySelector('.expInput') as HTMLInputElement;
            const notationTree = new NotationTree();

            if (expInput.value === '') {
                return;
            }

            notationTree.init(expInput.value);

            result.textContent = notationTree.toInfix();
        });

        button3.addEventListener('click', () => {
            const expInput = document.querySelector('.expInput') as HTMLInputElement;
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