class Queue {
    private arr = [];

    constructor() {
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
    private static isOperator(x) {
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

    private static isOperand(x) {
        return (x >= 'a' && x <= 'z') ||
            (x >= 'A' && x <= 'Z');
    }

    public static fromPrefix (str: string) {
        let stack = [];

        let l = str.length;

        for(let i = l - 1; i >= 0; i--)
        {
            let c = str[i];

            if (this.isOperator(c))
            {
                let op1 = stack[stack.length - 1];
                stack.pop()
                let op2 = stack[stack.length - 1];
                stack.pop()

                let temp = "(" + op1 + c + op2 + ")";
                stack.push(temp);
            }
            else
            {
                stack.push(c + "");
            }
        }
        return stack[stack.length - 1];
    }

    public static fromPostfix (str: string) {
        let s = [];

        for (let i = 0; i < str.length; i++)
        {
            // Push operands
            if (this.isOperand(str[i]))
            {
                s.push(str[i] + "");
            }

            else
            {
                let op1 = s.pop();

                let op2 = s.pop();
                s.pop();
                s.push("(" + op2 + str[i] +
                    op1 + ")");
            }
        }

        return s[s.length-1];
    }
}

function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

class idGenerator {
    public static usedIds: number[] = [];

    public static generateId () {
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
