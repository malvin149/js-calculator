// Variables
let firstNumber; 
let operator; 
let secondNumber;
let displayValue = '0'
let shouldClearDisplay = false;

// Get references to HTML elements
const display = document.getElementById('display');
const numberBtn = document.querySelectorAll('.number-button');



// Helper function
const updateDisplay = (value) => {
    display.textContent = value;
}

// Basic arithmetic Funtions
const add = (num1, num2) => {
    const result = num1 + num2;
    return result;
};

const subtract = (num1, num2) => {
    const result = num1 - num2;
    return result;
};

const multiply = (num1, num2) => {
    const result = num1 * num2;
    return result;
};

const divide = (num1, num2) => {
    if (num2 === 0) {
        return 'ERROR';
    }
    const result = num1 / num2;
    return result;
};


// The Operate Function
const operate = (operator, num1, num2) => {
    let result; 
    
    switch (operator) {
        case '+':
            result = add(num1, num2);
            break;
        case '-':
            result = subtract(num1, num2);
            break;
        case '*':
            result = multiply(num1, num2);
            break;
        case '/':
            result = divide(num1, num2);
            break;
    }
    if (result === 'ERROR') {
        return result;
    } else {
        return parseFloat(result.toFixed(8));
    }
}

// Event listeners
    numberBtn.forEach(button => (
        button.addEventListener('click', (event) => {
            const digit = event.target.dataset.value;
            
            if (displayValue === '0' || shouldClearDisplay) {
                displayValue = digit;
            } else {
                if (digit === '.' && displayValue.includes(('.'))) {
                    return;
                }
                displayValue += digit;
            }
            updateDisplay(displayValue);
        })
    ))
    
    updateDisplay(displayValue);