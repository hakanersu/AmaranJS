var Position = {
  wrap: false,
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
  },
  wrapper: {
    width: 0,
    height: 0,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }
};
