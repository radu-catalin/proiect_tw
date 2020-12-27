import { Directive } from './directive.js';

export class HamburgerMenuDirective extends Directive {
  static directiveName = 'appHamburgerMenu';

  hamburgerBtn;

  constructor(target) {
    super(target);
  }

  onInit() {
    if (window.innerWidth <= 768) {
      this.initHamburgerBtn();
      this.target.parentNode.insertBefore(this.hamburgerBtn, this.target);
    }

    window.addEventListener('resize', this.toggleHamburgerHandler.bind(this))
  }

  initHamburgerBtn() {
    this.hamburgerBtn = document.createElement('button');
    this.hamburgerBtn.setAttribute('class', 'hamburger-menu');
    this.hamburgerBtn.appendChild(document.createElement('span'));

    this.hamburgerBtn.addEventListener('click', this.toggleMenuHandler.bind(this));
  }

  toggleMenuHandler() {
    if (this.target.style.display === 'none') {
      this.target.style.display = 'block';
    } else {
      this.target.style.display = 'none';
    }
  }

  toggleHamburgerHandler() {
    if (!this.hamburgerBtn && window.innerWidth <= 768) {
      this.initHamburgerBtn();
      this.target.style.display = 'none';
      this.target.parentNode.insertBefore(this.hamburgerBtn, this.target);
    } else if (window.innerWidth > 768 && this.hamburgerBtn) {
      this.target.style.display = 'block';
      this.target.parentNode.removeChild(this.hamburgerBtn);
      this.hamburgerBtn = null;
    }
  }
}
