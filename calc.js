const calculator = document.querySelector("#calculator");
const inputDisplay = document.querySelector("#inputDisplay");
const outputDisplay = document.querySelector("#outputDisplay");
const resultButton = document.querySelector("#resultButton");

let input = "";
let on = false;

calculator.addEventListener("click", function (event) {
    let element = event.target;

    if (event.target.id === "onoff" && on === false) {
        outputDisplay.innerText = 0;
        inputDisplay.innerText = "";
        calculator.style.backgroundColor = "rgb(130, 130, 130)";
        inputDisplay.style.backgroundColor = "rgb(0, 0, 0)";
        outputDisplay.style.backgroundColor = "rgb(0, 0, 0)";
        value = "";
        input = "";
        on = true;
        return;
    }
    if (event.target.id === "onoff" && on === true) {
        outputDisplay.innerText = "";
        inputDisplay.innerText = "";
        calculator.style.backgroundColor = "rgb(92, 92, 92)";
        inputDisplay.style.backgroundColor = "rgb(160, 160, 160)";
        outputDisplay.style.backgroundColor = "rgb(160, 160, 160)";
        on = false;
        return;
    }
    if (on === true) {
        let value = element.getAttribute("data-value");

        if (value === "C") {
            input = "";
            inputDisplay.innerText = "";
            outputDisplay.innerText = 0;
            value = "";
        }

        if (input.length === 0) {
            if (isNumber(value)) {
                input += value;
            } else if (isMinus(value)) {
                input += value;
            } else if (value === "(") {
                input += value;
            } else {
                return;
            }
        } else {
            let lastValue = getLastValue();
            let nästLastValue = getNästLastValue();
            let nästNästLastValue = getNästNästLastValue();

            if (isNumber(lastValue) && isNumber(value)) {
                input += value;
            }

            if (isNumber(lastValue) && isOperator(value)) {
                if (!isStartParantes(value)) {
                    input += value;
                }
            }

            if (isOperator(lastValue) && isNumber(value)) {
                input += value;
            }

            if (isOperator(lastValue) && isOperator(value)) {
                if (isOperatorButNotParantes(lastValue) && isStartParantes(value) || isStartParantes(lastValue) && isMinus(value) || isEndParantes(lastValue) && isOperatorButNotParantes(value)) {
                    input += value;
                }
            }

            if (isNumber(lastValue) && value === "=" || lastValue === ")" && value === "=") {
                let result = eval(input);
                outputDisplay.innerText = result;
            }
        }

        if (value !== "=") {
            inputDisplay.innerHTML = input;
        }
    }

})

// funktioner

/**
 * 
 *
 * @return {*} 
 */
function getLastValue() {
    return input.charAt(input.length - 1);
};

function getNästLastValue() {
    return input.charAt(input.length - 2);
};

function getNästNästLastValue() {
    return input.charAt(input.length - 3);
};

function ärDetNeg() {
    let parantes = false;
    for (let i = 0; i < input.length; i++) {
        if (input.charAt(i) === "(") {
            parantes = true;
        }
    }
}


/**
 * 
 *
 * @param {*} x
 * @return {boolean} 
 */
function isNumber(x) {
    const numbers = "0123456789";
    if (numbers.indexOf(x) >= 0) {
        return true;
    }
    return false;
};

/**
 *
 *
 * @param {*} x
 * @return {boolean} 
 */
function isMinus(x) {
    if (x === "-") {
        return true;
    }
    return false;
}


function isMinusOrPlus(x) {
    if (x === "-" || x === "+") {
        return true;
    }
    return false;
}

function isParantes(x) {
    const isParantes = "()";
    if (isParantes.indexOf(x) >= 0) {
        return true;
    }
    return false;
}

function isStartParantes(x) {
    const isStartParantes = "(";
    if (isStartParantes.indexOf(x) >= 0) {
        return true;
    }
    return false;
}

function isEndParantes(x) {
    const isEndParantes = ")";
    if (isEndParantes.indexOf(x) >= 0) {
        return true;
    }
    return false;
}

function isOperatorButNotParantes(x) {
    const operatorButNotParantes = "+-*/"
    if (operatorButNotParantes.indexOf(x) >= 0) {
        return true;
    }
    return false;
}

/**
 * function to check if one of 4 räknesätt används
 *
 * @param {*} x
 * @return {boolean} 
 */
function isOperator(x) {

    const operators = "+-*/()";

    if (operators.indexOf(x) >= 0) {
        return true;
    }
    return false;
};