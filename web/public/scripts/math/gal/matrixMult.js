import { MatrixDiv } from "./visuals/matrixDiv.js";

// Wrapper
const wrapper = document.createElement("div");
wrapper.id = "math-mult-wrapper";
wrapper.classList.add("math-program-wrapper");
wrapper.classList.add("unselectable");

// * Matrix mult table
// Table
const matrixTable = document.createElement("table");
matrixTable.id = "math-mult-table";
matrixTable.classList.add("math-mult-table");
matrixTable.classList.add("unselectable");
// tr0
const matrixTableRow0 = document.createElement("tr");
matrixTableRow0.id = "math-mult-table-row-0";
matrixTableRow0.classList.add("math-mult-table-row");
matrixTableRow0.classList.add("unselectable");
const matrixTableData00 = document.createElement("td");
matrixTableData00.id = "math-mult-table-data-00";
matrixTableData00.classList.add("math-mult-table-data");
matrixTableData00.classList.add("unselectable");
const matrixTableData01 = document.createElement("td");
matrixTableData01.id = "math-mult-table-data-01";
matrixTableData01.classList.add("math-mult-table-data");
matrixTableData01.classList.add("unselectable");
matrixTableRow0.appendChild(matrixTableData00);
matrixTableRow0.appendChild(matrixTableData01);
// tr1
const matrixTableRow1 = document.createElement("tr");
matrixTableRow1.id = "math-mult-table-row-1";
matrixTableRow1.classList.add("math-mult-table-row");
matrixTableRow1.classList.add("unselectable");
const matrixTableData10 = document.createElement("td");
matrixTableData10.id = "math-mult-table-data-10";
matrixTableData10.classList.add("math-mult-table-data");
matrixTableData10.classList.add("unselectable");
const matrixTableData11 = document.createElement("td");
matrixTableData11.id = "math-mult-table-data-11";
matrixTableData11.classList.add("math-mult-table-data");
matrixTableData11.classList.add("unselectable");
matrixTableRow1.appendChild(matrixTableData10);
matrixTableRow1.appendChild(matrixTableData11);
// Appends
matrixTable.appendChild(matrixTableRow0);
matrixTable.appendChild(matrixTableRow1);

// Input1
const multMatrixInput1 = new MatrixDiv(3, 3, {"idSuffix": "mult-0"});

// Input 2
const multMatrixInput2 = new MatrixDiv(3, 3, {"idSuffix": "mult-1"});

// Output
const multMatrixOutput = new MatrixDiv(3, 3, {"idSuffix": "mult-2", "disabled": true});

// Button
const multCalculateButton = document.createElement("button");
multCalculateButton.classList.add("math-calc-button");
multCalculateButton.type = "button";
multCalculateButton.textContent = "Calc";

// Logic
multCalculateButton.onclick = () => {
    const input1 = multMatrixInput1.getCurrentMatrix();
    const input2 = multMatrixInput2.getCurrentMatrix();
    multMatrixOutput.loadMatrix(input1.multByMatrix(input2));
}

// Builds
const matrixInput1Build = multMatrixInput1.build();
const matrixInput2Build = multMatrixInput2.build();
const matrixOutputBuild = multMatrixOutput.build();

// File-Column control buttons behaviour change
function addShared() {
    multMatrixInput1.addColumn();
    multMatrixInput2.addFile();
}
function removeShared() {
    multMatrixInput1.removeColumn();
    multMatrixInput2.removeFile();
}
matrixInput2Build.querySelector("#" + matrixInput2Build.id + '-button-height-plus').onclick = addShared;
matrixInput2Build.querySelector("#" + matrixInput2Build.id + '-button-height-minus').onclick = removeShared;
matrixInput1Build.querySelector("#" + matrixInput1Build.id + '-button-width-plus').onclick = addShared;
matrixInput1Build.querySelector("#" + matrixInput1Build.id + '-button-width-minus').onclick = removeShared;

// Appends
matrixTableData10.appendChild(matrixInput1Build);
matrixTableData01.appendChild(matrixInput2Build);
matrixTableData11.appendChild(matrixOutputBuild);
wrapper.appendChild(matrixTable);
wrapper.appendChild(multCalculateButton);

export default wrapper;
