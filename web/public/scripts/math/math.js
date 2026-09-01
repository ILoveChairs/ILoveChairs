// Start information
import info from "./info.js"
// GAL
import galInfo from "./gal/galInfo.js"
import matrixScalarMult from "./gal/matrixScalarMult.js";
import matrixTrans from "./gal/matrixTrans.js";
import matrixSum from "./gal/matrixSum.js";
import matrixMult from "./gal/matrixMult.js";
import matrixPower from "./gal/matrixPower.js";
//import matrixInverse from "./gal/matrixInverse.js";
// Calculus
// Discrete Mathematics

const AREASSELECTID = "math-select-areas";
const AREASSELECTOPTIONID = "math-select-areas-option";
const AREASSELECTOPTIONCLASS = "math-select-areas-option";
const PROGRAMSELECTID = "math-select-programs";
const PROGRAMSELECTOPTIONID = "math-select-programs-option-";
const PROGRAMSELECTOPTIONCLASS = "math-select-programs-option";
const CONTENTDIVID = "math-content";

function headerSpaceHandler() {
  let header = document.getElementById('body-header');
  let headerStyle = window.getComputedStyle(header);
  let height = headerStyle.getPropertyValue('height');

  let body = document.getElementById('body');
  body.style.paddingTop = height;
}
addEventListener("load", headerSpaceHandler);
addEventListener("resize", headerSpaceHandler);

const programsByArea = {
    "Info": {
        "Info": info
    },
    "GAL": {
        "Info": galInfo,
        "Matrix Scalar Multiplication": matrixScalarMult,
        "Matrix Transposition": matrixTrans,
        "Matrix Addition": matrixSum,
        "Matrix Multiplication": matrixMult,
        "Matrix Power": matrixPower,
        //matrixInverse
    },
    //"CALC": {},
    //"MD": {}
};

const content = document.getElementById(CONTENTDIVID);
const programSelect = document.getElementById(PROGRAMSELECTID);
const areaSelect = document.getElementById(AREASSELECTID);

function populateAreaSelect() {
    content.textContent = '';
    areaSelect.textContent = '';
    for (const areas in programsByArea) {
        const option = document.createElement("option");
        option.id = AREASSELECTOPTIONID + areas;
        option.classList.add(AREASSELECTOPTIONCLASS);
        option.classList.add("unselectable");
        option.value = areas;
        option.innerText = areas;
        areaSelect.appendChild(option);
    }
}
populateAreaSelect();

function populateProgramSelect() {
    content.textContent = '';
    programSelect.textContent = '';
    if (areaSelect.value === "")
        return;

    const programs = programsByArea[areaSelect.value];
    if (programs === null || programs === undefined)
        throw new Error("Area not found.");

    if (Object.keys(programs).length === 0)
        return;

    for (const program in programs) {
        const option = document.createElement("option");
        option.id = PROGRAMSELECTOPTIONID + program;
        option.classList.add(PROGRAMSELECTOPTIONCLASS);
        option.classList.add("unselectable");
        option.value = program;
        option.innerText = program;
        programSelect.appendChild(option);
    }
    content.appendChild(programsByArea[areaSelect.value][programSelect.value]);
}
populateProgramSelect();

areaSelect.addEventListener('change', populateProgramSelect);

programSelect.addEventListener('change', function() {
    content.textContent = '';
    if (areaSelect.value === "")
        return;

    const program = programsByArea[areaSelect.value][programSelect.value];

    if (program === null || program === undefined)
        throw new Error("Program not found");

    content.appendChild(program);
});

window.onerror = function myErrorHandler(errorMsg, url, lineNumber) {
    const errorP = document.getElementById("math-error-message");
    errorP.innerText = errorMsg.split(":")[1];
    errorP.style.display = "block";
    return false;
}

addEventListener("mousedown", (event) => {
    if (
        event.target.className.includes("math-calc-button") ||
        event.target.className.includes("math-select") ||
        event.target.className.includes("math-size-button-plus") ||
        event.target.className.includes("math-size-button-minus")
    )
        document.getElementById("math-error-message").style.display = "none";
})
