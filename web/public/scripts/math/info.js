// wrapper
const infoWrapper = document.createElement("div");
infoWrapper.id = "math-info-wrapper";
infoWrapper.classList.add("math-info-wrapper");

// h1
const infoH1 = document.createElement("h1");
infoH1.id = "math-info-h1";
infoH1.classList.add("math-info-h1");
infoH1.textContent = "Welcome";

// p
const infoP = document.createElement("p");
infoP.id = "math-info-p";
infoP.classList.add("math-info-p");
infoP.textContent = "This is a library with a lot of calculators and misc programs. First choose the area then the program to start.";

// img
const xkcd = document.createElement("img");
xkcd.id = "math-info-img-xkcd";
xkcd.classList.add("math-info-img");
xkcd.src = "images/math/xkcd-math.png";
xkcd.title = "As of this writing, the only thing that's 'razor-thin' or 'too close to call' is the gap between the consensus poll forecast and the result."
xkcd.alt = "Math";

// appends
infoWrapper.appendChild(infoH1);
infoWrapper.appendChild(infoP);
infoWrapper.appendChild(xkcd);

export default infoWrapper;
