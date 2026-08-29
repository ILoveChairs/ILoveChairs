import { MatrixDiv } from "./visuals/matrixDiv.js";

// Wrapper
const wrapper = document.createElement("div");
wrapper.id = "math-power-program-wrapper";
wrapper.classList.add("math-program-wrapper");
wrapper.classList.add("unselectable");

// * Inputs
// Wrapper
const inputMatrixWrapper = document.createElement("div");
inputMatrixWrapper.classList.add("math-input-matrix-wrapper");
inputMatrixWrapper.classList.add("unselectable");
// Power
const powerWrapper = document.createElement("div");
powerWrapper.classList.add("math-power-wrapper");
powerWrapper.classList.add("unselectable");
const powerP = document.createElement("p");
powerP.id = "math-power-operator-pow";
powerP.classList.add("math-program-operator");
powerP.classList.add("unselectable");
powerP.innerText = "^";
const powerInput = document.createElement("input");
powerInput.type = "input";
powerInput.id = "math-matrix-power-input"
powerInput.classList.add("math-input");
powerInput.value = "2";
// Power Append
powerWrapper.appendChild(powerP);
powerWrapper.appendChild(powerInput);
// Matrix
const powerInputMatrix = new MatrixDiv(3, 3, {"idSuffix": "power-0"});
// Inputs Append
inputMatrixWrapper.appendChild(powerWrapper);
inputMatrixWrapper.appendChild(powerInputMatrix.build());

// Center
const centerDiv = document.createElement("div");
centerDiv.classList.add("math-center-div");
const arrow = document.createElement("p");
arrow.classList.add("math-arrow");
arrow.textContent = "=>";
const calculateButton = document.createElement("button");
calculateButton.classList.add("math-calc-button");
calculateButton.type = "button";
calculateButton.textContent = "Calc";
centerDiv.appendChild(arrow);
centerDiv.appendChild(calculateButton);

// Output matrix
const outputMatrix = new MatrixDiv(3, 3, {"idSuffix": "power-1", "disabled": true});

// Logic
calculateButton.onclick = () => {
    const input = powerInputMatrix.getCurrentMatrix();
    const power = parseInt(powerInput.value);
    if (power < 0)
        throw Error("Power is negative.");

    if (power === 0) {
        outputMatrix.loadMatrix(input.getIdentityOfSameSize());
        return;
    }
    else if (power === 1) {
        outputMatrix.loadMatrix(input.copy());
        return;
    }

    let result = input;
    for (let p = 1; p < power; p++)
        result = result.multByMatrix(result);
    outputMatrix.loadMatrix(result);
}

// Appends
wrapper.appendChild(inputMatrixWrapper);
wrapper.appendChild(centerDiv);
wrapper.appendChild(outputMatrix.build());

export default wrapper;
