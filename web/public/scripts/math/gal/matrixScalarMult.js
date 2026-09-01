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
mainWrapper.classList.add("math-program-wrapper");
mainWrapper.classList.add("unselectable");

// Input matrix
const MatrixInput = new MatrixDiv(3, 3, {"idSuffix": "scalarMult-0"});

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
    const input = MatrixInput.getCurrentMatrix();
    matrixOutput.loadMatrix(input);
}

// Appends
mainWrapper.appendChild(MatrixInput.build());
mainWrapper.appendChild(centerDiv);
mainWrapper.appendChild(matrixOutput.build());

zoomWrapper.appendChild(zoom.build());
zoomWrapper.appendChild(mainWrapper);

export default zoomWrapper;
