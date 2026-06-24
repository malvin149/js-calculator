const buttonPanel = document.querySelector('.btn-panel');
const display = document.querySelector('.display');

let firstOperand = null;
let currentOperator = null;
let secondOperand = null;
let justCalculated = false;

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => {
    return (b === 0) ? `Error` : a / b;
};

const operate = (op, num1, num2) => {
    num1 = Number(num1);
    num2 = Number(num2);
    switch (op) {
        case '+':
            return add(num1, num2);
            break;
        case '-':
            return subtract(num1, num2);
            break;
        case '*':
            return multiply(num1, num2);
            break;
        case '/':
            return divide(num1, num2);
        break;
    }
}

const gateKeeper = () => firstOperand !== null && currentOperator !== null && secondOperand !== null;

buttonPanel.addEventListener('click', (e) => {
    if (e.target.classList.contains('digit-btn')) {
        if (justCalculated === true) {
            firstOperand = null;
            justCalculated = false;
        }
        if (currentOperator === null) {
            (firstOperand === null)
            ? firstOperand = e.target.textContent
            : firstOperand += e.target.textContent;
            display.textContent = firstOperand;
        }
        if (currentOperator !== null) {
            (secondOperand === null)
            ? secondOperand = e.target.textContent
            : secondOperand += e.target.textContent;
            display.textContent = secondOperand;
        }
    } else if (e.target.classList.contains('operator-btn')) {
        justCalculated = false;
        if (gateKeeper()) {
            let result = operate(currentOperator, firstOperand, secondOperand);
            firstOperand = result;
            display.textContent = firstOperand;
            currentOperator = e.target.textContent;
            secondOperand = null;
        } else {
            currentOperator = e.target.textContent;
        }
    } else if (e.target.classList.contains('equals-btn')) {
        if (gateKeeper()) {
            let result = operate(currentOperator, firstOperand, secondOperand);
            firstOperand = result;
            currentOperator = null;
            secondOperand = null;
            display.textContent = result;
            justCalculated = true;
        }
    } else if (e.target.classList.contains('clear-btn')) {
        firstOperand = null;
        currentOperator = null;
        secondOperand = null;
        display.textContent = '0';
    } else if (e.target.classList.contains('decimal-btn')) {
        if (currentOperator === null) {
           if (firstOperand === null) {
            firstOperand = '0.';
           } else if (!firstOperand.includes('.')) {
            firstOperand += '.'
           }
           display.textContent = firstOperand;
        }
        if (currentOperator !== null) {
           if (secondOperand === null) {
            secondOperand = '0.';
           } else if (!secondOperand.includes('.')) {
            secondOperand += '.'
           }
           display.textContent = secondOperand;
        }
    }
})