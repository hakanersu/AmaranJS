export interface AmaranContent {
  message?: string;
  color?: string;
  bgcolor?: string;
  icon?: string;
  title?: string;
  info?: string;
  img?: string;
  user?: string;
  themeName?: string;
}

export interface AmaranOptions {
  position?: string;
  content?: AmaranContent | string;
  message?: string;
  delay?: number;
  sticky?: boolean;
  stickyButton?: boolean;
  inEffect?: string;
  outEffect?: string;
  theme?: string;
  themeTemplate?: ((content: AmaranContent) => string) | null;
  closeOnClick?: boolean;
  closeButton?: boolean;
  clearAll?: boolean;
  cssanimationIn?: string | false;
  cssanimationOut?: string | false;
  resetTimeout?: boolean;
  overlay?: boolean;
  overlayColor?: string;
  beforeStart?: () => void;
  afterEnd?: () => void;
  onClick?: () => void;
  wrapper?: string;
}

interface PositionInfo {
  t: number;
  l: number;
  h: number;
  w: number;
  wT: number;
  wL: number;
  wH: number;
  wW: number;
}

interface SlidePositionSet {
  start: JQuery.PlainObject;
  move: JQuery.PlainObject;
  hide: JQuery.PlainObject;
  height: number;
}

type ThemeKey = 'defaultTheme' | 'awesomeTheme' | 'userTheme' | 'colorfulTheme' | 'tumblrTheme';

const themes: Record<ThemeKey, (data: AmaranContent) => string> = {
  defaultTheme({ color = '', message = '' }) {
    return `<div class="default-spinner"><span style="background-color:${color}"></span></div><div class="default-message"><span>${message}</span></div>`;
  },
  awesomeTheme({ icon = '', title = '', message = '', info = '' }) {
    return `<i class="icon ${icon} icon-large"></i><p class="bold">${title}</p><p><span>${message}</span><span class="light">${info}</span></p>`;
  },
  userTheme({ img = '', user = '', message = '' }) {
    return `<div class="icon"><img src="${img}" alt="" /></div><div class="info"><b>${user}</b>${message}</div>`;
  },
  colorfulTheme({ bgcolor = '', color = '', message = '' }) {
    return `<div class="colorful-inner" style="background-color:${bgcolor};color:${color}">${message}</div>`;
  },
  tumblrTheme({ title = '', message = '' }) {
    return `<div class="title">${title}</div><div class="content">${message}</div>`;
  },
};

class AmaranPlugin {
  config: Required<AmaranOptions>;
  timeout!: ReturnType<typeof setTimeout>;

  constructor(options: AmaranOptions) {
    const defaults: Required<AmaranOptions> = {
      position: 'bottom right',
      content: ' ',
      message: '',
      delay: 3000,
      sticky: false,
      stickyButton: false,
      inEffect: 'fadeIn',
      outEffect: 'fadeOut',
      theme: 'default',
      themeTemplate: null,
      closeOnClick: true,
      closeButton: false,
      clearAll: false,
      cssanimationIn: false,
      cssanimationOut: false,
      resetTimeout: false,
      overlay: false,
      overlayColor: 'rgba(153,204,51,.9)',
      beforeStart: () => {},
      afterEnd: () => {},
      onClick: () => {},
      wrapper: '.amaran-wrapper',
    };

    this.config = $.extend({}, defaults, options) as Required<AmaranOptions>;
    this.config.beforeStart();
    this.init();
    this.close();
  }

