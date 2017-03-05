import Effect from './Effect';

export default class Element {
    constructor(config, content) {
        this.config = config;
        this.content = content;

        let wrapper = document.getElementsByClassName(config._wrapper+' '+ config._position);
        let inner;
        if(wrapper.length<=0) {
            let wrap = this.create(config._wrapper+' '+ config._position);
            inner = this.create(config._innerWrapper);
            wrap.appendChild(inner);
            document.querySelector('body').appendChild(wrap);
        }else {
            // if we have a wrapper lets get inner wrapper.
            inner = wrapper[0].getElementsByClassName(config._innerWrapper)[0];
        }
        this.inner = inner;
        this.wrapper = wrapper;
        this.effect = new Effect(config, wrapper);
        this.build();
    }

    create(name) {
        let elem = document.createElement("div");
        elem.className += name;
        return elem;
    }
    // Builds
    build() {
        let content = this.parse('<div class="amaran default">${content}</div>', {
            content: this.content
        });
        let tmp = document.implementation.createHTMLDocument();
        tmp.body.innerHTML = content;
        let amaran = tmp.body.children[0];
        this.inner.appendChild(amaran);
        this.effect.elem(amaran).start();

    }

    get(path, obj, fb = `$\{${path}}`) {
        return path.split('.').reduce((res, key) => res[key] || fb, obj);
    }

    parse(template, map, fallback) {
        return template.replace(/\$\{.+?}/g, (match) => {
            const path = match.substr(2, match.length - 3).trim();
            return this.get(path, map, fallback);
        });
    }

}