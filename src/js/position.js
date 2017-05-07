var Position = {
  wrap: false,
  el: false,
  //
  window: {
    width: window.innerWidth,
    height: window.innerHeight
  },
  calculate: function() {
    this.wrapper.width = this.wrap.offsetWidth;
    this.wrapper.height = this.wrap.offsetHeight;
    this.wrapper.top = this.wrap.offsetTop;
    this.wrapper.bottom = this.window.height - (this.wrap.top - this.wrap.height);
    this.wrapper.left = this.wrap.offsetLeft;
    this.wrapper.right = this.window.width - (this.wrap.left + this.wrap.width);
    this.element.top = this.el.offsetTop;
    this.element.height = this.el.offsetHeight;
    this.element.bottom = (window.height - this.element.top)
  },
  wrapper: {
    width: 0,
    height: 0,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  element: {
    width: 0,
    height: 0,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }
};