  init(): void {
    const [pos0, pos1] = this.config.position.split(' ');
    const wrapperClass = `${this.config.wrapper.slice(1)} ${this.config.position}`;
    let wrapper: JQuery;
    let innerWrapper: JQuery;

    const existingWrapper = $(this.config.wrapper);
    if (!existingWrapper.length || !existingWrapper.hasClass(this.config.position)) {
      wrapper = $('<div>', { class: wrapperClass }).appendTo('body');
      innerWrapper = $('<div>', { class: 'amaran-wrapper-inner' }).appendTo(wrapper);
    } else {
      wrapper = $(`${this.config.wrapper}.${pos0}.${pos1}`);
      innerWrapper = wrapper.find('.amaran-wrapper-inner');
    }

    const content = this.config.content;
    let resolvedContent: AmaranContent;
    let message: string;

    if (typeof content === 'object') {
      resolvedContent = content;
      message = this.config.themeTemplate != null
        ? this.config.themeTemplate(resolvedContent)
        : themes[`${this.config.theme.split(' ')[0]}Theme` as ThemeKey](resolvedContent);
    } else {
      resolvedContent = { message: this.config.message, color: '#27ae60' };
      this.config.content = resolvedContent;
      message = themes.defaultTheme(resolvedContent);
    }

    const themeClass = this.config.themeTemplate
      ? `amaran ${resolvedContent.themeName ?? ''}`.trim()
      : `amaran ${this.config.theme}`.trim();

    if (this.config.clearAll) {
      $('.amaran,.amaran-overlay').remove();
    }

    const element = $('<div>', {
      class: themeClass,
      html: this.buildHTML(message),
    }).appendTo(innerWrapper);

    if (pos0 === 'center') {
      this.centerCalculate(wrapper, innerWrapper);
    }

    this.animation(this.config.inEffect, element, 'show');

    element.css({ cursor: 'default' });
    element.on('click', (e) => {
      if ($(e.target).is('.amaran-close') || $(e.target).is('.amaran-sticky')) {
        e.preventDefault();
        return;
      }
      this.config.onClick();
    });

    if (this.config.resetTimeout) {
      element.on('mouseenter', () => this.resetTimeout());
      element.on('mouseleave', () => this.resumeTimeout(element));
    }

    if (this.config.overlay && $('.amaran-overlay').length === 0) {
      $('body').prepend(
        `<div class="amaran-overlay" style="background-color:${this.config.overlayColor}"></div>`,
      );
    }

    if (this.config.stickyButton) {
      element.find('.amaran-sticky').on('click', (e) => {
        const btn = $(e.currentTarget);
        if (btn.hasClass('sticky')) {
          btn.removeClass('sticky');
          this.resumeTimeout(element);
        } else {
          btn.addClass('sticky');
          this.resetTimeout();
        }
      });
    }

    if (!this.config.sticky) {
      this.hideDiv(element);
    }
  }

  resetTimeout(): void {
    clearTimeout(this.timeout);
  }

  resumeTimeout(element: JQuery): void {
    this.timeout = setTimeout(() => {
      this.animation(this.config.outEffect, element, 'hide');
    }, this.config.delay);
  }

  buildHTML(message: string): string {
    let html = message;
    if (this.config.closeButton) {
      html = `<span class="amaran-close" data-amaran-close="true"></span>${html}`;
    }
    if (this.config.stickyButton) {
      html = `<span class="amaran-sticky" data-amaran-sticky="true"></span>${html}`;
    }
    return html;
  }

  centerCalculate(wrapper: JQuery, innerWrapper: JQuery): void {
    const totalHeight = innerWrapper.height() ?? 0;
    const topMargin = ((wrapper.height() ?? 0) - totalHeight) / 2;
    innerWrapper.find('.amaran:first-child').animate({ 'margin-top': topMargin }, 200);
  }

  animation(effect: string, element: JQuery, work: 'show' | 'hide'): void {
    if (effect === 'fadeIn' || effect === 'fadeOut') {
      this.fade(element, work);
    } else if (effect === 'show') {
      work === 'show' ? element.show() : this.removeIt(element);
    } else {
      this.slide(effect, element, work);
    }
  }

  fade(element: JQuery, work: 'show' | 'hide'): void {
    this.removeOverlay();

    if (work === 'show') {
      if (this.config.cssanimationIn) {
        element.addClass(`animated ${this.config.cssanimationIn}`).show();
      } else {
        element.fadeIn();
      }
      return;
    }

    if (this.config.cssanimationOut) {
      element.addClass(`animated ${this.config.cssanimationOut}`);
    }

    element.css({ 'min-height': 0, height: element.outerHeight() ?? 0 });
    element.animate({ opacity: 0 }, () => {
      element.animate({ height: 0 }, () => this.removeIt(element));
    });
  }

