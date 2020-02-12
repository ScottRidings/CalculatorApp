// ---------------------- Page Load ---------------------- //
window.onload = function() {
    let myTable = document.getElementById('table-buttons');
    let tableBody = myTable.getElementsByTagName('tbody')[0];
    let tableWidth = tableBody.offsetWidth;
    document.getElementById('display-tape').style.width = tableWidth - 4 + 'px';
    document.getElementById('display').style.width = tableWidth - 4 + 'px';    
}

var displayText;
var displayTextIsNothing = true;
var displayTapeText = '';
var decimalInUse = false;
var operatorInUse = '';
var valueLeftOfOperator = 0;
var storedMemory = 0;
var memoryInUse = false;


// ----------------- Format Dixplay Text ----------------- //
function numberWithCommas(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function numberAsFloatValue(value) {
    return parseFloat(value.replace(/,/g, ''));
}


// ---------------- Use Operator Buttons ---------------- //
function useOperator(value) {
    let displayValue = numberAsFloatValue(document.getElementById('display').innerText);

    if (displayTapeText == '' || operatorInUse == '=') {
        valueLeftOfOperator = displayValue;
        displayTapeText = displayValue + ' ' + value + ' ';
    } else if(displayTextIsNothing == true && operatorInUse != '') {
        displayTapeText = displayTapeText.substring(0, displayTapeText.length - 2) + value + ' ';
    } else {
        valueLeftOfOperator = preformMathOperation(displayValue);
        displayTapeText = displayTapeText + displayText + ' ' + value + ' ';
        displayText = valueLeftOfOperator;
        document.getElementById('display').innerText = numberWithCommas(displayText);
    }

    operatorInUse = value;
    displayTextIsNothing = true;
    decimalInUse = false;
    document.getElementById('display-tape').innerText = displayTapeText;
}

function preformMathOperation(displayValue) {
    let newValue = 0;
    if (operatorInUse == '÷') {
        newValue = valueLeftOfOperator / displayValue;
    } else if (operatorInUse == '×') {
        newValue = valueLeftOfOperator * displayValue;
    } else if (operatorInUse == '−') {
        newValue = valueLeftOfOperator - displayValue;
    } else if (operatorInUse == '+') {
        newValue = valueLeftOfOperator + displayValue;
    }

    return newValue;
}


// ------------ Use Number & Decimal Buttons ------------ //
function addDisplayText(value) {

    // If the last operation was '=' and numbers are selected then nothing is saved before continuing 
    if (operatorInUse == '=') removeDisplayText('C'); 

    if (! isNaN(value) || (value == '.' && decimalInUse == false)) {
        if (displayTextIsNothing == true && value == '.') {
            displayText = '0.'
        } else if (displayTextIsNothing == true && value != '.') {
            displayText = value;
        } else {
            displayText = displayText + value;
        }

        displayTextIsNothing = false;
        if (value == '.') decimalInUse = true;

        document.getElementById('display').innerText = numberWithCommas(displayText);
    }
}

// ----------- Use Clear & Backspace Buttons ----------- //
function removeDisplayText(value) {

    if (displayTextIsNothing == false && value == '←') {
        if (displayText.length == 1) {
            displayText = '0';
            displayTextIsNothing = true;
        } else if (displayText == '0.') {
            displayText = '0';
            displayTextIsNothing = true;
            decimalInUse = false;
        } else if (displayText.length > 1) {
            if (displayText.substring(displayText.length - 1) == '.') decimalInUse = false;
            displayText = displayText.substring(0, displayText.length-1)
        }
    } else if (value == 'CE') {
        displayText = '0';
        displayTextIsNothing = true;
        decimalInUse = false;
        if (operatorInUse == '=') displayTapeText = '';
    } else if (value == 'C') {
        displayText = '0';
        displayTextIsNothing = true;
        decimalInUse = false;

        displayTapeText = ''
        operatorInUse = '';
        valueLeftOfOperator = 0;
    }

    document.getElementById('display-tape').innerText = displayTapeText;
    if (displayTapeText == '') document.getElementById('display-tape').innerHTML = '<br>';
    document.getElementById('display').innerText = numberWithCommas(displayText);
}


function useMemory(value) {
    let displayValue = numberAsFloatValue(document.getElementById('display').innerText);
    if(value == 'M+') {
        storedMemory = storedMemory + displayValue;
        memoryInUse = true;
        displayTextIsNothing = true;
        dimMemoryButtons(false);
    } else if (value == 'M-') {
        storedMemory = storedMemory - displayValue;
        memoryInUse = true;
        displayTextIsNothing = true;
        dimMemoryButtons(false);
    } else if (value == 'MC') {
        storedMemory = 0;
        memoryInUse = false;
        dimMemoryButtons(true);
    } else if (value == 'MR' && memoryInUse == true) {
        displayText = storedMemory;
        document.getElementById('display').innerText = numberWithCommas(displayText);
        displayTextIsNothing = false;
    }
}


function dimMemoryButtons(dimButtons) {
    let myTable = document.getElementById('table-buttons');
    let tableBody = myTable.getElementsByTagName('tbody')[0];
    let cell1 = tableBody.rows[0].cells[0];
    let cell2 = tableBody.rows[0].cells[1];
    
    if (dimButtons == true) {
        cell1.style = 'background-color: rgba(121, 90, 25, .5)';
        cell2.style = 'background-color: rgba(121, 90, 25, .5)';
    } else {
        cell1.style = 'background-color: rgb(121, 90, 25)';
        cell2.style = 'background-color: rgb(121, 90, 25)';
    }
}

// ----------------- Button Click Event ----------------- //
document.body.addEventListener('click', function (evt) {
    if (evt.target.className == 'button btn-number') {
        addDisplayText(evt.target.innerText);
    } else if (evt.target.className == 'button btn-clear') {
        removeDisplayText(evt.target.innerText);
    } else if (evt.target.className == 'button btn-operation') {
        useOperator(evt.target.innerText);
    }else if (evt.target.className == 'button btn-memory') {
        useMemory(evt.target.innerText);
    }
    
}, false);

// ------------------- Key Press Event ------------------- //
document.body.addEventListener('keydown', function (evt) {
    let keyId = evt.keyCode;
    switch(keyId) {
        case 8: // Backspace
            removeDisplayText('←');
            break;
        case 13: // Enter button
            useOperator('=');
            break;
        case 27: // Esc button
            removeDisplayText('C');
            break;
        case 46: // Delete button
            removeDisplayText('CE');
            break;
        case 56: // 8 or * button
            if (evt.key == '8') {
                addDisplayText('8');
            } else if (evt.key == '*') {
                useOperator('×');
            }
            break;
        case 106: // * on keypad
            useOperator('×');
            break;
        case 107: // + on keypad
            useOperator('+');
            break;
        case 109: // - on keypad
            useOperator('−');
            break;
        case 111: // / on keypad
            useOperator('÷');
            break;
        case 187: // = or + button 
            useOperator(evt.key)
            break;
        case 189: // - or _ button
            if (evt.key == '-') useOperator('−');
            break;
        case 191: // / or ? button
            if (evt.key == '/') useOperator('/');
            break;
        default:
            addDisplayText(evt.key);
    } // END SWITCH
}, false);

