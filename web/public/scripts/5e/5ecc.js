import * as Ids from "./visuals/ids.js";
import { StringSetter } from "./visuals/strings.js";
import * as Fundamentals from "./visuals/fundamentals.js";

function headerSpaceHandler(event) {
  let header = document.getElementById('body-header');
  let headerStyle = window.getComputedStyle(header);
  let height = headerStyle.getPropertyValue('height');

  let body = document.getElementById('body');
  body.style.paddingTop = height;
}
addEventListener("load", headerSpaceHandler);
addEventListener("resize", headerSpaceHandler);

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
})

const stringSetter = new StringSetter();
stringSetter.setStrings();

const englishButton = Ids.getElById(Ids.otherIds.enButton);
englishButton.onclick = () => stringSetter.setStrings(false);
const spanishButton = Ids.getElById(Ids.otherIds.esButton);
spanishButton.onclick = () => stringSetter.setStrings(true);
