

export default class ZoomControl {
    constructor(interval=1) {
        this.interval = interval;
    }

    changeInputWidth(amount=1) {
        const root = document.documentElement;
        const computedStyle = window.getComputedStyle(root)
        const currentWidth = parseFloat(computedStyle.getPropertyValue("--input-width").replace("rem", ""));
        const calc = currentWidth + (this.interval * amount);
        if (calc >= 1)
            root.style.setProperty('--input-width', calc.toString() + "rem");
    }

    build() {
        const wrapper = document.createElement("span");
        wrapper.id = "math-gal-zoom-inner-wrapper";
        wrapper.classList.add("math-gal-zoom-inner-wrapper");

        const p = document.createElement("p");
        p.id = "math-gal-zoom-p";
        p.classList.add("math-gal-zoom-p");
        p.innerText ="Zoom:";

        const zoomPlus = document.createElement("button");
        zoomPlus.id = "math-gal-zoom-plus";
        zoomPlus.classList.add("math-gal-zoom-plus");
        zoomPlus.innerText = "+";
        zoomPlus.onclick = () => {
            this.changeInputWidth(1);
        };

        const zoomMinus = document.createElement("button");
        zoomMinus.id = "math-gal-zoom-minus";
        zoomMinus.classList.add("math-gal-zoom-minus");
        zoomMinus.innerText = "-";
        zoomMinus.onclick = () => {
            this.changeInputWidth(-1);
        };

        wrapper.appendChild(p);
        wrapper.appendChild(zoomPlus);
        wrapper.appendChild(zoomMinus);
        return wrapper;
    }
}
