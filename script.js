// ---------------------- Page Load ---------------------- //
window.onload = function() {
    let myTable = document.getElementById('table-buttons');
    let tableBody = myTable.getElementsByTagName('tbody')[0];
    let tableWidth = tableBody.offsetWidth;
    document.getElementById('result').style.width = tableWidth - 4 + 'px';
}

var screenTextIsNothing = true;
var decimalInUse = false;
var opperatorInUse = false;
var screenText;

// -------------------- Button Click -------------------- //
document.body.addEventListener('click', function (evt) {
    if (evt.target.className == 'button btn-number') {
        addScreenText(evt.target.innerText);
    } else if (evt.target.className == 'button btn-clear') {
        removeScreenText(evt.target.innerText);
    } else if (evt.target.className == 'button btn-operation') {
        console.log(evt)
    } else if (evt.target.className == 'button btn-memory') {
        console.log(evt)
    }
    
}, false);

// ---------------------- Key Press ---------------------- //
document.body.addEventListener('keydown', function (evt) {
    let keyId = evt.keyCode;
    switch(keyId) {
        case 8: // Backspace
            removeScreenText('←');
            break;
        case 46: // Delete

            break;
        default:
            addScreenText(evt.key);
    } // END SWITCH
}, false);


// ----------------- Calculator Display ----------------- //
function addScreenText(value) {
    if (! isNaN(value) || (value == '.' && decimalInUse === false)) {
        if (screenTextIsNothing === true && value == '.') {
            screenText = '0.'
        } else if (screenTextIsNothing === true && value != '.') {
            screenText = value;
        } else {
            screenText = screenText + value;
        }

        screenTextIsNothing = false;
        if (value == '.') decimalInUse = true;

        document.getElementById('result').innerText = screenText;
    }
}

function removeScreenText(value) {
    if (value == '←' && screenText == '0.') {
        screenText = '0';
        screenTextIsNothing = true;
        decimalInUse = false;

    } else if (value == '←' && screenText.length == 1) {
        screenText = '0';
        screenTextIsNothing = true;
    } else if (value == '←' && screenText.length > 1) {
        if (screenText.substring(0, screenText.length-1) == '.') decimalInUse = false;
        screenText = screenText.substring(0, screenText.length-1)
    }

    document.getElementById('result').innerText = screenText;
}


