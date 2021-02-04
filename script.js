class Calculator {
    constructor(previousOperandText, currentOperandText) {
        this.previousOperandText = previousOperandText;
        this.currentOperandText = currentOperandText;
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
        console.log(this.currentOperand.indexOf("."))
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
        let comuputation;
        let prev = parseFloat(this.previousOperand);
        let current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case '+':
                comuputation = prev + current
                break;
            case '-':
                comuputation = prev - current
                break;
            case '*':
                comuputation = prev * current
                break;
            case ':':
                comuputation = prev / current
                break;
            default:
                return;
        }
        this.currentOperand = comuputation
        this.operation = undefined;
        this.previousOperand = "";
    }

    getDisplayedNumber(number) {
        console.log(number, "getdispl")
        const stringNumber = number.toString()
        const intergerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigit = stringNumber.split(".")[1]
        let integerDisplay;
        if (isNaN(intergerDigits)) {
            integerDisplay = ""
        } else {
            integerDisplay = intergerDigits.toLocaleString("en", {
                maximumFractionDigits: 0
            })
        }
        if (decimalDigit != null) {
            return `${integerDisplay}.${decimalDigit}`
        } else {
            return integerDisplay
        }
    }
    updateDisplay() {
        this.currentOperandText.innerText = this.getDisplayedNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandText.innerText =
                `${this.getDisplayedNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandText.innerText = "";
        }

    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationNumbers = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const clearButton = document.querySelector('[data-all-clear]');
const previousOperandText = document.querySelector("[data-previous-operand]");
const currentOperandText = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandText, currentOperandText);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        console.log(button.innerText)
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationNumbers.forEach(button => {
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