export default class Position {
    constructor(element, w) {
        let wrapper = w[0];
        let windowHeight = window.innerHeight;
        let windowWidth = window.innerWidth;
        // TODO posizsyona gore bu degerleri degistirmen gerek.
        this.position = {
            windowHeight: windowHeight,
            windowWidth: windowWidth,
            wrapperHeight: wrapper.offsetHeight,
            wrapperWidth: wrapper.offsetWidth,
            wrapperOffsetTop: wrapper.offsetTop,
            wrapperOffsetBottom: (windowHeight - (wrapper.offsetTop + wrapper.offsetHeight)),
            wrapperOffsetLeft: wrapper.offsetLeft,
            wrapperOffsetRight: (windowWidth - (wrapper.offsetLeft + wrapper.offsetWidth)),
            elementOffsetTop: element.offsetTop,
            elementHeight: element.offsetHeight,
            elementOffsetBottom: (windowHeight - element.offsetTop)
        }
    }

    get(name) {
        return this.position[name];
    }
}