import { GalleryComponent } from './components/gallery-component.js';

// custom elements initialization
[GalleryComponent].forEach((component) => {
  customElements.define(component.componentName, component);
});

// Services initialization (user.service)