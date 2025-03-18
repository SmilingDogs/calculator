class Calculator {
  constructor() {
    this.result = "0"; //*The result of the operation
    this.operand1 = 0;
    this.operand2 = 0;
    this.operation = ""; //*Symbol of the operation
    this.expression = ""; //*The expression to be evaluated on the display (1st row)
  }
  //*show the value in the display
  updateDisplay(selector, value) {
    document.querySelector(selector).textContent = value;
  }
  //*change the values of Class properties
  appendTo(target, value) {
    //prettier-ignore
    if (target === "result" && this.result === "0" && value !== "." ) {
      this.result = value;
    } else {
      this[target] += value;
    }
  }

  getCurrentResult() {
    return this.result;
  }

  setCurrentResult(value) {
    this.result = value;
  }

  getOperand1() {
    return this.operand1;
  }

  setOperand1(value) {
    this.operand1 = value;
  }

  getOperand2() {
    return this.operand2;
  }

  setOperand2(value) {
    this.operand2 = value;
  }

  setOperationSymbol(value) {
    this.operation = value;
  }

  // defineOperation() {
  //   const operations = {
  //     ":": "divide",
  //     "*": "multiply",
  //     "-": "subtract",
  //     "+": "add",
  //   };
  //   for (const [symbol, operation] of Object.entries(operations)) {
  //     if (this.expression.slice(1).includes(symbol)) {
  //       return operation;
  //     }
  //   }
  //   return null;
  // }

  performOperation(operand1, operand2, operation) {
    // const operation = this.defineOperation();
    if (!operation) return;
    if (isNaN(operand1) || isNaN(operand2)) return;

    switch (operation) {
      case ":":
        if (operand2 === 0) {
          this.result = "Err";
        } else {
          let division = (operand1 / operand2).toString();
          if (division.split(".")[1]?.length > 2) {
            this.result = Number(division).toFixed(12).toString();
          } else {
            this.result = division;
          }
        }
        break;
      case "*":
        this.result = (operand1 * operand2).toString();
        break;
      case "-":
        this.result = (operand1 - operand2).toString();
        break;
      case "+":
        this.result = (operand1 + operand2).toString();
        break;
    }
    return this.result;
  }

  clear() {
    this.expression = "";
    this.result = "0";
    this.updateDisplay(".result", this.result);
    this.updateDisplay(".expression", this.expression);
  }

  handleButtonClick(e) {
    const value = e.target.getAttribute("data-value");
    if (!value) return;

    switch (value) {
      case "C":
        this.clear();
        break;
      case "=":
        this.appendTo("expression", value);
        this.result = this.performOperation(
          this.operand1,
          this.operand2,
          this.operation
        );
        this.updateDisplay(".expression", this.expression);
        this.updateDisplay(".result", this.result);
        break;
      default:
        let isOperator = /[+\-*:]/.test(value);
        let isNumber = /[0-9]/.test(value);
        if (isOperator) {
          this.setCurrentResult("");
          //todo 1) if operator is clicked again, replace the previous operator. Check if the last character is operator
          if (this.expression.slice(-1).match(/[+\-*:/]/)) {
            this.expression = this.expression.slice(0, -1);
          }
          this.setOperationSymbol(value);
          this.appendTo("expression", value);
          this.updateDisplay(".expression", this.expression);

          //todo 2 if the operator is clicked after second operand. calcuclate the result and append it to cuurent operation
        } else {
          if (!this.expression.match(/[0-9]/)) {
            this.setOperand1(Number(value));
            // console.log(this.operand1);
          } else {
            this.setOperand2(Number(value));
            // console.log(this.operand2);
          }
          this.appendTo("expression", value);
          this.updateDisplay(".expression", this.expression);
          this.appendTo("result", value);
          this.updateDisplay(".result", this.result);
        }
        break;
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
