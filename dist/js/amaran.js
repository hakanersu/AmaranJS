// src/ts/amaran.ts
var themes = {
  defaultTheme({ color = "", message = "" }) {
    return `<div class="default-spinner"><span style="background-color:${color}"></span></div><div class="default-message"><span>${message}</span></div>`;
  },
  awesomeTheme({ icon = "", title = "", message = "", info = "" }) {
    return `<i class="icon ${icon} icon-large"></i><p class="bold">${title}</p><p><span>${message}</span><span class="light">${info}</span></p>`;
  },
  userTheme({ img = "", user = "", message = "" }) {
    return `<div class="icon"><img src="${img}" alt="" /></div><div class="info"><b>${user}</b>${message}</div>`;
  },
  colorfulTheme({ bgcolor = "", color = "", message = "" }) {
    return `<div class="colorful-inner" style="background-color:${bgcolor};color:${color}">${message}</div>`;
  },
  tumblrTheme({ title = "", message = "" }) {
    return `<div class="title">${title}</div><div class="content">${message}</div>`;
  }
};
var defaults = {
  position: "bottom right",
  content: " ",
  message: "",
  delay: 3e3,
  sticky: false,
  stickyButton: false,
  inEffect: "fadeIn",
  outEffect: "fadeOut",
  theme: "default",
  themeTemplate: null,
  closeOnClick: true,
  closeButton: false,
  clearAll: false,
  cssanimationIn: false,
  cssanimationOut: false,
  resetTimeout: false,
  overlay: false,
  overlayColor: "rgba(153,204,51,.9)",
  beforeStart: () => {
  },
  afterEnd: () => {
  },
  onClick: () => {
  },
  wrapper: ".amaran-wrapper"
};
var AmaranPlugin = class {
  constructor(options) {
    this.config = { ...defaults, ...options };
    this.config.beforeStart();
    this.init();
  }
  init() {
    const [pos0, pos1] = this.config.position.split(" ");
    let wrapper;
    let innerWrapper;
    const existing = document.querySelector(
      `${this.config.wrapper}.${pos0}.${pos1}`
    );
    if (existing) {
      wrapper = existing;
      innerWrapper = existing.querySelector(".amaran-wrapper-inner");
    } else {
      wrapper = this.createElement("div", `${this.config.wrapper.slice(1)} ${this.config.position}`);
      document.body.appendChild(wrapper);
      innerWrapper = this.createElement("div", "amaran-wrapper-inner");
      wrapper.appendChild(innerWrapper);
    }
    const content = this.config.content;
    let resolvedContent;
    let message;
    if (typeof content === "object") {
      resolvedContent = content;
      message = this.config.themeTemplate != null ? this.config.themeTemplate(resolvedContent) : themes[`${this.config.theme.split(" ")[0]}Theme`](resolvedContent);
    } else {
      resolvedContent = { message: this.config.message, color: "#27ae60" };
      this.config.content = resolvedContent;
      message = themes.defaultTheme(resolvedContent);
    }
    const themeClass = (this.config.themeTemplate ? `amaran ${resolvedContent.themeName ?? ""}` : `amaran ${this.config.theme}`).trim();
    if (this.config.clearAll) {
      document.querySelectorAll(".amaran, .amaran-overlay").forEach((el) => el.remove());
    }
    const element = this.createElement("div", themeClass, this.buildHTML(message));
    innerWrapper.appendChild(element);
    if (pos0 === "center") this.centerCalculate(wrapper, innerWrapper);
    this.animation(this.config.inEffect, element, "show");
    element.addEventListener("click", (e) => {
      const target = e.target;
      if (target.closest("[data-amaran-close]")) {
        this.animation(this.config.outEffect, element, "hide");
        return;
      }
      if (target.closest(".amaran-sticky")) return;
      this.config.onClick();
      if (this.config.closeOnClick) {
        this.animation(this.config.outEffect, element, "hide");
      }
    });
    if (this.config.resetTimeout) {
      element.addEventListener("mouseenter", () => this.resetTimeout());
      element.addEventListener("mouseleave", () => this.resumeTimeout(element));
    }
    if (this.config.overlay && !document.querySelector(".amaran-overlay")) {
      const overlay = this.createElement("div", "amaran-overlay");
      overlay.style.backgroundColor = this.config.overlayColor;
      document.body.prepend(overlay);
    }
    if (this.config.stickyButton) {
      element.querySelector(".amaran-sticky")?.addEventListener("click", (e) => {
        const btn = e.currentTarget;
        if (btn.classList.contains("sticky")) {
          btn.classList.remove("sticky");
          this.resumeTimeout(element);
        } else {
          btn.classList.add("sticky");
          this.resetTimeout();
        }
      });
    }
    if (!this.config.sticky) this.hideDiv(element);
  }
  resetTimeout() {
    clearTimeout(this.timeout);
  }
  resumeTimeout(element) {
    this.timeout = setTimeout(
      () => this.animation(this.config.outEffect, element, "hide"),
      this.config.delay
    );
  }
  buildHTML(message) {
    let html = message;
    if (this.config.closeButton) {
      html = `<span class="amaran-close" data-amaran-close="true"></span>${html}`;
    }
    if (this.config.stickyButton) {
      html = `<span class="amaran-sticky" data-amaran-sticky="true"></span>${html}`;
    }
    return html;
  }
  centerCalculate(wrapper, innerWrapper) {
    const topMargin = (wrapper.offsetHeight - innerWrapper.offsetHeight) / 2;
    const first = innerWrapper.querySelector(".amaran:first-child");
    if (!first) return;
    first.animate([{ marginTop: first.style.marginTop || "0px" }, { marginTop: `${topMargin}px` }], {
      duration: 200,
      fill: "forwards"
    });
  }
  animation(effect, element, work) {
    if (effect === "fadeIn" || effect === "fadeOut") {
      this.fade(element, work);
    } else if (effect === "show") {
      if (work === "show") element.style.display = "block";
      else this.removeIt(element);
    } else {
      this.slide(effect, element, work);
    }
  }
  fade(element, work) {
    this.removeOverlay();
    if (work === "show") {
      element.style.display = "block";
      if (this.config.cssanimationIn) {
        element.classList.add("animated", this.config.cssanimationIn);
      } else {
        element.animate([{ opacity: "0" }, { opacity: "1" }], { duration: 300, fill: "forwards" });
      }
      return;
    }
    if (this.config.cssanimationOut) {
      element.classList.add("animated", this.config.cssanimationOut);
    }
    const startHeight = `${element.offsetHeight}px`;
    element.style.minHeight = "0";
    element.style.overflow = "hidden";
    element.animate([{ opacity: "1" }, { opacity: "0" }], { duration: 300, fill: "forwards" }).finished.then(
      () => element.animate([{ height: startHeight }, { height: "0px" }], { duration: 200, fill: "forwards" }).finished.then(() => this.removeIt(element))
    );
  }
  slide(effect, element, work) {
    this.removeOverlay();
    const position = this.getPosition(element, effect);
    if (!position) return;
    if (work === "show") {
      element.style.display = "block";
      element.animate([position.start, position.move], {
        duration: 300,
        fill: "forwards",
        easing: "ease-out"
      });
    } else {
      element.animate([position.move, position.hide], { duration: 300, fill: "forwards", easing: "ease-in" }).finished.then(() => {
        element.style.minHeight = "0";
        element.style.overflow = "hidden";
        element.innerHTML = " ";
        element.animate([{ height: `${position.height}px` }, { height: "0px" }], {
          duration: 200,
          fill: "forwards"
        }).finished.then(() => this.removeIt(element));
      });
    }
  }
  removeOverlay() {
    if (this.config.overlay && document.querySelectorAll(".amaran").length <= 1) {
      document.querySelector(".amaran-overlay")?.remove();
    }
  }
  removeIt(element) {
    clearTimeout(this.timeout);
    element.remove();
    const [pos0, pos1] = this.config.position.split(" ");
    const wrapper = document.querySelector(`${this.config.wrapper}.${pos0}.${pos1}`);
    if (wrapper && pos0 === "center") {
      const inner = wrapper.querySelector(".amaran-wrapper-inner");
      if (inner) this.centerCalculate(wrapper, inner);
    }
    this.config.afterEnd();
  }
  getInfo(element) {
    const rect = element.getBoundingClientRect();
    const wrapperEl = document.querySelector(this.config.wrapper);
    const wRect = wrapperEl?.getBoundingClientRect() ?? new DOMRect();
    return {
      t: rect.top + window.scrollY,
      l: rect.left + window.scrollX,
      h: element.offsetHeight,
      w: element.offsetWidth,
      wT: wRect.top + window.scrollY,
      wL: wRect.left + window.scrollX,
      wH: wrapperEl?.offsetHeight ?? 0,
      wW: wrapperEl?.offsetWidth ?? 0
    };
  }
  getPosition(element, effect) {
    const p = this.getInfo(element);
    const side = this.config.position.split(" ")[1];
    const winW = window.innerWidth;
    const winH = window.innerHeight;
    const map = {
      slideTop: {
        start: { top: `${-(p.wT + p.wH + p.h * 2)}px` },
        move: { top: "0px" },
        hide: { top: `${-(p.t + p.h * 2)}px` },
        height: p.h
      },
      slideBottom: {
        start: { top: `${winH - p.wH + p.h * 2}px` },
        move: { top: "0px" },
        hide: { top: `${winH - p.wH + p.h * 2}px` },
        height: p.h
      },
      slideLeft: {
        start: { left: `${side === "left" ? -p.w * 1.5 : -winW}px` },
        move: { left: "0px" },
        hide: { left: `${side === "left" ? -p.w * 1.5 : -winW}px` },
        height: p.h
      },
      slideRight: {
        start: { left: `${side === "right" ? p.w * 1.5 : winW}px` },
        move: { left: "0px" },
        hide: { left: `${side === "right" ? p.w * 1.5 : winW}px` },
        height: p.h
      }
    };
    return map[effect] ?? null;
  }
  hideDiv(element) {
    this.timeout = setTimeout(
      () => this.animation(this.config.outEffect, element, "hide"),
      this.config.delay
    );
  }
  createElement(tag, className, html) {
    const el = document.createElement(tag);
    el.className = className;
    if (html !== void 0) el.innerHTML = html;
    return el;
  }
};
function amaran(options) {
  return new AmaranPlugin(options);
}
amaran.close = () => {
  document.querySelectorAll(".amaran-wrapper").forEach((el) => el.remove());
};
var amaran_default = amaran;
export {
  amaran_default as default
};
//# sourceMappingURL=amaran.js.map
