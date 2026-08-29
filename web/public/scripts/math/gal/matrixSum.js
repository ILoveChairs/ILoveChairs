import { MatrixDiv } from "./visuals/matrixDiv.js";

// Wrapper
const wrapper = document.createElement("div");
wrapper.classList.add("math-program-wrapper");
wrapper.classList.add("unselectable");

// Input1
const matrixInput1 = new MatrixDiv(3, 3, {"idSuffix": "sum-0"});

// Plus sign
const plusDiv = document.createElement("div");
plusDiv.classList.add("math-center-div");
plusDiv.classList.add("unselectable");
const plusP = document.createElement("p");
plusP.classList.add("math-operation-p");
plusP.classList.add("unselectable");
plusP.textContent = "+";
plusDiv.appendChild(plusP);

// Input 2
const matrixInput2 = new MatrixDiv(3, 3, {"idSuffix": "sum-1"});

// Equals
const centerDiv = document.createElement("div");
centerDiv.classList.add("math-center-div");
centerDiv.classList.add("unselectable");
const arrow = document.createElement("p");
arrow.classList.add("math-arrow");
arrow.classList.add("unselectable");
arrow.textContent = "=>";
const calculateButton = document.createElement("button");
calculateButton.classList.add("math-calc-button");
calculateButton.classList.add("unselectable");
calculateButton.type = "button";
calculateButton.textContent = "Calc";
centerDiv.appendChild(arrow);
centerDiv.appendChild(calculateButton);

// Output
const matrixOutput = new MatrixDiv(3, 3, {"idSuffix": "sum-2", "disabled": true});

// Logic
calculateButton.onclick = () => {
    const input1 = matrixInput1.getCurrentMatrix();
    const input2 = matrixInput2.getCurrentMatrix();
    matrixOutput.loadMatrix(input1.sum(input2));
}

// Builds
const matrixInput1Build = matrixInput1.build();
const matrixInput2Build = matrixInput2.build();
const matrixOutputBuild = matrixOutput.build();

// File-Column control buttons behaviour change
function addHeight() {
    matrixInput1.addFile();
    matrixInput2.addFile();
}
function removeHeight() {
    matrixInput1.removeFile();
    matrixInput2.removeFile();
}
function addWidth() {
    matrixInput1.addColumn();
    matrixInput2.addColumn();
}
function removeWidth() {
    matrixInput1.removeColumn();
    matrixInput2.removeColumn();
}
matrixInput1Build.querySelector("#" + matrixInput1Build.id + '-button-height-plus').onclick = addHeight;
matrixInput2Build.querySelector("#" + matrixInput2Build.id + '-button-height-plus').onclick = addHeight;
matrixInput1Build.querySelector("#" + matrixInput1Build.id + '-button-height-minus').onclick = removeHeight;
matrixInput2Build.querySelector("#" + matrixInput2Build.id + '-button-height-minus').onclick = removeHeight;
matrixInput1Build.querySelector("#" + matrixInput1Build.id + '-button-width-plus').onclick = addWidth;
matrixInput2Build.querySelector("#" + matrixInput2Build.id + '-button-width-plus').onclick = addWidth;
matrixInput1Build.querySelector("#" + matrixInput1Build.id + '-button-width-minus').onclick = removeWidth;
matrixInput2Build.querySelector("#" + matrixInput2Build.id + '-button-width-minus').onclick = removeWidth;

// Appends
wrapper.appendChild(matrixInput1Build);
wrapper.appendChild(plusDiv);
wrapper.appendChild(matrixInput2Build);
wrapper.appendChild(centerDiv);
wrapper.appendChild(matrixOutputBuild);

export default wrapper;
