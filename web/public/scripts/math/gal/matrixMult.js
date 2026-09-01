import MatrixDiv from "./visuals/matrixDiv.js";
import ZoomControl from "./visuals/zoom.js";

// Zoom Wrapper
const zoomWrapper = document.createElement("div");
zoomWrapper.id = "math-gal-zoom-wrapper";
zoomWrapper.classList.add("math-gal-zoom-wrapper");
zoomWrapper.classList.add("unselectable");

// Zoom
const zoom = new ZoomControl();

// Main Wrapper
const mainWrapper = document.createElement("div");
mainWrapper.id = "math-mult-wrapper";
mainWrapper.classList.add("math-program-wrapper");
mainWrapper.classList.add("unselectable");

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
const matrixInput1 = new MatrixDiv(3, 3, {"idSuffix": "mult-10"});

// Input 2
const matrixInput2 = new MatrixDiv(3, 3, {"idSuffix": "mult-01"});

// Output
const matrixOutput = new MatrixDiv(3, 3, {"idSuffix": "mult-11", "disabled": true, "hideWithCollision": true});

// Hidden
const matrixHidden = new MatrixDiv(3, 3, {"idSuffix": "mult-00", "hidden": true, "hideWithCollision": true, "disabled": true});

// Button
const multCalculateButton = document.createElement("button");
multCalculateButton.classList.add("math-calc-button");
multCalculateButton.type = "button";
multCalculateButton.textContent = "Calc";

// Logic
multCalculateButton.onclick = () => {
    const input1 = matrixInput1.getCurrentMatrix();
    const input2 = matrixInput2.getCurrentMatrix();
    matrixOutput.loadMatrix(input1.multByMatrix(input2));
}

// Builds
const matrixInput1Build = matrixInput1.build();
const matrixInput2Build = matrixInput2.build();
const matrixOutputBuild = matrixOutput.build();
const matrixHiddenBuild = matrixHidden.build();

// File-Column control buttons behaviour change
function addShared() {
    matrixInput1.addColumn();
    matrixHidden.addColumn();
    matrixInput2.addFile();
}
function removeShared() {
    matrixInput1.removeColumn();
    matrixHidden.removeColumn();
    matrixInput2.removeFile();
}
matrixInput2Build.querySelector("#" + matrixInput2Build.id + '-button-height-plus').onclick = addShared;
matrixInput2Build.querySelector("#" + matrixInput2Build.id + '-button-height-minus').onclick = removeShared;
matrixInput1Build.querySelector("#" + matrixInput1Build.id + '-button-width-plus').onclick = addShared;
matrixInput1Build.querySelector("#" + matrixInput1Build.id + '-button-width-minus').onclick = removeShared;

// Appends
matrixTableData00.appendChild(matrixHiddenBuild);
matrixTableData01.appendChild(matrixInput2Build);
matrixTableData10.appendChild(matrixInput1Build);
matrixTableData11.appendChild(matrixOutputBuild);

mainWrapper.appendChild(matrixTable);
mainWrapper.appendChild(multCalculateButton);

zoomWrapper.appendChild(zoom.build());
zoomWrapper.appendChild(mainWrapper);

export default zoomWrapper;
