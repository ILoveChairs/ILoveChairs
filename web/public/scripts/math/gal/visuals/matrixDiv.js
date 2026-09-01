import { ComplexNumber } from "../models/complexNumber.js";
import { Matrix, MatrixRow } from "../models/matrix.js";

// * IDs and Classes
// general
const MATRIXIDPREFIX = "math-matrix-";
const MATRIXCLASS = "math-matrix";
const MATRIXMULTICLASSPREFIX = "math-matrix-";
// coefficient
const MATRIXCOEFFICIENTCLASS = "math-matrix-coefficient";
// table
const MATRIXTABLECLASS = "math-matrix-table";
const MATRIXTABLEROWCLASS = "math-matrix-table-row";
const MATRIXTABLEDATACLASS = "math-matrix-table-data";
const MATRIXTABLEDATAINPUTCLASS = "math-matrix-table-data-input";
// headers
const MATRIXTABLECOLUMNHEADERROWCLASS = "math-matrix-table-column-header-row";
const MATRIXTABLECOLUMNHEADERCLASS = "math-matrix-table-column-header";
const MATRIXTABLEROWHEADERCLASS = "math-matrix-table-row-header";
const MATRIXTABLEHEADERH5CLASS = "math-matrix-table-header-h5";
const MATRIXTABLEHEADERH5DISABLEDCLASS = "math-matrix-table-header-h5-disabled";
const MATRIXTABLEHEADEREMPTYCLASS = "math-matrix-table-header-empty";

export default class MatrixDiv {
    constructor(m=1, n=1,
        {
            idSuffix="0",
            multiClasses=[],
            disabled=false,
            hidden=false,
            hideWithCollision=false,
        }
    ) {
        this.id = MATRIXIDPREFIX + idSuffix;
        this.multiClasses = multiClasses;
        this.disabled = disabled;
        this.hidden = hidden;
        this.hideWithCollision = hideWithCollision;
        // m: height, rows
        this.m = m;
        // n: width, columns
        this.n = n;
    }

    buildSquare(a, b) {
        const td = document.createElement("td");
        td.id = this.id + `-td-${a}${b}`;
        td.classList.add(MATRIXTABLEDATACLASS);
        td.classList.add("unselectable");

        const tdInput = document.createElement("input");
        tdInput.id = this.id + `-input-${a}${b}`;
        tdInput.classList.add(MATRIXTABLEDATAINPUTCLASS);
        tdInput.type = "input";
        tdInput.value = "0";
        tdInput.addEventListener(`focus`, () => tdInput.select());
        if (this.disabled) {
            tdInput.value = "";
            tdInput.disabled = true;
        }

        td.appendChild(tdInput);

        return td;
    }

    buildColumnHeaderSquare(b) {
        const th = document.createElement("th");
        th.id = this.id + `-th-column-${b}`;
        th.classList.add(MATRIXTABLECOLUMNHEADERCLASS);
        th.classList.add("unselectable");

        const h5 = document.createElement("h5");
        h5.id = this.id + `-th-column-${b}-h5`;
        h5.classList.add(MATRIXTABLEHEADERH5CLASS);
        h5.classList.add("unselectable");
        h5.innerText = b.toString();
        if (this.disabled)
            h5.classList.add(MATRIXTABLEHEADERH5DISABLEDCLASS);

        th.appendChild(h5);
        return th;
    }
    buildRowHeaderSquare(a) {
        const th = document.createElement("th");
        th.id = this.id + `-th-row-${a}`;
        th.classList.add(MATRIXTABLEROWHEADERCLASS);
        th.classList.add("unselectable");

        const h5 = document.createElement("h5");
        h5.id = this.id + `-th-row-${a}-h5`;
        h5.classList.add(MATRIXTABLEHEADERH5CLASS);
        h5.classList.add("unselectable");
        h5.innerText = a.toString();
        if (this.disabled)
            h5.classList.add(MATRIXTABLEHEADERH5DISABLEDCLASS);

        th.appendChild(h5);
        return th;
    }

    buildFile(a) {
        const tr = document.createElement("tr");
        tr.id = this.id + `-tr-${a}`;
        tr.classList.add(MATRIXTABLEROWCLASS);

        tr.appendChild(this.buildRowHeaderSquare(a));

        for (let b = 1; b <= this.n; b++)
            tr.appendChild(this.buildSquare(a, b));

        return tr;
    }

