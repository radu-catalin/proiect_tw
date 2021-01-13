const path = require('path');

const BaseController = require('../../shared/controllers/base.controller').BaseController;

class HomeController extends BaseController {
  constructor(path = '/', handlers) {
    super(path, handlers);

    this.path = path;
    this.handlers = handlers;

    this.get();
  }

  get() {
    this.router.get(this.path, (req, res, next) => {
      res.sendFile(path.resolve('src/app/views/index.html'));
    });
  }
}

module.exports = { HomeController };