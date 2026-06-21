const btnContainer = document.querySelector('.btn-container');

const operate = (operator, firstNumber, secondNumber) => {

    firstNumber = Number(firstNumber);
    secondNumber = Number(secondNumber);
    switch (operator) {
        case '+':
            return add(firstNumber, secondNumber);
            break;
        case '-':
            return subtract(firstNumber, secondNumber);
            break;
        case '*':
            return multiply(firstNumber, secondNumber);
            break;
        case '/':
            return divide(firstNumber, secondNumber);
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
})