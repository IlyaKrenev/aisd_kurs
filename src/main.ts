
class Main {
    private ansText: HTMLParagraphElement;
    private ansValue: HTMLHeadingElement;

    constructor () {
        this.ansText = document.querySelector('.ansText');
        this.ansValue = document.querySelector('.ansValue');

        this.hideAnswer();
        this.initButton();
    }

    private initButton () {
        const button = document.querySelector('.expButton');

        button.addEventListener('click', () => {
            const input = document.querySelector('.expInput') as HTMLInputElement;
            const exprValue = input.value;

            if (exprValue !== '') {
                const infixNotation = this.getInfix(exprValue);

                this.ansValue.textContent = this.calc(infixNotation);

                this.showAnswer();
            }
        })
    }

    private getInfix (exprStr: string) {
        const signs = ['-', '+', '*', '/', '^'];

        let result = '';

        if (signs.includes(exprStr[0])) {
            result = InfixNotation.fromPrefix(exprStr.split(' '))
        } else if (signs.includes(exprStr[exprStr.length - 1])) {
            result = InfixNotation.fromPostfix(exprStr.split(' '))
        } else {
            result = exprStr;
        }

        debugger

        return result;
    }

    private hideAnswer () {
        this.ansText.style.display = 'none';
        this.ansValue.style.display = 'none';
    }

    private showAnswer () {
        this.ansText.style.display = 'block';
        this.ansValue.style.display = 'block';
    }

    private calc (str: string) {
        const replaced = str.replace('^', '**');
        return Function(`'use strict'; return (${replaced})`)();
    }
}

const a = new Main();