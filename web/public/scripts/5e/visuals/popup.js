import * as Ids from "./ids.js";

export const elementClasses = Object.freeze({
  titleDiv: "popup-title-div unselectable",
  titleH1: "popup-title-h1 unselectable",
  titleHr: "popup-title-hr unselectable",
  itemDiv: "popup-item-div unselectable",
  nameDiv: "popup-item-name-div unselectable",
  name: "popup-item-name-h2 unselectable",
  addButton: "popup-item-name-button unselectable",
  hideDetails: "popup-item-details-div-hide",
  detailsDiv: "popup-item-details-div unselectable",
  horizontalLine1: "popup-item-details-hr1 unselectable",
  desc: "popup-item-details-desc unselectable",
  horizontalLine2: "popup-item-details-hr2 unselectable",
  objectsDiv: "popup-item-details-objects-div unselectable",
  objectDiv: "popup-item-details-object-div unselectable",
  objectKey: "popup-item-details-object-key unselectable",
  objectValue: "popup-item-details-object-value unselectable"
});

/**
 * Item of a popup list.
 */
export class PopupItem {
  constructor(
    name="",
    desc="",
    objects={}
  ) {
    this.name = name;
    this.desc = desc;
    this.objects = objects;
    // popup is set when parent is built
    this.popup = null;
  }

  build(number=0) {
    if (this.popup === null || this.popup === undefined)
      throw new Error("PopupItem without popup parent");

    // Creation
    const itemDiv = document.createElement("div");
    itemDiv.classList = elementClasses.itemDiv;

    const nameDiv = document.createElement("div");
    nameDiv.id = `popup-item-div-${number}`;
    nameDiv.classList = elementClasses.nameDiv;
    const name = document.createElement("h2");
    name.classList = elementClasses.name;
    name.innerText = this.name;
    const addButton = document.createElement("button");
    addButton.classList = elementClasses.addButton;
    addButton.type = "button";
    addButton.onclick = () => this.popup.onSelect(this.name);
    addButton.innerText = "+";

    const detailsDiv = document.createElement("div");
    detailsDiv.id = `popup-item-details-div-${number}`;
    detailsDiv.classList = elementClasses.detailsDiv;
    detailsDiv.classList.add(elementClasses.hideDetails);
    const horizontalLine1 = document.createElement("hr");
    horizontalLine1.classList = elementClasses.horizontalLine1;
    const desc = document.createElement("p");
    desc.classList = elementClasses.desc;
    desc.innerText = this.desc;

    const objectsDiv = document.createElement("div")
    objectsDiv.classList = elementClasses.objectsDiv;
    const objectList = [];
    for (const object in this.objects) {
      // Creation
      const objectDiv = document.createElement("div");
      objectDiv.classList = elementClasses.objectDiv;
      const objectKey = document.createElement("H3");
      objectKey.classList = elementClasses.objectKey;
      objectKey.innerText = object;
      const objectValue = document.createElement("p");
      objectValue.classList = elementClasses.objectValue;
      objectValue.innerText = this.objects[object];
      // Attachment
      objectDiv.appendChild(objectKey);
      objectDiv.appendChild(objectValue);
      // Push
      objectList.push(objectDiv);
    }
    const horizontalLine2 = document.createElement("hr");
    horizontalLine2.classList = elementClasses.horizontalLine2;

    // Attachment
    itemDiv.appendChild(nameDiv);
    nameDiv.appendChild(name);
    nameDiv.appendChild(addButton);
    itemDiv.appendChild(detailsDiv);

    detailsDiv.appendChild(horizontalLine1);
    detailsDiv.appendChild(desc);
    detailsDiv.appendChild(objectsDiv);
    
    for (const object of objectList)
      objectsDiv.appendChild(object);
    
    detailsDiv.appendChild(horizontalLine2);
    // Return
    return itemDiv;
  }
}

/**
 * Class to manage all popups that ask users to select an item from a list.
 * 
 * The list's items are to be formatted with the PopupItem class.
 */
export class Popup {
  constructor(
    onSelect=(item="") => {}
  ) {
    this.onSelect = onSelect;
    this.id = "popup-div";
    this.hideClass = "popup-hidden";
  }

  build(title="title", itemList=[]) {
    const popupWindow = Ids.getElById(this.id);
    // Build title
    const titleDiv = document.createElement("div");
    titleDiv.classList = elementClasses.titleDiv;
    const titleH1 = document.createElement("h1");
    titleH1.classList = elementClasses.titleH1;
    titleH1.innerText = title;
    const titleHr = document.createElement("hr");
    titleHr.classList = elementClasses.titleHr;
    // Append title
    popupWindow.appendChild(titleDiv);
    titleDiv.appendChild(titleH1);
    titleDiv.appendChild(titleHr);
    // Add items
    for (let i = 0; i < itemList.length; i++) {
      itemList[i].popup = this;
      popupWindow.appendChild(itemList[i].build(i));
    }
    // Unhide
    popupWindow.classList.remove(this.hideClass);
  }

  anhilate() {
    const popupWindow = Ids.getElById(this.id);
    popupWindow.classList.add(this.hideClass);
    popupWindow.textContent = '';
  }
}

/**
 * Black overlay that hides the periphery of the popup.
 * Also acts as an implicit close button.
 */
export class Overlay {
  constructor(
    popup=null
  ) {
    this.popup = popup;
    this.hideClass = "popup-overlay-hidden";
    this.id = "popup-overlay";
  }

  hide() {
    const overlay = Ids.getElById(this.id);
    overlay.classList.add(this.hideClass);
    this.popup.anhilate();
  }

  show(title="title", itemList=[]) {
    const overlay = Ids.getElById(this.id);
    overlay.classList.remove(this.hideClass);
    this.popup.build(title, itemList);
  }
}
