import { ComplexNumber } from "../models/complexNumber.js";
import { Matrix, MatrixRow } from "../models/matrix.js";

const MATRIXIDPREFIX = "math-matrix-";
const MATRIXCLASS = "math-matrix";
const MATRIXMULTICLASSPREFIX = "math-matrix-";
const MATRIXCOEFfICIENTCLASS = "math-matrix-coefficient";
const MATRIXTABLECLASS = "math-matrix-table";
const MATRIXTABLEROWCLASS = "math-matrix-table-row";
const MATRIXTABLEDATACLASS = "math-matrix-table-data";
const MATRIXTABLEDATAINPUTCLASS = "math-matrix-table-data-input";

export class MatrixDiv {
    constructor(m=1, n=1, {idSuffix="0", multiClasses=[], disabled=false}) {
        this.id = MATRIXIDPREFIX + idSuffix;
        this.multiClasses = multiClasses;
        this.disabled = disabled;
        // m: height, rows
        this.m = m;
        // n: width, columns
        this.n = n;
    }

    buildSquare(a, b) {
        const td = document.createElement("td");
        td.id = this.id + `-td-${a}${b}`;
        td.classList.add(MATRIXTABLEDATACLASS);

        const tdInput = document.createElement("input");
        tdInput.id = this.id + `-input-${a}${b}`;
        tdInput.classList.add(MATRIXTABLEDATAINPUTCLASS);
        tdInput.type = "input";
        tdInput.value = "0";
        if (this.disabled) {
            tdInput.value = "";
            tdInput.disabled = true;
        }

        td.appendChild(tdInput);

        return td;
    }

    buildFile(a) {
        const tr = document.createElement("tr");
        tr.id = this.id + `-tr-${a}`;
        tr.classList.add(MATRIXTABLEROWCLASS);

        for (let b = 0; b < this.n; b++)
            tr.appendChild(this.buildSquare(a, b));

        return tr;
    }

    build() {
        // Matrix div
        const matrixDiv = document.createElement("div");
        matrixDiv.id = this.id;
        matrixDiv.classList.add(MATRIXCLASS);
        this.multiClasses.forEach((cl) =>
            {matrixDiv.classList.add(MATRIXMULTICLASSPREFIX + cl)}
        );

        // Coefficient
        const matrixCoefficient = document.createElement("input");
        matrixCoefficient.id = this.id + `-coefficient`;
        matrixCoefficient.name = "coefficient"
        matrixCoefficient.classList.add(MATRIXCOEFfICIENTCLASS);
        matrixCoefficient.type = "input";
        matrixCoefficient.value = "1";
        if (this.disabled)
            matrixCoefficient.style.display = "none";

        // Table wrapper
        const tableWrapper = document.createElement("div");
        tableWrapper.id = this.id + "-tale-wrapper";
        tableWrapper.classList.add("math-table-wrapper");
        // Table
        const matrixTable = document.createElement("table");
        matrixTable.id = this.id + `-table`;
        matrixTable.classList.add(MATRIXTABLECLASS);
        matrixTable.classList.add("unselectable");
        // Table content
        for (let a = 0; a < this.m; a++)
            matrixTable.appendChild(this.buildFile(a));
        tableWrapper.appendChild(matrixTable);

        // Height control
        const heightButtonsWrapper = document.createElement("div");
        heightButtonsWrapper.id = this.id + "-button-height-wrapper";
        heightButtonsWrapper.classList.add("math-height-wrapper");
        heightButtonsWrapper.classList.add("unselectable");
        const heightPlusButton = document.createElement("button");
        heightPlusButton.id = this.id + "-button-height-plus";
        heightPlusButton.classList.add("math-size-button-plus");
        heightPlusButton.classList.add("unselectable");
        heightPlusButton.innerText = "+";
        heightPlusButton.onclick = () => {
            this.addFile();
        };
        const heightMinusButton = document.createElement("button");
        heightMinusButton.id = this.id + "-button-height-minus";
        heightMinusButton.classList.add("math-size-button-minus");
        heightMinusButton.classList.add("unselectable");
        heightMinusButton.innerText = "-";
        heightMinusButton.onclick = () => {
            this.removeFile();
        };
        heightButtonsWrapper.appendChild(heightPlusButton);
        heightButtonsWrapper.appendChild(heightMinusButton);
        if (!this.disabled)
            tableWrapper.appendChild(heightButtonsWrapper);

        // Width control
        const widthButtonsWrapper = document.createElement("div");
        widthButtonsWrapper.id = this.id + "-button-width-wrapper";
        widthButtonsWrapper.classList.add("math-width-wrapper");
        const widthPlusButton = document.createElement("button");
        widthPlusButton.id = this.id + "-button-width-plus";
        widthPlusButton.classList.add("math-size-button-plus");
        widthPlusButton.classList.add("unselectable");
        widthPlusButton.innerText = "+";
        widthPlusButton.onclick = () => {
            this.addColumn();
        };
        const widthMinusButton = document.createElement("button");
        widthMinusButton.id = this.id + "-button-width-minus";
        widthMinusButton.classList.add("math-size-button-minus");
        widthMinusButton.classList.add("unselectable");
        widthMinusButton.innerText = "-";
        widthMinusButton.onclick = () => {
            this.removeColumn();
        };
        widthButtonsWrapper.appendChild(widthPlusButton);
        widthButtonsWrapper.appendChild(widthMinusButton);

        // Matrix div Appending
        matrixDiv.appendChild(matrixCoefficient);
        matrixDiv.appendChild(tableWrapper);
        if (!this.disabled)
            matrixDiv.appendChild(widthButtonsWrapper);

        return matrixDiv;
    }

