// Variables
let firstNumber = null; 
let operator = null; 
let secondNumber = null;
let displayValue = '0';
let waitingForSecondNumber = false;
let shouldClearDisplay = false;

// Get references to HTML elements
const display = document.getElementById('display');
const numberButtons = document.querySelectorAll('.number-button');
const operatorButtons = document.querySelectorAll('.operator-button');
const equalsButton = document.querySelector('.equals-button');
// const clearButton = document.querySelector('[data-action="clear"]')



// Helper function
const updateDisplay = (value) => {
    display.textContent = value;
}

const resetCalculatorState = () => {
    firstNumber = null; 
    operator = null; 
    secondNumber = null; 
    displayValue = '0'; 
    waitingForSecondNumber = false;
    shouldClearDisplay = false;
}

// Basic arithmetic Funtions
const add = (firstNumber, secondNumber) => {
    const result = firstNumber + secondNumber;
    return result;
};

const subtract = (firstNumber, secondNumber) => {
    const result = firstNumber - secondNumber;
    return result;
};

const multiply = (firstNumber, secondNumber) => {
    const result = firstNumber * secondNumber;
    return result;
};

const divide = (firstNumber, secondNumber) => {
    if (secondNumber === 0) {
        return 'ERROR';
    }
    const result = firstNumber / secondNumber;
    return result;
};


// The Operate Function
const operate = (operator, firstNumber, secondNumber) => {
    let result; 
    
    switch (operator) {
        case 'add':
        case '+':
            result = add(firstNumber, secondNumber);
            break;
        case 'subtract':
        case '-':
            result = subtract(firstNumber, secondNumber);
            break;
        case 'multiply':
        case '*':
            result = multiply(firstNumber, secondNumber);
            break;
        case 'divide':
        case '/':
            result = divide(firstNumber, secondNumber);
            break;
        default:
            result = 'ERROR';
            break;
    }

    if (result === 'ERROR') {
        return result;
    } else {
        return parseFloat(result.toFixed(8));
    }
}



// Event listeners
numberButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const digit = event.target.dataset.value;
        

        if (displayValue === '0' || shouldClearDisplay) {
            displayValue = digit;
            shouldClearDisplay = false;
            
        } else {
            if (digit === '.' && displayValue.includes('.')) {
                return;
            }
            displayValue += digit;
        }

        if (waitingForSecondNumber) {
            waitingForSecondNumber = false;
        }
        updateDisplay(displayValue);
        
    })
})

operatorButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const nextOperator = event.target.dataset.action;
        
        
        if (operator === null) {
            firstNumber = parseFloat(displayValue);
            operator = nextOperator;
            waitingForSecondNumber = true;
            shouldClearDisplay = true;
        } else if (waitingForSecondNumber) {
            operator = nextOperator;
            shouldClearDisplay = true;
        } else {
            secondNumber = parseFloat(displayValue);

            console.log('CALCULATION:', {firstNumber, operator, secondNumber});
            
            let result = operate(operator, firstNumber, secondNumber);

            console.log('RESULT:', result);
            
            
            // handle division by zero error
            if (result === 'ERROR') {
                updateDisplay('ERROR');
                resetCalculatorState();
                return;
            }
            firstNumber = result;
            operator = nextOperator;
            displayValue = firstNumber.toString();
            updateDisplay(firstNumber);
            waitingForSecondNumber = true;
            shouldClearDisplay = true;
        } 
        console.log('OPERATOR - After logic:', {firstNumber, operator, waitingForSecondNumber, shouldClearDisplay, displayValue, nextOperator });
        
    })
})


equalsButton.addEventListener('click', (event) => {

    if (firstNumber === null || operator === null) {
        return;
    }

    secondNumber = parseFloat(displayValue);
    console.log('EQUALS CALCULATION:', {firstNumber, operator, secondNumber});
    
    
    let result = operate(operator, firstNumber, secondNumber);
    console.log('EQUALS RESULT:', result);
    
    if (result === 'ERROR') {
        displayValue = 'ERROR';
        resetCalculatorState();
        return;
    }

    updateDisplay(result);

    firstNumber = result;
    operator = null;
    secondNumber = null;
    displayValue = result.toString();
    waitingForSecondNumber = false;
    shouldClearDisplay = true;
})

// clearButton.addEventListener('click', (event) => {
//    resetCalculatorState();
//    updateDisplay('0');
// })

// initial Call on load
updateDisplay(displayValue);