
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

export const allComponents = Object.freeze({
    V: {enName: "Verbal", esName: "Verbal"},
    S: {enName: "Semantic", esName: "Semántico"},
    M: {enName: "Material", esName: "Material"}
})

export const allSpellLists = Object.freeze({
    artificer: {enName: "Artificer", esName: "Artífice"},
    bard: {enName: "Bard", esName: "Bardo"},
    cleric: {enName: "Cleric", esName: "Clérigo"},
    druid: {enName: "Druid", esName: "Druida"},
    fighterEldritchKnight: {enName: "Eldritch Knight", esName: "Caballero Arcano"},
    paladin: {enName: "Paladin", esName: "Paladín"},
    ranger: {enName: "Ranger", esName: "Explorador"},
    rogueArcaneTrickster: {enName: "Arcane Trickster", esName: "Bribón Arcano"},
    sorcerer: {enName: "Sorcerer", esName: "Hechicero"},
    warlock: {enName: "Warlock", esName: "Brujo"},
    wizard: {enName: "Wizard", esName: "Mago"}
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
        level=null,
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
        this.level = level;
        this.school = school;
        this.castingTime = castingTime;
        this.range = range;
        this.duration = duration;
        this.components = components;
        this.spellLists = spellLists;
    }
    toString() {
        return `${this.enName}: ${this.enDesc}`;
    }
    esToString() {
        return `${this.esName}: ${this.esDesc}`;
    }
}
export function loadSpell(jsonObject) {
    const school = schoolsOfMagic[jsonObject.school];
    const castingTime = loadTime(jsonObject.castingTime);
    const range = loadDistance(jsonObject.range);
    const duration = loadTime(jsonObject.duration);
    const components = [];
    for (const comps of jsonObject.components) {
        components.push(allComponents[comps]);
    }
    const spellLists = [];
    for (const sls of jsonObject.spellLists) {
        spellLists.push(allSpellLists[sls]);
    }
    return new Spell({
        // Common
        enName: jsonObject.enName,
        esName: jsonObject.esName,
        enDesc: jsonObject.enDesc,
        esDesc: jsonObject.esDesc,
        // sepll
        level = jsonObject.level,
        school = school,
        castingTime = castingTime,
        range = range,
        duration = duration,
        components = components,
        spellLists = spellLists
    });
}
