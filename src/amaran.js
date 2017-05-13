(function() {
  (function(window, document, undefined_) {
    var Amaran = function (options) {
      var defaults = {
        type: "notification",
        theme: "default",
        position: "top right",
        xaxis: "top",
        yaxis: "right",
        content: "Hello from amaranjs, you just forget content.",
        in: "right",
        out: "right",
        timeout: 3000,
        sticky: false,
        beforeStart: false,
        afterEnd: false,
        onClick: false,
        delay: 100
      };

      this.config = this.merge(defaults, options);
      var pos = this.config.position.split(" ");
      this.config.xaxis = pos[1];
      this.config.yaxis = pos[0];
    };

    Amaran.prototype = {
      init: function (config) {
        this.config = this.merge(this.defaults, config);
        return this;
      },

      position: function(yaxis, xaxis) {
        this.config.xaxis = xaxis;
        this.config.yaxis = yaxis;
        this.config.position = yaxis +" "+ xaxis;
        return this;
      },

      in: function (effect) {
        this.config.in = effect;
        return this;
      },

      delay: function (delay) {
        this.config.delay = delay;
        return this;
      },

      beforeStart: function (func) {
        this.config.beforeStart = func;
        return this;
      },

      onClick: function (func) {
        this.config.onClick = func;
        return this;
      },

      afterEnd: function (func) {
        this.config.afterEnd = func;
        return this;
      },

      sticky: function() {
        this.config.sticky = true;
        return this;
      },

      out: function (effect) {
        this.config.out = effect;
        return this;
      },

      timeout: function(value) {
        this.config.timeout = value;
        return this;
      },

      content: function (content){
        this.config.content = content;
        return this;
      },

      run: function() {
        this.wrapper();
        return this;
      },

      wrapper: function() {
        var inner;
        var elementClass = "amaran-wrapper "+ this.config.yaxis + " "+ this.config.xaxis;
        var wrapper = document.getElementsByClassName(elementClass);
        if (wrapper.length <= 0) {
          var newWrapper = this.createElement(elementClass);
          inner = this.createElement("amaran-wrapper-inner");
          newWrapper.appendChild(inner);
          document.querySelector("body").appendChild(newWrapper);
        } else {
          inner = wrapper[0].getElementsByClassName("amaran-wrapper-inner")[0];
        }
        this.wrapper = wrapper;
        this.amaran = this.notification();
        inner.appendChild(this.amaran);
        this.inFrom();
        return this;
      },

      notification: function () {
        if (this.config.beforeStart) {
          this.config.beforeStart();
        }
        var amaran = this.parse(this.engine(this.theme("default"),this.config))[0];
        amaran.className += " amaran--from" + this.capitalize(this.config.in);
        amaran.addEventListener("click", function() {
          if (this.config.onClick) {
            this.config.onClick();
          } else {
            this.close(true);
          }
        }.bind(this));
        return amaran;
      },

      inFrom: function () {
        var that = this;
        var style = that.amaran.style;
        var coordinates = that.amaran.getBoundingClientRect();
        if (this.config.xaxis === "right" && this.config.in === "left") {
          style.transition = "all 1s ease";
          this.timeoutEffect("right", 0);
        }

        if (this.config.xaxis === "right" && this.config.in === "right") {
          style.transition = "all 1s ease";
          this.timeoutEffect("marginLeft", "5px");
        }

        if (this.config.xaxis === "left" && this.config.in === "left") {
          style.transition = "all 1s ease";
          this.timeoutEffect("marginLeft", "5px");
        }
        if (this.config.in === "top") {
          style.opacity = 0;
          style.display = "flex";
          setTimeout(function(){
            style.top = -(coordinates.top + coordinates.height + 15) + "px";
            style.opacity = 1;
            setTimeout(function(){
              style.transition = "all 1s ease";
              style.top = 0;
              that.close();
            },95);
          },1);
        }
        if (this.config.in === "bottom") {
          style.opacity = 0;
          style.display = "flex";
          setTimeout(function(){
            style.top = window.innerHeight - coordinates.top + 5 + "px";
            style.opacity = 1;
            setTimeout(function(){
              style.transition = "all 1s ease";
              style.top = 0;
              that.close();
            },95);
          },5);
        }
      },

      outTo: function () {
        var coordinates = this.amaran.getBoundingClientRect();
        if (this.config.xaxis === "right") {
          if (this.config.out === "left") {
            this.moveX(-(window.innerWidth + coordinates.width + 15));
          }
          if (this.config.out === "right") {
            this.moveX(coordinates.width + 15);
          }
        }

        if (this.config.xaxis === "left") {
          if (this.config.out === "left") {
            this.moveX(-(coordinates.width + 15));
          }
          if (this.config.out === "right") {
            this.moveX(window.innerWidth + coordinates.width + 15);
          }
        }

        if (this.config.out === "bottom") {
          this.moveY(window.innerHeight-coordinates.top + 15);
        }

        if (this.config.out === "top") {
          this.moveY(-(coordinates.top + coordinates.height + 15));
        }

        var transitionEnd = this.amaranTransitionEnd();

        this.amaran.addEventListener(transitionEnd, function(){
          if (this.amaran) {
            this.amaran.innerHTML = "";
            this.amaran.className += " amaran-zip";
            setTimeout(function(){
              this.amaran.parentNode.removeChild(this.amaran);
            }.bind(this), 600);
          }

          if (this.config.afterEnd) {
            this.config.afterEnd();
          }
        }.bind(this), false);
      },

      moveX: function(pos){
        this.trans("x", pos);
      },

      moveY: function(pos){
        this.trans("y", pos);
      },

      trans: function (direction, pos) {
        this.amaran.style.transform = "translate" + direction.toUpperCase() + "(" + pos + "px)";
      },

      createElement: function (name) {
        var elem = document.createElement("div");
        elem.className += name;
        return elem;
      },

      close: function (force) {
        if (this.config.sticky && force === undefined) {
          return;
        }
        var that = this;
        setTimeout(function (){
          that.outTo();
        }, force ? 0 : that.config.timeout);
      },

      timeoutEffect: function (key, value) {
        var that = this;
        var transitionEnd = this.amaranTransitionEnd();

        var transitionListener = function () {
            that.close();
            window.removeEventListener(transitionEnd, transitionListener, false );
        };

        setTimeout(function () {
          that.amaran.style[key] = value;
          that.amaran.addEventListener(transitionEnd, transitionListener(), false);
        }, this.config.delay);
      },

      capitalize: function(s) {
         return s && s[0].toUpperCase() + s.slice(1);
      },

      amaranTransitionEnd:function  () {
        var i,
            undefined,
            el = document.createElement("div"),
            transitions = {
                "transition":"transitionend",
                "OTransition":"otransitionend",
                "MozTransition":"transitionend",
                "WebkitTransition":"webkitTransitionEnd"
            };

        for (i in transitions) {
            if (transitions.hasOwnProperty(i) && el.style[i] !== undefined) {
                return transitions[i];
            }
        }
      },

      parse: function (str) {
        var tmp = document.implementation.createHTMLDocument();
        tmp.body.innerHTML = str;
        return tmp.body.children;
      },

      engine: function(html, options) {
        var re = /<%([^%>]+)?%>/g, reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g, code = 'var r=[];\n', cursor = 0, match;
        var add = function(line, js) {
          js? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
              (code += line !== '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
          return add;
        };

        while(match = re.exec(html)) {
          add(html.slice(cursor, match.index))(match[1], true);
          cursor = match.index + match[0].length;
        }

        add(html.substr(cursor, html.length - cursor));
        code += 'return r.join("");';
        return new Function(code.replace(/[\r\t\n]/g, '')).apply(options);
      },

      theme: function (theme) {
        if (theme === 'default') {
          return  '<div class="amaran <%this.theme%>">'+
                  '<div class="default-spinner">'+
                  '<span style="background-color:<% if(typeof this.color === undefined){%>#27ae60<%}else{%><%this.color%><%}%>"></span>'+
                  '</div>'+
                  '<div class="default-message">'+
                  '<span><%this.content%></span>'+
                  '</div>'+
                  '</div>';
        }
      },
      
      merge: function (a, b) {
        var c = {};
        for(var idx in a) { c[idx] = a[idx]; }
        for(var idx in b) { c[idx] = b[idx]; }
        return c;
      }
    };

    window.amaran = function(options) {
      return new Amaran(options);
    };

  })(window, document);
}).call(this);