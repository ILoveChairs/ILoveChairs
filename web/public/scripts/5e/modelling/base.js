
/**
 * Contains definitions of enums, Die and others.
 */

/**
 * Ability enum
 */
export const abilities = Object.freeze({
    STR: "str",
    DEX: "dex",
    CON: "con",
    WIS: "wis",
    INT: "int",
    CHA: "cha"
});

export const damages = Object.freeze({
    bludgening: "bludgening",
    slashing: "slashing",
    piercing: "piercing",
    acid: "acid",
    cold: "cold",
    fire: "fire",
    force: "force",
    lightning: "lightning",
    necrotic: "necrotic",
    poison: "poison",
    psychic: "psychic",
    radiant: "radiant",
    thunder: "thunder"
});

/**
 * Class made to facilitate managing die numbers.
 */
export class Die {
    constructor(quantity, type, bonus=0) {
        this.quantity = quantity;
        this.type = type;
        this.bonus = bonus;
    }
    getMin() {
        return this.bonus + 1;
    }
    getMax() {
        return this.type + this.bonus;
    }
    toString() {
        const bonus = this.bonus == 0? "" : ` + ${this.bonus}`;
        return `${this.quantity}d${this.type}${bonus}`;
    }
}

/**
 * Common die.
 */
export const die = Object.freeze({
    d4: new Die(1, 4),
    d6: new Die(1, 6),
    d8: new Die(1, 8),
    d10: new Die(1, 10),
    d12: new Die(1, 12),
    d20: new Die(1, 20),
    d100: new Die(1, 100),
})

/**
 * Represents a way to measure time.
 */
export const timeMeasurement = Object.freeze({
    seconds: {enName: "seconds", esName: "segundos"},
    minutes: {enName: "minutes", esName: "minutos"},
    hours: {enName: "hours", esName: "horas"},
    days: {enName: "days", esName: "días"},
    action: {enName: "Action", esName: "Acción"},
    bonusAction: {enName: "Bonus Action", esName: "Acción Bono"},
    reaction: {enName: "Reaction", esName: "Reacción"}
})

/**
 * Represents a period of time.
 */
export class Time {
    constructor(amount, measurement) {
        this.amount = amount;
        this.measurement = measurement;
    }
    toString() {
        return `${this.amount} ${this.measurement.enName}`
    }
}

/**
 * Represents a distance between 2 points measured in feet.
 * 
 * Generally a between a character and a target.
 */
export class Distance {
    constructor(amount) {
        this.amount = amount;
    }
    toString() {
        return `${this.amount} ft`
    }
}


/**
 * Gets Ability Score Modifier from Ability Score.
 */
export function getAbilityScoreModifier(abilityScore) {
    return Math.floor(abilityScore / 2) - 5;
}
