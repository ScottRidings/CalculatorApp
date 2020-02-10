// ---------------------- Page Load ---------------------- //
window.onload = function() {
    let myTable = document.getElementById('table-buttons');
    let tableBody = myTable.getElementsByTagName('tbody')[0];
    let tableWidth = tableBody.offsetWidth;
    document.getElementById('result').style.width = tableWidth - 4 + 'px';
}