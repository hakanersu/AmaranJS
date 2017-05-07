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

    this.in(amaran);

    return amaran;
  },

  in: function(elem) {
    var pos = this.main.config.position.split(" ");
    var that = this;

    if (pos[1] == 'right' && this.main.config.in == 'left') {
      this.timeout('right', '5px', elem);
    }

    if (pos[1] == 'right' && this.main.config.in == 'right') {
        this.timeout('marginLeft',0, elem);
    }

    if (pos[1] == 'left' && this.main.config.in == 'left') {

      this.timeout('marginLeft', '5px', elem);
    }
  },
  out: function(elem, out) {
    var pos = this.main.config.position.split(" ");
    var that = this;
    var coordinates = elem.getBoundingClientRect();
    console.log(pos);
    if (pos[1] == 'right' && out == 'left') {
      this.moveX(elem,-(coordinates.left + coordinates.width + 15))
    }
    if (pos[1] == 'left' && out == 'left') {
      this.moveX(elem,-(coordinates.width + 15))
    }
console.log('Sag:', pos[1])
console.log('Sol:', out)
    if (pos[1] == 'left' && out == 'right') {
console.log('here');
      this.moveX(elem, (window.innerWidth + coordinates.width + 15))
    }

    if (pos[1] == 'right' && out == 'right') {
        this.moveX(elem,(coordinates.width + 15))
    }

    if (pos[1] == 'right' && out == 'bottom') {
      this.moveY(elem,(window.innerHeight-coordinates.top + 15))
    }
  },
  moveX: function(elem, pos){
    this.trans('x', pos, elem);
  },
  moveY: function(elem, pos){
    this.trans('y', pos, elem);
  },
  trans: function(direction, pos, elem) {
    elem.style.transform = 'translate' + direction.toUpperCase() + '(' + pos + 'px)';
  },
  timeout: function(key, value, amaran) {
    var that = this;
    var transitionEnd = this.amaranTransitionEnd();
    var timeout = this.main.config.timeout;
    var out = this.main.config.out;

    // If i use traditional event listener it can trigger more than once. ( transition can be tricky)
    // with this function it will trigger once.
    // http://stackoverflow.com/questions/4878805/force-javascript-eventlistener-to-execute-once
    var transitionListener = function(amaran, timeout,out) {
        that.amaranClose(amaran, timeout, out);
        window.removeEventListener(transitionEnd, transitionListener, false );
    };

    setTimeout(function(){
      amaran.style[key] = value;
      amaran.addEventListener(transitionEnd, transitionListener(amaran, timeout,out), false);
    },100);
  },
  amaranClose: function(elem, timeout, out){
    var that = this;
  
    setTimeout(function(){
      that.out(elem, out);
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
