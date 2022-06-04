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
const percentBtn = document.getElementById('percentage')
const decimalBtn = document.getElementById('decimal')
const sqrtBtn = document.getElementById('square-root')
const squaredBtn = document.getElementById('squared')

const equationDisplay = document.getElementById('equation')
const answerDisplay = document.getElementById('answer')

window.addEventListener('keydown', keyboardInput)
equalsBtn.addEventListener('click', evaluate)
clearBtn.addEventListener('click', clear)
deleteBtn.addEventListener('click', deleteNum)
decimalBtn.addEventListener('click', appendPoint)
plusMinusBtn.addEventListener('click', plusMinus)
percentBtn.addEventListener('click', percent)
sqrtBtn.addEventListener('click', sqrt)
squaredBtn.addEventListener('click', squared)

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

function percent() {
    let value = answerDisplay.textContent
    answerDisplay.textContent = value * .01;
}

function sqrt() {
    let value = answerDisplay.textContent
    answerDisplay.textContent = roundAnswer(Math.pow(value, .5));
    equationDisplay.textContent = `√ ${value} =`
}

function squared() {
    let value = answerDisplay.textContent
    answerDisplay.textContent = Math.pow(value, 2);
    equationDisplay.textContent = `${value}² =`
}



function setOperator(operator) {
    if(currentOperation !== null) evaluate()
    firstOperand  = answerDisplay.textContent
    currentOperation = operator
    equationDisplay.textContent = `${firstOperand} ${currentOperation}`
    resetDisplay();
}

function evaluate () {
    if (currentOperation === null || shouldResetDisplay) return
    if(currentOperation === '÷' && answerDisplay.textContent === '0') {
        equationDisplay.textContent = `${firstOperand} ${currentOperation} ${answerDisplay.textContent} = ERROR!`
        currentOperation = null
        answerDisplay.textContent = "Unable to Divide by 0!";
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
    return Math.round(num * 100000) / 100000
}

  /* Keyboard Support */
  function keyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key)
    if (e.key === 'Escape') clear ()
    if (e.key === '.') appendPoint()
    if (e.key === 'Backspace') deleteNum()
    if (e.key === '=' || e.key === 'Enter') evaluate()
    if (e.key === '+' || e.key === '-' || e.key === 'x' || e.key === '*' || e.key === '/')
      setOperator(keyboardOperators(e.key))
}

function keyboardOperators(keyInput) {
    if(keyInput === '/') return '÷'
    if(keyInput === 'x' || keyInput === '*') return 'x'
    if(keyInput === '-') return '-'
    if(keyInput === '+') return '+'
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

function exponent(a,b) {
    sum = Math.pow(a, b);
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
        case '^':
            return exponent(a,b)
        default:
            return null
    }
  }