// wrapper
const wrapper = document.createElement("div");
wrapper.id = "math-info-gal-wrapper";
wrapper.classList.add("math-info-wrapper");

// h1
const h1 = document.createElement("h1");
h1.id = "math-info-gal-h1";
h1.classList.add("math-info-h1");
h1.textContent = "Geometry and Linear Algebra";

// p
const p = document.createElement("p");
p.id = "math-info-gal-p";
p.classList.add("math-info-p");
p.textContent = "Set of matrix calculators with complex number support, using r + ri (or -r - ri) notation.";

// img
const xkcd = document.createElement("img");
xkcd.id = "math-info-gal-img-xkcd";
xkcd.classList.add("math-info-img");
xkcd.src = "images/math/xkcd-forgotAlgebra.png";
xkcd.title = "The only things you HAVE to know are how to make enough of a living to stay alive and how to get your taxes done. All the fun parts of life are optional."
xkcd.alt = "Forgot Algebra";

// appends
wrapper.appendChild(h1);
wrapper.appendChild(p);
wrapper.appendChild(xkcd);

export default wrapper;
