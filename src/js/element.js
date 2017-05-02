var Element = {
  main: {},
  wrapper: '',
  createWrapper: function (main) {
    this.main = main;

    var inner;
    // Try to get wrapper element.
    var wrapper = document.getElementsByClassName('amaran-wrapper '+ main.config.position);

    if(wrapper.length<=0) {
        // create new wrapper and inner wrapper
        var new_wrapper = this.createEl('amaran-wrapper '+ main.config.position);
        inner = this.createEl('amaran-wrapper-inner');
        new_wrapper.appendChild(inner);
        document.querySelector('body').appendChild(new_wrapper);
      } else {
        // if we have a wrapper lets get inner wrapper.
        inner = wrapper[0].getElementsByClassName('amaran-wrapper-inner')[0];
      }
      this.wrapper = wrapper;
      // get amaran dom node.
      var amaran = this.createAmaran();
      // append amaran to inner wrapper
      inner.appendChild(amaran);

  },

  createAmaran: function() {
    var amaran;
    var options = { template: this.main.config.theme };
    console.log(this.main.config.theme)

    if ((typeof this.main.config.content) == 'object'){
      options = this.merge(options,this.main.config.content);
    } else {
      options['content'] = this.main.config.content;
    }
    amaran = Helper.parseHTML(Helper.engine(Themes.default(),options))[0];
    // Set default styles.
    amaran.style.cssText = Helper.styles.text();
    // get amaranjs position option
    var axy = this.main.config.position.split(" ");
    // positon vertical
    var ay  = axy[0];
    // position horizontal
    var ax  = axy[1];

    var position = Position;

    position.wrap = this.wrapper[0];

    position.calculate();

    return amaran;
  },

  createEl: function(name){
    var elem = document.createElement("div");
    elem.className += name;
    return elem;
  }

};
