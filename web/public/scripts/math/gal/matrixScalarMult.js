import { MatrixDiv } from "./visuals/matrixDiv.js";

// Wrapper
const multWrapperDiv = document.createElement("div");
multWrapperDiv.classList.add("math-program-wrapper");
multWrapperDiv.classList.add("unselectable");

// Input matrix
const multMatrixInput = new MatrixDiv(3, 3, {"idSuffix": "scalarMult-0"});

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
const matrixOutput = new MatrixDiv(3, 3, {"idSuffix": "scalarMult-1", "disabled": true});

// Logic
calculateButton.onclick = () => {
    const input = multMatrixInput.getCurrentMatrix();
    matrixOutput.loadMatrix(input);
}

// Appends
multWrapperDiv.appendChild(multMatrixInput.build());
multWrapperDiv.appendChild(centerDiv);
multWrapperDiv.appendChild(matrixOutput.build());

export default multWrapperDiv;
