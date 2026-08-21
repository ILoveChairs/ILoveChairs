import { damages, loadDie } from "./base.js";

export const weaponTypes = Object.freeze({
    simpleMelee: {},
    simpleRanged: {},
    martialMelee: {},
    martialRanged: {}
});

export const weaponProperties = Object.freeze({
    ammunition: {enName: "Ammunnition", esName: "Munición",
        enDesc: "To make a ranged attack, this weapon requires to expend one piece of the appropiate ammunition. Drawing the ammunition is part of the attack (you need a free hand to load a one-handed weapon). After a fight, you can spend 1 minute to recover half the ammunition (rounded down) you used in the fight; the rest is lost.",
        esDesc: "Para poder atacar a distancia, esta arma requiere gastar una munición compatible. Agarrar y cargar la munición es parte del ataque (precisás una mano libre para cargar un arma de una mano). Después de un combate, podés pasar 1 minuto recuperando la mitad (redondeado para bajo) de las municiones que perdiste en el combate; la otra mitad se pierde."
    },
    finesse: {enName: "Finesse", esName: "Sutil",
        enDesc: "You can use either your Strength modifier or your Dexterity modifier whenever you use the weapon. You must use the same modifier for both attack and damage.",
        esDesc: "Podés usar tu m"
    },
    heavy: {enName: "Heavy", esName: "Pesado", enDesc:"", esDesc:""},
    light: {enName: "Light", esName: "Ligero", enDesc:"", esDesc:""},
    loading: {enName: "Loading", esName: "Recarga", enDesc:"", esDesc:""},
    range: {enName: "Range", esName: "Rango", enDesc:"", esDesc:""},
    reach: {enName: "Reach", esName: "Alcance", enDesc:"", esDesc:""},
    thrown: {enName: "Thrown", esName: "Tirable", enDesc:"", esDesc:""},
    twoHanded: {enName: "Two-handed", esName: "Dos manos", enDesc:"", esDesc:""},
    versatile: {enName: "Versatile", esName: "Versátil", enDesc:"", esDesc:""}
});

export const masteryProperties = Object.freeze({
    cleave: {enName="Cleave", esName="", enDesc:"", esDesc:""},
    graze: {enName="Graze", esName="", enDesc:"", esDesc:""},
    nick: {enName="Nick", esName="", enDesc:"", esDesc:""},
    push: {enName="Push", esName="", enDesc:"", esDesc:""},
    sap: {enName="Sap", esName="", enDesc:"", esDesc:""},
    slow: {enName="Slow", esName="", enDesc:"", esDesc:""},
    topple: {enName="Topple", esName="", enDesc:"", esDesc:""},
    vex: {enName="Vex", esName="", enDesc:"", esDesc:""}
});

export class WeaponPropertyExpanded {
    constructor(weaponProperty, additionalInfo="") {
        this.weaponProperty = weaponProperty;
        this.additionalInfo = additionalInfo;
    }
    esAdditionalInfo() {
        if (this.additionalInfo === null || this.additionalInfo === undefined || this.additionalInfo.length === 0)
            return null;

        const infos = this.additionalInfo.split(";");
        for (const info in infos) {
            const enEs = infos[info].split("/");
            // If not number:
            if (!( /^-?\d+$/.test(enEs[0]) ))
                // Delete en part.
                infos[info].replace(enEs[0] + "/", "");
        }
        return infos;
    }
    enAdditionalInfo() {
        if (this.additionalInfo === null || this.additionalInfo === undefined || this.additionalInfo.length === 0)
            return null;

        const infos = this.additionalInfo.split(";");
        for (const info in infos) {
            const enEs = infos[info].split("/");
            // If not number:
            if (!( /^-?\d+$/.test(enEs[0]) ))
                // Delete es part.
                infos[info].replace("/" + enEs[1], "");
        }
        return infos;
    }
}

export class Weapon {
    constructor({
        // Common
        enName="",
        esName="",
        enDesc="",
        esDesc="",
        // Object
        weight=null,
        cost=null,
        // Weapon
        type=null,
        dmg=null,
        dmgType=null,
        masteryProperty=null,
        properties=[]
    }) {
        // Common
        this.enName = enName;
        this.esName = esName;
        this.enDesc = enDesc;
        this.esDesc = esDesc;
        // Object
        this.weight = weight;
        this.cost = cost;
        // Weapon
        this.type = type;
        this.dmg = dmg;
        this.dmgType = dmgType;
        this.masteryProperty = masteryProperty;
        this.properties = properties;
    }
    toString() {
        return `${this.enName}: ${this.enDesc}`;
    }
    esToString() {
        return `${this.esName}: ${this.esDesc}`;
    }
}

export function loadWeapon(jsonObject) {
    const type = weaponTypes[jsonObject.type];
    const dmg = loadDie(jsonObject.dmg);
    const dmgType = damages[jsonObject.dmgType];
    const masteryProperty = masteryProperties[jsonObject.masteryProperty];
    const properties = [];
    for (const prop of jsonObject.properties) {
        const weaponPropertyString = weaponProperties.find((wP) => wP.includes(prop)).replace(")", "").split("(");
        if (weaponPropertyString === undefined || weaponPropertyString === null || weaponPropertyString.length === 0)
            console.error("Weapon Property unproperly deserialized.");
        const weaponProperty = weaponProperty[0];
        const additionalInfo = weaponProperty.length > 1 ? weaponProperty[1] : "";
        const wpe = new WeaponPropertyExpanded(weaponProperty, additionalInfo);
        properties.push(weaponProperties[wpe]);
    }
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
        dmg: dmg,
        dmgType: dmgType,
        masteryProperty: masteryProperty,
        properties: properties
    });
}
