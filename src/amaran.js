import Element from './js/Element';
import Velocity from 'velocity-animate';

let counter = {
    'tl': 0,
    'tr': 0,
    'bl': 0,
    'br': 0
};

class Amaran {
    constructor() {
        let defaults = {
            _type: 'notification',
            _timeout: 3000,
            _theme: 'default',
            _position: 'top right',
            _content: 'Hello World!',
            _in: 'fade',
            _out: 'fade',
            _from: 'left',
            _selector: 'none',
            _selectorEvent: "click",
            _wrapper: 'amaran-wrapper',
            _innerWrapper: 'amaran-wrapper-inner'
        };

        for (let config in defaults) {
            if (this[config] === undefined) {
                this[config] = defaults[config];
            }
        }
    }

    theme(name) {
       this._theme = name;
       return this;
    }

    run() {
        let settings = {
            _type: this._type,
            _timeout: this._timeout,
            _theme: this._theme,
            _position: this._position,
            _content: this._content,
            _in: (this._in == 'fade') ? 'fadeIn' : this._in,
            _from: this._from,
            _out: (this._out == 'fade') ? 'fadeOut' : this._out,
            _selector: this._selector,
            _selectorEvent: this._selectorEvent,
            _wrapper: this._wrapper,
            _innerWrapper: this._innerWrapper,
        };

        this.elem = new Element(settings, this.content);
    }

    in(from='fade') {
        this._in = (from=='fade') ? 'fadeIn' : 'slide'+from;
        return this;
    }

    out(from='fade') {
        this._out = (from=='fade') ? 'fadeOut' : 'slide'+from;
        return this;
    }

    position(position) {
        this._position = position;
        return this;
    }

    timeout(time) {
        this._timeout = time;
        return this;
    }

    content(content) {
        this.content = content;
        return this;
    }

}


window.amaran= (() => function (content) {
    let amaran = new Amaran();
    if(content === undefined) {
        content = 'Hello from amaranjs, you just forget content. ';
    }
    return amaran.content(content);
})();