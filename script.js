const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".but");

let currentInput = "";
let currentOperator = "";
let prevValue = null;

function updateDisplay() {
  display.value = currentInput || "0";
}

function clear() {
  currentInput = "";
  currentOperator = "";
  prevValue = null;
  updateDisplay();
}

function handleNumberClick(number) {
  currentInput += number;
  updateDisplay();
}

function handleOperatorClick(operator) {
  if (currentInput === "") return; // No input, nothing to operate on
  if (prevValue !== null) {
    // Handle the case when an operator is clicked after an operator
    const result = performCalculation();
    currentInput = String(result);
    prevValue = result;
  } else {
    prevValue = parseFloat(currentInput);
  }
  currentOperator = operator;
  currentInput = "";
  updateDisplay();
}

function performCalculation() {
  const inputValue = parseFloat(currentInput);
  switch (currentOperator) {
    case "+":
      return prevValue + inputValue;
    case "-":
      return prevValue - inputValue;
    case "*":
      return prevValue * inputValue;
    case "/":
      return prevValue / inputValue;
    case "%":
      return (prevValue * inputValue) / 100;
    default:
      return inputValue;
  }
}

function handleEqualClick() {
  if (currentOperator && currentInput !== "") {
    const result = performCalculation();
    currentInput = String(result);
    prevValue = result;
    currentOperator = "";
    updateDisplay();
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const buttonText = button.textContent;
    if (!isNaN(buttonText)) {
      handleNumberClick(buttonText);
    } else if (buttonText === "C") {
      clear();
    } else if (buttonText === "=") {
      handleEqualClick();
    } else {
      handleOperatorClick(buttonText);
    }
  });
});

updateDisplay();
