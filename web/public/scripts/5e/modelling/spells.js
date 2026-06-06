import * as Base from "./base.js";

/**
 * Represents all the schools of magic.
 */
export const schoolsOfMagic = Object.freeze({
    conjuration: {enName: "Conjuration", esName: "Conjuración"},
    necromancy: {enName: "Necromancy", esName: "Necromancia"},
    evocation: {enName: "Evocation", esName: "Evocación"},
    abjuration: {enName: "Abjuration", esName: "Abjuración"},
    transmutation: {enName: "Transmutation", esName: "Transmutación"},
    divination: {enName: "Divination", esName: "Divinación"},
    enchantment: {enName: "Enchantment", esName: "Encantamiento"},
    illusion: {enName: "Illusion", esName: "Ilusión"}
});

export const components = Object.freeze({
    V:"",
    S:"",
    M:""
})

export const spellLists = Object.freeze({
    artificer: {},
    bard: {},
    cleric: {},
    druid: {},
    fighterEldritchKnight: {},
    paladin: {},
    ranger: {},
    rogueArcaneTrickster: {},
    sorcerer: {},
    warlock: {},
    wizard: {}
})

/**
 * Representation of one castable spell.
 */
export class Spell {
    constructor({
        // Common
        enName="",
        esName="",
        enDesc="",
        esDesc="",
        // Spell
        school=null,
        castingTime=null,
        range=null,
        duration=null,
        components=[],
        spellLists=[]
    }) {
        // Common
        this.enName = enName;
        this.esName = esName;
        this.enDesc = enDesc;
        this.esDesc = esDesc;
        // Spell
        this.school = school;
        this.castingTime = castingTime;
        this.range = range;
        this.duration = duration;
        this.components = components;

    }
    toString() {
        return `${this.enName}: ${this.enDesc}`;
    }
    esToString() {
        return `${this.esName}: ${this.esDesc}`;
    }
}
