import { ComplexNumber, isNumber } from "./complexNumber.js";


export class MatrixRow {
    #array
    #isLastIndependent
    constructor(array, isLastIndependent=false) {
        this.array = array;
        this.isLastIndependent = isLastIndependent;
    }

    set array(inputArray) {
        if (!Array.isArray(inputArray))
            throw new TypeError("inputArray is not array.");
        const output = [];

        for (const element of inputArray) {
            if (isNumber(element))
                output.push(new ComplexNumber(element));
            else if (element instanceof ComplexNumber)
                output.push(element);
            else
                throw new TypeError("An element inside inputArray is not a MatrixRow.");
        }
        this.#array = output;
    }
    get array() {
        return this.#array;
    }

    set isLastIndependent(inputBoolean) {
        if (typeof inputBoolean !== "boolean")
            throw new TypeError("inputBoolean is not a boolean.");

        this.#isLastIndependent = inputBoolean;
    }
    get isLastIndependent() {
        return this.#isLastIndependent;
    }

    getLength() {
        return this.array.length;
    }

    TEMult(inputScalar) {
        if (isNumber(inputScalar))
            inputScalar = new ComplexNumber(inputScalar);
        else if (!(inputScalar instanceof ComplexNumber))
            throw new TypeError("inputScalar is not a number.");

        const newArray = [];
        for (const complexNumber of this.array)
            newArray.push(complexNumber.mult(inputScalar));
        return new MatrixRow(newArray, this.isLastIndependent);
    }

    TESum(inputRow) {
        if (!(inputRow instanceof MatrixRow))
            throw new TypeError("inputRow is not a Matrix Row.");
        else if (this.getLength() !== inputRow.getLength())
            throw new Error("The length of the rows is unequal.");

        const newArray = [];
        for (let i = 0; i < this.getLength(); i++)
            newArray.push(this.array[i].sum(inputRow.array[i]));
        const isIndependent = this.isLastIndependent || inputRow.isLastIndependent;
        return new MatrixRow(newArray, isIndependent);
    }

    copy() {
        const copiedArray = [];
        for (const complexNumber of this.array)
            copiedArray.push(complexNumber.copy());
        return new MatrixRow(copiedArray, this.isLastIndependent);
    }

    toString() {
        const len = this.getLength();
        if (len === 0)
            return "";
        let strSum = "[";
        for (let i = 0; i < len - 1; i++)
            strSum += this.array[i].toString() + ", ";
        return strSum + this.array[len - 1].toString() + "]";
    }
}


export class Matrix {
    #rows;
    #isLastIndependent = false;
    constructor(rows=[]) {
        this.rows = rows;
    }

    set rows(inputArray) {
        if (!Array.isArray(inputArray))
            throw new TypeError("The input is not array.");
        let width = null;
        let isThereIndependents = false;
        for (const row of inputArray) {
            if (!(row instanceof MatrixRow))
                throw new TypeError("An element inside inputArray is not a MatrixRow.");
            if (width === null) {
                width = row.getLength();
            } else {
                if (width !== row.getLength())
                    throw new Error("A row of the matrix is larger than the others.");
            }
            if (row.isLastIndependent) {
                isThereIndependents = true;
            }
        }

        if (isThereIndependents) {
            for (const i = 0; i < inputArray.getHeight(); i++)
                inputArray[i].isLastIndependent = true;
        }
        this.#isLastIndependent = isThereIndependents;
        this.#rows = inputArray;
    }
    get rows() {
        return this.#rows;
    }

    set isLastIndependent(inputBoolean) {
        if (typeof inputBoolean !== "boolean")
            throw new TypeError("inputBoolean is not a boolean.");

        this.#isLastIndependent = inputBoolean;
    }
    get isLastIndependent() {
        return this.#isLastIndependent;
    }

    getHeight() {
        return this.rows.length;
    }

    getLength() {
        return this.getHeight() === 0? 0 : this.rows[0].getLength();
    }

