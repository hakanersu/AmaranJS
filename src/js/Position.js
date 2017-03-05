export default class Position {
    constructor(element, w, config) {
        let wrapper     = w[0];
        let positions   = config._position.split(' ');
        this.vertical    = positions[0][0];
        this.horizontal  = positions[1][0];
        let windowHeight = window.innerHeight;
        let windowWidth = window.innerWidth;
       
        // margin padding value for older browsers.
        let mp = 30;
        // TODO posizsyona gore bu degerleri degistirmen gerek.
        // canvasHeight 
       let  ch= windowHeight;
        // canvasWidth
       let  cw= windowWidth;
        //wrapperHeight
       let  wh= wrapper.offsetHeight;
        //wrapperWidth
       let  ww= wrapper.offsetWidth;
        // wrapperOffsetTop
        let wot= wrapper.offsetTop;
        // wrapperOffsetBottom
        let wob= (windowHeight - (wrapper.offsetTop + wrapper.offsetHeight));
        // wrapperOffsetLeft
        let wol= wrapper.offsetLeft;
        //wrapperOffsetRight
        let wor= (windowWidth - (wrapper.offsetLeft + wrapper.offsetWidth));
        //elementOffsetTop
        let eot= element.offsetTop;
        //elementHeight
       let  eh= element.offsetHeight;
        //elementOffsetBottom
        let eob= (windowHeight - element.offsetTop);
        

        this.pos = {
            tl: {
                left: ww + mp,
                right: cw + mp,
                top: eot + eh + mp,
                bottom: eob + eh + mp
            },
            tr: {
                left: ww + mp,
                right: cw - ww + mp,
                top: eot + eh + mp,
                bottom: eob + eh + mp
            },
            bl: {
                left: ww + mp,
                right: cw - ww + mp,
                top: ch - eob + mp,
                bottom: eob + eh + mp
            },
            br: {
                left: ww + mp,
                right: cw - ww + mp,
                top: ch - eob + mp,
                bottom: eob + eh + mp
            }
        }
    }

    get() {
        console.log(this.vertical+this.horizontal)
        return this.pos[this.vertical+this.horizontal];
    }
}