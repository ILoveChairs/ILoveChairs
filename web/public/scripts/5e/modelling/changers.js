
/**
 * Changers are objects made to alter stats. They are made to facilitate
 * the implementation of feats, background and character races, which are
 * similar classes that have 1 possible changer of each type.
 */

/**
 * Facilitates and concentrates toString() functions of changers.
 */
export function changerStringer({name="Changer", ...properties}) {
    let ret = `${name} = {`;
    let emptyFlag = true;
    for (const property in properties) {
        if (!(
            properties[property] === 0 ||
            properties[property] === null ||
            (Array.isArray(properties[property]) && properties[property].length === 0)
        )) {
            emptyFlag = false;
            ret += `${property}: ${properties[property]}; `;
        }
    }
    if (!emptyFlag) 
        ret = ret.slice(0, -2); 
    ret += "}";
    return ret;
}

/**
 * Class representing a list of changes to be made on abilities.
 */
export class AbilityChanger {
    constructor({
        str=null,
        dex=null,
        con=null,
        int=null,
        wis=null,
        cha=null
    }) {
        this.str = str;
        this.dex = dex;
        this.con = con;
        this.wis = wis;
        this.int = int;
        this.cha = cha;
    }
    toString() {
        return changerStringer({name: "AbilityChanger",
            str: this.str,
            dex: this.dex,
            con: this.con,
            int: this.int,
            wis: this.wis,
            cha: this.cha
        });
    }
}

/**
 * Class representing a list of changes to be made on skills.
 */
export class SkillChanger {
    constructor({
        // str
        athletics=null,
        // dex
        acrobatics=null,
        sleightOfHand=null,
        stealth=null,
        // int
        arcana=null,
        history=null,
        investigation=null,
        nature=null,
        religion=null,
        // wis
        animalHandling=null,
        insight=null,
        medicine=null,
        perception=null,
        survival=null,
        // cha
        deception=null,
        intimidation=null,
        performance=null,
        persuasion=null,
        // skillProficiency
        proficiency=[],
        // expertise
        expertise=[]
    }) {
        // str
        this.athletics = athletics;
        // dex
        this.acrobatics = acrobatics;
        this.sleightOfHand = sleightOfHand;
        this.stealth = stealth;
        // int
        this.arcana = arcana;
        this.history = history;
        this.investigation = investigation;
        this.nature = nature;
        this.religion = religion;
        // wis
        this.animalHandling = animalHandling;
        this.insight = insight;
        this.medicine = medicine;
        this.perception = perception;
        this.survival = survival;
        // cha
        this.deception = deception;
        this.intimidation = intimidation;
        this.performance = performance;
        this.persuasion = persuasion;
        // skillProficiency
        this.proficiency=proficiency;
        // expertise
        this.expertise=expertise;
    }
    toString() {
        return changerStringer({name: "SkillChanger",
            athletics: this.athletics,
            // dex
            acrobatics: this.acrobatics,
            sleightOfHand: this.sleightOfHand,
            stealth: this.stealth,
            // int
            arcana: this.arcana,
            history: this.history,
            investigation: this.investigation,
            nature: this.nature,
            religion: this.religion,
            // wis
            animalHandling: this.animalHandling,
            insight: this.insight,
            medicine: this.medicine,
            perception: this.perception,
            survival: this.survival,
            // cha
            deception: this.deception,
            intimidation: this.intimidation,
            performance: this.performance,
            persuasion: this.persuasion,
            // skillProficiency
            proficiency: this.proficiency,
            // expertise
            expertise: this.expertise
        });
    }
}

/**
 * Class representing a list of changes to be made on non-skill proficiencies.
 */
