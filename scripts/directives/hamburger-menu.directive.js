import { Directive } from './base-directive.js';

export class HamburgerMenuDirective extends Directive {
  static directiveName = 'appHamburgerMenu';
  _events = ['scroll', 'load', 'resize'];
  constructor(target) {
    super(target);
  }

  onInit() {
    console.log(this.target);
  }
}