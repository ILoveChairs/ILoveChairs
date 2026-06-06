import {AbilityChanger, SkillChanger, ProficiencyChanger, SpecialChanger} from "./changers.js";

export class Abilities extends AbilityChanger {}
export class Skills extends SkillChanger {}
export class Proficiencies extends ProficiencyChanger {}
export class Specials extends SpecialChanger {}

/**
 * Representation of a Character.
 */
export class Character {
    constructor({
        level=1,
        classes=[],
        race=null,
        background=null,
        feats=[],
        abilityChoices=[],
        equipmentChoices=[]
    }){
        this.level = level;
        this.classes = classes;
        this.race = race;
        this.background = background;
        this.feats = feats;
        this.abilityChoices = abilityChoices;
        this.equipmentChoices = equipmentChoices;
    }

    getProficiencyModifier() {
        return Math.ceil(this.level / 4) + 1;
    }

    getChangers() {
        return [this.race, this.background, ...this.feats, ...this.classes];
    }

    getAbilities() {
        // Get ability changers.
        const abilityChangers = [];
        for (const changer of this.getChangers()) {
            if (changer.abilityChanger !== null)
                abilityChangers.push(changer.abilityChanger);
        }
        // Apply changers to a copy of the chosen ability scores.
        const abilitiesCpy = this.abilityChoices.copy();
        for (const abCh of abilityChangers) {
            if (abCh.str !== null) abilitiesCpy.str += abCh.str;
            if (abCh.dex !== null) abilitiesCpy.dex += abCh.dex;
            if (abCh.con !== null) abilitiesCpy.con += abCh.con;
            if (abCh.wis !== null) abilitiesCpy.wis += abCh.wis;
            if (abCh.int !== null) abilitiesCpy.int += abCh.int;
            if (abCh.cha !== null) abilitiesCpy.cha += abCh.cha;
        }
        // Return the copy.
        return abilitiesCpy;
    }

    getSkills(abilities) {
        // Get skill changers.
        const skillChangers = [];
        for (const changer of this.getChangers()) {
            if (changer.skillChanger !== null)
                skillChangers.push(changer.skillChanger);
        }
        // Set skills to abilities.
        const skills = new Skills({
            // str
            athletics: abilities.str,
            // dex
            acrobatics: abilities.dex,
            sleightOfHand: abilities.dex,
            stealth: abilities.dex,
            // int
            arcana: abilities.int,
            history: abilities.int,
            investigation: abilities.int,
            nature: abilities.int,
            religion: abilities.int,
            // wis
            animalHandling: abilities.wis,
            insight: abilities.wis,
            medicine: abilities.wis,
            perception: abilities.wis,
            survival: abilities.wis,
            // cha
            deception: abilities.cha,
            intimidation: abilities.cha,
            performance: abilities.cha,
            persuasion: abilities.cha
        });
        // Apply skill changers.
        for (const skCh of skillChangers) {
            // str
            if (skCh.athletics !== null) skills.athletics += skCh.athletics;
            // dex
            if (skCh.acrobatics !== null) skills.acrobatics += skCh.acrobatics;
            if (skCh.sleightOfHand !== null) skills.sleightOfHand += skCh.sleightOfHand;
            if (skCh.stealth !== null) skills.stealth += skCh.stealth;
            // int
            if (skCh.arcana !== null) skills.arcana += skCh.arcana;
            if (skCh.history !== null) skills.history += skCh.history;
            if (skCh.investigation !== null) skills.investigation += skCh.investigation;
            if (skCh.nature !== null) skills.nature += skCh.nature;
            if (skCh.religion !== null) skills.religion += skCh.religion;
            // wis
            if (skCh.animalHandling !== null) skills.animalHandling += skCh.animalHandling;
            if (skCh.insight !== null) skills.insight += skCh.insight;
            if (skCh.medicine !== null) skills.medicine += skCh.medicine;
            if (skCh.perception !== null) skills.perception += skCh.perception;
            if (skCh.survival !== null) skills.survival += skCh.survival;
            // cha
            if (skCh.deception !== null) skills.deception += skCh.deception;
            if (skCh.intimidation !== null) skills.intimidation += skCh.intimidation;
            if (skCh.performance !== null) skills.performance += skCh.performance;
            if (skCh.persuasion !== null) skills.persuasion += skCh.persuasion;
            // skillProficiency
            if (skCh.proficiency.length !== 0) skills.proficiency.push(...skCh.proficiency);
            // expertise
            if (skCh.expertise.length !== 0) skills.expertise.push(...skCh.expertise);
        }
        // Return skills.
        return skills;
    }

