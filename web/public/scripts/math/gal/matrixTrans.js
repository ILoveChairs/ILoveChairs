import { MatrixDiv } from "./visuals/matrixDiv.js";

// Wrapper
const wrapperDiv = document.createElement("div");
wrapperDiv.classList.add("math-program-wrapper");
wrapperDiv.classList.add("unselectable");

// Input matrix
const matrixInput = new MatrixDiv(3, 3, {"idSuffix": "trans-0"});

// Center
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

// Output matrix
const matrixOutput = new MatrixDiv(3, 3, {"idSuffix": "trans-1", "disabled": true});

// Logic
calculateButton.onclick = () => {
    const input = matrixInput.getCurrentMatrix();
    matrixOutput.loadMatrix(input.transvert());
}

// Appends
wrapperDiv.appendChild(matrixInput.build());
wrapperDiv.appendChild(centerDiv);
wrapperDiv.appendChild(matrixOutput.build());

export default wrapperDiv;
