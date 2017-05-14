document.body.addEventListener("keypress", doCalcKeyboard);
var calcDisplay = document.querySelector('input[type="text"]');
calc = document.querySelector(".container");
calc.addEventListener("click", doCalcMouse);
var currentNumber = 0;
var currentOperation;
var calcResult;

calcDisplay.value = 0;

/*keyboard mode*/

function doCalcKeyboard(event){
    doCalc(getChar(event), event);
}

function doCalcMouse(event){
    doCalc(event.target.value, event);
}

function doCalc(symbol, event){
    if(isNumeric(symbol)){
        calcDisplay.value = '';
        currentNumber += symbol;
        currentNumber = +currentNumber;
        calcDisplay.value = currentNumber;
    }
    else if(symbol === "+" || symbol === "-" ||  symbol === "*" ||  symbol === "/"){
        if(!currentOperation){
            calcResult = currentNumber;
        }
        else {
            calcResult = doOperation(calcResult, currentNumber, currentOperation);
        }
        currentOperation =symbol;
        calcDisplay.value = calcResult;
        currentNumber = 0;

    }
    else if(symbol === "=" || event.keyCode === 13){
        if(currentOperation){
            calcResult = doOperation(calcResult, currentNumber, currentOperation);
            calcDisplay.value = calcResult;
            currentNumber = calcResult;
            currentOperation = null;
        }
    }
    else if(event.keyCode === 8 || symbol === "errow"){
        currentNumber = "" + currentNumber;
        currentNumber = currentNumber.slice(0, -1);
        calcDisplay.value = currentNumber;
    }
    else if(symbol === "."){
        if(String(currentNumber).indexOf(".") === -1) {
            currentNumber = currentNumber + ".";
            calcDisplay.value = currentNumber;
        }
    }
    else if(symbol === "+/-"){
        currentNumber = +currentNumber / -1;
        calcDisplay.value = currentNumber;
    }
    else if(symbol === "ce"){
        currentNumber = 0;
        currentOperation = null;
        calcResult = null;
        calcDisplay.value = 0;
    }
}

function doOperation(num1, num2, operation){
    num1 = +num1;
    num2 = +num2;
    if(operation === "+"){
        return num1 + num2;
    }
    else if(operation === "-"){
        return num1 - num2
    }
    else if(operation === "*"){
        return num1 * num2
    }
    else if(operation === "/"){
        return num1 / num2
    }
}

function getChar(event) {
    if (event.which === null) { // IE
        if (event.keyCode < 32) return null; // спец. символ
        return String.fromCharCode(event.keyCode);
    }

    if (event.which !== 0 && event.charCode !== 0) { // все кроме IE
        if (event.which < 32) return null; // спец. символ
        return String.fromCharCode(event.which); // остальные
    }

    return null; // спец. символ
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}