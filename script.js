const buttonPanel = document.querySelector('.btn-panel');
const display = document.querySelector('.display');

let firstOperand = null;
let currentOperator = null;
let secondOperand = null;
// prevent new digits from appending to a finished result
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
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
    }
}

// Ensure all three variables are present before attempting a calculation
const gateKeeper = () => firstOperand !== null && currentOperator !== null && secondOperand !== null;

const reset = () => {
    firstOperand = null;
    currentOperator = null;
    secondOperand = null;
    display.textContent = '0';
}

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
        } else {
            (secondOperand === null)
            ? secondOperand = e.target.textContent
            : secondOperand += e.target.textContent;
        }
    } else if (e.target.classList.contains('operator-btn')) {
        justCalculated = false;
        if (gateKeeper()) {
            let result = operate(currentOperator, firstOperand, secondOperand);
            firstOperand = result;
            if (result === 'Error') {
                reset();
            } else {
                // trims floating point results to avoid long trailing decimals
                display.textContent = parseFloat(firstOperand.toPrecision(10))
                currentOperator = e.target.textContent;
                secondOperand = null;
            }
        } else {
            currentOperator = e.target.textContent;
        }
    } else if (e.target.classList.contains('equals-btn')) {
        if (gateKeeper()) {
            let result = operate(currentOperator, firstOperand, secondOperand);
            firstOperand = result;
            currentOperator = null;
            secondOperand = null;
            result === 'Error' ? reset() : display.textContent = parseFloat(result.toPrecision(10));
            justCalculated = true;
        }
    } else if (e.target.classList.contains('clear-btn')) {
        reset();
    } else if (e.target.classList.contains('decimal-btn')) {
        if (currentOperator === null) {
           if (firstOperand === null) {
            firstOperand = '0.';
           } else if (!firstOperand.includes('.')) {
            firstOperand += '.'
           }
        } else {
           if (secondOperand === null) {
            secondOperand = '0.';
           } else if (!secondOperand.includes('.')) {
            secondOperand += '.'
           }
        }
    } else if (e.target.classList.contains('double-zero-btn')) {
        if (justCalculated === true) {
            firstOperand = null;
            justCalculated = false;
        }
        if (currentOperator === null) {
            if (firstOperand === null) firstOperand = e.target.textContent;
            else if (firstOperand === '0') firstOperand = '0';
            else firstOperand += e.target.textContent; 
        } else {
            if (secondOperand === null) secondOperand = e.target.textContent;
            else if (secondOperand === '0') secondOperand = '0';
            else secondOperand += e.target.textContent; 
        }
    } else if (e.target.classList.contains('sign-btn')) {
        if (justCalculated === true) {
            firstOperand = null;
            justCalculated = false;
        }
        if (currentOperator === null) {
            if (firstOperand === null) return 
            else firstOperand = firstOperand.startsWith('-') ? firstOperand.slice(1) : '-' + firstOperand;
        } else {
            if (secondOperand === null) return
            else secondOperand = secondOperand.startsWith('-') ? secondOperand.slice(1) : '-' + secondOperand;
        }
    } else if (e.target.classList.contains('delete-btn')) {
        if (currentOperator === null) {
            if (firstOperand === null) return;
            else if (firstOperand.length === 1) firstOperand = null; 
            else firstOperand = firstOperand.slice(0, -1);
        } else {
            if (secondOperand === null) return;
            else if (secondOperand.length === 1) secondOperand = null; 
            else secondOperand = secondOperand.slice(0, -1);
        }
    }
    // Fall back to '0' if the operand is null or undefined
    display.textContent = secondOperand === null ? firstOperand ?? '0' : secondOperand;
})


document.addEventListener('keydown', (e) => {
    // map special keys to their button equivalent
    let key = e.key;
    if (key === 'Enter') key = '=';
    if (key === 'Backspace') key = '⌫';
    if (key === 'Escape') key = 'AC';

    // find matching button and click it if it exists
    const matchingBtn = Array.from(document.querySelectorAll('button')).find(btn => btn.textContent === key);

    if (matchingBtn) matchingBtn.click();
})