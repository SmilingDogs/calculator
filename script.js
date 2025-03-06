class Calculator {
  constructor() {
    this.currentResult = "0";
    this.currentOperation = "";
  }

  updateOperation() {
    const operation = document.querySelector(".operation");
    operation.textContent = this.currentOperation;
  }

  updateResult() {
    const result = document.querySelector(".result");
    result.textContent = this.currentResult;
  }

  appendToOperation(value) {
    this.currentOperation += value;
  }

  appendToResult(value) {
    if (this.currentResult === "0" && value !== ".") {
      this.currentResult = "";
    }
    this.currentResult += value;
  }

  getCurrentResult() {
    return this.currentResult;
  }

  defineOperation() {
    const operations = {
      ":": "divide",
      "*": "multiply",
      "-": "subtract",
      "+": "add",
    };
    for (const [symbol, operation] of Object.entries(operations)) {
      if (this.currentOperation.slice(1).includes(symbol)) {
        return operation;
      }
    }
    return null;
  }

  performOperation() {
    const operation = this.defineOperation();
    if (!operation) return;

    let operand1, operand2;
    if (this.currentOperation[0] == "-") {
      const parts = this.currentOperation.slice(1, -1).split(/[:*+-]/);
      operand1 = -Number(parts[0]);
      operand2 = Number(parts[1]);
    } else {
      [operand1, operand2] = this.currentOperation
        .slice(0, -1)
        .split(/[:*+-]/)
        .map(Number);
    }

    if (isNaN(operand1) || isNaN(operand2)) return;

    switch (operation) {
      case "divide":
        if (operand2 === 0) {
          this.currentResult = "Err";
        }
        let division = (operand1 / operand2).toString();
        if (division.split(".")[1]?.length > 2) {
          this.currentResult = Number(division).toFixed(12).toString();
        } else {
          this.currentResult = division;
        }
        break;
      case "multiply":
        this.currentResult = (operand1 * operand2).toString();
        break;
      case "subtract":
        this.currentResult = (operand1 - operand2).toString();
        break;
      case "add":
        this.currentResult = (operand1 + operand2).toString();
        break;
    }
    this.updateResult();
  }

  clear() {
    this.currentOperation = "";
    this.currentResult = "0";
    this.updateResult();
    this.updateOperation();
  }

  clearResult() {
    this.currentResult = "";
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
        this.appendToOperation(value);
        this.updateOperation();
        this.performOperation();
        break;
      }
      default: {
        let result = this.getCurrentResult();
        const isOperator = /[=:*+-]/.test(value);
        if (isOperator) {
          this.clearResult();
          this.currentOperation = result;
        } else {
          this.appendToResult(value);
          this.updateResult();
        }
        this.appendToOperation(value);
        this.updateOperation();
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
