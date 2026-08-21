import * as Ids from "./ids.js";

export const langs = Object.freeze({
    en: "en",
    es: "es"
})

export class StringPair {
    constructor(ids, strings) {
        this.ids = ids;
        this.strings = strings;
    }
}

export class StringSetter {
    constructor() {
        this.fundamentalsIds = Ids.fundamentalsIds;
        this.abilitiesIds = Ids.abilitiesIds;
        this.skillsIds = Ids.skillsIds;
        this.spellsIds = Ids.spellsIds;
        this.equipmentIds = Ids.equipmentIds;
        this.informationIds = Ids.informationIds;
        this.detailsIds = Ids.detailsIds;
        this.otherIds = Ids.otherIds;
    }
    setStrings(es=false) {
        const pairs = [
            new StringPair(this.fundamentalsIds, fundamentalsStrings),
            new StringPair(this.abilitiesIds, abilitiesStrings),
            new StringPair(this.skillsIds, skillsStrings),
            new StringPair(this.spellsIds, spellsStrings),
            new StringPair(this.equipmentIds, equipmentStrings),
            new StringPair(this.informationIds, informationStrings),
            new StringPair(this.detailsIds, detailsStrings),
            new StringPair(this.otherIds, otherStrings),
        ];
        for (const pair of pairs) {
            for (const internalId in pair.strings) {
                const element = Ids.getElById(pair.ids[internalId]);
                if (!element.classList.contains("special-translate"))
                    element.innerText = es ?
                        pair.strings[internalId].es :
                        pair.strings[internalId].en;
            }
        }
    }
}


export const fundamentalsStrings = Object.freeze({
    h2: {en: "Fundamentals", es: "Fundamental"},
    levelLabel: {en: "Level", es: "Nivel"},
    // Class
    classH3: {en: "Class", es: "Clase"},
    classDropdownButton: {en: "Select", es: "Seleccionar"},
    // Race
    raceH3: {en: "Race", es: "Raza"},
    raceDropdownButton: {en: "Select", es: "Seleccionar"},
    // Background
    backgroundH3: {en: "Background", es: "Transfondo"},
    backgroundDropdownButton: {en: "Select", es: "Seleccionar"},
});

export const abilitiesStrings = Object.freeze({
    h2: {en: "Abilities", es: "Abilidades"},
    strH3: {en: "Strength", es: "Fuerza"},
    dexH3: {en: "Dexterity", es: "Destreza"},
    conH3: {en: "Constitution", es: "Constitución"},
    intH3: {en: "Intelligence", es: "Inteligencia"},
    wisH3: {en: "Wisdom", es: "Sabiduría"},
    chaH3: {en: "Charisma", es: "Carisma"},
});

export const skillsStrings = Object.freeze({
    h2: {en: "Skills", es: "Competencias"},
    // str
    strH3: {en: "Strength", es: "Fuerza"},
    athleticsH4: {en: "Athletics", es: "Atletismo"},
    // dex
    dexH3: {en: "Dexterity", es: "Destreza"},
    acrobaticsH4: {en: "Acrobatics", es: "Acrobacias"},
    sohH4: {en: "Sleight of Hand", es: "Juego de Manos"},
    stealthH4: {en: "Stealth", es: "Sigilo"},
    // int
    intH3: {en: "Intelligence", es: "Inteligencia"},
    arcanaH4: {en: "Arcana", es: "Arcana"},
    historyH4: {en: "History", es: "Historia"},
    investigationH4: {en: "Investigation", es: "Investigación"},
    natureH4: {en: "Nature", es: "Naturaleza"},
    religionH4: {en: "Religion", es: "Religión"},
    // wis
    wisH3: {en: "Wisdom", es: "Sabiduría"},
    animalhH4: {en: "Animal Handling", es: "Trato con Animales"},
    insightH4: {en: "Insight", es: "Perspicacia"},
    medicineH4: {en: "Medicine", es: "Medicina"},
    perceptionH4: {en: "Perception", es: "Percepción"},
    survivalH4: {en: "Survival", es: "Supervivencia"},
    // cha
    chaH3: {en: "Charisma", es: "Carisma"},
    deceptionH4: {en: "Deception", es: "Engaño"},
    intimidationH4: {en: "Intimidation", es: "Intimidación"},
    performanceH4: {en: "Performance", es: "Interpretación"},
    persuassionH4: {en: "Persuassion", es: "Persuación"}
});

