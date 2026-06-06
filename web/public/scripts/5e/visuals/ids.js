
/**
 * Error to throw when an id is not found.
 */
export class IdNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "IdNotFoundError";
  }
}

/**
 * Shortens search by id. If an id is not found, it throws an error.
 */
export function getElById(id) {
    const element = document.getElementById(id);
    if (element === null)
        throw new IdNotFoundError(`Element with id "${id}" searched but not found.`);
    else
        return element;
}

export const fundamentalsIds = Object.freeze({
    section: "dnd-fundamentals",
    h2: "dnd-fundamentals-h2",
    // level
    levelLabel: "dnd-fundamentals-level-label",
    level: "dnd-fundamentals-level",
    // class
    classDiv: "dnd-fundamentals-class",
    classH3: "dnd-fundamentals-class-h3",
    classDropdownDiv: "dnd-fundamentals-class-dropdown-div",
    classDropdownButton: "dnd-fundamentals-class-dropdown-button",
    classDropdownContentDiv: "dnd-fundamentals-class-dropdown-content-div",
    // race
    raceDiv: "dnd-fundamentals-race",
    raceH3: "dnd-fundamentals-race-h3",
    classDropdownDiv: "dnd-fundamentals-race-dropdown-div",
    raceDropdownButton: "dnd-fundamentals-race-dropdown-button",
    raceDropdownContentDiv: "dnd-fundamentals-race-dropdown-content-div",
    // background
    backgroundDiv: "dnd-fundamentals-background",
    backgroundH3: "dnd-fundamentals-background-h3",
    backgroundDropdownDiv: "dnd-fundamentals-background-dropdown-div",
    backgroundDropdownButton: "dnd-fundamentals-background-dropdown-button",
    backgroundDropdownContentDiv: "dnd-fundamentals-background-dropdown-content-div",
});

export const abilitiesIds = Object.freeze({
    section: "dnd-abilities",
    h2: "dnd-abilities-h2",
    // str
    strDiv: "dnd-abilities-str",
    strH3: "dnd-abilities-str-h3",
    strProf: "dnd-abilities-str-prof",
    strScore: "dnd-abilities-str-score",
    strMod: "dnd-abilities-str-modifier",
    // dex
    dexDiv: "dnd-abilities-dex",
    dexH3: "dnd-abilities-dex-h3",
    dexProf: "dnd-abilities-dex-prof",
    dexScore: "dnd-abilities-dex-score",
    dexMod: "dnd-abilities-dex-modifier",
    // con
    conDiv: "dnd-abilities-con",
    conH3: "dnd-abilities-con-h3",
    conProf: "dnd-abilities-con-prof",
    conScore: "dnd-abilities-con-score",
    conScore: "dnd-abilities-con-modifier",
    // int
    intDiv: "dnd-abilities-int",
    intH3: "dnd-abilities-int-h3",
    intProf: "dnd-abilities-int-prof",
    intScore: "dnd-abilities-int-score",
    intScore: "dnd-abilities-int-modifier",
    // wis
    wisDiv: "dnd-abilities-wis",
    wisH3: "dnd-abilities-wis-h3",
    wisProf: "dnd-abilities-wis-prof",
    wisScore: "dnd-abilities-wis-score",
    wisScore: "dnd-abilities-wis-modifier",
    // cha
    chaDiv: "dnd-abilities-cha",
    chaH3: "dnd-abilities-cha-h3",
    chaProf: "dnd-abilities-cha-prof",
    chaScore: "dnd-abilities-cha-score",
    chaScore: "dnd-abilities-cha-modifier"
});

