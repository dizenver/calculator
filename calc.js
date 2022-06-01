let firstOperand = ''
let secondOperand = ''
let currentOperation = null
let shouldResetDisplay = false

const calcNumbers = document.querySelectorAll('.calc-numbers')
const calcOperators = document.querySelectorAll('[data-operator]')
const equalsBtn = document.getElementById('equals')
const clearBtn = document.getElementById('clear')
const deleteBtn = document.getElementById('delete')
const plusMinusBtn = document.getElementById('plusminus')
const decimalBtn = document.getElementById('decimal')

const equationDisplay = document.getElementById('equation')
const answerDisplay = document.getElementById('answer')

equalsBtn.addEventListener('click', evaluate)
clearBtn.addEventListener('click', clear)
deleteBtn.addEventListener('click', deleteNum)
decimalBtn.addEventListener('click', appendPoint)
plusMinusBtn.addEventListener('click', plusMinus)

calcNumbers.forEach((button) =>
    button.addEventListener('click', () => appendNumber(button.textContent))
)

calcOperators.forEach((button) =>
    button.addEventListener('click', () => setOperator(button.textContent))
)

function appendNumber(num) {
    if(answerDisplay.textContent ===  '0'  || shouldResetDisplay)
        resetDisplay()
        answerDisplay.textContent += num
}

function resetDisplay() {
    answerDisplay.textContent = ''
    shouldResetDisplay = false
}

function clear() {
    answerDisplay.textContent = '0'
    equationDisplay.textContent = ''
    firstOperand = ''
    secondOperand = ''
    currentOperation = null
}

function appendPoint() {
    if (shouldResetDisplay) resetDisplay()
    if (answerDisplay.textContent === '')
      answerDisplay.textContent = '0'
    if (answerDisplay.textContent.includes('.')) return
    answerDisplay.textContent += '.'
  }

function deleteNum() {
    answerDisplay.textContent = answerDisplay.textContent.toString().slice(0, -1)
}

function plusMinus() {
    let value = answerDisplay.textContent
    answerDisplay.textContent = value * -1;
}

function setOperator(operator) {
    if(currentOperation !== null) evaluate()
    firstOperand  = answerDisplay.textContent
    currentOperation = operator
    equationDisplay.textContent = `${firstOperand} ${currentOperation}`
    shouldResetDisplay = true
}

function evaluate () {
    if (currentOperation === null || shouldResetDisplay) return
    if(currentOperation === '+' && answerDisplay.textContent === '0') {
        alert ("You can't divide by 0!")
        return
    }
    secondOperand = answerDisplay.textContent
    answerDisplay.textContent = roundAnswer (
        operate(currentOperation, firstOperand, secondOperand)
    )
    equationDisplay.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`
    currentOperation = null
}

function roundAnswer(num) {
    return Math.round(num * 1000) / 1000
}


/* Basic Calc Functions */
function add(a,b) {
    sum = a + b;
    return sum;
};

function subtract(a,b) {
    sum = a - b;
    return sum;
};
function multiply(a,b) {
    sum = a * b;
    return sum;
};

function divide(a,b) {
    sum = a / b;
    return sum;
};



function operate(operator, a, b) {
    a = Number(a)
    b = Number(b)

    switch (operator) {
      case '+':
        return add(a, b)
      case '-':
        return subtract(a, b)
      case 'x':
        return multiply(a, b)
      case '÷':
        if (b === 0) return null
        else return divide(a, b)
      default:
        return null
    }
  }