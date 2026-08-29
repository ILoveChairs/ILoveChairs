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

// appends
wrapper.appendChild(h1);
wrapper.appendChild(p);

export default wrapper;
