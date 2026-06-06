import { getElById, fundamentalsIds } from "./ids.js";

// * Dropdown functionality

export const SHOWDROPDOWNMENUCLASS = "dnd-dropdown-show-action";

export function dropdownMenuPress(id) {
    const selected = "dnd-dropdown-content";
    if (id === fundamentalsIds.classDropdownButton) {
        getElById(fundamentalsIds.classDropdownContentDiv).classList.add(SHOWDROPDOWNMENUCLASS);
    } else if (id === fundamentalsIds.raceDropdownButton) {
        getElById(fundamentalsIds.raceDropdownContentDiv).classList.add(SHOWDROPDOWNMENUCLASS);
    } else if (id === fundamentalsIds.backgroundDropdownButton) {
        getElById(fundamentalsIds.backgroundDropdownContentDiv).classList.add(SHOWDROPDOWNMENUCLASS);
    }
    return selected;
}

export function dropdownMenuReset() {
    getElById(fundamentalsIds.classDropdownContentDiv).classList.remove(SHOWDROPDOWNMENUCLASS);
    getElById(fundamentalsIds.raceDropdownContentDiv).classList.remove(SHOWDROPDOWNMENUCLASS);
    getElById(fundamentalsIds.backgroundDropdownContentDiv).classList.remove(SHOWDROPDOWNMENUCLASS);
}
