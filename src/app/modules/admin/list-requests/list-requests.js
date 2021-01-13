const path = require('path');

const container = require('../../../ioc/container');
const BaseController = require('../../shared/controllers/base.controller').BaseController;
const RequestStore = require('../../shared/stores/request.store').RequestStore;

class ListRequestsController extends BaseController {
  requestStore = container.get(RequestStore);

  constructor(path = '/', handlers) {
    super(path, handlers);
    this.path = path;
    this.handlers = handlers;

    this.get();
  }

  get() {
    this.router.get(this.path, (req, res, next) => {
      res.sendFile(path.join(__dirname, '../../../views/admin.html'));
    });

    this.router.get('/get' + this.path, (req, res, next) => {
      res.json(this.requestStore.retrieveCollection());
    });

  }
}

module.exports = { ListRequestsController };