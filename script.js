class Calculator {
  constructor() {
    this.currentDisplay = "0";
  }

  updateDisplay() {
    const display = document.querySelector(".display");
    display.textContent = this.currentDisplay;
  }

  appendToDisplay(value) {
    if (this.currentDisplay === "0" && value !== ".") {
      this.currentDisplay = "";
    }
    this.currentDisplay += value;
  }

  defineOperation() {
    const operations = {
      ":": "divide",
      "*": "multiply",
      "-": "subtract",
      "+": "add",
    };
    for (const [symbol, operation] of Object.entries(operations)) {
      if (this.currentDisplay.slice(1).includes(symbol)) {
        return operation;
      }
    }
    return null;
  }

  performOperation() {
    const operation = this.defineOperation();
    if (!operation) return;

    let operand1, operand2;
    if (this.currentDisplay[0] == "-") {
      const parts = this.currentDisplay.slice(1).split(/[:*+-]/);
      operand1 = -Number(parts[0]);
      operand2 = Number(parts[1]);
    } else {
      [operand1, operand2] = this.currentDisplay.split(/[:*+-]/).map(Number);
    }

    if (isNaN(operand1) || isNaN(operand2)) return;

    switch (operation) {
      case "divide":
        this.currentDisplay =
          operand2 === 0 ? "Err" : (operand1 / operand2).toFixed(2).toString();
        break;
      case "multiply":
        this.currentDisplay = (operand1 * operand2).toFixed(2).toString();
        break;
      case "subtract":
        this.currentDisplay = (operand1 - operand2).toString();
        break;
      case "add":
        this.currentDisplay = (operand1 + operand2).toString();
        break;
    }
    this.updateDisplay();
  }

  clear() {
    this.currentDisplay = "0";
    this.updateDisplay();
  }

  handleButtonClick(e) {
    const value = e.target.getAttribute("data-value");
    if (!value) return;

    switch (value) {
      case "C": {
        this.clear();
        break;
      }
      case "=": {
        this.performOperation();
        break;
      }
      default: {
        this.appendToDisplay(value);
        this.updateDisplay();
        break;
      }
    }
  }

  init() {
    document
      .querySelector(".buttons")
      .addEventListener("click", (event) => this.handleButtonClick(event));
  }
}

const calculator = new Calculator();
calculator.init();