  slide(effect: string, element: JQuery, work: 'show' | 'hide'): void {
    this.removeOverlay();
    const position = this.getPosition(element, effect);
    if (!position) return;

    if (work === 'show') {
      element.show().css(position.start).animate(position.move);
    } else {
      element
        .animate(position.hide, () => {
          element.css({ 'min-height': 0, height: position.height }).html(' ');
        })
        .animate({ height: 0 }, () => this.removeIt(element));
    }
  }

  removeOverlay(): void {
    if (this.config.overlay && $('.amaran').length <= 1) {
      $('.amaran-overlay').remove();
    }
  }

  removeIt(element: JQuery): void {
    clearTimeout(this.timeout);
    element.remove();

    const [pos0, pos1] = this.config.position.split(' ');
    const wrapper = $(`${this.config.wrapper}.${pos0}.${pos1}`);
    const innerWrapper = wrapper.find('.amaran-wrapper-inner');

    if (pos0 === 'center') {
      this.centerCalculate(wrapper, innerWrapper);
    }
    this.config.afterEnd();
  }

  getWidth(el: JQuery): number {
    const clone = el.clone().hide().appendTo('body');
    const width = (clone.outerWidth() ?? 0) * 1.5;
    clone.remove();
    return width;
  }

  getInfo(element: JQuery): PositionInfo {
    return {
      t: element.offset()?.top ?? 0,
      l: element.offset()?.left ?? 0,
      h: element.height() ?? 0,
      w: element.outerWidth() ?? 0,
      wT: $(this.config.wrapper).offset()?.top ?? 0,
      wL: $(this.config.wrapper).offset()?.left ?? 0,
      wH: $(this.config.wrapper).outerHeight() ?? 0,
      wW: $(this.config.wrapper).outerWidth() ?? 0,
    };
  }

  getPosition(element: JQuery, effect: string): SlidePositionSet | null {
    const p = this.getInfo(element);
    const side = this.config.position.split(' ')[1];
    const winW = $(window).width() ?? 0;
    const winH = $(window).height() ?? 0;

    const positions: Record<string, SlidePositionSet> = {
      slideTop: {
        start: { top: -(p.wT + p.wH + p.h * 2) },
        move: { top: 0 },
        hide: { top: -(p.t + p.h * 2) },
        height: p.h,
      },
      slideBottom: {
        start: { top: winH - p.wH + p.h * 2 },
        move: { top: 0 },
        hide: { top: winH - p.wH + p.h * 2 },
        height: p.h,
      },
      slideLeft: {
        start: { left: side === 'left' ? -p.w * 1.5 : -winW },
        move: { left: 0 },
        hide: { left: side === 'left' ? -p.w * 1.5 : -winW },
        height: p.h,
      },
      slideRight: {
        start: { left: side === 'right' ? p.w * 1.5 : winW },
        move: { left: 0 },
        hide: { left: side === 'right' ? p.w * 1.5 : winW },
        height: p.h,
      },
    };

    return positions[effect] ?? null;
  }

  close(): void {
    $('[data-amaran-close]').on('click', (e) => {
      this.animation(this.config.outEffect, $(e.currentTarget).closest('div.amaran'), 'hide');
    });

    if (this.config.closeOnClick) {
      $('.amaran').on('click', (e) => {
        this.animation(this.config.outEffect, $(e.currentTarget), 'hide');
      });
    }
  }

  hideDiv(element: JQuery): void {
    this.timeout = setTimeout(() => {
      this.animation(this.config.outEffect, element, 'hide');
    }, this.config.delay);
  }
}

(function ($: JQueryStatic) {
  const amaran = Object.assign(
    function (options: AmaranOptions): AmaranPlugin {
      return new AmaranPlugin(options);
    },
    {
      close(): false {
        $('.amaran-wrapper').remove();
        return false;
      },
    },
  );
  $.amaran = amaran;
})(jQuery);

declare global {
  interface JQueryStatic {
    amaran: {
      (options: AmaranOptions): AmaranPlugin;
      close(): false;
    };
  }
}
