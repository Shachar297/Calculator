// let numbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
// let buttonsArray = [];
// let functionalButtons = ["=", "C", "+", "-", "X", ":", "%", "( )", "."];

// DisplayNumbersAsButtonsToCalculator(numbersArray, buttonsArray)
// addListenerOnEachButtonInCalculator(buttonsArray);
// addFunctionalButtonsListeners(functionalButtons);

// function DisplayNumbersAsButtonsToCalculator(numsArr, btns) {
//     let calculatorBody = document.getElementById("calculator-body-buttons");

//     for (let i = 0; i < numsArr.length; i++) {
//         let buttons = document.createElement("button");
//         btns.push(buttons)
//         btns[i].innerHTML = numsArr[i];
//         btns[i].id = numsArr[i];
//         calculatorBody.append(buttons);
//     }

// }


// function addListenerOnEachButtonInCalculator(btns) {
//     for (let i of btns) {
//         i.addEventListener("click", e => {
//             let inputHeader = document.getElementById("input-header-calculator");
//             inputHeader.value += e.target.innerHTML;
//         })
//     }
// }

// function addFunctionalButtonsListeners(functionalButtons) {
//     let buttonsDiv = document.getElementById("calculator-body-functional-buttons");

//     for (let i = 0; i < functionalButtons.length; i++) {
//         let buttons = document.createElement("button");
//         buttonsDiv.append(buttons);
//         buttons.innerHTML = functionalButtons[i];
//         buttons.id = buttons.innerHTML
//         buttons.addEventListener("click", (e) => addListenerOnFunctionalButtons(e))
//     }
// }

// function addListenerOnFunctionalButtons(e) {
//     let inputHeader = document.getElementById("input-header-calculator");

//     inputHeader.value += " " + e.target.innerHTML + " "
//     manipluateCalculatorInputScreenShowedSum(e.target.innerHTML, inputHeader)
// }

// function manipluateCalculatorInputScreenShowedSum(e, inputHeader) {
//     if (e === "=") {
//         showSumImmediately(e, inputHeader);
//     }
//     else if (e.trim() === "C") {
//         inputHeader.value = "";
//     }
//     else if (e === "+") {
//         extractNumbersFromInputWithoutFunctionalSign(e, inputHeader.value)
//     }
//     else if (e === "X") {
//         extractNumbersFromInputWithoutFunctionalSign(e, inputHeader.value)
//     }
//     else if(e === ":"){
//        inputHeader.value =  devideShowedNumberFromCalculator(e, inputHeader.value)
//     }

// }

// function extractNumbersFromInputWithoutFunctionalSign(e, inputHeader) {
//     let headerP = document.getElementById("calculator-header-p-sum");

//     headerP.innerHTML = calculateSum(e, inputHeader);

// }

// function calculateSum(e, inputHeader) {
//     let sum = 0;
//     let arr = inputHeader.split(" ");
//     console.log(e)
//     for (let i = 0; i < arr.length; i++) {

//         if (arr[i] != "+" && arr[i] != "" && arr[i] !== "=" && arr[i] !== "X") {
//             sum += parseInt(arr[i], 10);
//             console.log(sum)
//         }
//     }
//     return sum;
// }

// function showSumImmediately(e, inputHeader){
//     inputHeader.value = calculateSum(e , inputHeader.value);
//     return inputHeader.value
// }

// function devideShowedNumberFromCalculator(e, inputHeader){
//     let devided = 0;
//     let arr = inputHeader.split(" ");
//     console.log(arr)
//     for (let i = 0; i < arr.length; i++) {

//         if (arr[i] != e && arr[i] != "" && arr[i] != "=" && arr[i] != e) {
//             console.log(arr[i])
//             devided = parseInt(arr[i]);
//             console.log(devided)
//         }
//     }
//     return devided / devided;
//     }
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
        console.log(number , "getdispl")
        const stringNumber = number.toString()
        const intergerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigit = stringNumber.split(".")[1]
        let integerDisplay;
        if (isNaN(intergerDigits)) {
            integerDisplay = ""
        } else {
            integerDisplay = intergerDigits.toLocaleString("en", {
                maximumFractionDigits: 0 })
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
        }else{
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