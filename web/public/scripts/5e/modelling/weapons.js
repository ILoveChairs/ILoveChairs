
export const weaponProperties = Object.freeze({
    ammunition: {enName: "Ammunnition", esName: "Munición",
        enDesc: "To make a ranged attack, this weapon requires to expend one piece of the appropiate ammunition. Drawing the ammunition is part of the attack (you need a free hand to load a one-handed weapon). After a fight, you can spend 1 minute to recover half the ammunition (rounded down) you used in the fight; the rest is lost.",
        esDesc: "Para poder atacar a distancia, esta arma requiere gastar una munición compatible. Agarrar y cargar la munición es parte del ataque (precisás una mano libre para cargar un arma de una mano). Después de un combate, podés pasar 1 minuto recuperando la mitad (redondeado para bajo) de las municiones que perdiste en el combate; la otra mitad se pierde."
    },
    finesse: {enName: "Finesse", esName: "Sutil",
        enDesc: "You can use either your Strength modifier or your Dexterity modifier whenever you use the weapon. You must use the same modifier for both attack and damage.",
        esDesc: "Podés usar tu m"
    },
    heavy: "heavy",
    light: "light",
    loading: "loading",
    range: "range",
    reach: "reach",
    thrown: "thrown",
    twoHanded: "two-handed",
    versatile: "versatile"
});

export const masteryProperties = Object.freeze({
    cleave: {},
    graze: {},
    nick: {},
    push: {},
    sap: {},
    slow: {},
    topple: {},
    vex: {}
});

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
        dmg=null,
        dmgType=null,
        abilityUsed=null,
        masteryProperty=null,
        range=null,
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
        this.dmg = dmg;
        this.dmgType = dmgType;
        this.abilityUsed = abilityUsed;
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
