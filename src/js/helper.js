var Helper = {
  merge: function (a, b) {
    var c = {};
    for(var idx in a) { c[idx] = a[idx]; }
    for(var idx in b) { c[idx] = b[idx]; }
    return c;
  },
  parseHTML : function(str) {
    var tmp = document.implementation.createHTMLDocument();
    tmp.body.innerHTML = str;
    return tmp.body.children;
  },
  engine: function(html, options) {
      var re = /<%([^%>]+)?%>/g, reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g, code = 'var r=[];\n', cursor = 0, match;
      var add = function(line, js) {
        js? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
            (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
        return add;
      }
      while(match = re.exec(html)) {
        add(html.slice(cursor, match.index))(match[1], true);
        cursor = match.index + match[0].length;
      }
      add(html.substr(cursor, html.length - cursor));
      code += 'return r.join("");';
      return new Function(code.replace(/[\r\t\n]/g, '')).apply(options);
    },
    styles: {
      style:{},
      text: function(){
        var style  = '';
        for(var i in this.style) {
          style += i + ':' + this.style[i] + ';';
        }
        return style;
      },
      set: function(key,value) {
        this.style[key] = value;
        return this;
      },
      get: function(key) {
        return this.style[key];
      },
      unset: function(key) {
        delete this.style[key];
        return this;
      }
    },
    capitalize: function(s) {
       return s && s[0].toUpperCase() + s.slice(1);
    }
};
