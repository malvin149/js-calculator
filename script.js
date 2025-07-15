let firstNumber; 
let operator; 
let secondNumber;

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