const path = require('path');

const container = require('../../../ioc/container');
const BaseController = require('../../shared/controllers/base.controller').BaseController;
const RequestStore = require('../../shared/stores/request.store').RequestStore;

class RequestController extends BaseController {
  requestStore = container.get(RequestStore);

  constructor(path = '/', handlers) {
    super(path, handlers);
    this.path = path;
    this.handlers = handlers;

    this.get();
  }

  get() {
    this.router.get(this.path, (req, res, next) => {
      res.sendFile(path.join(__dirname, '../../../views/request.html'));
    });

    this.router.post(this.path, async (req, res, next) => {
      await this.requestStore.add(req.body);
      res.sendStatus(200);
    });
  }
}

module.exports = { RequestController };