

function headerSpaceHandler(event) {
  let header = document.getElementById('body-header');
  let headerStyle = window.getComputedStyle(header);
  let height = headerStyle.getPropertyValue('height');

  let body = document.getElementById('body');
  body.style.paddingTop = height;
}
addEventListener("load", headerSpaceHandler);
addEventListener("resize", headerSpaceHandler);
