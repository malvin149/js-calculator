const btnContainer = document.querySelector('.btn-container');
const displayDiv = document.querySelector('.display');

let firstNumber = null;
let operator = null;
let secondNumber = null;

const operate = (op, num1, num2) => {
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

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => {
    return (b === 0) ? `Error` : a / b;
};

btnContainer.addEventListener('click', (e) => {
    console.log(e.target.textContent);
    if(e.target.classList.contains('digit-btn')) {
        if(operator === null) {
            (firstNumber === null)
            ? firstNumber = e.target.textContent
            : firstNumber += e.target.textContent;
            displayDiv.textContent = firstNumber;
        }
        if(operator !== null) {
            (secondNumber === null)
            ? secondNumber = e.target.textContent
            : secondNumber += e.target.textContent;
            displayDiv.textContent = secondNumber
        }
    }
})