export const spellsStrings = Object.freeze({
    h2: {en: "Spells", es: "Conjuros"},
    // spells
    thName: {en: "Name", es: "Nombre"},
    thDescription: {en: "Description", es: "Descripción"},
    thLevel: {en: "Level", es: "Nivel"},
    thSchool: {en: "School", es: "Escuela"},
    thCastingTime: {en: "Casting Time", es: "Tiempo de Casteo"},
    thRange: {en: "Range", es: "Rango"},
    thDuration: {en: "Duration", es: "Duración"},
    thComponents: {en: "Components", es: "Componentes"},
    // buttons
    addButton: {en: "Add", es: "Añadir"},
    clearButton: {en: "Clear", es: "Limpiar"}
});

export const equipmentStrings = Object.freeze({
    h2: {en: "Equipment", es: "Equipamiento"},
    // * weapons
    weaponsH3: {en: "Weapons", es: "Armas"},
    weaponsThName: {en: "Name", es: "Nombre"},
    weaponsThDescription: {en: "Description", es: "Descripción"},
    weaponsThPrice: {en: "Price", es: "Precio"},
    weaponsThWeight: {en: "Weight", es: "Peso"},
    weaponsThDamage: {en: "Damage", es: "Daño"},
    weaponsThDamageType: {en: "Damage Type", es: "Tipo de Daño"},
    weaponsThAbilityUsed: {en: "Ability Used", es: "Abilidad Usada"},
    weaponsThMastery: {en: "Mastery", es: "Maestría"},
    weaponsThProperties: {en: "Properties", es: "Propiedades"},
    // buttons
    weaponsAddButton: {en: "Add", es: "Añadir"},
    weaponsClearButton: {en: "Clear", es: "Limpiar"},
    // * armor
    armorH3: {en: "Armor", es: "Armaduras"},
    armorThName: {en: "Name", es: "Nombre"},
    armorThDescription: {en: "Description", es: "Descripción"},
    armorThPrice: {en: "Price", es: "Precio"},
    armorThWeight: {en: "Weight", es: "Peso"},
    armorThAc: {en: "AC", es: "AC"},
    armorThDexterityAcMax: {en: "Max Dexterity AC", es: "Máx. AC por Destreza"},
    armorThStrMin: {en: "Min Str", es: "Fuerza Mín."},
    armorThStealthDis: {en: "Stealth Disadvantage", es: "Desventaja en Sigilo"},
    // buttons
    armorAddButton: {en: "Add", es: "Añadir"},
    armorClearButton: {en: "Clear", es: "Limpiar"},
    // * objects
    objectsH3: {en: "Objects", es: "Objetos"},
    objectsThName: {en: "Name", es: "Nombre"},
    objectsThDescription: {en: "Description", es: "Descripción"},
    objectsThPrice: {en: "Price", es: "Precio"},
    objectsThWeight: {en: "Weight", es: "Peso"},
    // buttons
    objectsAddButton: {en: "Add", es: "Añadir"},
    objectsClearButton: {en: "Clear", es: "Limpiar"},
});

export const informationStrings = Object.freeze({
    h2: {en: "Information", es: "Información"},
    acH3: {en: "AC", es: "AC"},
    initiativeH3: {en: "Iniciative", es: "Iniciativa"},
    speedH3: {en: "Speed", es: "Velocidad"},
});

export const detailsStrings = Object.freeze({
    h2: {en: "Details", es: "Detalles"},
    nameLabel: {en: "Name", es: "Nombre"},
    genderLabel: {en: "Gender", es: "Género"},
    backgroundLabel: {en: "Background", es: "Transfondo"},
    alignmentLabel: {en: "Alignment", es: "Alineación"},
    appearanceLabel: {en: "Appearance", es: "Apariencia"},
});

export const otherStrings = Object.freeze({
    enButton: {en: "English", es: "English"},
    esButton: {en: "Español", es: "Español"},
    h1: {en: "DnD 5e 2024 Character Creator", es: "DnD 5e 2024 Creador de Personajes"},
    saveButton: {en: "Save", es: "Guardar"},
    clearButton: {en: "Clear", es: "Limpiar"}
});
