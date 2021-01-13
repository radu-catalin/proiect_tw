class Container {
  services = new Map();
  directives = new Map();

  constructor() { }

  add(service) {
    this.services.set(service, new service());
  }

  get(service) {
    return this.services.get(service);
  }
}

module.exports = new Container();