class Calculator {
  constructor() {
    this.result = "0"; //*The result of the operation (2 row)
    this.operand1 = 0;
    this.operand2 = 0;
    this.operation = ""; //*Symbol of the operation
    this.expression = ""; //*The full expression (1st row)
    this.isOperationComplete = false;
  }

  updateDisplay(selector, value) {
    document.querySelector(selector).textContent = value;
  }

  appendTo(target, value) {
    //prettier-ignore
    if (target === "result" && this.result === "0" && value !== "." ) {
      this.result = value;
    } else {
      this[target] += value;
    }
  }

  setResult(value) {
    this.result = value;
  }

  getOperand1() {
    return this.operand1;
  }

  setOperand1(value) {
    this.operand1 = value;
  }

  setOperand2(value) {
    this.operand2 = value;
  }

  setOperationSymbol(value) {
    this.operation = value;
  }

  performOperation(operand1, operand2, operation) {
    if (isNaN(operand1) || isNaN(operand2) || !operation) return;

    switch (operation) {
      case ":":
        if (operand2 === 0) {
          this.result = "Err";
        } else {
          let division = (operand1 / operand2).toString();
          if (division.split(".")[1]?.length > 2) {
            this.result = Number(division).toFixed(8).toString();
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
    this.operand1 = 0;
    this.operand2 = 0;
    this.operation = "";
    this.updateDisplay(".result", this.result);
    this.updateDisplay(".expression", this.expression);
  }

  handleButtonClick(e) {
    const value = e.target.getAttribute("data-value");
    if (!value) return;
    const regex = /[+\-*:/]/;

    switch (value) {
      case "C":
        this.clear();
        break;
      case "=":
        if (!this.getOperand1() && !this.operation) {
          return;
        }
        if (this.expression.slice(-1).match(regex)) {
          this.appendTo("result", "Err");
          this.updateDisplay(".result", this.result);
          return;
        }
        this.setOperand2(Number(this.result));
        this.result = this.performOperation(
          this.operand1,
          this.operand2,
          this.operation
        );
        this.expression += value;
        this.updateDisplay(".expression", this.expression);
        this.updateDisplay(".result", this.result);
        this.setOperand1(Number(this.result));
        this.setOperationSymbol(""); // Reset the operation after performing it
        this.isOperationComplete = true;
        break;
      default:
        let isOperator = regex.test(value);

        if (isOperator) {
          if (this.expression.slice(-1).match(regex)) {
            this.expression = this.expression.slice(0, -1);
          }

          //* If the expression already has operand1 (can be 0), operation symbol, and operand2
          if (this.operation && this.result) {
            this.setOperand2(Number(this.result));
            //prettier-ignore
            this.result = this.performOperation(this.operand1, this.operand2, this.operation);
            this.updateDisplay(".result", this.result);
            this.expression = this.result + value;
            this.updateDisplay(".expression", this.expression);
            this.setOperand1(Number(this.result));
            this.setResult("");
            this.setOperationSymbol(value);
          } else {
            if (this.expression.match(/[0-9]/)) {
              this.setOperand1(Number(this.expression.replace(regex, "")));
            }

            if (this.expression.match(/[+\-*:/=]/)) {
              this.setOperand1(Number(this.result));
              this.expression = this.getOperand1().toString();
            }

            this.setOperationSymbol(value);
            this.appendTo("expression", value);
            this.updateDisplay(".expression", this.expression);
            this.setResult("");
          }
        } else {
          if (this.expression.slice(-1) == "=") {
            this.clear();
            this.isOperationComplete = false;
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

class UnitsConverter {
  constructor() {
    this.unitsFrom = "";
    this.unitsTo = "";
  }

  handleDropdownClick(e) {
    // const accordion = e.target.matches(".accordion")
    //   ? e.target
    //   : e.target.closest(".accordion");
    // if (!accordion) return;
    // accordion.classList.toggle("active");
    const accordion = document.querySelector(".accordion");

    const right = accordion.querySelector(".chevron-right");
    right.classList.add("rotate");

    const content = document.querySelector(".accordion__content");
    if (content.style.maxHeight === "0px") {
      content.style.maxHeight = content.scrollHeight + "px"; // opening
    }

    content.addEventListener("click", (e) => {
      let unit = e.target.textContent;
      console.log(unit);
      accordion.querySelector(".accordion__title").textContent = unit;
      right.classList.remove("rotate");
      content.style.maxHeight = "0px";
    });
  }

  init() {
    document.querySelector(".accordion").addEventListener("click", (e) => {
      this.handleDropdownClick(e);
    });
  }
}

const converter = new UnitsConverter();
converter.init();
