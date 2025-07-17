// CALCULATOR VARIABLES
let firstNumber = null; 
let operator = null; 
let secondNumber = null;
let displayValue = '0';
let waitingForSecondNumber = false;
let shouldClearDisplay = false;

// DOM ELEMENTS
const display = document.getElementById('display');
const numberButtons = document.querySelectorAll('.number-button');
const operatorButtons = document.querySelectorAll('.operator-button');
const equalsButton = document.querySelector('.equals-button');
const clearButton = document.querySelector('[data-action="clear"]');
const deleteButton = document.querySelector('[data-action="delete"]');



// HELPER FUNCTIONS 
// Update display value on the calculator
const updateDisplay = (value) => {
    let displayString = value.toString(); // Ensure the value is a string
    const MAX_DISPLAY_LENGTH = 12

    // Checks if the value is a number (not "Math Error") && its string representation exceeds the maximum display length, show 'OVERFLOW'.
    if(!isNaN(parseFloat(displayString)) && displayString.length > MAX_DISPLAY_LENGTH) {
        display.textContent = 'OVERFLOW'; // Display the overflow message.
        return; // Stop execution
    }
    display.textContent = displayString; // Display the number as if it fits.
};

// Reset calculator state to global variable state
const resetCalculatorState = () => {
    firstNumber = null; 
    operator = null; 
    secondNumber = null; 
    displayValue = '0'; 
    waitingForSecondNumber = false;
    shouldClearDisplay = false;
};

// ARITHMETIC FUNCTIONS
const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

const multiply = (a, b) => a * b;

const divide = (a, b) => {
    if (b === 0) return 'Math Error'; // Handle division by zero
    return a / b;
};


// MAIN OPERATE FUNCTION
const operate = (operator, firstNumber, secondNumber) => {
    let result; 
    
    // Perform operation based on the operator
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
            // Fallback for unrecognized operators
            result = 'Math Error';
            break;
    }

    // Return 'Math Error directly or rounded numerical result
    return result === 'Math Error' ? result : parseFloat(result.toFixed(8));
};


// EVENT LISTENERS 
// Number buttons
numberButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const digit = event.target.dataset.value;
        
        // If display is '0' or needs to be cleared (after operator/equals), replace it
        if (displayValue === '0' || shouldClearDisplay) {
            displayValue = digit;
            shouldClearDisplay = false;
        } else {
            // Prevent mutiple decimal points
            if (digit === '.' && displayValue.includes('.')) return;
            displayValue += digit; // Append digit to current number
        }

        // If we were waiting the second number, it means a digit has now been entered
        if (waitingForSecondNumber) waitingForSecondNumber = false;
        updateDisplay(displayValue);
    });
});

// Operator buttons
operatorButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const nextOperator = event.target.dataset.action;
        
        // Scenario 1: First operator press or starting new chain after equals
        if (operator === null) {
            firstNumber = parseFloat(displayValue); // Store current display as first number
            operator = nextOperator;
            waitingForSecondNumber = true; // Now waiting for second number
            shouldClearDisplay = true; // Next digit should clear display
        } 
        // Scenario 2: Consecutive operator press (e.g., 5 + -) - just change operator
        else if (waitingForSecondNumber) { 
            operator = nextOperator;
            shouldClearDisplay = true; //Still waiting for second number, so next digit still clears
        } 
        // Scenarion 3: Chaining operations (e.g., 12 + 7 -) - calculate, then set new operator
        else {
            // calculate current operation, then set new operator
            secondNumber = parseFloat(displayValue); // Curent display is the second number

            const result = operate(operator, firstNumber, secondNumber);
            
            // Handle 'Math Error' (e.g., division by zero)
            if (result === 'Math Error') {
                updateDisplay('Math Error');
                resetCalculatorState(); // Reset all interval state 
                return;
            }
            firstNumber = result; // Result becomes the new number for chaining
            operator = nextOperator;
            displayValue = firstNumber.toString(); // Update displayVLue for correct chaining behavior
            updateDisplay(firstNumber);
            waitingForSecondNumber = true; // Now waiting for next number in chain
            shouldClearDisplay = true; // Next digit should clear display
        } 
    })
})


// Equals button
equalsButton.addEventListener('click', (event) => {
// Prevent calculation if expression is incomplete (e.g., 5 =, + =, 5 + =)
    if (firstNumber === null || operator === null || waitingForSecondNumber) {
        return; // Do nothing
    }

    secondNumber = parseFloat(displayValue); // Current display is the second number 
    
    const result = operate(operator, firstNumber, secondNumber);
    
    // Handle 'Math Error
    if (result === 'Math Error') {
        updateDisplay('Math Error');
        resetCalculatorState();
        return;
    }

    updateDisplay(result); // Display the final result

    // Prepare calculator for a new operation or chaining from the result
    firstNumber = result;
    operator = null; // Clear operator as operation is complete
    secondNumber = null; // Clear second number
    displayValue = result.toString(); //Store result as string for potential new input
    waitingForSecondNumber = false;
    shouldClearDisplay = true; // Next digit input should clear the result
})

// Clear button
clearButton.addEventListener('click', (event) => {
   resetCalculatorState(); // Reset all internal state variable
   updateDisplay('0'); // Set display to '0'
})

// Delete button
deleteButton.addEventListener('click', (event) => {
    // If display shows 'Math Error', clear it and reset state
    if (displayValue === 'Math Error') {
        resetCalculatorState();
        updateDisplay('0');
        return;
    }

    // Remove the last character from displayValue if not '0'
    if (displayValue !== '0') {
        displayValue = displayValue.slice(0, -1);

        // If display becomes empty after deletion, set it to '0'
        if (displayValue === '') displayValue = '0';
    }
    updateDisplay(displayValue); // Update the visual display
})


// KEYBOARD SUPPORT
window.addEventListener('keydown', (event) => {
    const key = event.key // Character produced 

    // Numbers and decimal point (both top row and numpad)
    if (key >= '0' && key <= '9' || key === '.') {
        const button = document.querySelector(`[data-value="${key}"]`);
        if (button) button.click(); // Simulate click on corresponding button
    }
    // Addition
    else if (key === '+') {
        const button = document.querySelector(`[data-action="add"]`);
        if (button) button.click();
    }
    // Subtraction
    else if (key === '-') {
        const button = document.querySelector(`[data-action="subtract"]`);
        if (button) button.click();
    }
    // Multiplication
    else if (key === '*') {
        const button = document.querySelector(`[data-action="multiply"]`);
        if (button) button.click();
    }
    // Division
    else if (key === '/') {
        event.preventDefault(); // Prevent browser's quick find functionality
        const button = document.querySelector(`[data-action="divide"]`);
        if (button) button.click();
    }
    // Equals (Enter key or '=' key)
    else if (key === '=' || key === 'Enter') {
        event.preventDefault(); // Prevent default browser actions (e.g., form submission)
        equalsButton.click();
    }
    // Clear (c, C, or Escape key)
    else if (key === 'c' || key === 'C' || key === 'Escape') {
        event.preventDefault() // Prevent default browser action (e.g., stopping page load)
        clearButton.click();
    }
    // Delete/Backspace
    else if (key === 'Backspace') {
        event.preventDefault(); // Prevent default browser action (e.g., navigating back)
        deleteButton.click();
    }
})

// INITIALIZE DISPLAY: Set the initial display value when the page loads
updateDisplay(displayValue);