import { Directive } from './base-directive.js';

export class StickyNavDirective extends Directive {
  static directiveName = 'appStickyNav';
  #events = ['scroll', 'load', 'resize'];
  constructor(target) {
    super(target);
  }

  onInit() {
    this.#events.forEach(event => {
      window.addEventListener(event, this.makeSticky.bind(this));
    });
  }

  makeSticky() {
    const scrollTop = window.pageYOffset;
    const widthDevice = window.outerWidth;

    const nav = this.target;
    if (scrollTop > 0 || widthDevice < 768) {
      nav.classList.add('is-sticky');
    } else {
      nav.classList.remove('is-sticky');
    }
  }

  destroy() {
    this.#events.forEach(event => {
      window.removeEventListener(event, this.sticky.bind(this));
    });
  }
}