const HomeController = require('./modules/client/home/home').HomeController;
const RequestController = require('./modules/client/request/request').RequestController;
const ListRequestsController = require('./modules/admin/list-requests/list-requests').ListRequestsController;
const controllers = [
  new HomeController('/', []),
  new RequestController('/request', []),
  new ListRequestsController('/admin', [])
];

module.exports = controllers