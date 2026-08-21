import * as Changers from "./changers.js";

/**
 * Class made to pair level with a class feat.
 */
export class DnDClassFeat {
    constructor({level=null, feat=null}) {
        this.level = level;
        this.feat = feat;
    }
    toString() {
        return `Level ${this.level}: ${this.feat}`;
    }
}
// TODO
export function loadDnDClassFeat(jsonObject) {}

/**
 * Representation of a character class.
 */
export class DnDClass {
    constructor({
        // Common
        enName="",
        esName="",
        enDesc="",
        esDesc="",
        // Class
        startingEquipment=[],
        optionalStartingGold=null,
        skillChanger=null,
        proficiencyChanger=null,
        specialChanger=null,
        // Multi-Class
        mcSkillChanger=null,
        mcproficiencyChanger=null,
        mcSpecialChanger=null,
        // Complicated
        classFeats=[],
        subClasses=[]
    }) {
        // Common
        this.enName = enName;
        this.esName = esName;
        this.enDesc = enDesc;
        this.esDesc = esDesc;
        // Class
        this.startingEquipment = startingEquipment;
        this.optionalStartingGold = optionalStartingGold;
        this.skillChanger = skillChanger;
        this.proficiencyChanger = proficiencyChanger;
        this.specialChanger = specialChanger;
        // Multi-Class
        this.mcSkillChanger = mcSkillChanger;
        this.mcproficiencyChanger = mcproficiencyChanger;
        this.mcSpecialChanger = mcSpecialChanger;
        // Complicated
        this.classFeats = classFeats;
        this.subClasses = subClasses;
    }
    toString() {
        return `${this.enName}: ${this.enDesc}`;
    }
    esToString() {
        return `${this.esName}: ${this.esDesc}`;
    }
}
// TODO
export function loadDnDClass(jsonObject) {}

/**
 * Representation of a character sub-class.
 * 
 * Couldn't use the same DnDClass class to represent them due to the big
 * amount of properties that are not appropiate for them.
 */
export class DnDSubClass {
    constructor({
        // Common
        enName="",
        esName="",
        enDesc="",
        esDesc="",
        // Complicated
        subClassFeats=[]
    }) {
        // Common
        this.enName = enName;
        this.esName = esName;
        this.enDesc = enDesc;
        this.esDesc = esDesc;
        // Complicated
        this.subClassFeats = subClassFeats;
    }
    toString() {
        return `${this.enName}: ${this.enDesc}`;
    }
    esToString() {
        return `${this.esName}: ${this.esDesc}`;
    }
}
// TODO
export function loadDnDSubClass(jsonObject) {}
