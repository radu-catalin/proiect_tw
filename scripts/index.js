import GalleryComponent from './components/gallery-component.js';
import { FormGroupDirective } from './directives/form-group.directive.js';
import { HamburgerMenuDirective } from './directives/hamburger-menu.directive.js';
import { StickyNavDirective } from './directives/sticky-nav.directive.js';
import { container } from './ioc/container.js';
import { RequestService } from './services/request.service.js';

// Services initialization
[RequestService].forEach(service => {
  container.addService(service);
});

// Components initialization
[GalleryComponent].forEach((component) => {
  customElements.define(component.componentName, component);
});

// Directives initialization
[StickyNavDirective, HamburgerMenuDirective, FormGroupDirective].forEach(directive => {
  container.addDirective(directive);
});



