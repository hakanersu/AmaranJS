var Element = {
  main: {},
  wrapper: '',
  amaran: false,
  createWrapper: function (main) {
    this.main = main;

    var inner;
    // Try to get wrapper element.
    var wrapper = document.getElementsByClassName('amaran-wrapper '+ main.config.yaxis + ' '+ main.config.xaxis);

    if(wrapper.length<=0) {
        // create new wrapper and inner wrapper
        var new_wrapper = this.createEl('amaran-wrapper '+ main.config.yaxis + ' '+ main.config.xaxis);
        inner = this.createEl('amaran-wrapper-inner');
        new_wrapper.appendChild(inner);
        document.querySelector('body').appendChild(new_wrapper);
      } else {
        // if we have a wrapper lets get inner wrapper.
        inner = wrapper[0].getElementsByClassName('amaran-wrapper-inner')[0];
      }
      this.wrapper = wrapper;
      // get amaran dom node.
      this.amaran = this.createAmaran();
      // append amaran to inner wrapper
      inner.appendChild(this.amaran);

  },

  createAmaran: function() {
    var amaran;

    var options = { template: this.main.config.theme };


    if ((typeof this.main.config.content) == 'object'){
      options = this.merge(options,this.main.config.content);
    } else {
      options['content'] = this.main.config.content;
    }
    amaran = Helper.parseHTML(Helper.engine(Themes.default(),options))[0];
    // Set default styles.
    amaran.style.cssText = Helper.styles.text();

    amaran.className += ' amaran--from'+Helper.capitalize(this.main.config.in);
    // get amaranjs position option
    var axy = this.main.config.position.split(" ");
    // positon vertical
    var ay  = axy[0];
    // position horizontal
    var ax  = axy[1];

    var position = Position;

    position.wrap = this.wrapper[0];

    position.el = amaran;

    position.calculate();

    return amaran;
  },

  in: function() {
    var pos = this.main.config.position.split(" ");
    var that = this;

    if (pos[1] == 'right' && this.main.config.in == 'left') {
      this.timeout('marginLeft',0, this.amaran);
    }

    if (pos[1] == 'right' && this.main.config.in == 'right') {
        this.timeout('right', '5px', this.amaran);
    }

  },
  out: function(elem, out) {
    console.log('Triggered');
    var pos = this.main.config.position.split(" ");
    var that = this;
    var coordinates = elem.getBoundingClientRect();
    if (pos[1] == 'right' && out == 'left') {
      elem.style.marginLeft = (coordinates.left + coordinates.width + 15) + 'px';
    }

    if (pos[1] == 'right' && out == 'bottom') {
      elem.style.marginTop = (coordinates.bottom + 15) + 'px';
    }
  },
  timeout: function(key, value, amaran, effect) {
    var that = this;
    var transitionEnd = this.amaranTransitionEnd();
    var timeout = this.main.config.timeout;
    var out = this.main.config.out;

    if (effect === undefined) {
      effect = 'in';
    }

    setTimeout(function(){
      amaran.style[key] = value;
      if (effect == 'in') {
        amaran.addEventListener(transitionEnd, function(){
          that.amaranClose(amaran, timeout, out);
        }, false);
      }

    },100);
  },
  amaranClose: function(elem, timeout, out){
    var that = this;

    setTimeout(function(){
      that.out(elem,out);
    }, timeout);

  },
  amaranTransitionEnd:function  () {
      var i,
          undefined,
          el = document.createElement('div'),
          transitions = {
              'transition':'transitionend',
              'OTransition':'otransitionend',  // oTransitionEnd in very old Opera
              'MozTransition':'transitionend',
              'WebkitTransition':'webkitTransitionEnd'
          };

      for (i in transitions) {
          if (transitions.hasOwnProperty(i) && el.style[i] !== undefined) {
              return transitions[i];
          }
      }
  },

  createEl: function(name){
    var elem = document.createElement("div");
    elem.className += name;
    return elem;
  }

};
