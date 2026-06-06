
/**
 * Representation of a generic object.
 * 
 * It is called "DnDObject" to differentiate between js objects.
 */
export class DnDObject {
    constructor({
        // Common
        enName="",
        esName="",
        enDesc="",
        esDesc="",
        // Object
        weight=null,
        cost=null,
    }) {
        // Common
        this.enName = enName;
        this.esName = esName;
        this.enDesc = enDesc;
        this.esDesc = esDesc;
        // Object
        this.weight = weight;
        this.cost = cost;
    }
    toString() {
        return `${this.enName}: ${this.enDesc}`;
    }
    esToString() {
        return `${this.esName}: ${this.esDesc}`;
    }
}
