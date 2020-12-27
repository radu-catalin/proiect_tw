class Container {
  services = new Map();
  directives = new Map();

  constructor() { }

  add(service) {
    this.services.add(service);
  }

  get(service) {
    return this.services.get(service);
  }
}

module.exports = new Container();