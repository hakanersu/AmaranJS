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
  start: Keyframe;
  move: Keyframe;
  hide: Keyframe;
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

class AmaranPlugin {
  config: Required<AmaranOptions>;
  private timeout!: ReturnType<typeof setTimeout>;

  constructor(options: AmaranOptions) {
    this.config = { ...defaults, ...options };
    this.config.beforeStart();
    this.init();
  }

  private init(): void {
    const [pos0, pos1] = this.config.position.split(' ');

    // Find or create the wrapper + inner wrapper for this position
    let wrapper: HTMLElement;
    let innerWrapper: HTMLElement;

    const existing = document.querySelector<HTMLElement>(
      `${this.config.wrapper}.${pos0}.${pos1}`,
    );

    if (existing) {
      wrapper = existing;
      innerWrapper = existing.querySelector<HTMLElement>('.amaran-wrapper-inner')!;
    } else {
      wrapper = this.createElement('div', `${this.config.wrapper.slice(1)} ${this.config.position}`);
      document.body.appendChild(wrapper);
      innerWrapper = this.createElement('div', 'amaran-wrapper-inner');
      wrapper.appendChild(innerWrapper);
    }

    // Resolve content and pick theme renderer
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

    const themeClass = (
      this.config.themeTemplate
        ? `amaran ${resolvedContent.themeName ?? ''}`
        : `amaran ${this.config.theme}`
    ).trim();

    if (this.config.clearAll) {
      document.querySelectorAll('.amaran, .amaran-overlay').forEach(el => el.remove());
    }

    const element = this.createElement('div', themeClass, this.buildHTML(message));
    innerWrapper.appendChild(element);

    if (pos0 === 'center') this.centerCalculate(wrapper, innerWrapper);

    this.animation(this.config.inEffect, element, 'show');

    // Click handler covers onClick callback, close-on-click, and close button
    element.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-amaran-close]')) {
        this.animation(this.config.outEffect, element, 'hide');
        return;
      }
      if (target.closest('.amaran-sticky')) return;

      this.config.onClick();
      if (this.config.closeOnClick) {
        this.animation(this.config.outEffect, element, 'hide');
      }
    });

    if (this.config.resetTimeout) {
      element.addEventListener('mouseenter', () => this.resetTimeout());
      element.addEventListener('mouseleave', () => this.resumeTimeout(element));
    }

    if (this.config.overlay && !document.querySelector('.amaran-overlay')) {
      const overlay = this.createElement('div', 'amaran-overlay');
      overlay.style.backgroundColor = this.config.overlayColor;
      document.body.prepend(overlay);
    }

    if (this.config.stickyButton) {
      element.querySelector<HTMLElement>('.amaran-sticky')?.addEventListener('click', (e) => {
        const btn = e.currentTarget as HTMLElement;
        if (btn.classList.contains('sticky')) {
          btn.classList.remove('sticky');
          this.resumeTimeout(element);
        } else {
          btn.classList.add('sticky');
          this.resetTimeout();
        }
      });
    }

    if (!this.config.sticky) this.hideDiv(element);
  }

  private resetTimeout(): void {
    clearTimeout(this.timeout);
  }

  private resumeTimeout(element: HTMLElement): void {
    this.timeout = setTimeout(
      () => this.animation(this.config.outEffect, element, 'hide'),
      this.config.delay,
    );
  }

  private buildHTML(message: string): string {
    let html = message;
    if (this.config.closeButton) {
      html = `<span class="amaran-close" data-amaran-close="true"></span>${html}`;
    }
    if (this.config.stickyButton) {
      html = `<span class="amaran-sticky" data-amaran-sticky="true"></span>${html}`;
    }
    return html;
  }

  private centerCalculate(wrapper: HTMLElement, innerWrapper: HTMLElement): void {
    const topMargin = (wrapper.offsetHeight - innerWrapper.offsetHeight) / 2;
    const first = innerWrapper.querySelector<HTMLElement>('.amaran:first-child');
    if (!first) return;
    first.animate([{ marginTop: first.style.marginTop || '0px' }, { marginTop: `${topMargin}px` }], {
      duration: 200,
      fill: 'forwards',
    });
  }

  private animation(effect: string, element: HTMLElement, work: 'show' | 'hide'): void {
    if (effect === 'fadeIn' || effect === 'fadeOut') {
      this.fade(element, work);
    } else if (effect === 'show') {
      if (work === 'show') element.style.display = 'block';
      else this.removeIt(element);
    } else {
      this.slide(effect, element, work);
    }
  }

  private fade(element: HTMLElement, work: 'show' | 'hide'): void {
    this.removeOverlay();

    if (work === 'show') {
      element.style.display = 'block';
      if (this.config.cssanimationIn) {
        element.classList.add('animated', this.config.cssanimationIn);
      } else {
        element.animate([{ opacity: '0' }, { opacity: '1' }], { duration: 300, fill: 'forwards' });
      }
      return;
    }

    if (this.config.cssanimationOut) {
      element.classList.add('animated', this.config.cssanimationOut);
    }

    const startHeight = `${element.offsetHeight}px`;
    element.style.minHeight = '0';
    element.style.overflow = 'hidden';

    element
      .animate([{ opacity: '1' }, { opacity: '0' }], { duration: 300, fill: 'forwards' })
      .finished.then(() =>
        element
          .animate([{ height: startHeight }, { height: '0px' }], { duration: 200, fill: 'forwards' })
          .finished.then(() => this.removeIt(element)),
      );
  }

  private slide(effect: string, element: HTMLElement, work: 'show' | 'hide'): void {
    this.removeOverlay();
    const position = this.getPosition(element, effect);
    if (!position) return;

    if (work === 'show') {
      element.style.display = 'block';
      element.animate([position.start, position.move], {
        duration: 300,
        fill: 'forwards',
        easing: 'ease-out',
      });
    } else {
      element
        .animate([position.move, position.hide], { duration: 300, fill: 'forwards', easing: 'ease-in' })
        .finished.then(() => {
          element.style.minHeight = '0';
          element.style.overflow = 'hidden';
          element.innerHTML = ' ';
          element
            .animate([{ height: `${position.height}px` }, { height: '0px' }], {
              duration: 200,
              fill: 'forwards',
            })
            .finished.then(() => this.removeIt(element));
        });
    }
  }

  private removeOverlay(): void {
    if (this.config.overlay && document.querySelectorAll('.amaran').length <= 1) {
      document.querySelector('.amaran-overlay')?.remove();
    }
  }

  private removeIt(element: HTMLElement): void {
    clearTimeout(this.timeout);
    element.remove();

    const [pos0, pos1] = this.config.position.split(' ');
    const wrapper = document.querySelector<HTMLElement>(`${this.config.wrapper}.${pos0}.${pos1}`);
    if (wrapper && pos0 === 'center') {
      const inner = wrapper.querySelector<HTMLElement>('.amaran-wrapper-inner');
      if (inner) this.centerCalculate(wrapper, inner);
    }
    this.config.afterEnd();
  }

  private getInfo(element: HTMLElement): PositionInfo {
    const rect = element.getBoundingClientRect();
    const wrapperEl = document.querySelector<HTMLElement>(this.config.wrapper);
    const wRect = wrapperEl?.getBoundingClientRect() ?? new DOMRect();
    return {
      t: rect.top + window.scrollY,
      l: rect.left + window.scrollX,
      h: element.offsetHeight,
      w: element.offsetWidth,
      wT: wRect.top + window.scrollY,
      wL: wRect.left + window.scrollX,
      wH: wrapperEl?.offsetHeight ?? 0,
      wW: wrapperEl?.offsetWidth ?? 0,
    };
  }

  private getPosition(element: HTMLElement, effect: string): SlidePositionSet | null {
    const p = this.getInfo(element);
    const side = this.config.position.split(' ')[1];
    const winW = window.innerWidth;
    const winH = window.innerHeight;

    const map: Record<string, SlidePositionSet> = {
      slideTop: {
        start: { top: `${-(p.wT + p.wH + p.h * 2)}px` },
        move:  { top: '0px' },
        hide:  { top: `${-(p.t + p.h * 2)}px` },
        height: p.h,
      },
      slideBottom: {
        start: { top: `${winH - p.wH + p.h * 2}px` },
        move:  { top: '0px' },
        hide:  { top: `${winH - p.wH + p.h * 2}px` },
        height: p.h,
      },
      slideLeft: {
        start: { left: `${side === 'left' ? -p.w * 1.5 : -winW}px` },
        move:  { left: '0px' },
        hide:  { left: `${side === 'left' ? -p.w * 1.5 : -winW}px` },
        height: p.h,
      },
      slideRight: {
        start: { left: `${side === 'right' ? p.w * 1.5 : winW}px` },
        move:  { left: '0px' },
        hide:  { left: `${side === 'right' ? p.w * 1.5 : winW}px` },
        height: p.h,
      },
    };

    return map[effect] ?? null;
  }

  private hideDiv(element: HTMLElement): void {
    this.timeout = setTimeout(
      () => this.animation(this.config.outEffect, element, 'hide'),
      this.config.delay,
    );
  }

  private createElement(tag: string, className: string, html?: string): HTMLElement {
    const el = document.createElement(tag);
    el.className = className;
    if (html !== undefined) el.innerHTML = html;
    return el;
  }
}

// ─── Public API ───────────────────────────────────────────────
function amaran(options: AmaranOptions): AmaranPlugin {
  return new AmaranPlugin(options);
}

amaran.close = (): void => {
  document.querySelectorAll('.amaran-wrapper').forEach(el => el.remove());
};

export { amaran };
export default amaran;