export const skillsIds = Object.freeze({
    section: "dnd-skills",
    h2: "dnd-skills-h2",
    // * str
    strDiv: "dnd-skills-str",
    strH3: "dnd-skills-str-h3",
    // athletics
    athleticsDiv: "dnd-skills-str-athletics",
    athleticsH4: "dnd-skills-str-athletics-h4",
    athleticsProf: "dnd-skills-str-athletics-prof",
    athleticsScore: "dnd-skills-str-athletics-score",
    athleticsMod: "dnd-skills-str-athletics-modifier",
    // * dex
    dexDiv: "dnd-skills-dex",
    dexH3: "dnd-skills-dex-h3",
    // acrobatics
    acrobaticsDiv: "dnd-skills-dex-acrobatics",
    acrobaticsH4: "dnd-skills-dex-acrobatics-h4",
    acrobaticsProf: "dnd-skills-dex-acrobatics-prof",
    acrobaticsScore: "dnd-skills-dex-acrobatics-score",
    acrobaticsMod: "dnd-skills-dex-acrobatics-modifier",
    // soh (Sleight of Hand)
    sohDiv: "dnd-skills-dex-soh",
    sohH4: "dnd-skills-dex-soh-h4",
    sohProf: "dnd-skills-dex-soh-prof",
    sohScore: "dnd-skills-dex-soh-score",
    sohMod: "dnd-skills-dex-soh-modifier",
    // stealth
    stealthDiv: "dnd-skills-dex-stealth",
    stealthH4: "dnd-skills-dex-stealth-h4",
    stealthProf: "dnd-skills-dex-stealth-prof",
    stealthScore: "dnd-skills-dex-stealth-score",
    stealthMod: "dnd-skills-dex-stealth-modifier",
    // * int
    intDiv: "dnd-skills-int",
    intH3: "dnd-skills-int-h3",
    // arcana
    arcanaDiv: "dnd-skills-int-arcana",
    arcanaH4: "dnd-skills-int-arcana-h4",
    arcanaProf: "dnd-skills-int-arcana-prof",
    arcanaScore: "dnd-skills-int-arcana-score",
    arcanaMod: "dnd-skills-int-arcana-modifier",
    // history
    historyDiv: "dnd-skills-int-history",
    historyH4: "dnd-skills-int-history-h4",
    historyProf: "dnd-skills-int-history-prof",
    historyScore: "dnd-skills-int-history-score",
    historyMod: "dnd-skills-int-history-modifier",
    // investigation
    investigationDiv: "dnd-skills-int-investigation",
    investigationH4: "dnd-skills-int-investigation-h4",
    investigationProf: "dnd-skills-int-investigation-prof",
    investigationScore: "dnd-skills-int-investigation-score",
    investigationMod: "dnd-skills-int-investigation-modifier",
    // nature
    natureDiv: "dnd-skills-int-nature",
    natureH4: "dnd-skills-int-nature-h4",
    natureProf: "dnd-skills-int-nature-prof",
    natureScore: "dnd-skills-int-nature-score",
    natureMod: "dnd-skills-int-nature-modifier",
    // religion
    religionDiv: "dnd-skills-int-religion",
    religionH4: "dnd-skills-int-religion-h4",
    religionProf: "dnd-skills-int-religion-prof",
    religionScore: "dnd-skills-int-religion-score",
    religionMod: "dnd-skills-int-religion-modifier",
    // * wis
    wisDiv: "dnd-skills-wis",
    wisH3: "dnd-skills-wis-h3",
    // animalh (Animal Handling)
    animalhDiv: "dnd-skills-wis-animalh",
    animalhH4: "dnd-skills-wis-animalh-h4",
    animalhProf: "dnd-skills-wis-animalh-prof",
    animalhScore: "dnd-skills-wis-animalh-score",
    animalhMod: "dnd-skills-wis-animalh-modifier",
    // insight
    insightDiv: "dnd-skills-wis-insight",
    insightH4: "dnd-skills-wis-insight-h4",
    insightProf: "dnd-skills-wis-insight-prof",
    insightScore: "dnd-skills-wis-insight-score",
    insightMod: "dnd-skills-wis-insight-modifier",
    // medicine
    medicineDiv: "dnd-skills-wis-medicine",
    medicineH4: "dnd-skills-wis-medicine-h4",
    medicineProf: "dnd-skills-wis-medicine-prof",
    medicineScore: "dnd-skills-wis-medicine-score",
    medicineMod: "dnd-skills-wis-medicine-modifier",
    // perception
    perceptionDiv: "dnd-skills-wis-perception",
    perceptionH4: "dnd-skills-wis-perception-h4",
    perceptionProf: "dnd-skills-wis-perception-prof",
    perceptionScore: "dnd-skills-wis-perception-score",
    perceptionMod: "dnd-skills-wis-perception-modifier",
    // survival
    survivalDiv: "dnd-skills-wis-survival",
    survivalH4: "dnd-skills-wis-survival-h4",
    survivalProf: "dnd-skills-wis-survival-prof",
    survivalScore: "dnd-skills-wis-survival-score",
    survivalMod: "dnd-skills-wis-survival-modifier",
    // * cha
    chaDiv: "dnd-skills-cha",
    chaH3: "dnd-skills-cha-h3",
    // deception
    deceptionDiv: "dnd-skills-cha-deception",
    deceptionH4: "dnd-skills-cha-deception-h4",
    deceptionProf: "dnd-skills-cha-deception-prof",
    deceptionScore: "dnd-skills-cha-deception-score",
    deceptionMod: "dnd-skills-cha-deception-modifier",
    // intimidation
    intimidationDiv: "dnd-skills-cha-intimidation",
    intimidationH4: "dnd-skills-cha-intimidation-h4",
    intimidationProf: "dnd-skills-cha-intimidation-prof",
    intimidationScore: "dnd-skills-cha-intimidation-score",
    intimidationMod: "dnd-skills-cha-intimidation-modifier",
    // performance
    performanceDiv: "dnd-skills-cha-performance",
    performanceH4: "dnd-skills-cha-performance-h4",
    performanceProf: "dnd-skills-cha-performance-prof",
    performanceScore: "dnd-skills-cha-performance-score",
    performanceMod: "dnd-skills-cha-performance-modifier",
    // persuassion
    persuassionDiv: "dnd-skills-cha-persuassion",
    persuassionH4: "dnd-skills-cha-persuassion-h4",
    persuassionProf: "dnd-skills-cha-persuassion-prof",
    persuassionScore: "dnd-skills-cha-persuassion-score",
    persuassionMod: "dnd-skills-cha-persuassion-modifier"
});

