import Position from './Position';

export default class Effect {
    constructor(config, wrapper) {
        this.config = config;
        this.wrapper = wrapper;
    }

    elem(elem) {
        this.elem = elem;
        return this;
    }

    start() {
        this[this.config._in]();
    }

    fadeIn() {
        Velocity(this.elem, "fadeIn", { duration: 1000 }).then(()=>{
            this.position = new Position(this.elem, this.wrapper);
            this[this.config._out]();
        });
    }

    slideright() {

        this.outFunction({
            right: -this.position.get('wrapperWidth')
        });
    }

    slideleft() {
        console.log('left out')
    }

    fadeLeft() {
        this.fadeOut();
    }

    fadeRight() {
        this.fadeOut();
    }

    fadeOut() {
        this.outFunction({
            opacity: 0,
            overflow: 'hidden'
        });
    }

    outFunction(inSettings) {
        setTimeout(()=>{
            Velocity(this.elem, inSettings, { duration: 1000 }).then(()=> {
                Velocity(this.elem, {
                    height: 0,
                    minHeight:'auto',
                    lineHeight: 0
                }, { duration: 400 }).then(() => {
                    this.elem.remove();
                })
            });
        }, this.config._timeout);
    }
}