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

function operate(operator,a,b) {
    operator(a,b)
    return sum;
};



/* Event Listener for Buttons */
const calcButtons = document.querySelectorAll('.calc-buttons');

calcButtons.forEach(button => {
  button.addEventListener('click', function handleClick(event) {
    console.log('box clicked', event);
    button.setAttribute('style', 'background-color: yellow;');

    /*display button pressed */
    let display = document.getElementById('display');
    display.textContent = button.id;
  });
});