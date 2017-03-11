import Position from './Position';

export default class Effect {
    constructor(config, wrapper) {
        this.config = config;
        this.wrapper = wrapper;
        this.click = false;
    }

    elem(elem) {
        this.elem = elem;
        elem.onclick = ()=>{
            this.click = this.config._closeOnClick;
            if (this.config._closeOnClick) {
               this.startOut(); 
            }
        }
        return this;
    }

    start() {
        this[this.config._in]();
    }

    fadeIn() {
        Velocity(this.elem, "fadeIn", { duration: 1000 }).then(()=>{
            this.position = new Position(this.elem, this.wrapper, this.config);
            this.startOut();   
        });
    }

    startOut() {
         this[this.config._out]();
    }

    slideright() {
        let pos = this.position.get().right;
        this.outFunction({
            left: pos
        });
    }

    slideleft() {
       let pos = -this.position.get().left;
        this.outFunction({
            left: pos
        });
    }
    slidebottom() {
        let pos = -this.position.get().bottom;
        this.outFunction({
            bottom: pos
        });
    }

    slidetop() {
        let pos = -this.position.get().top;
        this.outFunction({
            top: pos
        });
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
        if (this.config._sticky && !this.click) {
            return;
        }
        let  timeout = this.click ? 0 : this.config._timeout;
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
        }, timeout);
    }
}