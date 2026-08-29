export function isNumber(n) {
    return typeof n == 'number' && !isNaN(n) && isFinite(n);
}

export class ComplexNumber {
    constructor(r, i=0) {
        if (!isNumber(r)) {
            throw new TypeError("Real number parameter is not a real number.");
        } else if (!isNumber(i)) {
            throw new TypeError("Imaginary number parameter is not a real number.");
        }
        this.r = r;
        this.i = i;
    }

    sum(complexInput) {
        const outputR = complexInput.r + this.r;
        const outputI = complexInput.i + this.i;
        return new ComplexNumber(outputR, outputI);
    }

    mult(complexInput) {
        const outputR = complexInput.r * this.r - complexInput.i * this.i;
        const outputI = complexInput.r * this.i + complexInput.i * this.r;
        return new ComplexNumber(outputR, outputI);
    }

    pow(realInput) {
        if (!isNumber(realInput))
            throw new TypeError("realInput is not a real number.");
        if (realInput === 0)
            return 1;
        return this.mult(this.pow(realInput - 1))
    }

    copy() {
        return new ComplexNumber(this.r, this.i);
    }

    toString() {
        return `${this.r}${this.i == 0? "" : (this.i > 0? " + " + this.i : " - " + this.i * -1) + "i"}`;
    }

    static fromString(str) {
        if (!(typeof str === "string" || str instanceof String))
            throw new TypeError("Not a string.");
        const tokens = str.replace(",", ".").split(" ");
        if (tokens.length === 1) {
            return new ComplexNumber(parseFloat(str));
        } else if (tokens.length === 3) {
            const realNumber = parseFloat(tokens[0]);
            if (!(tokens[1] === "+" || tokens[1] === "-"))
                throw Error("Unknown character at sign position.");
            const imaginarySign = tokens[1] === "+"? 1 : -1;
            const imaginaryNumber = tokens[2] === "i"? 1 : parseFloat(tokens[2].replace("i", ""));
            return new ComplexNumber(realNumber, imaginaryNumber * imaginarySign);
        } else {
            throw new Error("Invalid number format.");
        }
    }
}

export function strToNum() {
    
}