export const spellsIds = Object.freeze({
    h2: "dnd-spells-h2",
    section: "dnd-spells",
    // spells
    table: "dnd-spells-table",
    thName: "dnd-spells-name",
    thDescription: "dnd-spells-description",
    thLevel: "dnd-spells-level",
    thSchool: "dnd-spells-school",
    thCastingTime: "dnd-spells-castingtime",
    thRange: "dnd-spells-range",
    thDuration: "dnd-spells-duration",
    thComponents: "dnd-spells-components",
    // buttons
    addButton: "dnd-spells-add",
    clearButton: "dnd-spells-clear"
});

export const equipmentIds = Object.freeze({
    h2: "dnd-equipment-h2",
    section: "dnd-equipment",
    // * weapons
    weaponsH3: "dnd-equipment-weapons-h3",
    weaponsTable: "dnd-equipment-weapons-table",
    weaponsThName: "dnd-equipment-weapons-name",
    weaponsThDescription: "dnd-equipment-weapons-description",
    weaponsThPrice: "dnd-equipment-weapons-price",
    weaponsThWeight: "dnd-equipment-weapons-weight",
    weaponsThDamage: "dnd-equipment-weapons-damage",
    weaponsThDamageType: "dnd-equipment-weapons-damagetype",
    weaponsThAbilityUsed: "dnd-equipment-weapons-abilityused",
    weaponsThMastery: "dnd-equipment-weapons-mastery",
    weaponsThProperties: "dnd-equipment-weapons-properties",
    // buttons
    weaponsAddButton: "dnd-equipment-weapons-add",
    weaponsClearButton: "dnd-equipment-weapons-clear",
    // * armor
    armorH3: "dnd-equipment-armor-h3",
    armorTable: "dnd-equipment-armor-table",
    armorThName: "dnd-equipment-armor-name",
    armorThDescription: "dnd-equipment-armor-description",
    armorThPrice: "dnd-equipment-armor-price",
    armorThWeight: "dnd-equipment-armor-weight",
    armorThAc: "dnd-equipment-armor-ac",
    armorThDexterityAcMax: "dnd-equipment-armor-dexac",
    armorThStrMin: "dnd-equipment-armor-strmin",
    armorThStealthDis: "dnd-equipment-armor-stealthdis",
    // buttons
    armorAddButton: "dnd-equipment-armor-add",
    armorClearButton: "dnd-equipment-armor-clear",
    // * objects
    objectsH3: "dnd-equipment-objects-h3",
    objectsTable: "dnd-equipment-objects-table",
    objectsThName: "dnd-equipment-objects-name",
    objectsThDescription: "dnd-equipment-objects-description",
    objectsThPrice: "dnd-equipment-objects-price",
    objectsThWeight: "dnd-equipment-objects-weight",
    // buttons
    objectsAddButton: "dnd-equipment-objects-add",
    objectsClearButton: "dnd-equipment-objects-clear",
});

export const informationIds = Object.freeze({
    h2: "dnd-information-h2",
    section: "dnd-information",
    // ac
    acDiv: "dnd-information-ac",
    acH3: "dnd-information-ac-h3",
    acP: "dnd-information-ac-p",
    // initiative
    initiativeDiv: "dnd-information-initiative",
    initiativeH3: "dnd-information-initiative-h3",
    initiativeP: "dnd-information-initiative-p",
    // speed
    speedDiv: "dnd-information-speed",
    speedH3: "dnd-information-speed-h3",
    speedP: "dnd-information-speed-p",
});

export const detailsIds = Object.freeze({
    h2: "dnd-details-h2",
    section: "dnd-details",
    // name
    nameLabel: "dnd-details-name-label",
    name: "dnd-details-name",
    // gender
    genderLabel: "dnd-details-gender-label",
    gender: "dnd-details-gender",
    // background
    backgroundLabel: "dnd-details-background-label",
    background: "dnd-details-background",
    // alignment
    alignmentLabel: "dnd-details-alignment-label",
    alignment: "dnd-details-alignment",
    // appearance
    appearanceLabel: "dnd-details-appearance-label",
    appearance: "dnd-details-appearance"
});

export const otherIds = Object.freeze({
    enButton: "english-button",
    esButton: "spanish-button",
    h1: "dnd-h1",
    form: "dnd-form",
    saveButton: "dnd-save-button",
    clearButton: "dnd-clear-button",
    popup: "popupedit"
});
