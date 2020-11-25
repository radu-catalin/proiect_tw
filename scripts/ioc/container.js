export default class Container {
  services = new Map();
  directives = new Map();

  constructor() { }

  addService(serviceClass) {
    this.services[serviceClass] = new serviceClass();
  }

  addDirective(directiveClass) {
    if (!this.services[directiveClass]) {
      this.services[directiveClass] = new Map();
    }

    const directiveCollection = document.querySelectorAll(`[${directiveClass.directiveName}]`);
    [...directiveCollection].forEach(dir => {
      const directiveInstance = new directiveClass(dir);

      if (!directiveInstance.onInit) {
        console.error('Error: onInit method is mandatory', directiveInstance);
        return;
      }

      this.services[directiveClass][dir] = directiveInstance;
      this.services[directiveClass][dir].onInit();
    });
  }

  get(serviceClass, elementTarget = null) {
    return this.services[serviceClass] || this.directives[serviceClass][elementTarget];
  }

  remove(serviceClass) {
    delete this.services[serviceClass];
  }
}

export const container = new Container();