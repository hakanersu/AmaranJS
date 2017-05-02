
var Amaran = {
  config: {
    type: 'notification',
    theme: 'default',
    position: 'top right',
    content: 'Hello from amaranjs, you just forget content.',
    in: 'fade',
    out: 'fade',
    selector: 'none',
    selectorEvent: "click"
  },

  init: function (config) {
    if (config  !== undefined) {
      this.defaults = Helper.merge(this.config,config);
    }
      return this;
  },

  in: function (effect) {
      this.config.in = effect;
      return this;
  },

  out: function (effect) {
      this.config.out = effect;
      return this;
  },

  run: function() {
    Element.createWrapper(this);
    return this;
  },

  content: function (content){
    this.config.content = content;
    return this;
  }
};


window.amaran = function () {
    return function (content) {
        var amaran = Amaran;
        if (content === undefined) {
            content = 'Hello from amaranjs, you just forget content.';
        }
        return amaran.init(content);
    };
}();
