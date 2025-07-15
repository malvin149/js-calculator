let firstNumber; 
let operator; 
let secondNumber;

const add = (num1, num2) => {
    return num1 + num2;
};


const subtract = (num1, num2) => {
    return num1 - num2;
};


const multiply = (num1, num2) => {
    return num1 * num2;
};


const divide = (num1, num2) => {
    if (num2 === 0) {
        return 'ERROR';
    }
    return num1 / num2;
};

console.log(add(5, 5));
console.log(subtract(5, 2));
console.log(multiply(5, 5));
console.log(divide(5, 5));
console.log(divide(5, 0));


const operate = () => {

}