class InfixNotation {
    private static isOperator(who) {
        return((who == "+" || who == "-" || who == "*" || who == "/" || who == "^" || who == "(" || who == ")"));
    }

    private static isOperand(who) {
        return(!this.isOperator(who));
    }

    public static fromPostfix (arr: string[], position = 0, stack = [], currPriority = 0) {
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
        }

        if (this.isOperand(arr[position])) {
            stack.push(arr[position]);
        } else {
            operator1 = stack.pop();
            operator2 = stack.pop();

            const strToPush = [];

            if (priority[arr[position]] && priority[arr[position]] < currPriority) {
                strToPush.push('(' + operator2)
            } else {
                strToPush.push(operator2)
            }

            strToPush.push(arr[position])

            if (priority[arr[position]] && priority[arr[position]] < currPriority) {
                strToPush.push(operator1 + ')')
            } else {
                strToPush.push(operator1)
            }

            stack.push(strToPush.join(''))
        }

        const newPriority = priority[arr[position]] || currPriority;

        return this.fromPostfix(arr, position + 1, stack, newPriority);
    }

    public static fromPrefix (arr: string[], currPriority = 0) {
        const firstElem = arr.shift();

        const priority = {
            '(': 0,
            ')': 0,
            '+': 1,
            '-': 1,
            '*': 2,
            '/': 2,
            '^': 3,
        }

        if (firstElem && this.isOperator(firstElem)) {
            const prior = priority[firstElem];
            const left = (currPriority > prior || 0) ? '(' : '';
            const right = (currPriority > prior || 0) ? ')' : '';

            return String(left + this.fromPrefix(arr, prior) + firstElem + this.fromPrefix(arr, prior) + right);
        } else {
            return firstElem;
        }
    }
}
