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

// appends
infoWrapper.appendChild(infoH1);
infoWrapper.appendChild(infoP);

export default infoWrapper;
