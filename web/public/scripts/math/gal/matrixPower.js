import MatrixDiv from "./visuals/matrixDiv.js";
import ZoomControl from "./visuals/zoom.js";

// Zoom Wrapper
const zoomWrapper = document.createElement("div");
zoomWrapper.id = "math-gal-zoom-wrapper";
zoomWrapper.classList.add("math-gal-zoom-wrapper");
zoomWrapper.classList.add("unselectable");

// Zoom
const zoom = new ZoomControl();

// Wrapper
const mainWrapper = document.createElement("div");
mainWrapper.id = "math-power-program-wrapper";
mainWrapper.classList.add("math-program-wrapper");
mainWrapper.classList.add("unselectable");

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
powerInput.id = "math-matrix-power-input";
powerInput.classList.add("math-input");
powerInput.value = "2";
powerInput.addEventListener(`focus`, () => powerInput.select());
// Power Append
powerWrapper.appendChild(powerP);
powerWrapper.appendChild(powerInput);
// Matrix
const inputMatrix = new MatrixDiv(3, 3, {"idSuffix": "power-0"});
// Inputs Append
inputMatrixWrapper.appendChild(powerWrapper);

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
    if (powerInput.value === "")
        throw new Error("Power undefined.");
    else if (powerInput.value.includes("i"))
        throw new Error("Power cannot be complex number.");
    else if (!/^[+-]?\d+(?:\.\d+)?$/.test(powerInput.value))
        throw new Error("Power is not number or it is badly formatted.");

    const input = inputMatrix.getCurrentMatrix();
    const power = parseFloat(powerInput.value);
    if (power < 0)
        throw Error("Power is negative.");
    else if (power === 0) {
        outputMatrix.loadMatrix(input.getIdentityOfSameSize());
        return;
    }
    else if (power === 1) {
        outputMatrix.loadMatrix(input.copy());
        return;
    }
    else if (power % 1 !== 0) {
        throw new Error("Power is not integer.")
    }

    let result = input;
    for (let p = 1; p < power; p++)
        result = result.multByMatrix(result);
    outputMatrix.loadMatrix(result);
}

// Builds
const matrixInputBuild = inputMatrix.build();

// File-Column control buttons behaviour change
function addShared() {
    inputMatrix.addColumn();
    inputMatrix.addFile();
}
function removeShared() {
    inputMatrix.removeColumn();
    inputMatrix.removeFile();
}
matrixInputBuild.querySelector("#" + matrixInputBuild.id + '-button-height-plus').onclick = addShared;
matrixInputBuild.querySelector("#" + matrixInputBuild.id + '-button-height-minus').onclick = removeShared;
matrixInputBuild.querySelector("#" + matrixInputBuild.id + '-button-width-plus').onclick = addShared;
matrixInputBuild.querySelector("#" + matrixInputBuild.id + '-button-width-minus').onclick = removeShared;

// Appends
inputMatrixWrapper.appendChild(matrixInputBuild);
mainWrapper.appendChild(inputMatrixWrapper);
mainWrapper.appendChild(centerDiv);
mainWrapper.appendChild(outputMatrix.build());

zoomWrapper.appendChild(zoom.build());
zoomWrapper.appendChild(mainWrapper);

export default zoomWrapper;
