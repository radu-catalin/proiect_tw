export default class Container {
  services = new Map();
  directives = new Map();

  constructor() { }

  addService(serviceClass) {
    this.services[serviceClass] = new serviceClass();
  }

  addDirective(directiveClass) {
    if (!this.directives[directiveClass]) {
      this.directives[directiveClass] = new Map();
    }

    const directiveCollection = document.querySelectorAll(`[${directiveClass.directiveName}]`);
    [...directiveCollection].forEach(dir => {
      const directiveInstance = new directiveClass(dir);

      if (!directiveInstance.onInit) {
        console.error('Error: onInit method is mandatory', directiveInstance);
        return;
      }

      this.directives[directiveClass][dir] = directiveInstance;
      this.directives[directiveClass][dir].onInit();
    });
  }

  get(serviceClass) {
    return this.services[serviceClass];
  }

  remove(serviceClass, elementTarget = null) {
    delete this.services[serviceClass];
    delete this.directives[serviceClass][elementTarget];
  }
}

export const container = new Container();