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
            this.position = new Position(this.elem, this.wrapper, this.config);

            this[this.config._out]();
        });
    }

    slideright() {
        let left = this.position.get().right;
        console.log(left);
        this.outFunction({
            left: left
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