    build() {
        // Matrix div
        const matrixWrapper = document.createElement("div");
        matrixWrapper.id = this.id;
        matrixWrapper.classList.add(MATRIXCLASS);
        if (this.hidden && this.hideWithCollision)
            matrixWrapper.style.visibility = "hidden";
        else if (this.hidden)
            matrixWrapper.style.display = "none";
        this.multiClasses.forEach((cl) =>
            {matrixWrapper.classList.add(MATRIXMULTICLASSPREFIX + cl)}
        );

        // Coefficient
        const matrixCoefficient = document.createElement("input");
        matrixCoefficient.id = this.id + `-coefficient`;
        matrixCoefficient.name = "coefficient"
        matrixCoefficient.classList.add(MATRIXCOEFFICIENTCLASS);
        matrixCoefficient.type = "input";
        matrixCoefficient.value = "1";
        matrixCoefficient.addEventListener(`focus`, () => matrixCoefficient.select());
        if (this.disabled && this.hideWithCollision)
            matrixCoefficient.style.visibility = "hidden";
        else if (this.disabled)
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

        // * Table content
        // Column headers
        const headerRow = document.createElement("tr");
        headerRow.id = this.id + `-tr-header`;
        headerRow.classList.add(MATRIXTABLECOLUMNHEADERROWCLASS);
        headerRow.classList.add("unselectable");
        const emptySquare = document.createElement("th");
        emptySquare.id = this.id + `-empty`;
        emptySquare.classList.add(MATRIXTABLEHEADEREMPTYCLASS);
        emptySquare.classList.add("unselectable");
        headerRow.appendChild(emptySquare)
        for (let b = 1; b <= this.n; b++)
            headerRow.appendChild(this.buildColumnHeaderSquare(b))
        matrixTable.appendChild(headerRow);
        // Data rows
        for (let a = 1; a <= this.m; a++)
            matrixTable.appendChild(this.buildFile(a));
        tableWrapper.appendChild(matrixTable);

        // * Height control
        // Height wrapper
        const heightButtonsWrapper = document.createElement("div");
        heightButtonsWrapper.id = this.id + "-button-height-wrapper";
        heightButtonsWrapper.classList.add("math-height-wrapper");
        heightButtonsWrapper.classList.add("unselectable");
        // Height plus button
        const heightPlusButton = document.createElement("button");
        heightPlusButton.id = this.id + "-button-height-plus";
        heightPlusButton.classList.add("math-size-button-plus");
        heightPlusButton.classList.add("unselectable");
        heightPlusButton.innerText = "+";
        heightPlusButton.onclick = () => {
            this.addFile();
        };
        // Height minus button
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
        tableWrapper.appendChild(heightButtonsWrapper);
        if (this.disabled && this.hideWithCollision)
            heightButtonsWrapper.style.visibility = "hidden";
        else if (this.disabled)
            heightButtonsWrapper.style.display = "none";

        // * Width control
        // Width wrapper
        const widthButtonsWrapper = document.createElement("div");
        widthButtonsWrapper.id = this.id + "-button-width-wrapper";
        widthButtonsWrapper.classList.add("math-width-wrapper");
        // Width plus button
        const widthPlusButton = document.createElement("button");
        widthPlusButton.id = this.id + "-button-width-plus";
        widthPlusButton.classList.add("math-size-button-plus");
        widthPlusButton.classList.add("unselectable");
        widthPlusButton.innerText = "+";
        widthPlusButton.onclick = () => {
            this.addColumn();
        };
        // Width minus button
        const widthMinusButton = document.createElement("button");
        widthMinusButton.id = this.id + "-button-width-minus";
        widthMinusButton.classList.add("math-size-button-minus");
        widthMinusButton.classList.add("unselectable");
        widthMinusButton.innerText = "-";
        widthMinusButton.onclick = () => {
            this.removeColumn();
        };
        // Width Appends
        widthButtonsWrapper.appendChild(widthPlusButton);
        widthButtonsWrapper.appendChild(widthMinusButton);
        if (this.disabled && this.hideWithCollision)
            widthButtonsWrapper.style.visibility = "hidden";
        else if (this.disabled)
            widthButtonsWrapper.style.display = "none";

        // Matrix div Appends
        matrixWrapper.appendChild(matrixCoefficient);
        matrixWrapper.appendChild(tableWrapper);
        matrixWrapper.appendChild(widthButtonsWrapper);

        return matrixWrapper;
    }

    getCurrentMatrix() {
        const coefficient = document.getElementById(this.id + `-coefficient`).value;
        const rows = [];
        for (let a = 1; a <= this.m; a++) {
            const row = [];
            for (let b = 1; b <= this.n; b++) {
                const number = document.getElementById(this.id + `-input-${a}${b}`).value;
                if (number === "")
                    throw Error("Entry without number.");
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
        document.getElementById(this.id + `-table`).appendChild(this.buildFile(this.m + 1));
        this.m = this.m + 1;
    }
    addColumn() {
        const trH = document.getElementById(this.id + `-tr-header`);
        trH.appendChild(this.buildColumnHeaderSquare(this.n + 1));
        for (let a = 1; a <= this.m; a++) {
            const tr = document.getElementById(this.id + `-tr-${a}`);
            tr.appendChild(this.buildSquare(a, this.n + 1));
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
        const trH = document.getElementById(this.id + `-tr-header`);
        trH.removeChild(trH.lastChild);
        for (let a = 1; a <= this.m; a++) {
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
        for (let a = 1; a <= matrix.getHeight(); a++) {
            for (let b = 1; b <= matrix.getLength(); b++) {
                const tdInput = document.getElementById(this.id + `-input-${a}${b}`);
                tdInput.value = matrix.rows[a-1].array[b-1].toString();
            }
        }
    }
}
