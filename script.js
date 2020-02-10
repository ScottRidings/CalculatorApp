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

document.body.addEventListener('click', function (evt) {
    editScreenText(evt.target.innerText);
}, false);

document.body.addEventListener('keypress', function (evt) {
    editScreenText(evt.key);
}, false);

function editScreenText(value) {
    if (! isNaN(value) || (value == '.' && decimalInUse === false)) {
        if (screenTextIsNothing === true) {
            screenText = value;
            screenTextIsNothing = false;
        } else {
            screenText = screenText + value;
        }

        if (value == '.') decimalInUse = true;
        document.getElementById('result').innerText = screenText;
    }
}
