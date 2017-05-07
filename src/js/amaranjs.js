var amaran = (function () {
    // TODO CONFIG DISARI ALINACAK OBJENIN ICINDE OLMASI SIKINTI

    var mainConfig = {};
    var Amaran = {
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
      selectorEvent: "click",
      timeout: 3000
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

    position: function(yaxis, xaxis) {
      this.config.xaxis = xaxis;
      this.config.yaxis = yaxis;
      this.config.position = yaxis +' '+ xaxis;
      return this;
    },
    timeout: function(value) {
        this.config.timeout = value;
        return this;
    },

    content: function (content){
      this.config.content = content;
      return this;
    }
  };


    return function (content) {
        if (content === undefined) {
            content = 'Hello from amaranjs, you just forget content.';
        }
        return Amaran.init(content);
    };
}());
