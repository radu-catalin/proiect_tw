import GalleryComponent from './components/gallery-component.js';
import { HamburgerMenuDirective } from './directives/hamburger-menu.directive.js';
import { StickyNavDirective } from './directives/sticky-nav.directive.js';
import { container } from './ioc/container.js';

// Components initialization
[GalleryComponent].forEach((component) => {
  customElements.define(component.componentName, component);
});

// Directives initialization
[StickyNavDirective, HamburgerMenuDirective].forEach(directive => {
  container.addDirective(directive);
});



