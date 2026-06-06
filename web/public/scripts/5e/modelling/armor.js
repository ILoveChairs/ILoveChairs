
/**
 * Represents wearable armor.
 */
export class Armor {
    constructor({
        // Common
        enName="",
        esName="",
        enDesc="",
        esDesc="",
        // Object
        weight=null,
        cost=null,
        // Armor
        ac=null,
        maxDexAc=null,
        strMin=null,
        stealthDisadvantage=null
    }) {
        // Common
        this.enName = enName;
        this.esName = esName;
        this.enDesc = enDesc;
        this.esDesc = esDesc;
        // Object
        this.weight = weight;
        this.cost = cost;
        // Armor
        this.ac = ac;
        this.maxDexAc = maxDexAc;
        this.strMin = strMin;
        this.stealthDisadvantage = stealthDisadvantage;
    }
    toString() {
        return `${this.enName}: ${this.enDesc}`;
    }
    esToString() {
        return `${this.esName}: ${this.esDesc}`;
    }
}
