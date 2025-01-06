
const PLAYBUTTONID = "chess-start";


function headerSpaceHandler(event) {
  let header = document.getElementById('body-header');
  let headerStyle = window.getComputedStyle(header);
  let height = headerStyle.getPropertyValue('height');

  let body = document.getElementById('body');
  body.style.paddingTop = height;
}
addEventListener("load", headerSpaceHandler);
addEventListener("resize", headerSpaceHandler);

function chessImport() {
  console.log("Importing...")
  try {
    import("./chess.js");
    console.log("Import successful!");
  } catch (error) {
    console.log(`Import error: ${error}`);
  }
}
function chessListenerLoader() {
  document.getElementById(PLAYBUTTONID).onclick = () => {
    chessImport();
  };
}
addEventListener("load", chessListenerLoader);
