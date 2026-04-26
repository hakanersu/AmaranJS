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
declare class AmaranPlugin {
    config: Required<AmaranOptions>;
    private timeout;
    constructor(options: AmaranOptions);
    private init;
    private resetTimeout;
    private resumeTimeout;
    private buildHTML;
    private centerCalculate;
    private animation;
    private fade;
    private slide;
    private removeOverlay;
    private removeIt;
    private getInfo;
    private getPosition;
    private hideDiv;
    private createElement;
}
declare function amaran(options: AmaranOptions): AmaranPlugin;
declare namespace amaran {
    var close: () => void;
}
export { amaran };
export default amaran;