export class ProficiencyChanger {
    constructor({
        // Saving Throws
        strST=null,
        dexST=null,
        conST=null,
        wisST=null,
        intST=null,
        chaST=null,
        // Weapons
        simpleMeleeWeapons=null,
        simpleRangedWeapons=null,
        martialMeleeWeapons=null,
        martialRangedWeapons=null,
        specificWeapons=[],
        // Armor
        lightArmor=null,
        mediumArmor=null,
        heavyArmor=null,
        shield=null,
        // Other
        tools=[],
        languages=[]
    }) {
        // Saving Throws
        this.strST = strST;
        this.dexST = dexST;
        this.conST = conST;
        this.wisST = wisST;
        this.intST = intST;
        this.chaST = chaST;
        // Weapons
        this.simpleMeleeWeapons = simpleMeleeWeapons;
        this.simpleRangedWeapons = simpleRangedWeapons;
        this.martialMeleeWeapons = martialMeleeWeapons;
        this.martialRangedWeapons = martialRangedWeapons;
        this.specificWeapons = specificWeapons,
        // Armor
        this.lightArmor = lightArmor;
        this.mediumArmor = mediumArmor;
        this.heavyArmor = heavyArmor;
        this.shield = shield;
        // Other
        this.tools = tools;
        this.languages = languages;
    }
    toString() {
        return changerStringer({name: "SpecialChanger",
            // Saving Throws
            strST: this.strST,
            dexST: this.dexST,
            conST: this.conST,
            wisST: this.wisST,
            intST: this.intST,
            chaST: this.chaST,
            // Weapons
            simpleMeleeWeapons: this.simpleMeleeWeapons,
            simpleRangedWeapons: this.simpleRangedWeapons,
            martialMeleeWeapons: this.martialMeleeWeapons,
            martialRangedWeapons: this.martialRangedWeapons,
            specificWeapons: this.specificWeapons,
            // Armor
            lightArmor: this.lightArmor,
            mediumArmor: this.mediumArmor,
            heavyArmor: this.heavyArmor,
            shield: this.shield,
            // Other
            tools: this.tools,
            languages: this.languages
        });
    }
}

/**
 * Class representing a list of changes to be made on special characteristics.
 */
export class SpecialChanger {
    constructor({
        passivePerception=null,
        initiative=null,
        oneHandedAtq=null,
        twoHandedAtq=null,
        rangedAtq=null,
        unarmedAtq=null,
        unarmedDmg=null,
        hpPerLevel=null,
        hitDie=null,
        hitDieAmount=null,
        ac=null,
        turtle=null
    }) {
        this.passivePerception = passivePerception;
        this.initiative = initiative;
        this.oneHandedAtq = oneHandedAtq;
        this.twoHandedAtq = twoHandedAtq;
        this.rangedAtq = rangedAtq;
        this.hpPerLevel = hpPerLevel;
        this.hitDie = hitDie;
        this.hitDieAmount = hitDieAmount;
        this.ac = ac;
        this.turtle = turtle;
    }
    toString() {
        return changerStringer({name: "SpecialChanger",
            passivePerception: this.passivePerception,
            initiative: this.initiative,
            oneHandedAtq: this.oneHandedAtq,
            twoHandedAtq: this.twoHandedAtq,
            rangedAtq: this.rangedAtq,
            hpPerLevel: this.hpPerLevel,
            hitDie: this.hitDie,
            hitDieAmount: this.hitDieAmount,
            ac: this.ac,
            turtle: this.turtle
        });
    }
}

/**
 * Base class for Feats, Backgrounds and Character Races.
 */
class Changer {
    constructor({
        // Common
        enName="",
        esName="",
        enDesc="",
        esDesc="",
        // Feats
        abilityChanger=null,
        skillChanger=null,
        proficiencyChanger=null,
        specialChanger=null,
        equipment=[],
        spells=[]
    }) {
        // Common
        this.enName = enName;
        this.esName = esName;
        this.enDesc = enDesc;
        this.esDesc = esDesc;
        // Feats
        this.abilityChanger = abilityChanger;
        this.skillChanger = skillChanger;
        this.proficiencyChanger = proficiencyChanger;
        this.specialChanger = specialChanger;
        this.equipment = equipment;
        this.spells = spells;
    }
    toString() {
        return `${this.enName}: ${this.enDesc}`;
    }
    esToString() {
        return `${this.esName}: ${this.esDesc}`;
    }
}

/**
 * Represents the Feats that variant humans and ability score increases grant.
 */
class Feat extends Changer {}
/**
 * Represents a background of a character.
 */
class Background extends Changer {}
/**
 * Represents a race of a character.
 */
class Race extends Changer {}