    getCurrentMatrix() {
        const coefficient = document.getElementById(this.id + `-coefficient`).value;
        const rows = [];
        for (let a = 0; a < this.m; a++) {
            const row = [];
            for (let b = 0; b < this.n; b++) {
                const number = document.getElementById(this.id + `-input-${a}${b}`).value;
                row.push(ComplexNumber.fromString(number));
            }
            rows.push(new MatrixRow(row));
        }
        const matrix = new Matrix(rows);
        const coefficientNumber = ComplexNumber.fromString(coefficient);
        if (coefficientNumber === 1)
            return matrix;
        return matrix.multByScalar(coefficientNumber);
    }

    addFile() {
        document.getElementById(this.id + `-table`).appendChild(this.buildFile(this.m));
        this.m = this.m + 1;
    }
    addColumn() {
        for (let a = 0; a < this.m; a++) {
            const tr = document.getElementById(this.id + `-tr-${a}`);
            tr.appendChild(this.buildSquare(a, this.n));
        }
        this.n = this.n + 1;
    }
    removeFile() {
        if (this.m === 1)
            throw new Error("Cannot have a matrix of height 0.");
        const table = document.getElementById(this.id + `-table`);
        table.removeChild(table.lastChild);
        this.m = this.m - 1;
    }
    removeColumn() {
        if (this.n === 1)
            throw new Error("Cannot have a matrix of width 0.");
        for (let a = 0; a < this.m; a++) {
            const tr = document.getElementById(this.id + `-tr-${a}`);
            tr.removeChild(tr.lastChild);
        }
        this.n = this.n - 1;
    }

    loadMatrix(matrix) {
        if (!(matrix instanceof Matrix))
            throw new TypeError("Input is not a matrix.");

        // Adjust visual matrix dimenstions with new logical matrix dimensions.
        const desiredHeigth = matrix.getHeight();
        const currentHeight = this.m;
        const heightDiff = currentHeight - desiredHeigth;
        if (heightDiff < 0) {
            for (let i = currentHeight; i < desiredHeigth; i++)
                this.addFile();
        } else if (heightDiff > 0) {
            for (let i = currentHeight; i > desiredHeigth; i--)
                this.removeFile();
        }
        const desiredWidth = matrix.getLength();
        const currentWidth = this.n;
        const widthDiff = currentWidth - desiredWidth;
        if (widthDiff < 0) {
            for (let i = currentWidth; i < desiredWidth; i++)
                this.addColumn();
        } else if (widthDiff > 0) {
            for (let i = currentWidth; i > desiredWidth; i--)
                this.removeColumn();
        }

        // Replace old numbers with new ones.
        for (let a = 0; a < matrix.getHeight(); a++) {
            for (let b = 0; b < matrix.getLength(); b++) {
                const tdInput = document.getElementById(this.id + `-input-${a}${b}`);
                tdInput.value = matrix.rows[a].array[b].toString();
            }
        }
    }
}
