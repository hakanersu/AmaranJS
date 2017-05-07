var amaran = (function() {
  var amaranObject = {
    config: {
      type: 'notification',
      theme: 'default',
      position: 'top right',
      xaxis: 'top',
      yaxis: 'right',
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
      Element.in();
      return this;
    },

    position: function(yaxis, xaxis) {
      this.config.xaxis = xaxis;
      this.config.yaxis = yaxis;
      return this;
    },

    content: function (content){
      this.config.content = content;
      return this;
    }
  };
  return function(config){
    return amaranObject.init(config);
  };
}());
