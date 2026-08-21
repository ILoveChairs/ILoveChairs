
const armorTypes = Object.freeze({
    "light": {enName: "Light Armor", esName: "Armadura Ligera"},
    "medium": {enName: "Medium Armor", esName: "Armadura Mediana"},
    "heavy": {enName: "Heavy Armor", esName: "Armadura Pesada"}
});

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
        type=null,
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
        this.type = type;
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
export function loadArmor(jsonObject) {
    const type = armorTypes[jsonObject.type];
    return new Weapon({
        // Common
        enName: jsonObject.enName,
        esName: jsonObject.esName,
        enDesc: jsonObject.enDesc,
        esDesc: jsonObject.esDesc,
        // Object
        weight: jsonObject.weight,
        cost: jsonObject.cost,
        // Weapon
        type: type,
        ac = jsonObject.ac,
        maxDexAc = jsonObject.maxDexAc,
        strMin = jsonObject.strMin,
        stealthDisadvantage = jsonObject.stealthDisadvantage
    });
}
