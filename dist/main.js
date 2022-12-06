class InfixNotation {
    static isOperator(who) {
        return ((who == "+" || who == "-" || who == "*" || who == "/" || who == "^" || who == "(" || who == ")"));
    }
    static isOperand(who) {
        return (!this.isOperator(who));
    }
    static fromPostfix(arr, position = 0, stack = [], currPriority = 0) {
        let operator1, operator2;
        if (position === arr.length) {
            return stack.pop();
        }
        const priority = {
            '(': 0,
            ')': 0,
            '+': 1,
            '-': 1,
            '*': 2,
            '/': 2,
            '^': 3,
        };
        if (this.isOperand(arr[position])) {
            stack.push(arr[position]);
        }
        else {
            operator1 = stack.pop();
            operator2 = stack.pop();
            const strToPush = [];
            if (priority[arr[position]] && priority[arr[position]] < currPriority) {
                strToPush.push('(' + operator2);
            }
            else {
                strToPush.push(operator2);
            }
            strToPush.push(arr[position]);
            if (priority[arr[position]] && priority[arr[position]] < currPriority) {
                strToPush.push(operator1 + ')');
            }
            else {
                strToPush.push(operator1);
            }
            stack.push(strToPush.join(''));
        }
        const newPriority = priority[arr[position]] || currPriority;
        return this.fromPostfix(arr, position + 1, stack, newPriority);
    }
    static fromPrefix(arr, currPriority = 0) {
        const firstElem = arr.shift();
        const priority = {
            '(': 0,
            ')': 0,
            '+': 1,
            '-': 1,
            '*': 2,
            '/': 2,
            '^': 3,
        };
        if (firstElem && this.isOperator(firstElem)) {
            const prior = priority[firstElem];
            const left = (currPriority > prior || 0) ? '(' : '';
            const right = (currPriority > prior || 0) ? ')' : '';
            return String(left + this.fromPrefix(arr, prior) + firstElem + this.fromPrefix(arr, prior) + right);
        }
        else {
            return firstElem;
        }
    }
}
class Main {
    constructor() {
        this.ansText = document.querySelector('.ansText');
        this.ansValue = document.querySelector('.ansValue');
        this.hideAnswer();
        this.initButton();
    }
    initButton() {
        const button = document.querySelector('.expButton');
        button.addEventListener('click', () => {
            const input = document.querySelector('.expInput');
            const exprValue = input.value;
            if (exprValue !== '') {
                const infixNotation = this.getInfix(exprValue);
                this.ansValue.textContent = this.calc(infixNotation);
                this.showAnswer();
            }
        });
    }
    getInfix(exprStr) {
        const signs = ['-', '+', '*', '/', '^'];
        let result = '';
        if (signs.includes(exprStr[0])) {
            result = InfixNotation.fromPrefix(exprStr.split(' '));
        }
        else if (signs.includes(exprStr[exprStr.length - 1])) {
            result = InfixNotation.fromPostfix(exprStr.split(' '));
        }
        else {
            result = exprStr;
        }
        debugger;
        return result;
    }
    hideAnswer() {
        this.ansText.style.display = 'none';
        this.ansValue.style.display = 'none';
    }
    showAnswer() {
        this.ansText.style.display = 'block';
        this.ansValue.style.display = 'block';
    }
    calc(str) {
        const replaced = str.replace('^', '**');
        return Function(`'use strict'; return (${replaced})`)();
    }
}
const a = new Main();
