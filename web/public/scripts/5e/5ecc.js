import * as Ids from "./visuals/ids.js";
import { StringSetter, langs } from "./visuals/strings.js";
import * as Fundamentals from "./visuals/fundamentals.js";
import * as Popups from "./visuals/popup.js";

// * HEADER
// Manages header overflow.
function headerSpaceHandler(event) {
  let header = document.getElementById('body-header');
  let headerStyle = window.getComputedStyle(header);
  let height = headerStyle.getPropertyValue('height');

  let body = document.getElementById('body');
  body.style.paddingTop = height;
}
addEventListener("load", headerSpaceHandler);
addEventListener("resize", headerSpaceHandler);

// * LANGUAGE
// Set preferred language
let language = langs.en;
for (const lang of navigator.languages) {
  if (lang.includes("en")) {
    break;
  } else if (lang.includes("es")) {
    language = langs.es;
    break;
  }
}

// First language set
const stringSetter = new StringSetter();
stringSetter.setStrings(language === langs.es ? true : false);

// Language functions
function languageToEs() {
  stringSetter.setStrings(true);
  language = langs.es;
}
function languageToEn() {
  stringSetter.setStrings(false);
  language = langs.en;
}

// Language buttons
const englishButton = Ids.getElById(Ids.otherIds.enButton);
englishButton.onclick = () => languageToEn();
const spanishButton = Ids.getElById(Ids.otherIds.esButton);
spanishButton.onclick = () => languageToEs();

// * OVERLAY AND POPUPS
// Declarations
let popedUp = false;
const popup = new Popups.Popup();
const overlay = new Popups.Overlay(popup);
popup.onSelect = (str) => {
  overlay.hide();
  console.log(str);
};

// Triggers
const saveButton = Ids.getElById(Ids.otherIds.saveButton);
saveButton.onclick = () => {
  popedUp = true;
  const item1 = new Popups.PopupItem("Human", "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum.", {"bitch": "yes", "racist": "Absolutly", "gay": "Frowned upon"});
  const item2 = new Popups.PopupItem("Crow", "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum.", {"Inteligence": "Very mucho", "Fuck": "you"});
  const item3 = new Popups.PopupItem("Dragon", "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem.", {"Price": "12004 pesos"});
  overlay.show("Races", [item1, item2, item3]);
};

let popupSelection = null;
addEventListener("click", (ev) => {
  if (ev.target.id === "popup-overlay") {
    overlay.hide();
  } else if (popupSelection !== null && ev.target.id === popupSelection.replace("popup-item-details-div-", "popup-item-div-")) {
      Ids.getElById(popupSelection).classList.add(Popups.elementClasses.hideDetails)
      popupSelection = null;
  } else if (ev.target.className.includes(Popups.elementClasses.nameDiv)) {
    if (popupSelection !== null)
      Ids.getElById(popupSelection).classList.add(Popups.elementClasses.hideDetails)
    const itemDetailsId = ev.target.id.replace("popup-item-div-", "popup-item-details-div-");
    Ids.getElById(itemDetailsId).classList.remove(Popups.elementClasses.hideDetails);
    popupSelection = itemDetailsId;
  }
});

// * SELECTORS
let selected = null;
function reset() {
  selected = null;
  Fundamentals.dropdownMenuReset();
}
addEventListener("click", (ev) => {
  if (!ev.target.classList.contains(selected)) {
    reset();
    if (ev.target.classList.contains("dnd-dropdown-button")) {
      selected = Fundamentals.dropdownMenuPress(ev.target.id);
    }
    else {
      reset();
    }
  }
});