    getProficiencies() {
        // Get proficiency changers.
        const proficiencyChangers = [];
        for (const changer of this.getChangers()) {
            if (changer.proficiencyChanger !== null)
                proficiencyChangers.push(changer.proficiencyChanger);
        }
        // Apply changers to new proficiencies object.
        const proficiencies = new Proficiencies();
        for (const proCh of proficiencyChangers) {
            if (proCh.str !== null) proficiencies.str += proCh.str;
            // Saving Throws
            if (proCh.strST !== null && proCh.strST === true) proficiencies.strST = true;
            if (proCh.dexST !== null && proCh.dexST === true) proficiencies.dexST = true;
            if (proCh.conST !== null && proCh.conST === true) proficiencies.conST = true;
            if (proCh.wisST !== null && proCh.wisST === true) proficiencies.wisST = true;
            if (proCh.intST !== null && proCh.intST === true) proficiencies.intST = true;
            if (proCh.chaST !== null && proCh.chaST === true) proficiencies.chaST = true;
            // Weapons
            if (proCh.simpleMeleeWeapons !== null && proCh.simpleMeleeWeapons === true) proficiencies.simpleMeleeWeapons = true;
            if (proCh.simpleRangedWeapons !== null && proCh.simpleRangedWeapons === true) proficiencies.simpleRangedWeapons = true;
            if (proCh.martialMeleeWeapons !== null && proCh.martialMeleeWeapons === true) proficiencies.martialMeleeWeapons = true;
            if (proCh.martialRangedWeapons !== null && proCh.martialRangedWeapons === true) proficiencies.martialRangedWeapons = true;
            if (proCh.specificWeapons !== null && proCh.specificWeapons === true) proficiencies.specificWeapons = true;
            // Armor
            if (proCh.lightArmor !== null && proCh.lightArmor === true) proficiencies.lightArmor = true;
            if (proCh.mediumArmor !== null && proCh.mediumArmor === true) proficiencies.mediumArmor = true;
            if (proCh.heavyArmor !== null && proCh.heavyArmor === true) proficiencies.heavyArmor = true;
            if (proCh.shield !== null && proCh.shield === true) proficiencies.shield = true;
            // Other
            if (proCh.tools.length !== 0) proficiencies.tools.push(...proCh.tools);
            if (proCh.languages.length !== 0) proficiencies.languages.push(...proCh.languages);
        }
        // Return.
        return proficiencies;
    }

    getSpecial() {
        // Get special changers.
        const specialChangers = [];
        for (const changer of this.getChangers()) {
            if (changer.specialChanger !== null)
                specialChangers.push(changer.specialChanger);
        }
        // Apply changers.
        const specials = new Specials({
            passivePerception: 0,
            initiative: 0,
            oneHandedAtq: 0,
            twoHandedAtq: 0,
            rangedAtq: 0,
            hpPerLevel: 0,
            hitDieAmount: 0,
            ac:0
        });
        for (const spCh of specialChangers) {
            // 1
            if (spCh.passivePerception !== null) specials.passivePerception += spCh.passivePerception;
            if (spCh.initiative !== null) specials.initiative += spCh.initiative;
            if (spCh.oneHandedAtq !== null) specials.oneHandedAtq += spCh.oneHandedAtq;
            // 2
            if (spCh.twoHandedAtq !== null) specials.twoHandedAtq += spCh.twoHandedAtq;
            if (spCh.rangedAtq !== null) specials.rangedAtq += spCh.rangedAtq;
            if (spCh.hpPerLevel !== null) specials.hpPerLevel += spCh.hpPerLevel;
            // 3
            if (specialChangers.hitDie === null || specialChangers.hitDie.type < spCh.hitDie) specialChangers.hitDie = spCh.hitDie;
            if (spCh.hitDieAmount !== null) specialChangers.hitDieAmount += spCh.hitDieAmount;
            if (spCh.ac !== null) specialChangers.ac += spCh.ac;
            // 4
            if (spCh.turtle === true) specials.turtle = true;
        }
        // Return.
        return specials;
    }

    toString() {
        return `Character = {level: ${this.level}, classes: ${this.classes}, race: ${this.race}, background: ${this.background}, feats: ${this.feats}, ability choices: ${this.abilityChoices}, equipment choices: ${this.equipmentChoices}}`;
    }
}
