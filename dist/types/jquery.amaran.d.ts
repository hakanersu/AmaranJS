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
declare class AmaranPlugin {
    config: Required<AmaranOptions>;
    timeout: ReturnType<typeof setTimeout>;
    constructor(options: AmaranOptions);
    init(): void;
    resetTimeout(): void;
    resumeTimeout(element: JQuery): void;
    buildHTML(message: string): string;
    centerCalculate(wrapper: JQuery, innerWrapper: JQuery): void;
    animation(effect: string, element: JQuery, work: 'show' | 'hide'): void;
    fade(element: JQuery, work: 'show' | 'hide'): void;
    slide(effect: string, element: JQuery, work: 'show' | 'hide'): void;
    removeOverlay(): void;
    removeIt(element: JQuery): void;
    getWidth(el: JQuery): number;
    getInfo(element: JQuery): PositionInfo;
    getPosition(element: JQuery, effect: string): SlidePositionSet | null;
    close(): void;
    hideDiv(element: JQuery): void;
}
declare global {
    interface JQueryStatic {
        amaran: {
            (options: AmaranOptions): AmaranPlugin;
            close(): false;
        };
    }
}
export {};
