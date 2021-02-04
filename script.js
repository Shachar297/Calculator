class Calculator {
    constructor(previousCalculatorMainText, currentCalculatorMainText) {
        this.previousCalculatorMainText = previousCalculatorMainText;
        this.currentCalculatorMainText = currentCalculatorMainText;
        this.clear();
    }
    clear() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
    }
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
    appendNumber(number) {
        if (this.currentOperand.includes(".") && number === '.') { return }
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    chooseOperation(operation) {
        if (this.currentOperand === "") return
        if (this.previousOperand !== "") {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }
    compute() {
        let informationComputed;
        let previous = parseFloat(this.previousOperand);
        let current = parseFloat(this.currentOperand)
        if (isNaN(previous) || isNaN(current)) return;

        switch (this.operation) {
            case '+':
                informationComputed = previous + current
                break;
            case '-':
                informationComputed = previous - current
                break;
            case '*':
                informationComputed = previous * current
                break;
            case ':':
                informationComputed = previous / current
                break;
            default:
                return;
        }
        this.currentOperand = informationComputed
        this.operation = undefined;
        this.previousOperand = "";
    }

    getDisplayedNumber(number) {
        const numberToString = number.toString()
        const numberTensDigits = parseFloat(numberToString.split('.')[0])
        const numberDecimalDigits = numberToString.split(".")[1]
        let informationDisplayedOnCalculator;
        if (isNaN(numberTensDigits)) {
            informationDisplayedOnCalculator = ""
        } else {
            informationDisplayedOnCalculator = numberTensDigits.toLocaleString("en", {
                maximumFractionDigits: 0
            })
        }
        if (numberDecimalDigits != null) {
            return `${informationDisplayedOnCalculator}.${numberDecimalDigits}`
        } else {
            return informationDisplayedOnCalculator
        }
    }
    updateDisplay() {
        this.currentCalculatorMainText.innerText = this.getDisplayedNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousCalculatorMainText.innerText =
                `${this.getDisplayedNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousCalculatorMainText.innerText = "";
        }

    }
}

const numbersButtonsArray = document.querySelectorAll('[data-number]')
const operationButtonsArray = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const clearButton = document.querySelector('[data-all-clear]');
const previousCalculatorMainText = document.querySelector("[data-previous-operand]");
const currentCalculatorMainText = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousCalculatorMainText, currentCalculatorMainText);

numbersButtonsArray.forEach(button => {
    button.addEventListener('click', () => {
        console.log(button.innerText)
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtonsArray.forEach(button => {
    button.addEventListener('click', () => {
        console.log(button.innerText)
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click', button => {

    calculator.compute();
    calculator.updateDisplay();
})

clearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})