    TEInterchange(f1, f2) {
        if (!(isNumber(f1) && Number.isInteger(f1)))
            throw new TypeError("f1 parameter is not an Integer number.");
        else if (!(isNumber(f2) && Number.isInteger(f2)))
            throw new TypeError("f2 parameter is not an Integer number.");
        else if (f1 < 0 || f1 >= this.getHeight())
            throw new ValueError("f1 parameter is outside matrix range.");
        else if (f2 < 0 || f2 >= this.getHeight())
            throw new Error("f2 parameter is outside matrix range.");
        else if (f1 === f2)
            console.warn("f1 === f2, non-changing TEInterchange detected.");

        const newRows = [];
        for (let i = 0; i < this.getHeight(); i++) {
            if (i !== f1 && i !== f2)
                newRows.push(this.rows[i].copy());
            else if (i == f2)
                newRows.push(this.rows[f1].copy());
            else
                newRows.push(this.rows[f2].copy());
        }
        return new Matrix(newRows);
    }

    sum(inputMatrix) {
        if (!(inputMatrix instanceof Matrix))
            throw new TypeError("inputMatrix is not a Matrix.");

        const newRows = [];
        for (let i = 0; i < this.getHeight(); i++) {
            newRows.push(this.rows[i].TESum(inputMatrix.rows[i]));
        }
        return new Matrix(newRows);
    }

    multByScalar(inputScalar) {
        if (isNumber(inputScalar))
            inputScalar = new ComplexNumber(inputScalar);
        else if (!(inputScalar instanceof ComplexNumber))
            throw new TypeError("inputScalar is not a number.");

        const newRows = [];
        for (let i = 0; i < this.getHeight(); i++)
            newRows.push(this.rows[i].TEMult(inputScalar));
        return new Matrix(newRows);
    }

    multByMatrix(inputMatrix) {
        if (!(inputMatrix instanceof Matrix))
            throw new TypeError("inputMatrix is not a Matrix.");
        if (inputMatrix.getHeight() !== this.getLength())
            throw new Error("height of inputMatrix is different from width of this.");
        const limit = inputMatrix.getHeight();
        const newRows = [];
        for (let a = 0; a < this.getHeight(); a++) {
            const newRow = [];
            for (let b = 0; b < inputMatrix.getLength(); b++) {
                let sum = new ComplexNumber(0);
                for (let i = 0; i < limit; i++)
                    sum = sum.sum(this.rows[a].array[i].mult(inputMatrix.rows[i].array[b]));
                newRow.push(sum);
            }
            newRows.push(new MatrixRow(newRow));
        }
        return new Matrix(newRows);
    }

    transvert() {
        const newHeight = this.getLength();
        const newLength = this.getHeight();
        const rows = [];
        for (let a = 0; a < newHeight; a++) {
            const row = [];
            for (let b = 0; b < newLength; b++)
                row.push(this.rows[b].array[a]);
            rows.push(new MatrixRow(row));
        }
        return new Matrix(rows);
    }

    static identity(m=1, n=1) {
        const rows = [];
        for (let a = 0; a < m; a++) {
            const row = [];
            for (let b = 0; b < n; b++)
                row.push(new ComplexNumber(1));
            rows.push(new MatrixRow(row));
        }
        return new Matrix(rows);
    }

    getIdentityOfSameSize() {
        return Matrix.identity(this.getHeight(), this.getLength());
    }

    copy() {
        const copiedRows = [];
        for (const row of this.rows)
            copiedRows.push(row.copy())
        return new Matrix(copiedRows, this.isLastIndependent);
    }

    toString() {
        const len = this.getHeight();
        if (len === 0)
            return "";
        let strSum = "(\n";
        for (let i = 0; i < len - 1; i++)
            strSum += this.rows[i].toString() + ",\n";
        return strSum + this.rows[len - 1].toString() + "\n)\n";
    }
}
