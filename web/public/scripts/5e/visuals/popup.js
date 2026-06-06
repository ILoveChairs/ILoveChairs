window.onclick = function(event) {
	if (event.target.className === "btn btn-link") {
    document.getElementById('popupedit').style.display = "block";
  }
  if (event.target.className === "overlay") {
    event.target.style.display = "none";
  }
}