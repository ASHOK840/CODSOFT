let displayValue = '0'; // Display value on the screen
let firstOperand = null; // First number in the calculation
let waitingForSecondOperand = false; // Flag to indicate awaiting next input
let operator = null; // Current operator

// Updates the display to show the current value
function updateDisplay() {
    const display = document.getElementById('display');
    display.textContent = displayValue;
}

// Appends a number to the display
function appendNumber(number) {
    if (waitingForSecondOperand) {
        displayValue = number; // Replace display value with new input
        waitingForSecondOperand = false;
    } else {
        displayValue = displayValue === '0' ? number : displayValue + number;
    }
    updateDisplay();
}

// Handles operator selection and calculations
function chooseOperation(selectedOperator) {
    if (operator && waitingForSecondOperand) {
        operator = selectedOperator; // Update operator without calculation
        return;
    }

    if (firstOperand === null) {
        firstOperand = parseFloat(displayValue); // Store the first operand
    } else if (operator) {
        // Perform the calculation if an operator exists
        const secondOperand = parseFloat(displayValue);
        const result = performCalculation[operator](firstOperand, secondOperand);
        displayValue = `${parseFloat(result.toFixed(7))}`; // Limit decimal places
        firstOperand = result; // Store result as first operand
    }

    operator = selectedOperator; // Set the current operator
    waitingForSecondOperand = true; // Flag to indicate awaiting next input
    updateDisplay();
}

// Performs the calculation for the chosen operator
const performCalculation = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => b !== 0 ? a / b : 'Error', // Avoid division by zero
};

// Executes the final calculation when "=" is pressed
function compute() {
    if (operator && !waitingForSecondOperand) {
        const secondOperand = parseFloat(displayValue);
        const result = performCalculation[operator](firstOperand, secondOperand);
        displayValue = result === 'Error' ? 'Error' : `${parseFloat(result.toFixed(7))}`;
        firstOperand = null; 
        operator = null; 
        waitingForSecondOperand = false;
        updateDisplay();
    }
}

// Clears all values and resets the display
function clearDisplay() {
    displayValue = '0';
    firstOperand = null;
    waitingForSecondOperand = false;
    operator = null;
    updateDisplay();
}

// Initialize display on page load
updateDisplay();
